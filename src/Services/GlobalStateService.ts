import * as vscode from "vscode";
import { ChatMessage } from "../Models/ChatMessage";
import { Requirement } from "../Models/Requirement";

export enum StateKeys {
  CHAT_MESSAGES = "chatMessages",
  REQUIREMENTS = "requirements",
}

export class GlobalStateService {
  private _context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this._context = context;
  }

  public async updateState(
    stateKey: StateKeys,
    data: ChatMessage[] | Requirement[],
  ) {
    await this._context.globalState.update(stateKey, data);
  }

  public getState(stateKey: StateKeys): ChatMessage[] | Requirement[] {
    return this._context.globalState.get(stateKey, []);
  }

  public async clearState(
    stateKey: StateKeys,
    resetValue: ChatMessage[] | Requirement[] = [],
  ) {
    await this._context.globalState.update(stateKey, resetValue);
  }
}
