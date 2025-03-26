import {describe, expect} from "@jest/globals";
import ConfigService from "../../src/Services/ConfigService";
import {MockFileSystemService} from "../Mock/FileSystemMock";
import {Config} from "../../src/Models/Config";

describe("ConfigService", () => {

  const configService = new ConfigService(MockFileSystemService);

  it("should get config value of type Config", () => {
    // Test implementation

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
          exclude: ["**/Projects/**"]
        },
        file_extension: {
          type: "file_extension",
          include: ["md"],
          exclude: []
        },
        requirement: {
          req1: {
            type: "requirement",
            search_path: ["./ADC/"]
          }
        }
      }
    };

    expect(configService.GetConfig()).toEqual(testConfig);

  });

  it("should load and merge local config values", () => {
    // Test implementation
  });
});