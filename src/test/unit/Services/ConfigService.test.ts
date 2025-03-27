import { describe, expect, it, jest } from "@jest/globals";
import ConfigService from "../../../Services/ConfigService";
import { Config } from "../../../Models/Config";
import { MockFileSystemService } from "../Mock/FileSystemMock";
import { workspace } from "../Mock/vscode";

describe("ConfigService", () => {
  const configService = new ConfigService(MockFileSystemService);

  it("should get config value of type Config", () => {
    const testConfig: Config = {
      endpoint: "http://localhost:11434",
      model: "qwen2.5-coder:7b",
      embeddingModel: "nomic-embed-text:latest",
      temperature: 0.7,
      chunkOverlap: 200,
      chunkSize: 1000,
      maxResults: 5,
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
    const mockFileSystemPartial = {
      read: jest.fn<(path: string) => string>().mockReturnValue(
        JSON.stringify({
          endpoint: "http://local-endpoint",
          model: "local-model",
        }),
      ),
    };

    workspace.getConfiguration.mockReturnValue({
      endpoint: "http://global-endpoint",
      model: "global-model",
      embeddingModel: "global-embedding-model",
      temperature: 0.5,
      chunkOverlap: 100,
      chunkSize: 500,
      maxResults: 3,
    } as Config);

    const configService = new ConfigService(mockFileSystemPartial);
    const config = configService.GetConfig();

    // Local values should override global ones
    expect(config).toEqual({
      endpoint: "http://local-endpoint", // from local
      model: "local-model", // from local
      embeddingModel: "global-embedding-model", // from global
      temperature: 0.5, // from global
      chunkOverlap: 100, // from global
      chunkSize: 500, // from global
      maxResults: 3, // from global
      filters: {
        path: { type: "path", include: [], exclude: [] },
        file_extension: { type: "file_extension", include: [], exclude: [] },
        requirement: {},
      },
    });
  });

  it("should load from global if local config is not found", () => {
    const mockFileSystemEmpty = {
      read: jest
        .fn<(path: string) => string>()
        .mockReturnValue(JSON.stringify({})),
    };

    workspace.getConfiguration.mockReturnValue({
      endpoint: "http://global-endpoint",
      model: "global-model",
      embeddingModel: "global-embedding-model",
      temperature: 0.5,
      chunkOverlap: 100,
      chunkSize: 500,
      maxResults: 3,
    } as Config);

    const configService = new ConfigService(mockFileSystemEmpty);
    const config = configService.GetConfig();

    expect(config).toEqual({
      endpoint: "http://global-endpoint",
      model: "global-model",
      embeddingModel: "global-embedding-model",
      temperature: 0.5,
      chunkOverlap: 100,
      chunkSize: 500,
      maxResults: 3,
      filters: {
        path: { type: "path", include: [], exclude: [] },
        file_extension: { type: "file_extension", include: [], exclude: [] },
        requirement: {},
      },
    });
  });

  it("should handle invalid local config values", () => {
    // Mock invalid local config
    const mockFileSystemInvalid = {
      read: jest.fn<(path: string) => string>().mockReturnValue(
        JSON.stringify({
          endpoint: 123, // wrong type
          temperature: "invalid", // wrong type
          filters: "not-an-object", // wrong type
        }),
      ),
    };

    // Mock global config
    workspace.getConfiguration.mockReturnValue({
      endpoint: "http://global-endpoint",
      model: "global-model",
      temperature: 0.5,
    } as Config);

    const configService = new ConfigService(mockFileSystemInvalid);
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
    const mockFileSystemMalformed = {
      read: jest.fn<(path: string) => string>().mockReturnValue("invalid json"),
    };

    const configService = new ConfigService(mockFileSystemMalformed);
    const config = configService.GetConfig();

    // Should fall back to defaults/global config
    expect(config).toBeDefined();
    expect(config.filters).toBeDefined();
  });

  it("should handle missing search path from requirementfilters", () => {
    // Mock invalid local config
    const mockFileSystemInvalid = {
      read: jest.fn<(path: string) => string>().mockReturnValue(
        JSON.stringify({
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
        }),
      ),
    };

    const configService = new ConfigService(mockFileSystemInvalid);
    const config = configService.GetConfig();

    console.log(config);

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
});
