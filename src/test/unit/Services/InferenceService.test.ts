import { jest, expect } from "@jest/globals";
import { InferenceService } from "../../../Services/InferenceService";
import { ILanguageModel } from "../../../Interfaces/ILanguageModel";
import { IVectorDatabase } from "../../../Interfaces/IVectorDatabase";
import { Requirement, RequirementStatus } from "../../../Models/Requirement";
import { Chunk } from "../../../Models/Chunk";
import { File } from "../../../Models/File";
import { window } from "../Mock/vscode";

jest.mock("@langchain/core/prompts", () => {
  return {
    PromptTemplate: {
      fromTemplate: jest.fn(() => ({
        format: jest.fn(() => Promise.resolve("Mocked formatted prompt")),
      })),
    },
  };
});

describe("InferenceService", () => {
  let inferenceService: InferenceService;
  let mockLanguageModel: jest.Mocked<ILanguageModel>;
  let mockVectorDatabase: jest.Mocked<IVectorDatabase>;
  let mockFiles: File[];
  let mockChunks: Chunk[];
  let mockRequirements: Requirement[];

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

    mockChunks = [
      {
        content: "Sample chunk 1",
        lineContent: "Sample line 1",
        filePath: "path/to/chunk1",
        fileType: "c",
        lineNumber: 10,
        score: 0.95,
      },
      {
        content: "Sample chunk 2",
        lineContent: "Sample line 2",
        filePath: "path/to/chunk2",
        fileType: "c",
        lineNumber: 20,
        score: 0.85,
      },
    ];

    mockRequirements = [
      {
        id: "REQ-001",
        name: "Requirement 1",
        description: "The system shall do X",
        type: "functional",
        version: "1.0",
        status: RequirementStatus.NOT_TRACKED,
      },
      {
        id: "REQ-002",
        name: "Requirement 2",
        description: "The system shall do Y",
        type: "functional",
        version: "1.0",
        status: RequirementStatus.NOT_TRACKED,
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
      queryForFiles: jest.fn(),
      queryForRequirements: jest.fn(),
      queryForChunks: jest.fn(),
      addFiles: jest.fn(),
      addRequirements: jest.fn(),
      addChunks: jest.fn(),
      fileExists: jest.fn(),
      resetDatabase: jest.fn(),
      refreshEmbeddings: jest.fn(),
    } as unknown as jest.Mocked<IVectorDatabase>;

    mockVectorDatabase.queryForFiles.mockResolvedValue(mockFiles);
    mockVectorDatabase.queryForRequirements.mockResolvedValue(mockRequirements);
    mockVectorDatabase.queryForChunks.mockResolvedValue(mockChunks);

    inferenceService = new InferenceService(
      mockLanguageModel,
      mockVectorDatabase,
    );
  });

  describe("_getContextAndPrompt", () => {
    const question = "Example question?";

    it("should combine chunks and requirements into context and format prompt", async () => {
      const result = await inferenceService["_getContextAndPrompt"](question);

      expect(mockVectorDatabase.queryForChunks).toHaveBeenCalledWith(question);
      expect(mockVectorDatabase.queryForRequirements).toHaveBeenCalledWith(
        question,
      );

      const expectedChunksContext = mockChunks
        .map(
          (chunk) =>
            `FilePath: ${chunk.filePath}\nLine: ${chunk.lineNumber}\nContent:\n ${chunk.content}\n`,
        )
        .join("\n");

      const expectedRequirementsContext = mockRequirements
        .map(
          (req) =>
            `Requirement: ${req.id}\nDescription:\n ${req.description}\n`,
        )
        .join("\n");

      const expectedContext = `${expectedChunksContext}\n\n${expectedRequirementsContext}`;
      expect(result.context).toBe(expectedContext);
    });
  });

  describe("query", () => {
    const question = "Example question?";

    it("should retrieve context, format prompt, and generate response", async () => {
      mockLanguageModel.generate.mockResolvedValue("Generated response");

      const result = await inferenceService.query(question);

      expect(mockVectorDatabase.queryForChunks).toHaveBeenCalledWith(question);
      expect(mockVectorDatabase.queryForRequirements).toHaveBeenCalledWith(
        question,
      );

      expect(mockLanguageModel.generate).toHaveBeenCalled();
      expect(result).toBe("Generated response");
    });

    it("should handle error during query", async () => {
      mockVectorDatabase.queryForChunks.mockRejectedValue(
        new Error("Database error"),
      );

      const result = await inferenceService.query(question);

      expect(result).toBe(
        "I encountered an error while processing your question: Error: Database error",
      );
    });

    it("should handle unknown errors", async () => {
      mockVectorDatabase.queryForChunks.mockRejectedValue("Unknown error");

      const result = await inferenceService.query(question);

      expect(result).toBe(
        "I encountered an error while processing your question: Unknown error",
      );
    });
  });

  describe("queryStream", () => {
    const question = "Example streaming question?";
    let mockOnToken: jest.Mock;

    beforeEach(() => {
      mockOnToken = jest.fn();
    });

    it("should retrieve context, format prompt, and stream response", async () => {
      mockLanguageModel.generateStream.mockImplementation(
        async (prompt, context, callback) => {
          callback("Token 1");
          callback("Token 2");
          callback("Token 3");
          return Promise.resolve();
        },
      );

      await inferenceService.queryStream(question, mockOnToken);

      expect(mockLanguageModel.generateStream).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        mockOnToken,
      );

      expect(mockOnToken).toHaveBeenCalledTimes(3);
      expect(mockOnToken).toHaveBeenNthCalledWith(1, "Token 1");
      expect(mockOnToken).toHaveBeenNthCalledWith(2, "Token 2");
      expect(mockOnToken).toHaveBeenNthCalledWith(3, "Token 3");
    });

    it("should handle errors during streaming", async () => {
      mockVectorDatabase.queryForChunks.mockRejectedValue(
        new Error("Streaming error"),
      );

      await inferenceService.queryStream(question, mockOnToken);

      expect(mockOnToken).toHaveBeenCalledWith(
        "I encountered an error while processing your question: Error: Streaming error",
      );
    });
  });

  describe("checkSystemRequirements", () => {
    it("should test language model connection", async () => {
      mockLanguageModel.generate.mockResolvedValue("test response");

      await inferenceService.checkSystemRequirements();

      expect(mockLanguageModel.generate).toHaveBeenCalledWith("test");
      expect(window.showInformationMessage).toHaveBeenCalledWith(
        "Successfully connected to Ollama service",
      );
    });

    it("should handle connection failure", async () => {
      const error = new Error("Connection failed");
      mockLanguageModel.generate.mockRejectedValue(error);

      await expect(inferenceService.checkSystemRequirements()).rejects.toThrow(
        error,
      );

      expect(window.showErrorMessage).toHaveBeenCalledWith(
        "Failed to connect to Ollama service: Error: Connection failed",
      );
    });
  });
});
