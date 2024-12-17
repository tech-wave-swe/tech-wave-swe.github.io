import * as vscode from "vscode";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Ollama } from "ollama";
import { cosineSimilarity } from "./utils";
import { Config } from "./config";

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
  public async retrieveDocuments(query: string, topN = 5): Promise<Document[]> {
    try {
      const config = Config.getInstance();

      const ollama = new Ollama({ host: config.endpoint });
      const models = await ollama.list();

      if (
        !models.models.some((model) => model.name === config.embeddingModel)
      ) {
        const userChoice = await vscode.window.showQuickPick(["Yes", "No"], {
          title:
            "Model " +
            config.embeddingModel +
            " not found, do you want to try pulling the model?",
        });
        if (userChoice === "Yes") {
          try {
            vscode.window.showInformationMessage(
              "Pulling model " + config.embeddingModel + " ...",
            );
            const res = await ollama.pull({ model: config.embeddingModel });
            if (res.status == "success") {
              vscode.window.showInformationMessage(
                "Model pulled successfully.",
              );
            }
          } catch (error) {
            vscode.window.showErrorMessage("Failed to pull model: " + error);
          }
        } else {
          return [];
        }
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
