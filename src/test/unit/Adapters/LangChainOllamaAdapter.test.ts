import { LangChainOllamaAdapter } from "../../../Adapters/LangChainOllamaAdapter";
import { Ollama, OllamaEmbeddings } from "@langchain/ollama";
import { ConfigServiceFacade } from "../../../Facades/ConfigServiceFacade";

// Mock of the Ollama instance with only the invoke method
const mockOllamaInstance = {
  invoke: jest.fn(),
};

// Mock of the OllamaEmbeddings instance with only the embedQuery method
const mockEmbeddingsInstance = {
  embedQuery: jest.fn(),
};

// Mock of ConfigServiceFacade with default values
jest.mock("../../../Facades/ConfigServiceFacade", () => ({
  ConfigServiceFacade: {
    GetInstance: jest.fn(() => ({
      getEndpoint: jest.fn(() => "http://fake-endpoint"),
      getOllamaModel: jest.fn(() => "fake-ollama-model"),
      getEmbeddingModel: jest.fn(() => "fake-embedding-model"),
      getTemperature: jest.fn(() => 0.7),
      getBearerToken: jest.fn(() => "fake-token"),
    })),
  },
}));

// Mock the original classes from @langchain/ollama
jest.mock("@langchain/ollama", () => ({
  Ollama: jest.fn(() => mockOllamaInstance),
  OllamaEmbeddings: jest.fn(() => mockEmbeddingsInstance),
}));

describe("LangChainOllamaAdapter", () => {
  let adapter: LangChainOllamaAdapter;

  beforeEach(() => {
    jest.clearAllMocks();

    adapter = new LangChainOllamaAdapter();
  });

  describe("_initialize", () => {
    it("should initialize Ollama and Embeddings with correct parameters", () => {
      expect(Ollama).toHaveBeenCalledWith({
        baseUrl: "http://fake-endpoint",
        model: "fake-ollama-model",
        temperature: 0.7,
        headers: new Headers({ Authorization: "Bearer fake-token" }),
      });

      expect(OllamaEmbeddings).toHaveBeenCalledWith({
        baseUrl: "http://fake-endpoint",
        model: "fake-embedding-model",
        headers: new Headers({ Authorization: "Bearer fake-token" }),
      });
    });

    it("should initialize Ollama and Embeddings without bearer token", () => {
      (ConfigServiceFacade.GetInstance as jest.Mock).mockReturnValue({
        getEndpoint: jest.fn().mockReturnValue("http://localhost:11434"),
        getOllamaModel: jest.fn(() => "fake-ollama-model"),
        getEmbeddingModel: jest.fn(() => "fake-embedding-model"),
        getTemperature: jest.fn(() => 0.7),
        getBearerToken: jest.fn().mockReturnValue(undefined),
      });
      adapter["_initialize"]();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((adapter as any)._ollama).not.toBe(null);
    });
  });

  describe("generate", () => {
    it("should generate a response correctly", async () => {
      mockOllamaInstance.invoke.mockResolvedValue("Generated response");

      const response = await adapter.generate("Test prompt");
      expect(response).toBe("Generated response");
    });

    it("should handle errors in generate method", async () => {
      mockOllamaInstance.invoke.mockRejectedValue(new Error("Mocked error"));

      await expect(adapter.generate("Test prompt")).rejects.toThrow(
        "Failed to generate response: Error: Mocked error",
      );
    });
  });

  describe("generateEmbeddings", () => {
    it("should generate embeddings correctly", async () => {
      mockEmbeddingsInstance.embedQuery.mockResolvedValue([0.1, 0.2, 0.3]);

      const embeddings = await adapter.generateEmbeddings("Test text");
      expect(embeddings).toEqual([0.1, 0.2, 0.3]);
    });

    it("should handle errors in generateEmbeddings method", async () => {
      mockEmbeddingsInstance.embedQuery.mockRejectedValue(
        new Error("Mocked embedding error"),
      );

      await expect(adapter.generateEmbeddings("Test text")).rejects.toThrow(
        "Failed to generate embeddings: Error: Mocked embedding error",
      );
    });
  });

  describe("getEmbeddings", () => {
    it("should initialize Ollama and Embeddings correctly", () => {
      expect(adapter.getEmbeddings()).toBe(mockEmbeddingsInstance);
    });
  });

  describe("refreshModels", () => {
    it("should refresh models", () => {
      const mockedOllama = jest.mocked(Ollama);
      const mockedEmbeddings = jest.mocked(OllamaEmbeddings);

      const initialOllamaCalls = mockedOllama.mock.calls.length;
      const initialEmbeddingCalls = mockedEmbeddings.mock.calls.length;

      adapter.refreshModels();

      expect(mockedOllama).toHaveBeenCalledTimes(initialOllamaCalls + 1);
      expect(mockedEmbeddings).toHaveBeenCalledTimes(initialEmbeddingCalls + 1);
    });
  });
});
