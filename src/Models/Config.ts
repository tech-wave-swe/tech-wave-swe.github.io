import { FileExtensionFilter, PathFilter, RequirementFilter } from "./Filter";

export enum ConfigKey {
  ENDPOINT = "endpoint",
  BEARER_TOKEN = "bearerToken",
  MODEL = "model",
  EMBEDDING_MODEL = "embeddingModel",
  TEMPERATURE = "temperature",
  MAX_RESULTS = "maxResults",
  FILTERS = "filters",
}

export interface ConfigFilters {
  path: PathFilter;
  file_extension: FileExtensionFilter;
  requirement: Record<string, RequirementFilter>;
}

export interface Config {
  endpoint: string;
  bearerToken: string;
  model: string;
  embeddingModel: string;
  temperature: number;
  maxResults: number;
  filters: ConfigFilters;
}
