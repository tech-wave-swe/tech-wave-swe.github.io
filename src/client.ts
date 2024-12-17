import vscode from "vscode";
import { Ollama } from "@langchain/ollama";
import { Ollama as OllamaClient } from "ollama";
import { DocumentManager } from "./models";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Config } from "./config";

/*
 * Interrogates Ollama with a given prompt.
 * @param prompt The prompt to send to Ollama.
 * @returns The response from Ollama. If an error occurs, the following message is returned: "Failed to interrogate Ollama."
 */
export async function interrogateOllama(prompt: string): Promise<string> {
  const config = Config.getInstance();

  const ollama = new OllamaClient({ host: config.endpoint });
  const models = await ollama.list();
  if (!models.models.some((model) => model.name === config.model)) {
    const userChoice = await vscode.window.showQuickPick(["Yes", "No"], {
      title:
        "Model " +
        config.model +
        " not found, do you want to try pulling the model?",
    });
    if (userChoice === "Yes") {
      try {
        vscode.window.showInformationMessage(
          "Pulling model " + config.model + " ...",
        );
        const res = await ollama.pull({ model: config.model });
        if (res.status == "success") {
          vscode.window.showInformationMessage("Model pulled successfully.");
        }
      } catch (error) {
        vscode.window.showErrorMessage("Failed to pull model: " + error);
      }
    } else {
      return "Stopped interrogating Ollama.";
    }
  }

  const ollamaModel = new Ollama({
    baseUrl: config.endpoint,
    model: config.model,
  });

  const simpleQuestionPrompt = PromptTemplate.fromTemplate(`
    For the following user question, convert it into a standalone question:
    {userQuestion}`);

  const simpleQuestionChain = simpleQuestionPrompt
    .pipe(ollamaModel)
    .pipe(new StringOutputParser());

  let standaloneQuestion: string;
  try {
    standaloneQuestion = await simpleQuestionChain.invoke({
      userQuestion: prompt,
    });
    console.log("Standalone Question:", standaloneQuestion);
  } catch (error) {
    console.error("Error generating standalone question:", error);
    return "Error generating standalone question.";
  }

  const documentManager = DocumentManager.getInstance();

  let topN = documentManager.getEmbeddingNumber() / 4;
  topN = topN > 10 ? 10 : topN;

  const retrievedDocs = await documentManager.retrieveDocuments(
    standaloneQuestion,
    topN,
  );
  console.log(`Retrieved ${retrievedDocs.length} documents.`);

  const combinedDocs = retrievedDocs.map((doc) => doc.pageContent).join("\n\n");
  console.log("Combined Documents for Context:", combinedDocs);

  const questionTemplate = PromptTemplate.fromTemplate(`
    You are a LLM model tasked with analyzing the given context which can be in form of documentation, requirements to follow or code.
    Answer the following question using the given context.

    <context>
    {context}
    </context>

    Question: {userQuestion}`);

  const answerChain = questionTemplate.pipe(ollamaModel);

  let llmResponse: string;
  try {
    llmResponse = await answerChain.invoke({
      context: combinedDocs,
      userQuestion: prompt,
    });
    return llmResponse;
  } catch (error) {
    console.error("Error generating LLM response:", error);
    return "Error generating LLM response.";
  }
}
