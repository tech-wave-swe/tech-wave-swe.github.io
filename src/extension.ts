import * as vscode from "vscode";
import { Config } from "./config";

import * as commandModules from "./commands/index";
import commandConfig from "../package.json";

import { CustomInlineCompletionItemProvider } from "./providers/inlineCompletionProvider";
import { RequirementsTrackerViewProvider } from "./providers/webviewViewProvider";

export function activate(context: vscode.ExtensionContext) {
  const provider = new RequirementsTrackerViewProvider(context.extensionUri);

  try {
    const config = Config.getInstance();
    config.getAllSettings();
  } catch (error) {
    if (error instanceof Error) {
      vscode.window.showErrorMessage(`Configuration Error: ${error.message}`);
    } else {
      vscode.window.showErrorMessage(
        "An unknown error occurred while loading settings.",
      );
    }
  }

  context.subscriptions.push(
    vscode.languages.registerInlineCompletionItemProvider(
      { scheme: "file", language: "*" },
      new CustomInlineCompletionItemProvider(),
    ),
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      RequirementsTrackerViewProvider.viewType,
      provider,
    ),
  );

  const commands = commandConfig.contributes.commands || [];
  const modules = Object(commandModules);

  commands.forEach((cmd) => {
    const commandId = cmd.command;
    const fileName = `${commandId.split(".").pop()}`;
    try {
      const commandFn = modules[fileName];
      context.subscriptions.push(
        vscode.commands.registerCommand(commandId, commandFn),
      );
    } catch {
      console.log("module command not found");
    }
  });
}
