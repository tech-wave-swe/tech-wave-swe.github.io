import { FileExtensionFilter, PathFilter, RequirementFilter } from "./Filter";

export enum ConfigKey {
  ENDPOINT = "endpoint",
  BEARER_TOKEN = "bearerToken",
  MODEL = "model",
  EMBEDDING_MODEL = "embeddingModel",
  TEMPERATURE = "temperature",
  MAX_RESULTS = "maxResults",
  FILTERS = "filters",
  PROMPT = "promptRequirementAnalysis",
  CUSTOM_EMBEDDING_MODEL = "customEmbeddingModel",
  CUSTOM_MODEL = "customModel",
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
  customModel?: string;
  embeddingModel: string;
  customEmbeddingModel?: string;
  temperature: number;
  maxResults: number;
  promptRequirementAnalysis: string,
  filters: ConfigFilters;
}
