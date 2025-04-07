import { LangChainOllamaAdapter } from "../../../Adapters/LangChainOllamaAdapter";
import { Ollama, OllamaEmbeddings } from "@langchain/ollama";

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
    })),
  },
}));

// Mock the original classes from @langchain/ollama
jest.mock("@langchain/ollama", () => ({
  Ollama: jest.fn(() => mockOllamaInstance),
  OllamaEmbeddings: jest.fn(() => mockEmbeddingsInstance),
}));

// TEST SUITE
describe("LangChainOllamaAdapter", () => {
  let adapter: LangChainOllamaAdapter;

  beforeEach(() => {
    jest.clearAllMocks();
    adapter = new LangChainOllamaAdapter();
  });

  // INITIALIZATION TEST
  it("should initialize Ollama and Embeddings correctly", () => {
    // Verify that the returned embeddings instance is the mock
    expect(adapter.getEmbeddings()).toBe(mockEmbeddingsInstance);
  });

  // RESPONSE GENERATION TEST
  it("should generate a response correctly", async () => {
    // Configure the mock to return a fixed response
    mockOllamaInstance.invoke.mockResolvedValue("Generated response");

    // Call the method and verify the result
    const response = await adapter.generate("Test prompt");
    expect(response).toBe("Generated response");
  });

  // ERROR HANDLING IN RESPONSE GENERATION
  it("should handle errors in generate method", async () => {
    // Configure the mock to simulate an error
    mockOllamaInstance.invoke.mockRejectedValue(new Error("Mocked error"));

    // Verify that the error is correctly propagated
    await expect(adapter.generate("Test prompt")).rejects.toThrow(
      "Failed to generate response: Error: Mocked error",
    );
  });

  // EMBEDDINGS GENERATION TEST
  it("should generate embeddings correctly", async () => {
    // Configure the mock to return a fake array of values
    mockEmbeddingsInstance.embedQuery.mockResolvedValue([0.1, 0.2, 0.3]);

    // Call the method and verify the result
    const embeddings = await adapter.generateEmbeddings("Test text");
    expect(embeddings).toEqual([0.1, 0.2, 0.3]);
  });

  // ERROR HANDLING IN EMBEDDINGS GENERATION
  it("should handle errors in generateEmbeddings method", async () => {
    // Configure the mock to simulate an error
    mockEmbeddingsInstance.embedQuery.mockRejectedValue(
      new Error("Mocked embedding error"),
    );

    // Verify that the error is correctly propagated
    await expect(adapter.generateEmbeddings("Test text")).rejects.toThrow(
      "Failed to generate embeddings: Error: Mocked embedding error",
    );
  });

  // MODEL REFRESH TEST
  it("should refresh models", () => {
    // Get the mocked original classes
    const mockedOllama = jest.mocked(Ollama);
    const mockedEmbeddings = jest.mocked(OllamaEmbeddings);

    // Count how many times they have been called
    const initialOllamaCalls = mockedOllama.mock.calls.length;
    const initialEmbeddingCalls = mockedEmbeddings.mock.calls.length;

    // Execute the refresh
    adapter.refreshModels();

    // Verify that new instances have been created
    expect(mockedOllama).toHaveBeenCalledTimes(initialOllamaCalls + 1);
    expect(mockedEmbeddings).toHaveBeenCalledTimes(initialEmbeddingCalls + 1);
  });
});
