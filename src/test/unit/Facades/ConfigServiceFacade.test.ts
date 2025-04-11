import { describe, expect, it, jest } from "@jest/globals";
import ConfigService from "../../../Services/ConfigService";
import { ConfigServiceFacade } from "../../../Facades/ConfigServiceFacade";
import * as vscode from "vscode";
import { Config } from "../../../Models/Config";

describe("ConfigServiceFacade", () => {
  const mockConfigContent: Config = {
    endpoint: "http://localhost:11434",
    bearerToken: "your-secret-token-here",
    model: "qwen2.5-coder:7b",
    embeddingModel: "nomic-embed-text:latest",
    temperature: 0.7,
    maxResults: 5,
    promptRequirementAnalysis: "test prompt",
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
  let configService: jest.Mocked<ConfigService>;

  beforeEach(() => {
    configService = {
      GetConfig: jest.fn().mockReturnValue(mockConfigContent),
      setWorkspaceFolder: jest
        .fn<(workspaceFolder: string) => void>()
        .mockImplementation((_workspaceFolder: string) => {
          return null;
        }),
    } as unknown as jest.Mocked<ConfigService>;
  });

  describe("ConfigServiceFacade not initialized", () => {
    it("should throw an error when the instance is not initialized", () => {
      expect(ConfigServiceFacade.GetInstance).toThrow(
        "ConfigServiceFacade must be initialized first!",
      );
    });
  });

  describe("config value undefined", () => {
    it("should throw an error for every key when the config value is undefined", () => {
      const configServiceFacade = ConfigServiceFacade.Init(configService);
      (configService.GetConfig as jest.Mock).mockReturnValueOnce(undefined);

      expect(() => configServiceFacade.getOllamaModel()).toThrow(
        `Failed to load configuration for key: model`,
      );
    });
  });

  describe("ConfigServiceFacade is initialized and config value is defined", () => {
    it("should have initialized a configServiceFacade", () => {
      expect(ConfigServiceFacade.Init).toBeTruthy();
    });

    it("should return a configServiceFacade instance", () => {
      const configServiceFacade = ConfigServiceFacade.Init(configService);
      expect(ConfigServiceFacade.GetInstance()).toEqual(configServiceFacade);
    });

    it("should sync the ConfigService config with the ConfigServiceFacade config", () => {
      const configServiceFacade = ConfigServiceFacade.Init(configService);
      const consoleSpy = jest.spyOn(console, "log");

      configServiceFacade.sync();

      expect(consoleSpy).toHaveBeenCalledWith(
        "Config loaded:",
        mockConfigContent,
      );
    });

    it("should return the Ollama model name", () => {
      const configServiceFacade = ConfigServiceFacade.Init(configService);
      expect(configServiceFacade.getOllamaModel()).toEqual(
        mockConfigContent.model,
      );
    });

    it("should return the embedding model name", () => {
      const configServiceFacade = ConfigServiceFacade.Init(configService);
      expect(configServiceFacade.getEmbeddingModel()).toEqual(
        mockConfigContent.embeddingModel,
      );
    });

    it("should return the max result value", () => {
      const configServiceFacade = ConfigServiceFacade.Init(configService);
      expect(configServiceFacade.getMaxResults()).toEqual(
        mockConfigContent.maxResults,
      );
    });

    it("should return the temperature value", () => {
      const configServiceFacade = ConfigServiceFacade.Init(configService);
      expect(configServiceFacade.getTemperature()).toEqual(
        mockConfigContent.temperature,
      );
    });

    it("should return the endpoint value", () => {
      const configServiceFacade = ConfigServiceFacade.Init(configService);
      expect(configServiceFacade.getEndpoint()).toEqual(
        mockConfigContent.endpoint,
      );
    });

    it("should return the bearer token value", () => {
      const configServiceFacade = ConfigServiceFacade.Init(configService);
      expect(configServiceFacade.getBearerToken()).toEqual(
        mockConfigContent.bearerToken,
      );
    });

    it("should return the config filters", () => {
      const configServiceFacade = ConfigServiceFacade.Init(configService);
      expect(configServiceFacade.getFilters()).toEqual(
        mockConfigContent.filters,
      );
    });

    it("should return the prompt value", () => {
      const testConfig: Config = {
        ...mockConfigContent,
        promptRequirementAnalysis: "test prompt",
      };
      (configService.GetConfig as jest.Mock).mockReturnValue(testConfig);

      const configServiceFacade = ConfigServiceFacade.Init(configService);
      expect(configServiceFacade.getPrompt()).toEqual("test prompt");
    });

    it("should set workspace folder and sync config", () => {
      const configServiceFacade = ConfigServiceFacade.Init(configService);

      // Setup mock response for after setting workspace folder
      (configService.GetConfig as jest.Mock).mockReturnValue(mockConfigContent);

      const mockUri = {
        scheme: "file",
        authority: "",
        path: "/test/workspace",
        fsPath: "/test/workspace",
        query: "",
        fragment: "",
        with: () => mockUri,
        toJSON: () => ({
          scheme: "file",
          authority: "",
          path: "/test/workspace",
          query: "",
          fragment: "",
        }),
      } as vscode.Uri;

      const mockWorkspaceFolder = [
        {
          uri: mockUri,
          name: "test",
          index: 0,
        },
      ] as readonly vscode.WorkspaceFolder[];

      configServiceFacade.setWorkspaceFolder(mockWorkspaceFolder);

      expect(
        configServiceFacade["_configService"].setWorkspaceFolder,
      ).toHaveBeenCalledWith("/test/workspace");
    });
  });
});
