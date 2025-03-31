import * as vscode from "vscode";
import { ICommand } from "../Interfaces/ICommand";
import {ChatService} from "../Services/ChatService";

export class ClearChatHistoryCommand implements ICommand {
  private _chatService: ChatService;

  constructor(chatService: ChatService) {
    this._chatService = chatService;
  }

  public getName(): string {
    return "requirementsTracker.clearChatHistory";
  }

  public async execute(): Promise<void> {
    await this._chatService.clearMessages();
    vscode.window.showInformationMessage("Chat history cleared");
  }
}
