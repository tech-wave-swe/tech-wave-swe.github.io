import * as vscode from "vscode";

interface IConfig {
  endpoint: string;
  model: string;
  embeddingModel: string;
  temperature: number;
  // bearerToken: string;
}

export class Config {
  private static instance: Config;
  private configuration = vscode.workspace.getConfiguration("reqTracker");

  private constructor() {
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration("reqTracker")) {
        Config.instance = new Config();
        vscode.window.showInformationMessage(
          "Requirements Tracker: Configuration updated.",
        );
      }
    });
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  get endpoint(): string {
    const value = this.configuration.get<string>("endpoint");
    if (!value) {
      throw new Error("Endpoint setting is missing.");
    }
    return value;
  }

  get model(): string {
    let value = this.configuration.get<string>("model");
    if (value == "custom") {
      value = this.configuration.get<string>("custom-model");
      if (!value) {
        throw new Error("Custom Model setting is missing.");
      }
      return value;
    } else if (!value) {
      throw new Error("Model setting is missing.");
    }
    return value;
  }

  get embeddingModel(): string {
    let value = this.configuration.get<string>("embeddingModel");
    if (value == "custom") {
      value = this.configuration.get<string>("custom-embeddingModel");
      if (!value) {
        throw new Error("Custom Embedding Model setting is missing.");
      }
      return value;
    } else if (!value) {
      throw new Error("Embedding Model setting is missing.");
    }
    return value;
  }

  get temperature(): number {
    const value = this.configuration.get<number>("temperature");
    if (value === undefined || value < 0 || value > 1) {
      throw new Error("Temperature must be a number between 0 and 1.");
    }
    return value;
  }

  get bearerToken(): string {
    const value = this.configuration.get<string>("bearerToken");
    if (!value) {
      throw new Error("Bearer Token is missing.");
    }
    return value;
  }

  public getAllSettings(): IConfig {
    return {
      endpoint: this.endpoint,
      model: this.model,
      embeddingModel: this.embeddingModel,
      temperature: this.temperature,
      // bearerToken: this.bearerToken
    };
  }
}
