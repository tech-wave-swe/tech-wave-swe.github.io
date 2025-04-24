import { Config, ConfigKey } from "../Models/Config";

import { workspace } from "vscode";
import {
  FileExtensionFilter,
  PathFilter,
  RequirementFilter,
} from "../Models/Filter";
import FileSystemService from "./FileSystemService";

export default class ConfigService {
  private _fileSystemService: FileSystemService;

  constructor(fileSystemService: FileSystemService) {
    this._fileSystemService = fileSystemService;
  }

  public GetConfig(): Config {
    const globalConfig = workspace.getConfiguration("requirementsTracker");
    const projectConfig: Partial<Config> = this._getLocalConfig();

    console.log("Project config");

    return {
      endpoint:
        (projectConfig[ConfigKey.ENDPOINT]
          ? projectConfig[ConfigKey.ENDPOINT]
          : null) ?? globalConfig[ConfigKey.ENDPOINT],
      bearerToken:
        (projectConfig[ConfigKey.BEARER_TOKEN]
          ? projectConfig[ConfigKey.BEARER_TOKEN]
          : null) ?? globalConfig[ConfigKey.BEARER_TOKEN],
      model:
        (projectConfig[ConfigKey.MODEL]
          ? projectConfig[ConfigKey.MODEL]
          : null) ??
        (globalConfig[ConfigKey.CUSTOM_MODEL]
          ? globalConfig[ConfigKey.CUSTOM_MODEL]
          : null) ??
        globalConfig[ConfigKey.MODEL],
      embeddingModel:
        (projectConfig[ConfigKey.EMBEDDING_MODEL]
          ? projectConfig[ConfigKey.EMBEDDING_MODEL]
          : null) ??
        (globalConfig[ConfigKey.CUSTOM_EMBEDDING_MODEL]
          ? globalConfig[ConfigKey.CUSTOM_EMBEDDING_MODEL]
          : null) ??
        globalConfig[ConfigKey.EMBEDDING_MODEL],
      temperature:
        projectConfig[ConfigKey.TEMPERATURE] ??
        globalConfig[ConfigKey.TEMPERATURE],
      maxResults:
        projectConfig[ConfigKey.MAX_RESULTS] ??
        globalConfig[ConfigKey.MAX_RESULTS],
      promptRequirementAnalysis:
        projectConfig[ConfigKey.PROMPT] ?? globalConfig[ConfigKey.PROMPT],
      filters: projectConfig[ConfigKey.FILTERS] ?? {
        path: { type: "path", include: [], exclude: [] },
        file_extension: { type: "file_extension", include: [], exclude: [] },
        requirement: {},
      },
    };
  }

  public setWorkspaceFolder(workspaceFolder: string): void {
    this._fileSystemService.setRootFolder(workspaceFolder);
  }

  private _getLocalConfig(): Partial<Config> {
    try {
      const rawConfig = JSON.parse(
        this._fileSystemService.read("rtracker.config.json"),
      );

      // Validation
      const validConfig: Partial<Config> = {};
      // Only use values with the correct type
      if (
        ConfigKey.ENDPOINT in rawConfig &&
        typeof rawConfig[ConfigKey.ENDPOINT] === "string"
      ) {
        validConfig[ConfigKey.ENDPOINT] = rawConfig[ConfigKey.ENDPOINT];
      }
      if (
        ConfigKey.BEARER_TOKEN in rawConfig &&
        typeof rawConfig[ConfigKey.BEARER_TOKEN] === "string"
      ) {
        validConfig[ConfigKey.BEARER_TOKEN] = rawConfig[ConfigKey.BEARER_TOKEN];
      }
      if (ConfigKey.MODEL in rawConfig && typeof rawConfig.model === "string") {
        validConfig[ConfigKey.MODEL] = rawConfig[ConfigKey.MODEL];
      }
      if (
        ConfigKey.EMBEDDING_MODEL in rawConfig &&
        typeof rawConfig[ConfigKey.EMBEDDING_MODEL] === "string"
      ) {
        validConfig[ConfigKey.EMBEDDING_MODEL] =
          rawConfig[ConfigKey.EMBEDDING_MODEL];
      }
      if (
        ConfigKey.TEMPERATURE in rawConfig &&
        typeof rawConfig[ConfigKey.TEMPERATURE] === "number"
      ) {
        validConfig[ConfigKey.TEMPERATURE] = rawConfig[ConfigKey.TEMPERATURE];
      }
      if (
        ConfigKey.PROMPT in rawConfig &&
        typeof rawConfig[ConfigKey.PROMPT] === "string"
      ) {
        validConfig[ConfigKey.PROMPT] = rawConfig[ConfigKey.PROMPT];
      }
      if (
        ConfigKey.MAX_RESULTS in rawConfig &&
        typeof rawConfig[ConfigKey.MAX_RESULTS] === "number"
      ) {
        validConfig[ConfigKey.MAX_RESULTS] = rawConfig[ConfigKey.MAX_RESULTS];
      }

      if (ConfigKey.FILTERS in rawConfig) {
        validConfig[ConfigKey.FILTERS] = {
          path: this._validatePathFilters(rawConfig[ConfigKey.FILTERS].path),
          file_extension: this._validateFileExtensionFilters(
            rawConfig[ConfigKey.FILTERS].file_extension,
          ),
          requirement: this._validateRequirementFilters(
            rawConfig[ConfigKey.FILTERS].requirements,
          ),
        };
      }

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
    if (!filters) {
      return {};
    }

    const temp: Record<string, RequirementFilter> = {};

    Object.entries(filters).map(
      ([key, value]: [string, { search_path: string[] }]) => {
        temp[key] = {
          type: "requirement",
          search_path: value.search_path ?? [],
        };
      },
    );

    return temp;
  }
}
