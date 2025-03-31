import * as vscode from "vscode";
import { ILanguageModel } from "../Interfaces/ILanguageModel";
import { IVectorDatabase } from "../Interfaces/IVectorDatabase";
import {PromptTemplate} from "@langchain/core/prompts";

export class InferenceService {
  private _languageModel: ILanguageModel;
  private _vectorDatabase: IVectorDatabase;

  constructor(
    languageModel: ILanguageModel,
    vectorDatabase: IVectorDatabase,
  ) {
    this._languageModel = languageModel;
    this._vectorDatabase = vectorDatabase;
  }

  public async generateEmbeddings(
    content: string,
    metadata: never,
    dataType: string,
  ): Promise<void> {
    try {
      const collectionName =
        dataType === "requirements"
          ? this._vectorDatabase.REQUIREMENTS_COLLECTION
          : this._vectorDatabase.DOCUMENTS_COLLECTION;

      await this._vectorDatabase.add(content, metadata, collectionName);
    } catch (error) {
      console.error(`Error generating embeddings:`, error);
      throw error;
    }
  }

  public async query(question: string, dataType?: string): Promise<string> {
    try {
      // Determine which collection to query
      const collectionName = dataType || "documents";

      // Retrieve relevant context from the vector database
      const relevantDocs = await this._vectorDatabase.query(
        question,
        collectionName,
      );

      if (relevantDocs.length === 0) {
        return "I couldn't find any relevant information to answer your question.";
      }

      // Create a context string from the retrieved documents
      const context = relevantDocs
        .map((doc) => {
          const source = doc.metadata.filePath
            ? `Source: ${doc.metadata.filePath}`
            : "";
          return `${doc.text}\n${source}`;
        })
        .join("\n\n");

      // Create a prompt template that includes the context
      const promptTemplate = PromptTemplate.fromTemplate(`
You are an assistant that helps with requirements engineering and documentation.
Use the following context to answer the question. If you don't know the answer based on the context, say so.

Context:
{context}

Question: {question}

Answer:
      `);

      // Generate the full prompt
      const prompt = await promptTemplate.format({
        context,
        question,
      });

      // Get the response from Ollama
      const response = await this._languageModel.generate(prompt);
      return response;
    } catch (error) {
      console.error("Error in query:", error);
      return `I encountered an error while processing your question: ${error}`;
    }
  }

  public async checkSystemRequirements(): Promise<void> {
    try {
      // Test Ollama connection
      await this._languageModel.generate("test");
      vscode.window.showInformationMessage(
        "Successfully connected to Ollama service",
      );
    } catch (error) {
      vscode.window.showErrorMessage(
        `Failed to connect to Ollama service: ${error}`,
      );
      throw error;
    }
  }
}
