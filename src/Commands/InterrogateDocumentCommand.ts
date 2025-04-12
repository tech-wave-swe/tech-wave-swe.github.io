import * as vscode from "vscode";
import { ICommand } from "../Interfaces/ICommand";
import { ChatWebviewProvider } from "../Providers/ChatWebviewProvider";
import { RequirementsService } from "../Services/RequirementsService";

export class InterrogateDocumentCommand implements ICommand {
  private _chatWebviewProvider: ChatWebviewProvider;
  private _requirementsService: RequirementsService;

  constructor(
    chatWebviewProvider: ChatWebviewProvider,
    requirementsService: RequirementsService,
  ) {
    this._chatWebviewProvider = chatWebviewProvider;
    this._requirementsService = requirementsService;
  }

  public getName(): string {
    return "requirementsTracker.interrogateDocument";
  }

  public async execute(): Promise<void> {
    // Check if requirements are loaded
    const requirements = this._requirementsService.getRequirements();
    if (requirements.length === 0) {
      await vscode.commands.executeCommand(
        "requirementsTracker.trackerView.focus",
      );
      vscode.window.showErrorMessage(
        "Please load requirements file first in the Requirements Tracker view.",
      );
      return;
    }

    // Get active editor and selection
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("No active editor found.");
      return;
    }

    const textToAnalyze = editor.document.getText();
    if (!textToAnalyze) {
      vscode.window.showErrorMessage("No text found.");
      return;
    }

    // Focus chat view
    await vscode.commands.executeCommand("requirementsTracker.chatView.focus");

    // Create analysis prompt
    const message = {
      type: "sendMessage",
      text: `Analyze the following code and provide insights based on the loaded requirements:\n\n${textToAnalyze} \n\nRequirements:\n${JSON.stringify(requirements)}`,
    };

    // Use reflection to access private method
    const handleMessageMethod =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this._chatWebviewProvider as any)._handleMessageFromWebview.bind(
        this._chatWebviewProvider,
      );
    await handleMessageMethod(message);
  }
}
