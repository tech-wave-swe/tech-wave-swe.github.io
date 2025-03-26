import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";
import ConfigService from "../../Services/ConfigService";
import { Config, ConfigKey } from "../../Models/Config";
import FileSystemService from "../../Services/FileSystemService";

describe("ConfigService Tests", () => {
  const extensionPath = path.join(__dirname, "../../../.vscode-test/"); // Adjust path based on your test file location
  let configService: ConfigService;
  let tempConfigPath: string;

  beforeEach(() => {
    configService = new ConfigService(new FileSystemService(extensionPath));

    // Create a temporary path for test configs
    tempConfigPath = path.join(extensionPath, "rtracker.config.json");
  });

  afterEach(() => {
    // Clean up any test config files after each test
    if (fs.existsSync(tempConfigPath)) {
      fs.unlinkSync(tempConfigPath);
    }
  });

  it("should load default values when no config file exists", () => {
    if (fs.existsSync(tempConfigPath)) {
      fs.unlinkSync(tempConfigPath);
    }

    const config = configService.GetConfig();

    assert.ok(config.endpoint, "Should have an endpoint");
    assert.ok(config.model, "Should have a model");
    assert.ok(config.embeddingModel, "Should have an embedding model");
    assert.ok(
      typeof config.temperature === "number",
      "Should have a temperature",
    );
    assert.ok(typeof config.maxResults === "number", "Should have maxResults");
    assert.ok(typeof config.chunkSize === "number", "Should have a chunkSize");
    assert.ok(
      typeof config.chunkOverlap === "number",
      "Should have a chunkOverlap",
    );
  });

  it("should load and merge local config values", () => {
    // Create a test config file
    const testConfig: Partial<Config> = {
      endpoint: "http://test-endpoint",
      model: "test-model",
      temperature: 0.7,
    };

    fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));

    const config = configService.GetConfig();

    // Check that our test values are loaded
    assert.strictEqual(config.endpoint, "http://test-endpoint");
    assert.strictEqual(config.model, "test-model");
    assert.strictEqual(config.temperature, 0.7);

    // These should still have default values
    assert.ok(config.embeddingModel, "Should have default embedding model");
    assert.ok(
      typeof config.maxResults === "number",
      "Should have default maxResults",
    );
    assert.ok(
      typeof config.chunkSize === "number",
      "Should have default chunkSize",
    );
    assert.ok(
      typeof config.chunkOverlap === "number",
      "Should have default chunkOverlap",
    );
  });

  it("should handle invalid JSON in config file", () => {
    fs.writeFileSync(tempConfigPath, "this is not valid JSON");

    const config = configService.GetConfig();

    assert.ok(config.endpoint, "Should have default endpoint");
    assert.ok(config.model, "Should have default model");
  });

  it("should ignore invalid config properties", () => {
    const testConfig = {
      endpoint: 123, // Should be string
      temperature: "hot", // Should be number
      invalidKey: "something",
    };

    fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));

    const config = configService.GetConfig();

    // Invalid properties should be ignored
    assert.ok(
      typeof config.endpoint === "string",
      "Should have default endpoint as string",
    );
    assert.ok(
      typeof config.temperature === "number",
      "Should have default temperature as number",
    );
  });
});
