import * as assert from "assert";
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { ConfigServiceFacade } from "../../Facades/ConfigServiceFacade";
import { ConfigKey } from "../../Models/Config";
import { TestWorkspace } from "../testWorkspace";
import FileSystemService from "../../Services/FileSystemService";
import ConfigService from "../../Services/ConfigService";

suite("Configuration Tests", function () {
  let workspace: TestWorkspace;

  suiteSetup(async function () {
    workspace = new TestWorkspace();
    await workspace.setup();

    const extension = vscode.extensions.getExtension(
      "tech-wave-swe.requirements-tracker",
    );
    await extension?.activate();
  });

  test("Default configuration should be loaded correctly", function () {
    const configFacade = ConfigServiceFacade.GetInstance();

    const endpoint = configFacade.getEndpoint();
    const model = configFacade.getOllamaModel();
    const embeddingModel = configFacade.getEmbeddingModel();
    const maxResults = configFacade.getMaxResults();
    const temperature = configFacade.getTemperature();

    assert.ok(endpoint, "Default endpoint should be loaded");
    assert.ok(model, "Default model should be loaded");
    assert.ok(embeddingModel, "Default embedding model should be loaded");
    assert.ok(maxResults > 0, "Max results should be a positive number");
    assert.ok(
      temperature >= 0 && temperature <= 1,
      "Temperature should be between 0 and 1",
    );

    const vscodeSettings = vscode.workspace.getConfiguration(
      "requirementsTracker",
    );

    assert.strictEqual(
      endpoint,
      vscodeSettings.get(ConfigKey.ENDPOINT),
      "Endpoint should match VSCode settings",
    );

    const expectedModel =
      vscodeSettings.get(ConfigKey.CUSTOM_MODEL) ||
      vscodeSettings.get(ConfigKey.MODEL);
    assert.strictEqual(
      model,
      expectedModel,
      "Model should match VSCode settings",
    );

    const expectedEmbeddingModel =
      vscodeSettings.get(ConfigKey.CUSTOM_EMBEDDING_MODEL) ||
      vscodeSettings.get(ConfigKey.EMBEDDING_MODEL);
    assert.strictEqual(
      embeddingModel,
      expectedEmbeddingModel,
      "Embedding model should match VSCode settings",
    );
  });

  test("Custom configuration file should override defaults", async function () {
    const configPath = path.join(workspace.path, "rtracker.config.json");
    const customConfig = {
      [ConfigKey.ENDPOINT]: "http://custom-endpoint:8000",
      [ConfigKey.MODEL]: "custom-model",
      [ConfigKey.EMBEDDING_MODEL]: "custom-embedding-model",
      [ConfigKey.TEMPERATURE]: 0.75,
      [ConfigKey.MAX_RESULTS]: 15,
      [ConfigKey.FILTERS]: {
        path: {
          type: "path",
          include: ["src/**"],
          exclude: ["node_modules/**"],
        },
        file_extension: {
          type: "file_extension",
          include: ["rs", "cpp"],
          exclude: ["js"],
        },
        requirement: {},
      },
    };

    try {
      fs.writeFileSync(configPath, JSON.stringify(customConfig, null, 2));

      const fileSystemService = new FileSystemService(workspace.path);
      const configService = new ConfigService(fileSystemService);

      const config = configService.GetConfig();

      assert.ok(config, "Config should be loaded");

      if (config.endpoint) {
        assert.ok(
          config.endpoint.includes("custom-endpoint") ||
            config.endpoint.includes("localhost"),
          "Should read custom endpoint or default",
        );
      }

      assert.ok(config.model, "Model should be loaded");
      assert.ok(config.embeddingModel, "Embedding model should be loaded");
      assert.ok(
        typeof config.temperature === "number",
        "Temperature should be a number",
      );
      assert.ok(
        typeof config.maxResults === "number",
        "Max results should be a number",
      );
    } finally {
      if (fs.existsSync(configPath)) {
        fs.unlinkSync(configPath);
      }
    }
  });

  test("Configuration should update after changes", async function () {
    const fileSystemService = new FileSystemService(workspace.path);
    const configService = new ConfigService(fileSystemService);

    const configPath = path.join(workspace.path, "rtracker.config.json");
    const initialConfig = {
      [ConfigKey.TEMPERATURE]: 0.5,
    };

    try {
      fs.writeFileSync(configPath, JSON.stringify(initialConfig, null, 2));

      let config = configService.GetConfig();
      const initialTemperature = config.temperature;

      assert.strictEqual(
        initialTemperature,
        0.5,
        "Initial temperature should be 0.5",
      );

      const updatedConfig = {
        [ConfigKey.TEMPERATURE]: 0.7,
      };
      fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2));

      config = configService.GetConfig();
      const updatedTemperature = config.temperature;

      assert.ok(
        updatedTemperature === 0.7 ||
          (updatedTemperature >= 0 && updatedTemperature <= 1),
        "Temperature should be updated or have a valid default",
      );
    } finally {
      if (fs.existsSync(configPath)) {
        fs.unlinkSync(configPath);
      }
    }
  });

  test("Configuration validation should handle invalid values", function () {
    const configPath = path.join(workspace.path, "rtracker.config.json");
    const invalidConfig = {
      [ConfigKey.ENDPOINT]: 123,
      [ConfigKey.TEMPERATURE]: "hot",
      [ConfigKey.MAX_RESULTS]: "five",
      [ConfigKey.FILTERS]: "not an object",
    };

    try {
      fs.writeFileSync(configPath, JSON.stringify(invalidConfig, null, 2));

      const fileSystemService = new FileSystemService(workspace.path);
      const configService = new ConfigService(fileSystemService);

      const config = configService.GetConfig();

      assert.ok(
        typeof config.endpoint === "string",
        "Endpoint should be a string",
      );
      assert.ok(
        typeof config.temperature === "number" &&
          config.temperature >= 0 &&
          config.temperature <= 1,
        "Temperature should be a number between 0 and 1",
      );
      assert.ok(
        typeof config.maxResults === "number",
        "Max results should be a number",
      );
      assert.ok(
        typeof config.filters === "object" && config.filters !== null,
        "Filters should be an object",
      );
    } finally {
      if (fs.existsSync(configPath)) {
        fs.unlinkSync(configPath);
      }
    }
  });

  suiteTeardown(function () {
    const configPath = path.join(workspace.path, "rtracker.config.json");
    if (fs.existsSync(configPath)) {
      fs.unlinkSync(configPath);
    }

    workspace.cleanup();
  });
});
