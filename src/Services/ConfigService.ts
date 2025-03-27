import { Config, ConfigKey } from "../Models/Config";

import { workspace } from "vscode";
import {
  FileExtensionFilter,
  PathFilter,
  RequirementFilter,
} from "../Models/Filter";
import { FileSystem } from "../Interfaces/FileSystem";

export default class ConfigService {
  private _fileSystemService: FileSystem;

  constructor(fileSystemService: FileSystem) {
    this._fileSystemService = fileSystemService;
  }

  public GetConfig(): Config {
    const globalConfig = workspace.getConfiguration("reqTracker");
    const projectConfig: Partial<Config> = this._getLocalConfig();

    console.log("From GetConfig fsdfsdfsdf", globalConfig);
    console.log("From GetConfig fsdfsdfsdf", projectConfig);

    return {
      endpoint: projectConfig?.endpoint ?? globalConfig[ConfigKey.ENDPOINT],
      model: projectConfig?.model ?? globalConfig[ConfigKey.MODEL],
      embeddingModel:
        projectConfig?.embeddingModel ??
        globalConfig[ConfigKey.EMBEDDING_MODEL],
      temperature:
        projectConfig?.temperature ?? globalConfig[ConfigKey.TEMPERATURE],
      maxResults:
        projectConfig?.maxResults ?? globalConfig[ConfigKey.MAX_RESULTS],
      chunkSize: projectConfig?.chunkSize ?? globalConfig[ConfigKey.CHUNK_SIZE],
      chunkOverlap:
        projectConfig?.chunkOverlap ?? globalConfig[ConfigKey.CHUNK_OVERLAP],
      filters: projectConfig?.filters ?? {
        path: { type: "path", include: [], exclude: [] },
        file_extension: { type: "file_extension", include: [], exclude: [] },
        requirement: {},
      },
    };
  }

  private _getLocalConfig(): Partial<Config> {
    try {
      const rawConfig = JSON.parse(
        this._fileSystemService.read("rtracker.config.json"),
      );

      console.log("From _getLocalConfig", rawConfig);

      // Validation
      const validConfig: Partial<Config> = {};
      // Only use values with the correct type
      if (
        ConfigKey.ENDPOINT in rawConfig &&
        typeof rawConfig.endpoint === "string"
      ) {
        validConfig.endpoint = rawConfig.endpoint;
      }
      if (ConfigKey.MODEL in rawConfig && typeof rawConfig.model === "string") {
        validConfig.model = rawConfig.model;
      }
      if (
        ConfigKey.EMBEDDING_MODEL in rawConfig &&
        typeof rawConfig.embeddingModel === "string"
      ) {
        validConfig.embeddingModel = rawConfig.embeddingModel;
      }
      if (
        ConfigKey.TEMPERATURE in rawConfig &&
        typeof rawConfig.temperature === "number"
      ) {
        validConfig.temperature = rawConfig.temperature;
      }
      if (
        ConfigKey.MAX_RESULTS in rawConfig &&
        typeof rawConfig.maxResults === "number"
      ) {
        validConfig.maxResults = rawConfig.maxResults;
      }
      if (
        ConfigKey.CHUNK_SIZE in rawConfig &&
        typeof rawConfig.chunkSize === "number"
      ) {
        validConfig.chunkSize = rawConfig.chunkSize;
      }
      if (
        ConfigKey.CHUNK_OVERLAP in rawConfig &&
        typeof rawConfig.chunkOverlap === "number"
      ) {
        validConfig.chunkOverlap = rawConfig.chunkOverlap;
      }
      if (ConfigKey.FILTERS in rawConfig) {
        validConfig.filters = {
          path: this._validatePathFilters(rawConfig.filters.path),
          file_extension: this._validateFileExtensionFilters(
            rawConfig.filters.file_extension,
          ),
          requirement: this._validateRequirementFilters(
            rawConfig.filters.requirements,
          ),
        };
      }

      console.log("Local config loaded:", validConfig);

      return validConfig;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.log("From Error", e);
      return {};
    }
  }

  private _validatePathFilters(
    filter: { include: string[]; exclude: string[] } | undefined,
  ): PathFilter {
    return {
      type: "path",
      include: filter?.include ?? [],
      exclude: filter?.exclude ?? [],
    };
  }

  private _validateFileExtensionFilters(
    filter:
      | {
          include: string[];
          exclude: string[];
        }
      | undefined,
  ): FileExtensionFilter {
    return {
      type: "file_extension",
      include: filter?.include ?? [],
      exclude: filter?.exclude ?? [],
    };
  }

  private _validateRequirementFilters(
    filters: never[] | undefined,
  ): Record<string, RequirementFilter> {
    console.log("From validateRequirementFilters", filters);

    if (!filters) return {};

    const temp: Record<string, RequirementFilter> = {};

    Object.entries(filters).map(
      ([key, value]: [string, { search_path: string[] }]) => {
        temp[key] = {
          type: "requirement",
          search_path: value.search_path ?? [],
        };
      },
    );

    console.log("From validateRequirementFilters", temp);

    return temp;
  }
}
