import { OllamaEmbeddings } from "@langchain/ollama";
import { cosineSimilarity } from "./utils";
import { Config } from "./config";
import { checkOllamaModel } from "./client";

export interface Document {
  id: string;
  pageContent: string;
  embedding?: number[];
}

export class DocumentManager {
  private static instance: DocumentManager;
  private documents: Document[] = [];

  public static getInstance() {
    if (!this.instance) {
      this.instance = new DocumentManager();
    }
    return this.instance;
  }
  public isEmpty(): boolean {
    return this.documents.length === 0;
  }

  public getEmbeddingNumber(): number {
    return this.documents.length;
  }

  /**
   * Adds a new document from a plain text string.
   * @param id Unique identifier for the document.
   * @param text The content of the document.
   */
  public async addDocumentFromText(id: string, text: string): Promise<void> {
    try {
      const embedding = await this.generateEmbedding(text);
      const newDoc: Document = { id, pageContent: text, embedding };
      this.documents.push(newDoc);
      console.log(`Document '${id}' added successfully.`);
    } catch (error) {
      console.error(`Error adding document '${id}':`, error);
      throw new Error(`Failed to add document '${id}'.`);
    }
  }

  /**
   * Retrieves the top N similar documents based on cosine similarity to the query.
   * @param query Standalone query string.
   * @param topN Number of top documents to retrieve.
   * @returns Array of top N Document objects.
   */
  public async retrieveDocuments(query: string, topN = 3): Promise<Document[]> {
    try {
      const config = Config.getInstance();

      if (!(await checkOllamaModel(config.embeddingModel))) {
        throw new Error("Model not found.");
      }

      const ollamaEmbeddings = new OllamaEmbeddings({
        baseUrl: config.endpoint,
        model: config.embeddingModel,
      });
      const queryEmbedding = await ollamaEmbeddings.embedQuery(query);

      const scoredDocs = this.documents.map((doc) => {
        const similarity = doc.embedding
          ? cosineSimilarity(queryEmbedding, doc.embedding)
          : 0;
        return { ...doc, similarity };
      });

      return scoredDocs
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topN);
    } catch (error) {
      console.error("Error retrieving documents:", error);
      return [];
    }
  }

  /**
   * Generates an embedding for the given text.
   * @param text The text to embed.
   * @returns The embedding vector.
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const config = Config.getInstance();

      if (!(await checkOllamaModel(config.embeddingModel))) {
        throw new Error("Model not found.");
      }

      const ollamaEmbeddings = new OllamaEmbeddings({
        baseUrl: config.endpoint,
        model: config.embeddingModel,
      });
      const embedding = await ollamaEmbeddings.embedQuery(text);
      return embedding;
    } catch (error) {
      console.error("Error generating embedding:", error);
      throw new Error("Failed to generate embedding.");
    }
  }
}
