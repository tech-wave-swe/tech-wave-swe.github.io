import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { DocumentEmbeddingService } from "../../../Services/DocumentEmbeddingService";
import { IVectorDatabase } from "../../../Interfaces/IVectorDatabase";
import { FormattedDocument } from "../../../Models/FormattedDocument";
import vscode from "../Mock/vscode";

describe("DocumentEmbeddingService", () => {
  let vectorDatabase: jest.Mocked<IVectorDatabase>;
  let documentEmbeddingService: DocumentEmbeddingService;
  const formattedDocument: FormattedDocument = {
    chunks: [
      '#include <stdio.h>\n\nint main() {\n    printf("Hello World");\n    return 0;\n}',
    ],
    language: "c",
    metadata: {
      filePath: "test.c",
      fileName: "test.c",
      fileType: "c",
      createdAt: 1743089399054,
      chunkSize: 500,
      totalChunks: 1,
      chunkOverlap: 200,
    },
    originalContent:
      '#include <stdio.h>\n\nint main() {\n    printf("Hello World");\n    return 0;\n}',
  };
  beforeEach(() => {
    jest.clearAllMocks();

    // Create mock vectorDatabase
    vectorDatabase = {
      add: jest.fn(),
      addDocuments: jest.fn(),
      query: jest.fn(),
      resetDatabase: jest.fn(),
      refreshEmbeddings: jest.fn(),
      DOCUMENTS_COLLECTION: "documents",
      REQUIREMENTS_COLLECTION: "requirements",
    } as unknown as jest.Mocked<IVectorDatabase>;

    // Create DocumentEmbeddingService instance with mocked vectorDatabase
    documentEmbeddingService = new DocumentEmbeddingService(vectorDatabase);
  });

  describe("embedDocument", () => {
    it("should successfully embed a valid document", async () => {
      vectorDatabase.addDocuments.mockResolvedValue();

      await documentEmbeddingService.embedDocument(formattedDocument);

      expect(vectorDatabase.addDocuments).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            pageContent: formattedDocument.chunks[0],
            metadata: expect.objectContaining({
              ...formattedDocument.metadata,
              chunkIndex: 0,
              isChunk: true,
              language: "c",
            }),
          }),
          expect.objectContaining({
            pageContent: formattedDocument.originalContent,
            metadata: expect.objectContaining({
              ...formattedDocument.metadata,
              isOriginal: true,
              language: "c",
            }),
          }),
        ]),
        "documents",
      );
    });

    it("should skip chunks that are too small", async () => {
      const docWithSmallChunk: FormattedDocument = {
        ...formattedDocument,
        chunks: ["tiny", formattedDocument.chunks[0]],
      };

      await documentEmbeddingService.embedDocument(docWithSmallChunk);

      expect(vectorDatabase.addDocuments).toHaveBeenCalledWith(
        expect.not.arrayContaining([
          expect.objectContaining({
            pageContent: "tiny",
          }),
        ]),
        "documents",
      );
    });

    it("should skip chunks that are too large", async () => {
      const largeChunk = "a".repeat(9000);
      const docWithLargeChunk: FormattedDocument = {
        ...formattedDocument,
        chunks: [largeChunk, formattedDocument.chunks[0]],
      };

      await documentEmbeddingService.embedDocument(docWithLargeChunk);

      expect(vectorDatabase.addDocuments).toHaveBeenCalledWith(
        expect.not.arrayContaining([
          expect.objectContaining({
            pageContent: largeChunk,
          }),
        ]),
        "documents",
      );
    });

    it("should handle chunks with undefined filePath gracefully", async () => {
      const documentWithoutFilePath: FormattedDocument = {
        ...formattedDocument,
        metadata: {
          ...formattedDocument.metadata,
          filePath: undefined, // Remove filePath
        },
        chunks: ["a".repeat(9000)], // Large chunk to trigger warning
      };

      const consoleSpy = jest.spyOn(console, "warn");

      await documentEmbeddingService.embedDocument(documentWithoutFilePath);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Chunk 0 in unknown is too large"),
      );
    });
  });

  describe("embedMultipleDocuments", () => {
    it("should process multiple documents successfully", async () => {
      const documents = [
        formattedDocument,
        {
          ...formattedDocument,
          metadata: { ...formattedDocument.metadata, filePath: "test2.c" },
        },
      ];

      (vscode.window.withProgress as jest.Mock).mockImplementation(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (_options: unknown, callback: any) => {
          const mockProgress = {
            report: jest.fn(),
          };
          const mockToken = {
            isCancellationRequested: false,
          };
          return callback(mockProgress, mockToken);
        },
      );

      await documentEmbeddingService.embedMultipleDocuments(documents);

      expect(vectorDatabase.addDocuments).toHaveBeenCalledTimes(2);
    });

    it("should handle errors during document embedding", async () => {
      vectorDatabase.addDocuments.mockRejectedValueOnce(
        new Error("Test error"),
      );

      const documents = [
        formattedDocument,
        {
          ...formattedDocument,
          metadata: { ...formattedDocument.metadata, filePath: "test2.c" },
        },
      ];

      (vscode.window.withProgress as jest.Mock).mockImplementation(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (_options: unknown, callback: any) => {
          const mockProgress = {
            report: jest.fn(),
          };
          const mockToken = {
            isCancellationRequested: false,
          };
          return callback(mockProgress, mockToken);
        },
      );

      await documentEmbeddingService.embedMultipleDocuments(documents);

      expect(vscode.window.showWarningMessage).toHaveBeenCalledTimes(1);
    });

    it("should handle cancellation during processing", async () => {
      const documents = [formattedDocument, formattedDocument];

      (vscode.window.withProgress as jest.Mock).mockImplementation(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (_options: unknown, callback: any) => {
          const mockProgress = {
            report: jest.fn(),
          };
          const mockToken = {
            isCancellationRequested: true, // Simulate cancellation
          };
          return callback(mockProgress, mockToken);
        },
      );

      await documentEmbeddingService.embedMultipleDocuments(documents);

      expect(vectorDatabase.addDocuments).not.toHaveBeenCalled();
      expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
        "Document embedding was cancelled",
      );
    });

    it("should handle documents with undefined filePath in error messages", async () => {
      const documentWithoutFilePath: FormattedDocument = {
        ...formattedDocument,
        metadata: {
          ...formattedDocument.metadata,
          filePath: undefined,
        },
      };

      vectorDatabase.addDocuments.mockRejectedValueOnce(
        new Error("Test error"),
      );

      const consoleSpy = jest.spyOn(console, "error");

      (vscode.window.withProgress as jest.Mock).mockImplementation(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (_options: unknown, callback: any) => {
          const mockProgress = {
            report: jest.fn(),
          };
          const mockToken = {
            isCancellationRequested: false,
          };
          return callback(mockProgress, mockToken);
        },
      );

      await documentEmbeddingService.embedMultipleDocuments([
        documentWithoutFilePath,
      ]);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to embed document: unknown",
        expect.any(Error),
      );
    });
  });

  describe("embedRequirements", () => {
    it("should embed requirements correctly", async () => {
      const requirement: FormattedDocument = {
        ...formattedDocument,
        metadata: { ...formattedDocument.metadata, isRequirement: true },
      };

      await documentEmbeddingService.embedRequirements([requirement]);

      expect(vectorDatabase.addDocuments).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            pageContent: requirement.originalContent,
            metadata: expect.objectContaining({
              ...requirement.metadata,
              isRequirement: true,
            }),
          }),
        ]),
        "requirements",
      );
    });

    it("should handle errors during requirements embedding", async () => {
      vectorDatabase.addDocuments.mockRejectedValueOnce(
        new Error("Test error"),
      );

      await expect(
        documentEmbeddingService.embedRequirements([formattedDocument]),
      ).rejects.toThrow();
    });
  });
});
