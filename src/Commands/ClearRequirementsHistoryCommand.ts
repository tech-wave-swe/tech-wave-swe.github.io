import * as vscode from "vscode";
import { ICommand } from "../Interfaces/ICommand";
import { RequirementsService } from "../Services/RequirementsService";

export class ClearRequirementsHistoryCommand implements ICommand {
  private _requirementsService: RequirementsService;

  constructor(requirementsService: RequirementsService) {
    this._requirementsService = requirementsService;
  }

  public getName(): string {
    return "requirementsTracker.clearRequirementsHistory";
  }

  public async execute(): Promise<void> {
    await this._requirementsService.clearRequirements();
    vscode.window.showInformationMessage("Requirements history cleared");
  }
}
