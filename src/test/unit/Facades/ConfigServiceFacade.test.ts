import { describe, expect, it, jest } from "@jest/globals";
import ConfigService from "../../../Services/ConfigService";
import { ConfigServiceFacade } from "../../../Facades/ConfigServiceFacade";

describe("ConfigServiceFacade", () =>{
    const mockConfigContent = {
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
    let configService: jest.Mocked<ConfigService>;

    beforeEach(() => {
        configService = {
            GetConfig: jest.fn(),
        } as unknown as jest.Mocked<ConfigService>;

        (configService.GetConfig as jest.Mock).mockReturnValue(mockConfigContent);
    });

    describe("ConfigServiceFacade not initialized", () =>{
        it("should throw an error when the instance is not initialized", () => {
            expect(ConfigServiceFacade.GetInstance).toThrow("ConfigServiceFacade must be initialized first!");
        });
    });

    describe("config value undefined", () =>{
        it("should throw an error for every key when the config value is undefined", () => {
            let configServiceFacade = ConfigServiceFacade.Init(configService);
            (configService.GetConfig as jest.Mock).mockReturnValueOnce(undefined);

            expect(() => configServiceFacade.getOllamaModel()).toThrow(`Failed to load configuration for key: model`);
        });
    });

    describe("ConfigServiceFacade is initialized and config value is defined", () => {
        it("should have initialized a configServiceFacade", () => {
            expect(ConfigServiceFacade.Init).toBeTruthy();
        });

        it("should return a configServiceFacade instance", () => {
            let configServiceFacade = ConfigServiceFacade.Init(configService);
            expect(ConfigServiceFacade.GetInstance()).toEqual(configServiceFacade);
        });

        it("should sync the ConfigService config with the ConfigServiceFacade config", () => {
            let configServiceFacade = ConfigServiceFacade.Init(configService);
            const consoleSpy = jest.spyOn(console, "log");

            configServiceFacade.sync();

            expect(consoleSpy).toHaveBeenCalledWith(
                "Config loaded:", mockConfigContent
            );
        });

        it("should return the Ollama model name", () => {
            let configServiceFacade = ConfigServiceFacade.Init(configService);
            expect(configServiceFacade.getOllamaModel()).toEqual(mockConfigContent.model);
        });

        it("should return the embedding model name", () => {
            let configServiceFacade = ConfigServiceFacade.Init(configService);
            expect(configServiceFacade.getEmbeddingModel()).toEqual(mockConfigContent.embeddingModel);
        });

        it("should return the max result value", () => {
            let configServiceFacade = ConfigServiceFacade.Init(configService);
            expect(configServiceFacade.getMaxResults()).toEqual(mockConfigContent.maxResults);
        });

        it("should return the temperature value", () => {
            let configServiceFacade = ConfigServiceFacade.Init(configService);
            expect(configServiceFacade.getTemperature()).toEqual(mockConfigContent.temperature);
        });

        it("should return the endpoint value", () => {
            let configServiceFacade = ConfigServiceFacade.Init(configService);
            expect(configServiceFacade.getEndpoint()).toEqual(mockConfigContent.endpoint);
        });

        it("should return the chunk size value", () => {
            let configServiceFacade = ConfigServiceFacade.Init(configService);
            expect(configServiceFacade.getChunkSize()).toEqual(mockConfigContent.chunkSize);
        });

        it("should return the chunk overlap value", () => {
            let configServiceFacade = ConfigServiceFacade.Init(configService);
            expect(configServiceFacade.getChunkOverlap()).toEqual(mockConfigContent.chunkOverlap);
        });

        it("should return the config filters", () => {
            let configServiceFacade = ConfigServiceFacade.Init(configService);
            expect(configServiceFacade.getFilters()).toEqual(mockConfigContent.filters);
        });
    });
});