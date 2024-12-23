import * as vscode from "vscode";

export async function interrogateOnCode() {
  vscode.commands.executeCommand('editor.action.inlineSuggest.trigger');
}