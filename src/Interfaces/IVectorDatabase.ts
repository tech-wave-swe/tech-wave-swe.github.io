import { File } from "../Models/File";
import { Requirement } from "../Models/Requirement";
import { Chunk } from "../Models/Chunk";

export interface IVectorDatabase {
  /**
   * Add files to the vector database
   */
  addFiles(files: File[]): Promise<void>;

  /**
   * Add requirements to the vector database
   */
  addRequirements(documents: Requirement[]): Promise<void>;

  /**
   * Add chunks to the vector database
   */
  addChunks(chunks: Chunk[]): Promise<void>;

  /**
   * Check if a document exists in the vector database
   */
  fileExists(filePath: string, checksum: string): Promise<boolean>;

  /**
   * Query the vector database for similar files
   */
  queryForFiles(question: string, maxResults?: number): Promise<File[]>;

  /**
   * Query the vector database for similar requirements
   */
  queryForRequirements(
    question: string,
    maxResults?: number,
  ): Promise<Requirement[]>;

  /**
   * Query the vector database for similar chunks
   */
  queryForChunks(question: string, filePaths?: string[], maxResults?: number): Promise<Chunk[]>;

  /**
   * Reset the database, removing all stored data
   */
  resetDatabase(): Promise<void>;
}
