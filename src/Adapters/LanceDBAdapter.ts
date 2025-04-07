import * as fs from "fs";
import * as path from "path";
import { connect, Table, Connection } from "@lancedb/lancedb";
import { OllamaEmbeddings } from "@langchain/ollama";
import { ConfigServiceFacade } from "../Facades/ConfigServiceFacade";
import FileSystemService from "../Services/FileSystemService";
import { File } from "../Models/File";
import { Requirement } from "../Models/Requirement";
import { Chunk } from "../Models/Chunk";
import { COLLECTION_TYPE } from "../Models/CollectionType";
import { IVectorDatabase } from "../Interfaces/IVectorDatabase";

export class LanceDBAdapter implements IVectorDatabase {
  private _embeddings: OllamaEmbeddings = new OllamaEmbeddings();
  private readonly _dbPath: string;
  private _dbConnection: Connection | null = null;
  private _embeddingDimension = 768;
  private _maxTextLength = 8000;

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

  public async fileExists(filePath: string): Promise<boolean> {
    try {
      const table = await this._getTable(COLLECTION_TYPE.file);

      const rows = await table
        .query()
        .where(`file_path = '${filePath}'`)
        .toArray();

      const checksum = FileSystemService.getChecksum(filePath);

      const results = rows.filter((doc) => {
        try {
          if (doc.file_path && typeof doc.file_path === "string") {
            return doc.file_path === filePath && doc.checksum === checksum;
          }
          return false;
        } catch (error) {
          console.error(
            `Error checking document existence for ${filePath}:`,
            error,
          );
          return false;
        }
      });

      console.log(`Trovati ${results.length} documenti corrispondenti.`);
      return results.length > 0 ? true : false;
    } catch (error) {
      console.error("Errore durante la ricerca nel documento LanceDB:", error);
      throw error; // Rilancia l'errore per gestione esterna se necessario
    }
  }

  public async addFiles(files: File[]): Promise<void> {
    try {
      if (files.length === 0) {
        console.log("No files to add");
        return;
      }

      const table = await this._getTable(COLLECTION_TYPE.file);

      for (const file of files) {
        if (await this.fileExists(file.filePath)) {
          console.log(`Skipping existing file: ${file.filePath}`);
          continue;
        }

        // Generate embedding for file content
        // const embedding = await this._embeddings.embedQuery(
        //   file.originalContent,
        // );

        await table.add([
          {
            vector: Array(this._embeddingDimension).fill(0),
            original_content: file.originalContent,
            file_path: file.filePath,
            checksum: file.checksum,
          },
        ]);

        console.log(`Successfully added file: ${file.filePath}`);
      }
    } catch (error) {
      console.error(`Error adding files to LanceDB:`, error);
      throw error;
    }
  }

  public async addRequirements(requirements: Requirement[]) {
    if (requirements.length === 0) {
      console.log("No requirements to add");
      return;
    }

    const table = await this._getTable(COLLECTION_TYPE.requirements);

    for (const requirement of requirements) {
      try {
        const embedding = await this._embeddings.embedQuery(
          requirement.description,
        );

        await table.add([
          {
            vector: embedding,
            id: requirement.id,
            name: requirement.name,
            description: requirement.description,
            type: requirement.type,
            version: requirement.version,
          },
        ]);

        console.log(`Successfully added requirement: ${requirement.name}`);
      } catch (error) {
        console.error(
          `Error adding requirement ${requirement.name} to LanceDB:`,
          error,
        );
        throw error;
      }
    }
  }

  public async addChunks(chunks: Chunk[]) {
    if (chunks.length === 0) {
      console.log("No files to add");
      return;
    }

    const table = await this._getTable(COLLECTION_TYPE.chunks);

    for (const chunk of chunks) {
      try {
        const embedding = await this._embeddings.embedQuery(chunk.content);

        await table.add([
          {
            vector: embedding,
            content: chunk.content,
            file_path: chunk.filePath,
            file_type: chunk.fileType,
            line_number: chunk.lineNumber,
          },
        ]);

        console.log(
          `Successfully added chunk for file ${chunk.filePath} at line ${chunk.lineNumber}`,
        );
      } catch (error) {
        console.error(
          `Error adding chunk for file ${chunk.filePath} at line ${chunk.lineNumber} to LanceDB:`,
          error,
        );
        throw error;
      }
    }
  }

  public async queryForFiles(
    question: string,
    maxResults = 0,
  ): Promise<File[]> {
    try {
      // Get the table
      const table = await this._getTable(COLLECTION_TYPE.file);

      // Generate embedding for the query
      const embedding = await this._embeddings.embedQuery(question);

      // Set the limit
      const limit =
        maxResults || ConfigServiceFacade.GetInstance().getMaxResults();

      const results = await table
        .query()
        .nearestTo(new Float32Array(embedding))
        .limit(limit)
        .toArray();

      const files: File[] = [];
      const keyMapping: Record<string, string> = {
        file_path: "filePath",
        checksum: "checksum",
        _distance: "score",
      };

      results.forEach((item) => {
        const metadata: Record<string, unknown> = {};
        Object.keys(item).forEach((key) => {
          if (key !== "vector") {
            const mappedKey = keyMapping[key] || key;
            metadata[mappedKey] =
              key === "_distance" ? 1 - item[key] : item[key];
          }
        });
        files.push(metadata as unknown as File);
      });

      return files;
    } catch (error) {
      console.error(`Error querying LanceDB:`, error);
      throw new Error(`Failed to query data: ${error}`);
    }
  }

  public async queryForRequirements(
    question: string,
    maxResults = 0,
  ): Promise<Requirement[]> {
    try {
      // Get the table
      const table = await this._getTable(COLLECTION_TYPE.requirements);

      // Generate embedding for the query
      const query = await this._embeddings.embedQuery(question);

      // Set the limit
      const limit =
        maxResults || ConfigServiceFacade.GetInstance().getMaxResults();

      const results = await table
        .query()
        .nearestTo(new Float32Array(query))
        .limit(limit)
        .toArray();

      const requirements: Requirement[] = [];

      const keyMapping: Record<string, string> = {
        id: "id",
        name: "name",
        description: "description",
        type: "type",
        version: "version",
        _distance: "score",
      };

      results.forEach((item) => {
        const metadata: Record<string, unknown> = {};
        Object.keys(item).forEach((key) => {
          if (key !== "vector") {
            const mappedKey = keyMapping[key] || key;
            metadata[mappedKey] =
              key === "_distance" ? 1 - item[key] : item[key];
          }
        });
        requirements.push(metadata as unknown as Requirement);
      });

      return requirements;
    } catch (error) {
      console.error(`Error querying LanceDB:`, error);
      throw new Error(`Failed to query data: ${error}`);
    }
  }

  public async queryForChunks(
    question: string,
    maxResults = 0,
  ): Promise<Chunk[]> {
    try {
      // Get the table
      const table = await this._getTable(COLLECTION_TYPE.chunks);

      // Generate embedding for the query
      const query = await this._embeddings.embedQuery(question);

      // Set the limit
      const limit =
        maxResults || ConfigServiceFacade.GetInstance().getMaxResults();

      const results = await table
        .query()
        .nearestTo(new Float32Array(query))
        .limit(limit)
        .toArray();

      const chunks: Chunk[] = [];

      const keyMapping: Record<string, string> = {
        content: "content",
        file_path: "filePath",
        file_type: "fileType",
        line_number: "lineNumber",
        _distance: "score",
      };

      results.forEach((item) => {
        const metadata: Record<string, unknown> = {};
        Object.keys(item).forEach((key) => {
          if (key !== "vector") {
            const mappedKey = keyMapping[key] || key;
            metadata[mappedKey] =
              key === "_distance" ? 1 - item[key] : item[key];
          }
        });
        chunks.push(metadata as unknown as Chunk);
      });

      return chunks;
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
    const embeddingModel =
      ConfigServiceFacade.GetInstance().getEmbeddingModel();

    this._embeddings = new OllamaEmbeddings({
      baseUrl: baseUrl,
      model: embeddingModel,
    });

    try {
      // Initialize connection
      this._dbConnection = await connect(this._dbPath);
    } catch (error) {
      console.error("Error connecting to LanceDB:", error);
      throw new Error(`Failed to connect to LanceDB: ${error}`);
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
      return 768;
    }
  }

  private async _getDB(): Promise<Connection> {
    if (!this._dbConnection) {
      this._dbConnection = await connect(this._dbPath);
    }
    return this._dbConnection;
  }

  private async _tableExists(
    collectionName: COLLECTION_TYPE,
  ): Promise<boolean> {
    const db = await this._getDB();

    const tables = await db.tableNames();
    return tables.includes(collectionName);
  }

  private async _getTable(collectionName: COLLECTION_TYPE): Promise<Table> {
    const db = await this._getDB();

    try {
      if (await this._tableExists(collectionName)) {
        return await db.openTable(collectionName);
      } else {
        // Create a new table with proper schema
        console.log(`Creating table ${collectionName}...`);

        this._embeddingDimension = await this._determineEmbeddingDimension();
        console.log(
          `Detected embedding dimension: ${this._embeddingDimension}`,
        );

        if (collectionName === COLLECTION_TYPE.file) {
          return await db.createTable(collectionName, [
            {
              vector: Array(this._embeddingDimension).fill(0),
              original_content: "",
              file_path: "",
              checksum: "",
            },
          ]);
        } else if (collectionName === COLLECTION_TYPE.requirements) {
          return await db.createTable(collectionName, [
            {
              vector: Array(this._embeddingDimension).fill(0),
              id: "",
              name: "",
              description: "",
              type: "",
              version: "",
            },
          ]);
        } else if (collectionName === COLLECTION_TYPE.chunks) {
          return await db.createTable(collectionName, [
            {
              vector: Array(this._embeddingDimension).fill(0),
              content: "",
              file_path: "",
              file_type: "",
              line_number: 0,
            },
          ]);
        } else {
          throw new Error(`Unknown collection type: ${collectionName}`);
        }
      }
    } catch (error) {
      console.error(`Error getting table ${collectionName}:`, error);
      throw error;
    }
  }
}
