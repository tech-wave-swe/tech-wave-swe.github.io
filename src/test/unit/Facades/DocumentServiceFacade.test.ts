import { describe, expect, it, jest, beforeAll, beforeEach } from "@jest/globals";
import { DocumentServiceFacade } from "../../../Facades/DocumentServiceFacade";
import { DocumentFormatterService } from "../../../Services/DocumentFormatterService";
import { IVectorDatabase } from "../../../Interfaces/IVectorDatabase";
import * as fs from "fs";
import * as vscode from "vscode";
import FileSystemService from "../../../Services/FileSystemService";
import { File } from "../../../Models/File";
import { Chunk } from "../../../Models/Chunk";

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => { });
  jest.spyOn(console, "warn").mockImplementation(() => { });
  jest.spyOn(console, "error").mockImplementation(() => { });
});

jest.mock("fs");
jest.mock("vscode", () => ({
  workspace: {
    workspaceFolders: undefined,
    findFiles: jest.fn(),
  },
  RelativePattern: jest.fn().mockImplementation((folder, pattern) => ({ folder, pattern })),
  window: {
    showInformationMessage: jest.fn(),
    showErrorMessage: jest.fn(),
  },
}));

const dummyChunk: Chunk = {
  content: "dummy chunk",
  filePath: "dummy.ts",
  fileType: "typescript",
  lineNumber: 1,
};

const mockDocumentFormatterService = {
  formatSourceCode: jest.fn((code: string, filePath: string): Chunk[] => [dummyChunk]),
  formatByLanguage: jest.fn(),
  splitIntoChunks: jest.fn(),
  extractCodeBlocks: jest.fn(),
  _getLanguageFromPath: jest.fn().mockReturnValue("typescript"),
} as unknown as jest.Mocked<DocumentFormatterService>;

const mockIVectorDatabase = {
  fileExists: jest.fn<(filePath: string, checksum?: string) => Promise<boolean>>(),
  addFiles: jest.fn((files: File[]): Promise<void> => Promise.resolve()),
  addChunks: jest.fn((chunks: Chunk[]): Promise<void> => Promise.resolve()),
  addRequirements: jest.fn((docs: any[]) => Promise.resolve()),
  queryForFiles: jest.fn(),
  queryForRequirements: jest.fn(),
  queryForChunks: jest.fn(),
  refreshEmbeddings: jest.fn(),
} as unknown as jest.Mocked<IVectorDatabase>;

let facade: DocumentServiceFacade;

describe("DocumentServiceFacade", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    facade = new DocumentServiceFacade(
      mockDocumentFormatterService,
      mockIVectorDatabase
    );
  });

  describe("processFiles", () => {
    it("should skip already indexed files", async () => {
      // We need to mock the file stats and content for the checksum to be calculated
      (fs.statSync as jest.Mock).mockReturnValue({ size: 1000 });
      (fs.readFileSync as jest.Mock).mockReturnValue("const a = 1;");
      jest.spyOn(FileSystemService, "getChecksum").mockReturnValue("existingChecksum");
      
      // Now mock fileExists to return true to simulate an existing file
      mockIVectorDatabase.fileExists.mockResolvedValue(true);

      await facade.processFiles(["file1.ts"]);

      expect(mockIVectorDatabase.fileExists).toHaveBeenCalledWith("file1.ts", "existingChecksum");
      expect(fs.statSync).toHaveBeenCalled();
      expect(fs.readFileSync).toHaveBeenCalled();
      expect(mockDocumentFormatterService.formatSourceCode).not.toHaveBeenCalled();
    });

    it("should process a valid file", async () => {
      mockIVectorDatabase.fileExists.mockResolvedValue(false);
      (fs.statSync as jest.Mock).mockReturnValue({ size: 1000 });
      (fs.readFileSync as jest.Mock).mockReturnValue("const a = 1;");
      jest.spyOn(FileSystemService, "getChecksum").mockReturnValue("dummyChecksum");

      await facade.processFiles(["file2.ts"]);

      expect(mockIVectorDatabase.fileExists).toHaveBeenCalledWith("file2.ts", "dummyChecksum");
      expect(fs.statSync).toHaveBeenCalledWith("file2.ts");
      expect(fs.readFileSync).toHaveBeenCalledWith("file2.ts", "utf8");
      expect(FileSystemService.getChecksum).toHaveBeenCalledWith("file2.ts");
      expect(mockIVectorDatabase.addFiles).toHaveBeenCalledWith([
        {
          originalContent: "const a = 1;",
          filePath: "file2.ts",
          checksum: "dummyChecksum",
        },
      ]);
      expect(mockDocumentFormatterService.formatSourceCode).toHaveBeenCalledWith("const a = 1;", "file2.ts");
      expect(mockIVectorDatabase.addChunks).toHaveBeenCalledWith([dummyChunk]);
    });

    it("should skip files larger than 20MB", async () => {
      mockIVectorDatabase.fileExists.mockResolvedValue(false);
      // (es. 21MB)
      (fs.statSync as jest.Mock).mockReturnValue({ size: 21 * 1024 * 1024 });

      await facade.processFiles(["largeFile.ts"]);

      expect(fs.statSync).toHaveBeenCalledWith("largeFile.ts");
      expect(mockDocumentFormatterService.formatSourceCode).not.toHaveBeenCalled();
      expect(mockIVectorDatabase.addChunks).not.toHaveBeenCalled();
    });

    it("should catch errors during file processing", async () => {
      mockIVectorDatabase.fileExists.mockResolvedValue(false);
      (fs.statSync as jest.Mock).mockImplementation(() => {
        throw new Error("Stat error");
      });

      await facade.processFiles(["errorFile.ts"]);

      expect(mockIVectorDatabase.addChunks).not.toHaveBeenCalled();
    });
  });

  describe("processWorkspaceFiles", () => {
    it("should throw if no workspace folder is open", async () => {
      (vscode as any).workspace.workspaceFolders = undefined;
      await expect(facade.processWorkspaceFiles()).rejects.toThrow("No workspace folder is open");
    });

    it("should warn and return if no matching files are found", async () => {
      (vscode as any).workspace.workspaceFolders = [{ uri: { fsPath: "workspacePath" }, name: "workspaceFolder" }];
      (vscode as any).workspace.findFiles.mockResolvedValue([]);

      await facade.processWorkspaceFiles();

    });

    it("should process workspace files successfully", async () => {
      (vscode as any).workspace.workspaceFolders = [{ uri: { fsPath: "workspacePath" }, name: "workspaceFolder" }];
      const mockFiles = [
        { fsPath: "workspacePath/file1.ts" },
        { fsPath: "workspacePath/file2.ts" },
      ];
      (vscode as any).workspace.findFiles.mockResolvedValue(mockFiles);

      const processFilesSpy = jest.spyOn(facade, "processFiles").mockResolvedValue(undefined);

      await facade.processWorkspaceFiles();

      expect(processFilesSpy).toHaveBeenCalledWith(["workspacePath/file1.ts", "workspacePath/file2.ts"]);
      processFilesSpy.mockRestore();
    });
  });
});
