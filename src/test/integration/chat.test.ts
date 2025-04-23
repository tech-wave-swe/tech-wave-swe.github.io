/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from "assert";
import * as sinon from "sinon";
import * as vscode from "vscode";
import { ChatMessage } from "../../Models/ChatMessage";
import { ChatService } from "../../Services/ChatService";
import { InferenceService } from "../../Services/InferenceService";
import { ChatWebviewProvider } from "../../Providers/ChatWebviewProvider";
import {
  GlobalStateService,
  StateKeys,
} from "../../Services/GlobalStateService";
import { setupTestServices } from "../testSetup";
import { TestWorkspace } from "../testWorkspace";
import { ILanguageModel } from "../../Interfaces/ILanguageModel";

const TEST_TIMEOUT = 5000;

suite("Chat Integration Tests", () => {
  let workspace: TestWorkspace;
  let chatService: ChatService;
  let inferenceService: InferenceService;
  let globalStateService: GlobalStateService;
  let mockWebviewPanel: {
    webview: {
      postMessage: sinon.SinonStub;
      onDidReceiveMessage: sinon.SinonStub;
    };
  };
  let chatWebviewProvider: ChatWebviewProvider;
  let mockLanguageModel: ILanguageModel;
  let sandbox: sinon.SinonSandbox;
  let extension: vscode.Extension<any>;
  let services: any;

  suiteSetup(async function () {
    this.timeout(10000);

    try {
      workspace = new TestWorkspace();
      await workspace.setup();

      services = await setupTestServices(workspace.path);
      chatService = services.chatService;
      inferenceService = services.inferenceService;

      extension = vscode.extensions.getExtension(
        "tech-wave-swe.requirements-tracker",
      )!;

      if (!extension) {
        console.error("Extension not found");
        throw new Error("Extension not found");
      }

      await extension.activate();
      globalStateService = new GlobalStateService(
        extension.exports.getContext().workspaceState,
      );
    } catch (error) {
      console.error("Suite setup error:", error);
      throw error;
    }
  });

  setup(function () {
    this.timeout(TEST_TIMEOUT);

    sandbox = sinon.createSandbox();

    mockWebviewPanel = {
      webview: {
        postMessage: sandbox.stub().resolves(),
        onDidReceiveMessage: sandbox.stub().callsFake((callback) => {
          (mockWebviewPanel as any)._messageCallback = callback;
          return { dispose: () => {} };
        }),
      },
    };

    mockLanguageModel = {
      checkModelAvailability: sandbox.stub().resolves(true),
      pullModel: sandbox.stub().resolves(true),
      generate: sandbox
        .stub()
        .callsFake(async (prompt: string) => `Mock response for: ${prompt}`),
      generateStream: sandbox
        .stub()
        .callsFake(
          async (
            prompt: string,
            context: string,
            onToken: (token: string) => void,
          ) => {
            onToken("This ");
            onToken("is ");
            onToken("a ");
            onToken("streamed ");
            onToken("response.");
            return Promise.resolve();
          },
        ),
      generateEmbeddings: sandbox.stub().resolves([0.1, 0.2, 0.3]),
      refreshModels: sandbox.stub().resolves(),
    };

    inferenceService = new InferenceService(
      mockLanguageModel,
      services.vectorDatabase,
    );

    const mockChatWebView = {
      getHtmlForWebview: () => "<html><body>Mock HTML</body></html>",
      sendMessageToWebview: sandbox.stub().resolves(),
    };

    chatWebviewProvider = new ChatWebviewProvider(
      chatService,
      inferenceService,
      mockChatWebView as any,
      extension.extensionUri,
    );

    (chatWebviewProvider as any)._webviewView = mockWebviewPanel;

    mockWebviewPanel.webview.postMessage.resolves(true);
  });

  teardown(() => {
    sandbox.restore();
  });

  test("Should add and retrieve chat messages from global storage", async function () {
    this.timeout(TEST_TIMEOUT);

    await chatService.clearMessages();

    const message: ChatMessage = {
      sender: "user",
      text: "How is the authentication implemented?",
      timestamp: Date.now(),
    };

    await chatService.addMessage(message);
    const messages = await chatService.getMessages();

    assert.strictEqual(messages.length, 1);
    assert.strictEqual(messages[0].text, message.text);

    const storedMessages = globalStateService.getState(
      StateKeys.CHAT_MESSAGES,
    ) as ChatMessage[];

    assert.ok(
      Array.isArray(storedMessages),
      "Stored messages should be an array",
    );
    assert.strictEqual(storedMessages.length, 1);
    assert.strictEqual(storedMessages[0].text, message.text);
  });

  test("Should handle webview message: sendMessage", async function () {
    this.timeout(TEST_TIMEOUT);

    const message = {
      type: "sendMessage",
      text: "How does the login system work?",
    };

    const handleMessageMethod = (
      chatWebviewProvider as any
    )._handleMessageFromWebview.bind(chatWebviewProvider);

    await handleMessageMethod(message);

    assert.ok(
      mockWebviewPanel.webview.postMessage.called,
      "postMessage should have been called",
    );

    const userMessage: ChatMessage = {
      sender: "user",
      text: message.text,
      timestamp: Date.now(),
    };
    await chatService.addMessage(userMessage);

    const messages = await chatService.getMessages();
    assert.ok(messages.length > 0, "Messages should be stored");

    const foundMessage = messages.find((m) => m.text === message.text);
    assert.ok(foundMessage, "Message with text should exist in storage");
  });

  test("Should handle webview message: getMessageHistory", async function () {
    this.timeout(TEST_TIMEOUT);

    await chatService.clearMessages();
    const message1: ChatMessage = {
      sender: "user",
      text: "First message",
      timestamp: 1000,
    };
    const message2: ChatMessage = {
      sender: "model",
      text: "Model response",
      timestamp: 2000,
    };
    await chatService.addMessage(message1);
    await chatService.addMessage(message2);

    const message = { type: "getMessageHistory" };

    const handleMessageMethod = (
      chatWebviewProvider as any
    )._handleMessageFromWebview.bind(chatWebviewProvider);

    await handleMessageMethod(message);

    assert.ok(
      mockWebviewPanel.webview.postMessage.called,
      "postMessage should have been called",
    );
  });

  test("Should handle webview message: clearHistory", async function () {
    this.timeout(TEST_TIMEOUT);

    await chatService.clearMessages();
    const message: ChatMessage = {
      sender: "user",
      text: "Test message",
      timestamp: Date.now(),
    };
    await chatService.addMessage(message);

    mockWebviewPanel.webview.postMessage.callsFake((msg) => {
      assert.strictEqual(msg.type, "clearHistory");
      return Promise.resolve(true);
    });

    const clearMessage = { type: "clearHistory" };

    const handleMessageMethod = (
      chatWebviewProvider as any
    )._handleMessageFromWebview.bind(chatWebviewProvider);

    await handleMessageMethod(clearMessage);

    assert.ok(
      mockWebviewPanel.webview.postMessage.called,
      "postMessage should have been called",
    );

    const messages = await chatService.getMessages();
    assert.strictEqual(messages.length, 0);
  });

  test("Should handle calls to Ollama for generating responses", async function () {
    this.timeout(TEST_TIMEOUT);

    const queryStub = sandbox
      .stub(services.vectorDatabase, "queryForChunks")
      .resolves([
        {
          content: "Example content for testing",
          file_path: "test_file.js",
          similarity: 0.95,
        },
      ]);

    const question = "Explain the login functionality";
    const response = await inferenceService.query(question);

    assert.ok(queryStub.called, "Database query should have been called");

    assert.ok(
      (mockLanguageModel.generate as sinon.SinonStub).called,
      "generate should have been called",
    );

    assert.ok(response, "Response should exist");
    assert.strictEqual(
      typeof response,
      "string",
      "Response should be a string",
    );
    assert.ok(
      response.includes("Mock response for:"),
      "Response should contain expected text",
    );
  });

  test("Should handle streaming from Ollama", async function () {
    this.timeout(TEST_TIMEOUT);

    const message = {
      type: "sendMessage",
      text: "How does streaming work?",
    };

    const handleMessageMethod = (
      chatWebviewProvider as any
    )._handleMessageFromWebview.bind(chatWebviewProvider);

    await handleMessageMethod(message);

    assert.ok(
      (mockLanguageModel.generateStream as sinon.SinonStub).called,
      "generateStream should have been called",
    );

    const userMessage: ChatMessage = {
      sender: "user",
      text: message.text,
      timestamp: Date.now(),
    };

    await chatService.addMessage(userMessage);

    const messages = await chatService.getMessages();
    assert.ok(
      messages.some((m) => m.text === message.text),
      "User message should be stored",
    );
  });

  test("Should handle error in Ollama response", async function () {
    this.timeout(TEST_TIMEOUT);

    const errorStub = sandbox.stub().rejects(new Error("Service unavailable"));

    const originalQueryStream = inferenceService.queryStream;

    inferenceService.queryStream = errorStub;

    mockWebviewPanel.webview.postMessage.reset();
    let errorMessageSent = false;

    mockWebviewPanel.webview.postMessage.callsFake((msg) => {
      if (msg.type === "error") {
        errorMessageSent = true;
      }
      return Promise.resolve(true);
    });

    const message = {
      type: "sendMessage",
      text: "This will cause an error",
    };

    try {
      await chatWebviewProvider["_handleMessageFromWebview"](message);

      assert.ok(errorMessageSent, "An error message should have been sent");
    } finally {
      inferenceService.queryStream = originalQueryStream;
    }
  });

  suiteTeardown(async function () {
    this.timeout(10000);
    workspace.cleanup();
  });
});
