import * as vscode from "vscode";
import { ICommand } from "../Interfaces/ICommand";
import { DocumentServiceFacade } from "../Facades/DocumentServiceFacade";

export class IndexWorkspaceCommand implements ICommand {
  private _documentService: DocumentServiceFacade;

  constructor(documentService: DocumentServiceFacade) {
    this._documentService = documentService;
  }

  public getName(): string {
    return "requirementsTracker.indexWorkspace";
  }

  public async execute(): Promise<void> {
    try {
      vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Indexing workspace files",
          cancellable: true,
        },
        async () => {
          try {
            await this._documentService.processWorkspaceFiles();
            vscode.window.showInformationMessage(
              "Successfully indexed workspace files",
            );
          } catch (error) {
            vscode.window.showErrorMessage(
              `Failed to index workspace: ${error}`,
            );
          }
        },
      );
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to start indexing: ${error}`);
    }
  }
}
