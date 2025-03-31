import * as fs from "fs";
import * as path from "path";
import { connect, Table, Connection } from "@lancedb/lancedb";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Document } from "@langchain/core/documents";
import { ConfigServiceFacade } from "../Facades/ConfigServiceFacade";
import { QueryResult } from "../Models/QueryResult";
import { IVectorDatabase } from "../Interfaces/IVectorDatabase";

export class LangChainLanceDBAdapter implements IVectorDatabase {
  public readonly REQUIREMENTS_COLLECTION = "requirements";
  public readonly DOCUMENTS_COLLECTION = "documents";

  private _embeddings: OllamaEmbeddings = new OllamaEmbeddings();
  private readonly _dbPath: string;
  private _dbConnection: Connection | null = null;
  private _embeddingDimension = 384; // Default, will be determined dynamically
  private _maxTextLength = 8000; // Maximum safe text length for embeddings

  constructor(storagePath: string) {
    this._dbPath = path.join(storagePath, "lancedb");
    this._initialize().catch((event) => {
        console.error("Error initializing LanceDB:", event);
        throw new Error(`Failed to initialize LanceDB: ${event}`);
    });
  }

  public async resetDatabase(): Promise<void> {
    try {
      console.log("Resetting LanceDB database...");

      // Close connection if open
      this._dbConnection = null;

      // Todo(MonettiLuca): This should be done using FileSystemService
      // Remove the entire database directory
      if (fs.existsSync(this._dbPath)) {
        fs.rmSync(this._dbPath, { recursive: true, force: true });
        console.log("Removed existing database directory");
      }

      // Recreate the directory
      fs.mkdirSync(this._dbPath, { recursive: true });
      console.log("Created fresh database directory");

      // Initialize
      await this._initialize();
      console.log("Database reset complete");
    } catch (error) {
      console.error("Error resetting database:", error);
      throw new Error(`Failed to reset database: ${error}`);
    }
  }

  public async add(
      data: string,
      metadata: any,
      collectionName: string,
  ): Promise<void> {
    try {
      // Skip if text is too long
      if (data.length > this._maxTextLength) {
        console.warn(`Skipping text - too large (${data.length} chars)`);
        return;
      }

      // Generate embedding for the data
      const embedding = await this._embeddings.embedQuery(data);

      // Get or create the table
      const table = await this._getTable(collectionName);

      // Add data to the table
      await table.add([
        {
          vector: embedding,
          text: data,
          metadata_json: JSON.stringify(metadata),
        },
      ]);

      console.log(`Successfully added data to ${collectionName}`);
    } catch (error) {
      console.error(`Error adding data to LanceDB:`, error);
      throw new Error(`Failed to add data: ${error}`);
    }
  }

  public async addDocuments(
      documents: Document[],
      collectionName: string,
  ): Promise<void> {
    try {
      // Process documents in smaller batches to avoid overwhelming the system
      const batchSize = 3; // Even smaller batch size to better handle context window issues
      let successCount = 0;
      let failedCount = 0;

      // Filter out documents that are too long
      const validDocuments = documents.filter((doc) => {
        if (doc.pageContent.length > this._maxTextLength) {
          console.warn(
              `Skipping document - too large (${doc.pageContent.length} chars)`,
          );
          failedCount++;
          return false;
        }
        return true;
      });

      if (validDocuments.length === 0) {
        console.log("No valid documents to add.");
        return;
      }

      // Make sure the table exists
      const table = await this._getTable(collectionName);

      // Process in batches
      for (let i = 0; i < validDocuments.length; i += batchSize) {
        const batch = validDocuments.slice(i, i + batchSize);

        try {
          // Generate embeddings for the batch
          const embeddings = await this._embeddings.embedDocuments(
              batch.map((doc) => doc.pageContent),
          );

          // Create records for the batch
          const records = batch.map((doc, index) => ({
            vector: embeddings[index],
            text: doc.pageContent,
            metadata_json: JSON.stringify(doc.metadata),
          }));

          // Add the batch to the table
          await table.add(records);
          successCount += batch.length;
          console.log(
              `Added batch of ${batch.length} documents (${i + 1}-${i + batch.length}/${validDocuments.length})`,
          );
        } catch (error) {
          console.error(
              `Error processing batch ${i}-${i + batch.length}:`,
              error,
          );

          // Fall back to adding documents one by one
          for (const doc of batch) {
            try {
              // Additional safety check for long content
              if (doc.pageContent.length > 4000) {
                console.warn(
                    `Document too long (${doc.pageContent.length} chars), truncating for individual processing`,
                );
                const truncated = doc.pageContent.substring(0, 4000);

                const embedding = await this._embeddings.embedQuery(truncated);
                await table.add([
                  {
                    vector: embedding,
                    text: truncated,
                    metadata_json: JSON.stringify(doc.metadata),
                  },
                ]);
                successCount++;
                console.log(`Added truncated document successfully`);
              } else {
                await this.add(doc.pageContent, doc.metadata, collectionName);
                successCount++;
              }
            } catch (indivError) {
              console.error(`Failed to add individual document:`, indivError);
              failedCount++;
            }
          }
        }
      }

      console.log(
          `Successfully added ${successCount} documents to ${collectionName}` +
          (failedCount > 0 ? ` (${failedCount} failed)` : ""),
      );
    } catch (error) {
      console.error(`Error adding documents to LanceDB:`, error);
      throw new Error(`Failed to add documents: ${error}`);
    }
  }

  public async query(
      question: string,
      collectionName: string,
      maxResults = 0,
  ): Promise<QueryResult[]> {
    try {
      // Skip if the table doesn't exist yet
      if (!(await this._tableExists(collectionName))) {
        console.warn(
            `Table ${collectionName} doesn't exist yet. Returning empty results.`,
        );
        return [];
      }

      // Generate embedding for the query
      const embedding = await this._embeddings.embedQuery(question);

      // Get the table
      const table = await this._getTable(collectionName);

      // Set the limit
      const limit = maxResults || ConfigServiceFacade.GetInstance().getMaxResults();

      // Perform the search
      const results = table.search(new Float32Array(embedding)).limit(limit);

      const resultArray: Record<string, unknown>[] = [];
      for await (const batch of results) {
        for (let i = 0; i < batch.numRows; i++) {
          const row: Record<string, unknown> = {};
          for (const field of batch.schema.fields) {
            const colIndex = batch.schema.fields.indexOf(field);
            const column = batch.getChildAt(colIndex);
            if (column) {
              row[field.name] = column.get(i);
            }
          }
          resultArray.push(row);
        }
      }

      // Convert results to QueryResult format
      return resultArray.map((item, index) => {
        // Parse metadata from JSON
        let metadata = {};
        try {
          const metadataJson = item.metadata_json as string;
          if (metadataJson) {
            metadata = JSON.parse(metadataJson);
          }
        } catch (e) {
          console.warn(`Failed to parse metadata for result ${index}:`, e);
        }

        return {
          text: item.text as string,
          metadata,
          score: (item.score as number) || 1 - index / limit, // Use score if available, or approximate
        };
      });
    } catch (error) {
      console.error(`Error querying LanceDB:`, error);
      throw new Error(`Failed to query data: ${error}`);
    }
  }

  // This method will be used by other services that need direct access to embeddings
  public getEmbeddings(): OllamaEmbeddings {
    return this._embeddings;
  }

  public async refreshEmbeddings(): Promise<void> {
    this._dbConnection = null;
    await this._initialize();
  }

  private async _initialize(): Promise<void> {
    // Ensure directory exists
    if (!fs.existsSync(this._dbPath)) {
      fs.mkdirSync(this._dbPath, { recursive: true });
    }

    const baseUrl = ConfigServiceFacade.GetInstance().getEndpoint();
    const embeddingModel = ConfigServiceFacade.GetInstance().getEmbeddingModel();

    this._embeddings = new OllamaEmbeddings({
      baseUrl: baseUrl,
      model: embeddingModel,
    });

    try {
      // Initialize connection
      this._dbConnection = await connect(this._dbPath);
    } catch (error) {
      console.error("Error connecting to LanceDB:", error);
    }
  }

  // Determine the embedding dimension by generating a sample embedding
  private async _determineEmbeddingDimension(): Promise<number> {
    try {
      const sampleText = "Sample text for embedding dimension detection";
      const embedding = await this._embeddings.embedQuery(sampleText);
      return embedding.length;
    } catch (error) {
      console.error("Error determining embedding dimension:", error);
      // Return default dimension if detection fails
      return 384;
    }
  }

  private async _getDB(): Promise<Connection> {
    if (!this._dbConnection) {
      this._dbConnection = await connect(this._dbPath);
    }
    return this._dbConnection;
  }

  private async _tableExists(collectionName: string): Promise<boolean> {
    const db = await this._getDB();
    try {
      const tables = await db.tableNames();
      return tables.includes(collectionName);
    } catch (error) {
      return false;
    }
  }

  private async _getTable(collectionName: string): Promise<Table> {
    const db = await this._getDB();

    try {
      if (await this._tableExists(collectionName)) {
        return await db.openTable(collectionName);
      } else {
        // Create a new table with proper schema
        console.log(`Creating table ${collectionName}...`);

        // Determine embedding dimension if not already known
        if (this._embeddingDimension === 384) {
          this._embeddingDimension = await this._determineEmbeddingDimension();
          console.log(
            `Detected embedding dimension: ${this._embeddingDimension}`,
          );
        }

        return await db.createTable(collectionName, [
          {
            vector: Array(this._embeddingDimension).fill(0),
            text: "",
            metadata_json: "{}",
          },
        ]);
      }
    } catch (error) {
      console.error(`Error getting table ${collectionName}:`, error);
      throw error;
    }
  }
}
