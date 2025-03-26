import * as vscode from "vscode";
import { ICommand } from "../Interfaces/ICommand";
import { IVectorDatabase } from "../Interfaces/IVectorDatabase";

export class ResetDatabaseCommand implements ICommand {
  private _vectorDatabase: IVectorDatabase;

  constructor(vectorDatabase: IVectorDatabase) {
    this._vectorDatabase = vectorDatabase;
  }

  public getName(): string {
    return "reqTracker.resetDatabase";
  }

  public async execute(): Promise<void> {
    const answer = await vscode.window.showWarningMessage(
      "This will delete all indexed data. Are you sure?",
      { modal: true },
      "Yes",
      "No",
    );

    if (answer === "Yes") {
      try {
        await this._vectorDatabase.resetDatabase();
        vscode.window.showInformationMessage(
          "Database has been reset successfully",
        );
      } catch (error) {
        vscode.window.showErrorMessage(`Failed to reset database: ${error}`);
      }
    }
  }
}
