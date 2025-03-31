import * as vscode from "vscode";
import { ICommand } from "../Interfaces/ICommand";
import { DocumentServiceFacade } from "../Facades/DocumentServiceFacade";
import path from "path";

export class IndexCurrentFileCommand implements ICommand {
  private _documentService: DocumentServiceFacade;

  constructor(documentService: DocumentServiceFacade) {
    this._documentService = documentService;
  }

  public getName(): string {
    return "requirementsTracker.indexCurrentFile";
  }

  public async execute(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("No active editor to index");
      return;
    }

    try {
      const document = editor.document;
      await this._documentService.processDocument(
        document.getText(),
        document.fileName,
      );
      vscode.window.showInformationMessage(
        `Successfully indexed ${path.basename(document.fileName)}`,
      );
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to index file: ${error}`);
    }
  }
}
