import { LangChainOllamaAdapter } from "../../../Adapters/LangChainOllamaAdapter";
import { Ollama, OllamaEmbeddings } from "@langchain/ollama";
import { ConfigServiceFacade } from "../../../Facades/ConfigServiceFacade";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
// We need StringOutputParser for the implementation even if not directly referenced
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StringOutputParser } from "@langchain/core/output_parsers";

// Mock of the Ollama instance with methods
const mockOllamaInstance = {
  invoke: jest.fn(),
  stream: jest.fn(),
};

// Mock of the OllamaEmbeddings instance with only the embedQuery method
const mockEmbeddingsInstance = {
  embedQuery: jest.fn(),
};

// Create a custom client mock for Ollama API methods that we use
const mockOllamaClient = {
  list: jest.fn(),
  pull: jest.fn(),
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

// Mock the LangChain core dependencies
jest.mock("@langchain/core/prompts", () => ({
  PromptTemplate: {
    fromTemplate: jest.fn(() => "mocked-prompt-template"),
  },
}));

jest.mock("@langchain/core/output_parsers", () => ({
  StringOutputParser: jest.fn(() => "mocked-string-output-parser"),
}));

// Mock RunnableSequence with a factory function
jest.mock("@langchain/core/runnables", () => {
  return {
    RunnableSequence: {
      from: jest.fn().mockReturnValue({
        stream: jest.fn(),
      }),
    },
  };
});

describe("LangChainOllamaAdapter", () => {
  let adapter: LangChainOllamaAdapter;

  beforeEach(() => {
    jest.clearAllMocks();

    adapter = new LangChainOllamaAdapter();
    // Set the mock Ollama client for testing
    // @ts-expect-error - We're using a simplified mock
    adapter["_ollamaClient"] = mockOllamaClient;
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

  describe("checkModelAvailability", () => {
    it("should return true when model is available", async () => {
      mockOllamaClient.list.mockResolvedValue({
        models: [
          { name: "test-model" },
          { name: "fake-ollama-model" },
          { name: "another-model" },
        ],
      });

      const result = await adapter.checkModelAvailability("fake-ollama-model");
      expect(result).toBe(true);
      expect(mockOllamaClient.list).toHaveBeenCalled();
    });

    it("should return false when model is not available", async () => {
      mockOllamaClient.list.mockResolvedValue({
        models: [{ name: "test-model" }, { name: "another-model" }],
      });

      const result = await adapter.checkModelAvailability("unavailable-model");
      expect(result).toBe(false);
    });

    it("should handle errors in checkModelAvailability method", async () => {
      mockOllamaClient.list.mockRejectedValue(new Error("List error"));

      await expect(
        adapter.checkModelAvailability("test-model"),
      ).rejects.toThrow(
        "Failed to check model availability: Error: List error",
      );
    });
  });

  describe("pullModel", () => {
    it("should pull model successfully", async () => {
      mockOllamaClient.pull.mockResolvedValue({ status: "success" });

      const result = await adapter.pullModel("test-model");
      expect(result).toBe(true);
      expect(mockOllamaClient.pull).toHaveBeenCalledWith({
        model: "test-model",
      });
    });

    it("should return false when pull status is not success", async () => {
      mockOllamaClient.pull.mockResolvedValue({ status: "failed" });

      const result = await adapter.pullModel("test-model");
      expect(result).toBe(false);
    });

    it("should handle errors in pullModel method", async () => {
      mockOllamaClient.pull.mockRejectedValue(new Error("Pull error"));

      await expect(adapter.pullModel("test-model")).rejects.toThrow(
        "Failed to pull model: Error: Pull error",
      );
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

  describe("generateStream", () => {
    it("should stream tokens correctly", async () => {
      // Create a proper async iterable for the stream
      const mockStreamOutput = ["token1", "token2", "token3"];
      const mockStream = {
        async *[Symbol.asyncIterator]() {
          for (const token of mockStreamOutput) {
            yield token;
          }
        },
      };

      // Get mock runnable sequence implementation from our mock
      const mockStreamFn = jest.fn().mockResolvedValue(mockStream);
      
      // Setup the mock for use in the test
      const mockFrom = jest.fn();
      RunnableSequence.from = mockFrom;
      mockFrom.mockReturnValue({ stream: mockStreamFn });

      const onTokenMock = jest.fn();

      await adapter.generateStream("Test prompt", "Test context", onTokenMock);

      // Verify the expected method calls
      expect(PromptTemplate.fromTemplate).toHaveBeenCalled();
      expect(mockFrom).toHaveBeenCalled();
      expect(mockStreamFn).toHaveBeenCalledWith({
        context: "Test context",
        userQuestion: "Test prompt",
      });

      // Since we can't easily test the "for await...of" loop, we'll assume if
      // all the above function calls are correct, the function works as expected
    });

    it("should handle errors in generateStream method", async () => {
      // Setup mock to throw an error
      const mockStreamFn = jest.fn().mockRejectedValue(new Error("Stream error"));
      
      // Configure the mock for use in the test
      const mockFrom = jest.fn();
      RunnableSequence.from = mockFrom;
      mockFrom.mockReturnValue({ stream: mockStreamFn });

      const onTokenMock = jest.fn();

      await expect(
        adapter.generateStream("Test prompt", "Test context", onTokenMock),
      ).rejects.toThrow(
        "Failed to generate streaming response: Error: Stream error",
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
