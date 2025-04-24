import * as vscode from "vscode";
import * as fs from "fs";
import { DocumentFormatterService } from "../Services/DocumentFormatterService";
import { IVectorDatabase } from "../Interfaces/IVectorDatabase";
import FileSystemService from "../Services/FileSystemService";
import { File } from "../Models/File";
import { Chunk } from "../Models/Chunk";

export class DocumentServiceFacade {
  private _formatterService: DocumentFormatterService;
  private _vectorDatabase: IVectorDatabase;

  constructor(
    formatterService: DocumentFormatterService,
    vectorDatabase: IVectorDatabase,
  ) {
    this._formatterService = formatterService;
    this._vectorDatabase = vectorDatabase;
  }

  public async processFiles(filePaths: string[]): Promise<void> {
    const formattedDocs: Chunk[] = [];
    const skippedFiles: string[] = [];
    const existingFiles: string[] = [];

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

        // Read file content and calculate checksum
        const content = fs.readFileSync(filePath, "utf8");
        const checksum = FileSystemService.getChecksum(filePath);

        // Check if file already exists with the same checksum
        const exists = await this._vectorDatabase.fileExists(filePath, checksum);
        
        if (exists) {
          console.log(`Skipping ${filePath} - already indexed with same checksum`);
          existingFiles.push(filePath);
          continue;
        }

        const file = {
          originalContent: content,
          filePath: filePath,
          checksum: checksum,
        } as File;

        await this._vectorDatabase.addFiles([file]);

        // Only format and add chunks if the file is new or has been modified
        formattedDocs.push(
          ...this._formatterService.formatSourceCode(content, filePath),
        );
      } catch (error) {
        console.error(`Error reading or formatting file ${filePath}:`, error);
      }
    }

    // Show warning if files were skipped
    if (skippedFiles.length > 0) {
      console.warn(`Skipped ${skippedFiles.length} files due to size limits`);
    }
    if (existingFiles.length > 0) {
      console.log(`Skipped ${existingFiles.length} already indexed files`);
    }

    // Embed all formatted documents
    if (formattedDocs.length > 0) {
      await this._vectorDatabase.addChunks(formattedDocs);
      console.log(`Indexed ${formattedDocs.length} new files`);
    } else {
      console.log("No new files to index");
    }
  }

  public async processWorkspaceFiles(): Promise<void> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      throw new Error("No workspace folder is open");
    }

    const filePaths: string[] = [];
    const filePattern = "**/*.{c,h,cpp,hpp,rs}";

    console.log("Starting workspace file processing...");
    console.log(`Using file pattern: ${filePattern}`);

    for (const folder of workspaceFolders) {
      console.log(`Scanning workspace folder: ${folder.name}`);

      const files = await vscode.workspace.findFiles(
        new vscode.RelativePattern(folder, filePattern),
        "**/node_modules/**",
      );

      console.log(`Found ${files.length} files in ${folder.name}`);
      filePaths.push(...files.map((file) => file.fsPath));
    }

    if (filePaths.length === 0) {
      console.warn("No matching files found in workspace");
      return;
    }

    console.log(`Processing ${filePaths.length} files:`);
    filePaths.forEach((file) => console.log(` - ${file}`));

    await this.processFiles(filePaths);
  }
}
