import { Config, ConfigFilters, ConfigKey } from "../Models/Config";
import ConfigService from "../Services/ConfigService";

export class ConfigServiceFacade {
  private static _instance: ConfigServiceFacade;

  private _configService: ConfigService;
  private _config: Config | null = null;

  private constructor(configService: ConfigService) {
    this._configService = configService;
  }

  public static Init(configService: ConfigService): ConfigServiceFacade {
    if (!ConfigServiceFacade._instance) {
      ConfigServiceFacade._instance = new ConfigServiceFacade(configService);
    }

    return ConfigServiceFacade._instance;
  }

  public static GetInstance(): ConfigServiceFacade {
    if (!ConfigServiceFacade._instance) {
      throw new Error("ConfigServiceFacade must be initialized first!");
    }

    return ConfigServiceFacade._instance;
  }

  public sync() {
    this._config = this._configService.GetConfig();

    console.log("Config loaded:", this._config);
  }

  private _getConfigValue(key: ConfigKey): Config[ConfigKey] {
    if (!this._config) {
      this.sync();

      if (!this._config) {
        throw new Error(`Failed to load configuration for key: ${key}`);
      }
    }

    return this._config[key];
  }

  public getOllamaModel(): string {
    return this._getConfigValue(ConfigKey.MODEL) as string;
  }

  public getEmbeddingModel(): string {
    return this._getConfigValue(ConfigKey.EMBEDDING_MODEL) as string;
  }

  public getMaxResults(): number {
    return this._getConfigValue(ConfigKey.MAX_RESULTS) as number;
  }

  public getTemperature(): number {
    return this._getConfigValue(ConfigKey.TEMPERATURE) as number;
  }

  public getEndpoint(): string {
    return this._getConfigValue(ConfigKey.ENDPOINT) as string;
  }

  public getBearerToken(): string {
    return this._getConfigValue(ConfigKey.BEARER_TOKEN) as string;
  }

  public getFilters(): ConfigFilters {
    return this._getConfigValue(ConfigKey.FILTERS) as ConfigFilters;
  }
}
