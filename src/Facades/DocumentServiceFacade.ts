import * as vscode from "vscode";
import * as fs from "fs";
import { DocumentFormatterService } from "../Services/DocumentFormatterService";
import { DocumentEmbeddingService } from "../Services/DocumentEmbeddingService";
import { FormattedDocument } from "../Models/FormattedDocument";

export class DocumentServiceFacade {
  private _formatterService: DocumentFormatterService;
  private _embeddingService: DocumentEmbeddingService;

  constructor(
    formatterService: DocumentFormatterService,
    embeddingService: DocumentEmbeddingService,
  ) {
    this._formatterService = formatterService;
    this._embeddingService = embeddingService;
  }

  public async processDocument(
    content: string,
    filePath: string,
  ): Promise<void> {
    try {
      // Format the document
      const formattedDoc = this._formatterService.formatSourceCode(
        content,
        filePath,
      );

      // Embed the document
      await this._embeddingService.embedDocument(formattedDoc);
    } catch (error) {
      console.error(`Error processing document ${filePath}:`, error);
      throw error;
    }
  }

  public async processFiles(filePaths: string[]): Promise<void> {
    const formattedDocs: FormattedDocument[] = [];
    const skippedFiles: string[] = [];

    // Format all documents first
    for (const filePath of filePaths) {
      try {
        // Check file size before reading
        const stats = fs.statSync(filePath);
        const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB limit

        if (stats.size > MAX_FILE_SIZE) {
          console.warn(
            `Skipping file ${filePath} - too large (${(stats.size / 1024 / 1024).toFixed(2)}MB)`,
          );
          skippedFiles.push(filePath);
          continue;
        }

        const content = fs.readFileSync(filePath, "utf8");
        const formattedDoc = this._formatterService.formatSourceCode(
          content,
          filePath,
        );
        formattedDocs.push(formattedDoc);
      } catch (error) {
        console.error(`Error reading or formatting file ${filePath}:`, error);
        // Continue with other files
      }
    }

    // Show warning if files were skipped
    if (skippedFiles.length > 0) {
      console.warn(`Skipped ${skippedFiles.length} files due to size limits`);
    }

    // Embed all formatted documents
    await this._embeddingService.embedMultipleDocuments(formattedDocs);
  }

  public async processWorkspaceFiles(
    filePattern = "**/*.{js,ts,py,java,cs,cpp,c}",
  ): Promise<void> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      throw new Error("No workspace folder is open");
    }

    const filePaths: string[] = [];

    for (const folder of workspaceFolders) {
      const files = await vscode.workspace.findFiles(
        new vscode.RelativePattern(folder, filePattern),
        "**/node_modules/**",
      );

      filePaths.push(...files.map((file) => file.fsPath));
    }

    if (filePaths.length === 0) {
      throw new Error("No matching files found in workspace");
    }

    await this.processFiles(filePaths);
  }

  public async reindexDocuments(): Promise<void> {
    // Re-process all workspace files
    await this.processWorkspaceFiles();
  }
}
