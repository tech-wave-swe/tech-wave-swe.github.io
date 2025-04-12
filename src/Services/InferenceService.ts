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

  private async _getContextAndPrompt(question: string) {
    const chunks = await this._vectorDatabase.queryForChunks(question);
    const requirements =
      await this._vectorDatabase.queryForRequirements(question);

    const filesContext = chunks
      .map(
        (chunk) =>
          `FilePath: ${chunk.filePath}\nLine: ${chunk.lineNumber}\nContent:\n ${chunk.content}\n`,
      )
      .join("\n");

    const requirementsContext = requirements
      .map(
        (requirement) =>
          `Requirement: ${requirement.id}\nDescription:\n ${requirement.description}\n`,
      )
      .join("\n");

    const context = `${filesContext}\n\n${requirementsContext}`;

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

    return { context, prompt };
  }

  public async query(question: string): Promise<string> {
    try {
      const { prompt } = await this._getContextAndPrompt(question);
      const response = await this._languageModel.generate(prompt);
      return response;
    } catch (error) {
      console.error("Error in query:", error);
      return `I encountered an error while processing your question: ${error}`;
    }
  }

  public async queryStream(
    question: string,
    onToken: (token: string) => void,
  ): Promise<void> {
    try {
      const { context, prompt } = await this._getContextAndPrompt(question);
      await this._languageModel.generateStream(prompt, context, onToken);
    } catch (error) {
      console.error("Error in streaming query:", error);
      onToken(
        `I encountered an error while processing your question: ${error}`,
      );
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
