import * as vscode from "vscode";
import { ICommand } from "../Interfaces/ICommand";

export class OpenSidebarCommand implements ICommand {
  public getName(): string {
    return "requirementsTracker.openSidebar";
  }

  public async execute(): Promise<void> {
    vscode.commands.executeCommand(
      "workbench.view.extension.requirementsTracker",
    );
  }
}
