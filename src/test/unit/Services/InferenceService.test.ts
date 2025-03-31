import {jest, expect} from "@jest/globals";
import {InferenceService} from "../../../Services/InferenceService";
import {ILanguageModel} from "../../../Interfaces/ILanguageModel";
import {IVectorDatabase} from "../../../Interfaces/IVectorDatabase";
import {QueryResult} from "../../../Models/QueryResult";
import {window} from "../Mock/vscode";

describe("InferenceService", () => {

  let inferenceService: InferenceService;
  let mockLanguageModel: ILanguageModel;
  let mockVectorDatabase: IVectorDatabase;
  let mockQueryResults: QueryResult[];

  beforeEach(() => {

    mockQueryResults = [
      {
        text: "Sample text",
        metadata: {
          filePath: "path/to/file",
          lineNumber: 1,
          source: "source",
        },
        score: 0.9,
      },
      {
        text: "Another sample text",
        metadata: {
          filePath: "path/to/another/file",
          lineNumber: 2,
          source: "another source",
        },
        score: 0.8,
      },
    ];

    mockLanguageModel = {
      generateEmbeddings: jest.fn(),
      generateResponse: jest.fn(),
      generate: jest.fn()
    } as unknown as ILanguageModel;

    mockVectorDatabase = {
      add: jest.fn(),
      query: jest.fn(),
      DOCUMENTS_COLLECTION: "documents",
      REQUIREMENTS_COLLECTION: "requirements",
    } as unknown as IVectorDatabase;

    (mockVectorDatabase.query as jest.Mock<() => Promise<QueryResult[]>>).mockResolvedValue(mockQueryResults);

    inferenceService = new InferenceService(
      mockLanguageModel,
      mockVectorDatabase,
    );
  });

  describe("generateEmbeddings", () => {

    it("should call vector database add method with correct parameters", async () => {
      const content = "test content";
      const metadata = {} as never;

      await inferenceService.generateEmbeddings(content, metadata, "documents");
      expect(mockVectorDatabase.add).toHaveBeenCalledWith(
        content,
        metadata,
        mockVectorDatabase.DOCUMENTS_COLLECTION
      );

      await inferenceService.generateEmbeddings(content, metadata, "requirements");
      expect(mockVectorDatabase.add).toHaveBeenCalledWith(
        content,
        metadata,
        mockVectorDatabase.REQUIREMENTS_COLLECTION
      );
    });

    it("should throw error if embedding generation failed", async () => {
      const content = "test content";
      const metadata = {} as never;
      const dataType = "documents";

      (mockVectorDatabase.add as jest.Mock<() => Promise<void>>).mockRejectedValue(new Error("Test error"));

      await expect(inferenceService.generateEmbeddings(content, metadata, dataType)).rejects.toThrow("Test error");
    });

  });

  describe("query", () => {

    let question: string;
    let dataType: string;

    beforeEach(async () => {
      question = "Example question?";
      dataType = "requirements";

      await inferenceService.query(question, dataType);
    });

    it("should retrive relevant documents from vector database", async () => {
      expect(mockVectorDatabase.query).toHaveBeenCalledWith(
        question,
        dataType,
      );
    });

    it("should retrive relevant documents from vector database if dataType is not passed", async () => {
      await inferenceService.query(question);

      expect(mockVectorDatabase.query).toHaveBeenCalledWith(
        question,
        "documents",
      );
    });

    it("should return a message if no relevant documents found", async () => {
      (mockVectorDatabase.query as jest.Mock<() => Promise<QueryResult[]>>).mockResolvedValue([]);
      const res = await inferenceService.query(question, dataType);

      expect(res).toEqual("I couldn't find any relevant information to answer your question.");
    });

    it("should create prompt template from retrived documents and get response", async () => {
      const context = "Sample text\nSource: path/to/file\n\nAnother sample text\nSource: path/to/another/file";
      const promptTemplate = `
You are an assistant that helps with requirements engineering and documentation.
Use the following context to answer the question. If you don't know the answer based on the context, say so.

Context:
${context}

Question: ${question}

Answer:`;

      expect(mockLanguageModel.generate).toHaveBeenCalledWith(promptTemplate);
    });

    it("should create prompt template from retrived documents and get response event if filePath is not present", async () => {
      mockQueryResults = [
        {
          text: "Sample text",
          metadata: {
            lineNumber: 1,
            source: "source",
          },
          score: 0.9,
        },
        {
          text: "Another sample text",
          metadata: {
            lineNumber: 2,
            source: "another source",
          },
          score: 0.8,
        },
      ];

      (mockVectorDatabase.query as jest.Mock<() => Promise<QueryResult[]>>).mockResolvedValue(mockQueryResults);
      await inferenceService.query(question, dataType);

      const context = "Sample text\n\n\nAnother sample text\n";
      const promptTemplate = `
You are an assistant that helps with requirements engineering and documentation.
Use the following context to answer the question. If you don't know the answer based on the context, say so.

Context:
${context}

Question: ${question}

Answer:`;

      expect(mockLanguageModel.generate).toHaveBeenCalledWith(promptTemplate);
    });

    it("should handle error if query fails", async () => {
      (mockVectorDatabase.query as jest.Mock<() => Promise<QueryResult[]>>).mockRejectedValue(new Error("Test Error"));
      const res = await inferenceService.query(question, dataType);

      expect(res).toEqual("I encountered an error while processing your question: Error: Test Error");
    });

  });

  describe("checkSystemRequirements", () => {

    it("should test Ollama connection", async () => {
      (mockLanguageModel.generate as jest.Mock<() => Promise<string>>).mockResolvedValue("test response");

      await inferenceService.checkSystemRequirements();
      expect(mockLanguageModel.generate).toHaveBeenCalledWith("test");
      expect(window.showInformationMessage).toHaveBeenCalledWith("Successfully connected to Ollama service");
    });

    it("should handle error if Ollama connection fails", async () => {
      (mockLanguageModel.generate as jest.Mock<() => Promise<string>>).mockRejectedValue(new Error("Test error"));

      try {
        await inferenceService.checkSystemRequirements();
      } catch (e) {}

      expect(window.showErrorMessage).toHaveBeenCalledWith("Failed to connect to Ollama service: Error: Test error");
    });

  });
});