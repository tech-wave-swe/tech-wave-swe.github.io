import * as vscode from "vscode";
import { Config } from "./config";
import { StateManager } from "./stateManager";

import * as commandModules from "./commands/index";
import commandConfig from "../package.json";

import { CustomInlineCompletionItemProvider } from "./providers/inlineCompletionProvider";
import { ChatViewProvider } from "./providers/chatViewProvider";
import { RequirementsTrackerViewProvider } from "./providers/trackerViewProvider";

export function activate(context: vscode.ExtensionContext) {
  const trackerViewProvider = new RequirementsTrackerViewProvider(
    context.extensionUri,
  );
  const chatViewProvider = new ChatViewProvider(context.extensionUri);

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
      trackerViewProvider,
    ),
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      ChatViewProvider.viewType,
      chatViewProvider,
    ),
  );

  StateManager.getInstance().setContext(context);

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
