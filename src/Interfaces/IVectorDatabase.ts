import { QueryResult } from "../Models/QueryResult";
import { Document } from "@langchain/core/documents";

export interface IVectorDatabase {
  DOCUMENTS_COLLECTION: any;
  REQUIREMENTS_COLLECTION: any;
  /**
   * Add a single document to the vector database
   */
  add(data: string, metadata: any, collectionName: string): Promise<void>;

  /**
   * Add multiple documents to the vector database
   */
  addDocuments(documents: Document[], collectionName: string): Promise<void>;

  /**
   * Query the vector database for similar documents
   */
  query(
    question: string,
    collectionName: string,
    maxResults?: number,
  ): Promise<QueryResult[]>;

  /**
   * Reset the database, removing all stored data
   */
  resetDatabase(): Promise<void>;

  /**
   * Refresh the embeddings model or connection
   */
  refreshEmbeddings(): Promise<void>;
}
