import * as vscode from "vscode";
import { ChatMessage } from "../Models/ChatMessage";
import { Requirement } from "../Models/Requirement";

export enum StateKeys {
  CHAT_MESSAGES = "chatMessages",
  REQUIREMENTS = "requirements",
}

export class GlobalStateService {
  private _globalState: vscode.ExtensionContext["globalState"];

  constructor(globalState: vscode.ExtensionContext["globalState"]) {
    this._globalState = globalState;
  }

  public async updateState(
    stateKey: StateKeys,
    data: ChatMessage[] | Requirement[],
  ) {
    await this._globalState.update(stateKey, data);
  }

  public getState(stateKey: StateKeys): ChatMessage[] | Requirement[] {
    return this._globalState.get(stateKey, []);
  }

  public async clearState(
    stateKey: StateKeys,
    resetValue: ChatMessage[] | Requirement[] = [],
  ) {
    await this._globalState.update(stateKey, resetValue);
  }
}
