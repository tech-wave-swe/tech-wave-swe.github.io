import * as vscode from "vscode";

export interface ChatMessage {
  sender: string; // Will contain either "You" or the model name
  text: string;
  timestamp: string;
}

export class StateManager {
  private static instance: StateManager;
  private context: vscode.ExtensionContext | undefined;

  private constructor() {}

  public static getInstance(): StateManager {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager();
    }
    return StateManager.instance;
  }

  public setContext(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public async updateChatMessages(messages: ChatMessage[]) {
    if (!this.context) {
      throw new Error("Extension context not initialized");
    }
    await this.context.globalState.update("chatMessages", messages);
  }

  public getChatMessages(): ChatMessage[] {
    if (!this.context) {
      throw new Error("Extension context not initialized");
    }
    return this.context.globalState.get("chatMessages", []);
  }
}
