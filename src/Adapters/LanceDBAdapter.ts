import * as fs from "fs";
import * as path from "path";
import { connect, Table, Connection } from "@lancedb/lancedb";
import { OllamaEmbeddings } from "@langchain/ollama";
import { ConfigServiceFacade } from "../Facades/ConfigServiceFacade";
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
    this._initialize();
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

      await this._initialize();
      console.log("Database reset complete");
    } catch (error) {
      console.error("Error resetting database:", error);
      throw new Error(`Failed to reset database: ${error}`);
    }
  }

  public async fileExists(
    filePath: string,
    checksum?: string,
  ): Promise<boolean> {
    try {
      const table = await this._getTable(COLLECTION_TYPE.file);

      const rows = await table
        .query()
        .where(`file_path = '${filePath}'`)
        .toArray();

      // if no checksum is provided, check only for file path
      if (!checksum) {
        return rows.some((doc) => doc.file_path === filePath);
      }

      // If checksum is provided, verify it matches
      return rows.some(
        (doc) => doc.file_path === filePath && doc.checksum === checksum,
      );
    } catch (error) {
      console.error(`Error checking file existence for ${filePath}:`, error);
      throw error;
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
          if (await this.fileExists(file.filePath, file.checksum)) {
            console.log(`Skipping existing file: ${file.filePath}`);
            continue;
          } else {
            console.log(
              `File ${file.filePath} already exists, deleting it first`,
            );
            await this.deleteFiles([file]);
          }
        }
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
        const embedding = await this._embeddings.embedQuery(chunk.lineContent);

        await table.add([
          {
            vector: embedding,
            content: chunk.content,
            line_content: chunk.lineContent,
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
      const table = await this._getTable(COLLECTION_TYPE.file);

      const embedding = await this._embeddings.embedQuery(question);

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
      const table = await this._getTable(COLLECTION_TYPE.requirements);

      const query = await this._embeddings.embedQuery(question);

      const limit =
        maxResults || ConfigServiceFacade.GetInstance().getMaxResults();

      const results = await table
        .query()
        .nearestTo(new Float32Array(query))
        .limit(limit)
        .toArray();

      const requirements: Requirement[] = [];

      const keyMapping: Record<string, string> = {
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
    filePaths: string[] = [],
    maxResults = 0
  ): Promise<Chunk[]> {
    try {
      const table = await this._getTable(COLLECTION_TYPE.chunks);

      const query = await this._embeddings.embedQuery(question);

      const limit =
        maxResults || ConfigServiceFacade.GetInstance().getMaxResults();

      let results;

      if (filePaths.length > 0) {
        console.log("Querying for chunks in multiple files with a filter!!", filePaths);

        results = await table
          .query()
          .nearestTo(new Float32Array(query))
          .where("file_path IN ('" + filePaths.join("','") + "')")
          .limit(limit)
          .toArray();
      } else {
        results = await table
          .query()
          .nearestTo(new Float32Array(query))
          .limit(limit)
          .toArray();
      }

      const chunks: Chunk[] = [];

      const keyMapping: Record<string, string> = {
        content: "content",
        line_content: "lineContent",
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

  public async deleteFiles(files: File[]): Promise<void> {
    try {
      if (files.length === 0) {
        console.log("No files to remove");
        return;
      }

      const files_table = await this._getTable(COLLECTION_TYPE.file);
      const chunks_table = await this._getTable(COLLECTION_TYPE.chunks);

      for (const file of files) {
        await files_table.delete(`file_path = '${file.filePath}'`);

        const rows = await chunks_table
          .query()
          .where(`file_path = '${file.filePath}'`)
          .toArray();

        console.log(`Found ${rows.length} corresponding chunks to the file`);

        await chunks_table.delete(`file_path = '${file.filePath}'`);
      }

      console.log(`Deleted ${files.length} files`);
      return;
    } catch (error) {
      console.log(`Error while deleting files: ${error}`);
      throw error;
    }
  }

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
    const bearerToken = ConfigServiceFacade.GetInstance().getBearerToken();
    const headers = bearerToken
      ? new Headers({ Authorization: `Bearer ${bearerToken}` })
      : undefined;

    this._embeddings = new OllamaEmbeddings({
      baseUrl: baseUrl,
      model: embeddingModel,
      headers: headers,
    });

    try {
      this._dbConnection = await connect(this._dbPath);
    } catch (error) {
      console.error("Error connecting to LanceDB:", error);
      throw new Error(`Failed to connect to LanceDB: ${error}`);
    }
  }

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
              line_content: "",
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
