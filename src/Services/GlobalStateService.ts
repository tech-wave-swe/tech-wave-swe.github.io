import * as vscode from "vscode";

export enum StateKeys {
  CHAT_MESSAGES = "chatMessages",
  REQUIREMENTS = "requirements",
}

export class GlobalStateService {
  private _context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this._context = context;
  }

  public async updateState(stateKey: StateKeys, data: any) {
    await this._context.globalState.update(stateKey, data);
  }

  public getState(stateKey: StateKeys) {
    return this._context.globalState.get(stateKey, []);
  }

  public async clearState(stateKey: StateKeys, resetValue: any = []) {
    await this._context.globalState.update(stateKey, resetValue);
  }
}
