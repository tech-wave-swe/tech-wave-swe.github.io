import { jest, expect } from "@jest/globals";
import { InferenceService } from "../../../Services/InferenceService";
import { ILanguageModel } from "../../../Interfaces/ILanguageModel";
import { IVectorDatabase } from "../../../Interfaces/IVectorDatabase";
import { File } from "../../../Models/File";
import { window } from "../Mock/vscode";

describe("InferenceService", () => {
  let inferenceService: InferenceService;
  let mockLanguageModel: jest.Mocked<ILanguageModel>;
  let mockVectorDatabase: jest.Mocked<IVectorDatabase>;
  let mockFiles: File[];

  beforeEach(() => {
    mockFiles = [
      {
        originalContent: "Sample content 1",
        filePath: "path/to/file1",
        checksum: "checksum1",
        score: 0.9,
      },
      {
        originalContent: "Sample content 2",
        filePath: "path/to/file2",
        checksum: "checksum2",
        score: 0.8,
      },
    ];

    mockLanguageModel = {
      generateEmbeddings: jest.fn(),
      generate: jest.fn(),
      generateStream: jest.fn(),
      refreshModels: jest.fn(),
      checkModelAvailability: jest.fn(),
      pullModel: jest.fn(),
    } as jest.Mocked<ILanguageModel>;

    mockVectorDatabase = {
      queryForFiles: jest
        .fn()
        .mockImplementation(() => Promise.resolve(mockFiles)),
      queryForRequirements: jest.fn(),
      queryForChunks: jest.fn(),
      addFiles: jest.fn(),
      addRequirements: jest.fn(),
      addChunks: jest.fn(),
      fileExists: jest.fn(),
      resetDatabase: jest.fn(),
      refreshEmbeddings: jest.fn(),
    } as jest.Mocked<IVectorDatabase>;

    inferenceService = new InferenceService(
      mockLanguageModel,
      mockVectorDatabase,
    );
  });

  describe("query", () => {
    const question = "Example question?";

    it("should retrieve relevant files and generate response", async () => {
      mockLanguageModel.generate.mockImplementation(() =>
        Promise.resolve("Generated response"),
      );

      const result = await inferenceService.query(question);

      // Verify files were queried
      expect(mockVectorDatabase.queryForFiles).toHaveBeenCalledWith(question);

      // Verify prompt template was used correctly
      const expectedContext = mockFiles
        .map(
          (file) =>
            `FilePath: ${file.filePath}\nContent:\n ${file.originalContent}\n`,
        )
        .join("\n");

      const expectedPrompt = expect.stringContaining(expectedContext);
      expect(mockLanguageModel.generate).toHaveBeenCalledWith(expectedPrompt);

      expect(result).toBe("Generated response");
    });

    it("should handle error during query", async () => {
      mockVectorDatabase.queryForFiles.mockImplementation(() =>
        Promise.reject(new Error("Database error")),
      );

      const result = await inferenceService.query(question);

      expect(result).toBe(
        "I encountered an error while processing your question: Error: Database error",
      );
    });

    it("should handle unknown errors", async () => {
      mockVectorDatabase.queryForFiles.mockImplementation(() =>
        Promise.reject("Unknown error"),
      );

      const result = await inferenceService.query(question);

      expect(result).toBe(
        "I encountered an error while processing your question: Unknown error",
      );
    });
  });

  describe("checkSystemRequirements", () => {
    it("should test language model connection", async () => {
      mockLanguageModel.generate.mockImplementation(() =>
        Promise.resolve("test response"),
      );

      await inferenceService.checkSystemRequirements();

      expect(mockLanguageModel.generate).toHaveBeenCalledWith("test");
      expect(window.showInformationMessage).toHaveBeenCalledWith(
        "Successfully connected to Ollama service",
      );
    });

    it("should handle connection failure", async () => {
      const error = new Error("Connection failed");
      mockLanguageModel.generate.mockImplementation(() =>
        Promise.reject(error),
      );

      await expect(inferenceService.checkSystemRequirements()).rejects.toThrow(
        error,
      );

      expect(window.showErrorMessage).toHaveBeenCalledWith(
        "Failed to connect to Ollama service: Error: Connection failed",
      );
    });
  });
});
