import * as assert from "assert";
import * as vscode from "vscode";
import {ChatMessage} from "../../Models/ChatMessage";
import {GlobalStateService, StateKeys} from "../../Services/GlobalStateService";

describe("GlobalStateService Tests", () => {
  let globalStateService: GlobalStateService;

  before(async () => {
    const extension = vscode.extensions.getExtension(
      "tech-wave-swe.requirements-tracker",
    );

    if (!extension) {
      throw new Error(
        "Extension not found - make sure the extension ID is correct",
      );
    }

    const api = await extension.activate();
    if (!api || typeof api.getContext !== "function") {
      throw new Error("Extension API not properly exposed");
    }

    globalStateService = new GlobalStateService(api.context);
  });

  afterEach(async () => {
    // Clean up after each test
    await globalStateService.clearState(StateKeys.CHAT_MESSAGES);
  });

  it("should return empty array when no items exist", async () => {
    const values = globalStateService.getState(StateKeys.CHAT_MESSAGES);
    assert.deepStrictEqual(values, []);
  });

  it("should store and retrieve item from global state", async () => {
    const testMessages: ChatMessage[] = [
      { sender: "user", text: "Hello", timestamp: Date.now() },
      { sender: "model", text: "Hi there!", timestamp: Date.now() + 100 },
    ];

    await globalStateService.updateState(StateKeys.CHAT_MESSAGES, testMessages);

    const retrieved = globalStateService.getState(StateKeys.CHAT_MESSAGES);

    assert.deepStrictEqual(retrieved, testMessages);
  });

  it("should clear item properly", async () => {
    const testMessage: ChatMessage = {
      sender: "user",
      text: "Test message",
      timestamp: Date.now(),
    };

    await globalStateService.updateState(StateKeys.CHAT_MESSAGES, [testMessage]);

    let messages = globalStateService.getState(StateKeys.CHAT_MESSAGES);
    assert.strictEqual(messages.length, 1);

    await globalStateService.clearState(StateKeys.CHAT_MESSAGES);

    messages = globalStateService.getState(StateKeys.CHAT_MESSAGES);
    assert.deepStrictEqual(messages, []);
  });
});
