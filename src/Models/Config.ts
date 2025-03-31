import {FileExtensionFilter, PathFilter, RequirementFilter} from "./Filter";

export enum ConfigKey {
  ENDPOINT = "endpoint",
  MODEL = "model",
  EMBEDDING_MODEL = "embeddingModel",
  TEMPERATURE = "temperature",
  MAX_RESULTS = "maxResults",
  CHUNK_SIZE = "chunkSize",
  CHUNK_OVERLAP = "chunkOverlap",
  FILTERS = "filters",
}

export interface ConfigFilters {
  path: PathFilter;
  file_extension: FileExtensionFilter;
  requirement: Record<string, RequirementFilter>;
}

export interface Config {
  endpoint: string;
  model: string;
  embeddingModel: string;
  temperature: number;
  maxResults: number;
  chunkSize: number;
  chunkOverlap: number;
  filters: ConfigFilters;
  // bearerToken: string;
}
