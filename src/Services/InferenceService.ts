import * as vscode from "vscode";
import { ILanguageModel } from "../Interfaces/ILanguageModel";
import { IVectorDatabase } from "../Interfaces/IVectorDatabase";
import { PromptTemplate } from "@langchain/core/prompts";

export class InferenceService {
  private _languageModel: ILanguageModel;
  private _vectorDatabase: IVectorDatabase;

  constructor(languageModel: ILanguageModel, vectorDatabase: IVectorDatabase) {
    this._languageModel = languageModel;
    this._vectorDatabase = vectorDatabase;
  }

  public async query(question: string): Promise<string> {
    try {
      const files = await this._vectorDatabase.queryForFiles(question);

      const context = files
        .map(
          (file) =>
            `FilePath: ${file.filePath}\nContent:\n ${file.originalContent}\n`,
        )
        .join("\n");

      // Create a prompt template that includes the context
      const promptTemplate = PromptTemplate.fromTemplate(`
You are an assistant that helps with requirements engineering and documentation.
Use the following context to answer the question. If you don't know the answer based on the context, say so.

Context:
{context}

Question: {question}

Answer:`);

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
