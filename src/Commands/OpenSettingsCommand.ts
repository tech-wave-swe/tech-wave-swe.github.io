import * as vscode from "vscode";
import { ICommand } from "../Interfaces/ICommand";

export class OpenSettingsCommand implements ICommand {
  public getName(): string {
    return "requirementsTracker.openSettings";
  }

  public async execute(): Promise<void> {
    vscode.commands.executeCommand(
      "workbench.action.openSettings",

      "@ext:tech-wave-swe.requirements-tracker",
    );
  }
}
