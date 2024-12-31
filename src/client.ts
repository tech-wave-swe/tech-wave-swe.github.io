import vscode from "vscode";
import { Ollama } from "@langchain/ollama";
import { Ollama as OllamaClient } from "ollama";
import { DocumentManager } from "./models";
import { PromptTemplate } from "@langchain/core/prompts";
import { Config } from "./config";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/*
 * Checks if the given model exists in Ollama. If the model does not exist, the user is prompted to pull the model.
 * @param model The model to check.
 * @returns Promise<boolean> True if the model exists, false otherwise.
 */
export async function checkOllamaModel(model: string): Promise<boolean> {
  const config = Config.getInstance();

  const ollama = new OllamaClient({ host: config.endpoint });
  const models = await ollama.list();

  if (!models.models.some((mod) => mod.name === model)) {
    const userChoice = await vscode.window.showQuickPick(["Yes", "No"], {
      title:
        "Model " + model + " not found, do you want to try pulling the model?",
    });
    if (userChoice === "Yes") {
      try {
        vscode.window.showInformationMessage("Pulling model " + model + " ...");
        const res = await ollama.pull({ model: model });
        if (res.status == "success") {
          vscode.window.showInformationMessage("Model pulled successfully.");
          return true;
        }
      } catch (error) {
        vscode.window.showErrorMessage("Failed to pull model: " + error);
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}

export interface CodeCompletion {
  code_text: string;
}

export type CodeCompletionList = CodeCompletion[];

/*
 * Interrogates Ollama with a given prompt.
 * @param codeContext The code to send to Ollama for code completion.
 * @returns Promise<CodeCompletionList> The response from Ollama.
 */
export async function autocompleteOllama(
  codeContext: string,
): Promise<CodeCompletionList> {
  const config = Config.getInstance();

  if (!(await checkOllamaModel(config.model))) {
    return [];
  }

  const CodeCompletionListSchema = z.array(
    z.object({
      code_text: z.string(),
    }),
  );

  const messageContent = `You are a LLM model tasked with replying with the most accurate inline code completion using the given context.
    Return all your answers inside a json list with each object having only one propriety called code_text,
    with each response being only the additional code to add at the <CURSOR> position in raw text no markdown-style wrapping

    <context>${codeContext}</context>
    `;

  const ollama = new OllamaClient({ host: config.endpoint });
  const structuredResponse = await ollama.chat({
    model: config.model,
    messages: [{ role: "user", content: messageContent }],
    format: zodToJsonSchema(CodeCompletionListSchema),
    options: { temperature: config.temperature },
  });

  const response = CodeCompletionListSchema.parse(
    JSON.parse(structuredResponse.message.content),
  );
  vscode.window.showInformationMessage(structuredResponse.message.content);
  return response;
}

/*
 * Interrogates Ollama with a given prompt.
 * @param prompt The prompt to send to Ollama.
 * @returns The response from Ollama. If an error occurs, the following message is returned: "Failed to interrogate Ollama."
 */
export async function interrogateOllama(
  prompt: string,
  onToken: (token: string) => void,
): Promise<void> {
  const config = Config.getInstance();

  if (!(await checkOllamaModel(config.model))) {
    onToken("Failed to interrogate Ollama.");
    return;
  }

  const ollamaModel = new Ollama({
    baseUrl: config.endpoint,
    model: config.model,
  });

  const documentManager = DocumentManager.getInstance();
  try {
    const retrievedDocs = await documentManager.retrieveDocuments(prompt);
    console.log(`Retrieved ${retrievedDocs.length} documents.`);

    const combinedDocs = retrievedDocs
      .map((doc) => doc.pageContent)
      .join("\n\n");
    console.log("Combined Documents for Context:", combinedDocs);

    const questionTemplate = PromptTemplate.fromTemplate(`
    You are a LLM model tasked with analyzing the given context which can be in form of documentation, requirements to follow or code.
    Answer the following question using the given context.

    <context>
    {context}
    </context>

    Question: {userQuestion}`);

    const streamingChain = RunnableSequence.from([
      questionTemplate,
      ollamaModel,
      new StringOutputParser(),
    ]);

    const stream = await streamingChain.stream({
      context: combinedDocs,
      userQuestion: prompt,
    });

    for await (const chunk of stream) {
      onToken(chunk);
    }
  } catch (error) {
    console.error("Error generating LLM response:", error);
    onToken(`Error generating LLM response: ${error}`);
  }
}
