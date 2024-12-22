import * as vscode from "vscode";
import { interrogateOllama } from "../client";

export async function interrogateOnRequirements() {
  const prompt = await vscode.window.showInputBox({
    prompt: "Enter the message to send to Ollama",
  });
  if (prompt) {
    vscode.window.showInformationMessage("Interrogating Ollama...");
    const response = await interrogateOllama(prompt);
    if (response !== "Error generating LLM response.") {
      vscode.window.showInformationMessage(response);
      return;
    }
    vscode.window.showInformationMessage("Failed to interrogate Ollama.");
  }
}