import * as vscode from "vscode";
import { DocumentManager } from "../models";
import { ChatViewProvider } from "../providers/chatViewProvider";

export async function interrogateSelection() {
  const documentManager = DocumentManager.getInstance();
  if (documentManager.isEmpty()) {
    await vscode.commands.executeCommand(
      "requirementsTracker.trackerView.focus",
    );
    vscode.window.showErrorMessage(
      "Please load requirements file first in the Requirements Tracker view.",
    );
    return;
  }

  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No active editor found.");
    return;
  }

  const selection = editor.selection;
  const textToAnalyze = editor.document.getText(selection);
  if (!textToAnalyze) {
    vscode.window.showErrorMessage("No text selected.");
    return;
  }

  await vscode.commands.executeCommand("requirementsTracker.chatView.focus");

  const chatViewProvider = ChatViewProvider.getInstance();
  if (!chatViewProvider) {
    vscode.window.showErrorMessage("Chat view not available.");
    return;
  }

  await chatViewProvider.handleNewMessage(
    `Analyze the following code and provide insights based on the loaded requirements:\n\n${textToAnalyze}`,
  );
}
