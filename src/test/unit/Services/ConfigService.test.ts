import { describe, expect, it, jest } from "@jest/globals";
import ConfigService from "../../../Services/ConfigService";
import FileSystemService from "../../../Services/FileSystemService";
import { workspace } from "../Mock/vscode";
import { Config } from "../../../Models/Config";

describe("ConfigService", () => {
  let fileSystemService: jest.Mocked<FileSystemService>;
  let configService: ConfigService;

  beforeEach(() => {
    // Create a mock FileSystemService
    fileSystemService = {
      read: jest.fn(),
      setRootFolder: jest.fn(),
    } as unknown as jest.Mocked<FileSystemService>;

    // Create ConfigService instance with mocked FileSystemService
    configService = new ConfigService(fileSystemService);

    // Mock workspace.getConfiguration to return default values
    (workspace.getConfiguration as jest.Mock).mockReturnValue({
      endpoint: "http://global-endpoint",
      bearerToken: "your-secret-token-here",
      model: "global-model",
      embeddingModel: "global-embedding-model",
      temperature: 0.5,
      maxResults: 3,
    });
  });

  it("should get config value of type Config", () => {
    fileSystemService.read.mockImplementation(() => {
      return JSON.stringify({
        endpoint: "http://localhost:11434",
        bearerToken: "your-secret-token-here",
        model: "qwen2.5-coder:7b",
        embeddingModel: "nomic-embed-text:latest",
        temperature: 0.7,
        maxResults: 5,
        promptRequirementAnalysis: "true",
        filters: {
          path: {
            type: "path",
            include: [],
            exclude: ["**/Projects/**"],
          },
          file_extension: {
            type: "file_extension",
            include: ["md"],
            exclude: [],
          },
          requirements: {
            req1: {
              type: "requirement",
              search_path: ["./ADC/"],
            },
          },
        },
      });
    });

    const testConfig: Config = {
      endpoint: "http://localhost:11434",
      bearerToken: "your-secret-token-here",
      model: "qwen2.5-coder:7b",
      embeddingModel: "nomic-embed-text:latest",
      temperature: 0.7,
      maxResults: 5,
      promptRequirementAnalysis: "true",
      filters: {
        path: {
          type: "path",
          include: [],
          exclude: ["**/Projects/**"],
        },
        file_extension: {
          type: "file_extension",
          include: ["md"],
          exclude: [],
        },
        requirement: {
          req1: {
            type: "requirement",
            search_path: ["./ADC/"],
          },
        },
      },
    };

    expect(configService.GetConfig()).toEqual(testConfig);
  });

  it("should load and merge local config values", () => {
    fileSystemService.read.mockImplementation(() => {
      return JSON.stringify({
        endpoint: "http://local-endpoint",
        model: "local-model",
      });
    });

    const config = configService.GetConfig();

    // Local values should override global ones
    expect(config).toEqual({
      endpoint: "http://local-endpoint", // from local
      bearerToken: "your-secret-token-here",
      model: "local-model", // from local
      embeddingModel: "global-embedding-model", // from global
      temperature: 0.5, // from global
      maxResults: 3, // from global
      promptRequirementAnalysis: undefined,
      filters: {
        path: { type: "path", include: [], exclude: [] },
        file_extension: { type: "file_extension", include: [], exclude: [] },
        requirement: {},
      },
    });
  });

  it("should load from global if local config is not found", () => {
    fileSystemService.read.mockImplementation(() => {
      return JSON.stringify({});
    });

    const config = configService.GetConfig();

    expect(config).toEqual({
      endpoint: "http://global-endpoint",
      bearerToken: "your-secret-token-here",
      model: "global-model",
      embeddingModel: "global-embedding-model",
      temperature: 0.5,
      maxResults: 3,
      promptRequirementAnalysis: undefined,
      filters: {
        path: { type: "path", include: [], exclude: [] },
        file_extension: { type: "file_extension", include: [], exclude: [] },
        requirement: {},
      },
    });
  });

  it("should handle invalid local config values", () => {
    // Mock invalid local config
    fileSystemService.read.mockImplementation(() => {
      return JSON.stringify({
        endpoint: 123, // wrong type
        temperature: "invalid", // wrong type
        filters: "not-an-object", // wrong type
      });
    });

    const config = configService.GetConfig();

    // Should use global values for invalid local ones
    expect(config.endpoint).toBe("http://global-endpoint");
    expect(config.temperature).toBe(0.5);
    expect(config.filters).toEqual({
      path: { type: "path", include: [], exclude: [] },
      file_extension: { type: "file_extension", include: [], exclude: [] },
      requirement: {},
    });
  });

  it("should handle empty or malformed local config file", () => {
    // Mock malformed JSON
    fileSystemService.read.mockImplementation(() => {
      return "invalid json";
    });

    const config = configService.GetConfig();

    // Should fall back to defaults/global config
    expect(config).toBeDefined();
    expect(config.filters).toBeDefined();
  });

  it("should handle missing search path from requirementfilters", () => {
    // Mock invalid local config
    fileSystemService.read.mockImplementation(() => {
      return JSON.stringify({
        filters: {
          requirements: {
            req2: {
              type: "requirement",
              search_path: ["./ADC/"],
            },
            req1: {
              type: "requirement",
            },
          },
        },
      });
    });

    const config = configService.GetConfig();

    expect(config.filters.requirement).toEqual({
      req2: {
        type: "requirement",
        search_path: ["./ADC/"],
      },
      req1: {
        type: "requirement",
        search_path: [],
      },
    });
  });

  it("should set workspace folder", () => {
    const workspaceFolder = "/test/workspace";
    configService.setWorkspaceFolder(workspaceFolder);
    expect(fileSystemService.setRootFolder).toHaveBeenCalledWith(workspaceFolder);
  });

  it("should use custom model over default model when available", () => {
    fileSystemService.read.mockImplementation(() => {
      return JSON.stringify({});
    });

    const mockConfig = {
      endpoint: "http://global-endpoint",
      bearerToken: "your-secret-token-here",
      model: "global-model",
      customModel: "custom-global-model",
      embeddingModel: "global-embedding-model",
      customEmbeddingModel: "custom-global-embedding-model",
      temperature: 0.5,
      maxResults: 3,
    };
    (workspace.getConfiguration as jest.Mock).mockReturnValue(mockConfig);

    const config = configService.GetConfig();
    expect(config.model).toBe("custom-global-model");
    expect(config.embeddingModel).toBe("custom-global-embedding-model");
  });

  it("should use custom embedding model over default embedding model when available", () => {
    fileSystemService.read.mockImplementation(() => {
      return JSON.stringify({});
    });

    const mockConfig = {
      endpoint: "http://global-endpoint",
      bearerToken: "your-secret-token-here",
      model: "global-model",
      embeddingModel: "global-embedding-model",
      customEmbeddingModel: "custom-global-embedding-model",
      temperature: 0.5,
      maxResults: 3,
    };
    (workspace.getConfiguration as jest.Mock).mockReturnValue(mockConfig);

    const config = configService.GetConfig();
    expect(config.embeddingModel).toBe("custom-global-embedding-model");
  });

  it("should prioritize local model over custom and default models", () => {
    fileSystemService.read.mockImplementation(() => {
      return JSON.stringify({
        model: "local-model",
        embeddingModel: "local-embedding-model"
      });
    });

    const config = configService.GetConfig();
    expect(config.model).toBe("local-model");
    expect(config.embeddingModel).toBe("local-embedding-model");
  });
});
