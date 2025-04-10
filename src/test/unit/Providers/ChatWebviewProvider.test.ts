/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, jest } from "@jest/globals";
import { ChatWebviewProvider } from "../../../Providers/ChatWebviewProvider";
import { ChatService } from "../../../Services/ChatService";
import { InferenceService } from "../../../Services/InferenceService";
import { ChatWebView } from "../../../WebViews/ChatWebView";
import * as vscode from "vscode";
import { ChatMessage } from "../../../Models/ChatMessage";

jest.mock("path");

describe("ChatWebViewProvider", () => {
  let chatWebviewProvider: ChatWebviewProvider;
  let mockChatService: jest.Mocked<ChatService>;
  let mockInferenceService: jest.Mocked<InferenceService>;
  let mockChatWebView: jest.Mocked<ChatWebView>;
  let mockExtensionUri: jest.Mocked<vscode.Uri>;
  let mockWebviewView: jest.Mocked<vscode.WebviewView>;

  beforeEach(() => {
    mockChatService = {
      getMessages: jest.fn(),
      addMessage: jest.fn(),
      clearMessages: jest.fn(),
    } as unknown as jest.Mocked<ChatService>;

    mockInferenceService = {
      query: jest.fn(),
    } as unknown as jest.Mocked<InferenceService>;

    mockChatWebView = {
      getHtmlForWebview: jest.fn().mockReturnValue("<html>Mock Webview</html>"),
    } as unknown as jest.Mocked<ChatWebView>;

    mockExtensionUri = {
      fsPath: "mock/extension/path",
    } as unknown as jest.Mocked<vscode.Uri>;

    // Create a mock WebviewView
    mockWebviewView = {
      webview: {
        options: {},
        html: "",
        onDidReceiveMessage: jest.fn(),
        postMessage: jest.fn(),
      },
      onDidChangeVisibility: jest.fn(),
    } as unknown as jest.Mocked<vscode.WebviewView>;

    chatWebviewProvider = new ChatWebviewProvider(
      mockChatService,
      mockInferenceService,
      mockChatWebView,
      mockExtensionUri,
    );
  });

  describe("constructor", () => {
    it("should initialize with provided service and URI", () => {
      const provider = new ChatWebviewProvider(
        mockChatService,
        mockInferenceService,
        mockChatWebView,
        mockExtensionUri,
      );

      expect(provider).toBeTruthy();
    });
  });

  describe("resolveWebviewView", () => {
    it("should configure webview and load chat history", async () => {
      const mockMessages: ChatMessage[] = [
        { sender: "user", text: "Hello", timestamp: Date.now() },
        { sender: "model", text: "Hi there", timestamp: Date.now() },
      ];

      mockChatService.getMessages.mockResolvedValue(mockMessages);

      // Call resolveWebviewView
      chatWebviewProvider.resolveWebviewView(
        mockWebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      // Wait for async operations
      await new Promise((resolve) => setTimeout(resolve, 0));

      // Verify webview configuration
      expect(mockWebviewView.webview.options).toEqual({
        enableScripts: true,
        localResourceRoots: expect.any(Array),
      });

      // Verify HTML was set
      expect(mockChatWebView.getHtmlForWebview).toHaveBeenCalledWith(
        mockWebviewView.webview,
      );

      // Verify messages were sent to webview
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setHistory",
        messages: mockMessages,
      });
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: false,
      });
    });

    it("should handle empty chat history", async () => {
      mockChatService.getMessages.mockResolvedValue([]);

      // Call resolveWebviewView
      chatWebviewProvider.resolveWebviewView(
        mockWebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      // Wait for async operations
      await new Promise((resolve) => setTimeout(resolve, 0));

      // Verify loading was set to false
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: false,
      });
    });
  });

  describe("_onSendMessage", () => {
    it("should send user message and get model response", async () => {
      // Mock inference service response
      const mockResponse = "This is a model response";
      mockInferenceService.query.mockResolvedValue(mockResponse);
      mockChatService.getMessages.mockResolvedValue([]);

      // Manually call resolveWebviewView to set up the webview
      chatWebviewProvider.resolveWebviewView(
        mockWebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      // Simulate sending a message
      const message = {
        type: "sendMessage",
        text: "Hello, world!",
        dataType: undefined,
      };

      // Call _handleMessageFromWebview directly
      const handleMessageMethod = (
        chatWebviewProvider as any
      )._handleMessageFromWebview.bind(chatWebviewProvider);
      await handleMessageMethod(message);

      // Verify user message was added
      expect(mockChatService.addMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          sender: "user",
          text: "Hello, world!",
        }),
      );

      // Verify inference service was called
      expect(mockInferenceService.query).toHaveBeenCalledWith("Hello, world!");
      // Verify model message was added
      expect(mockChatService.addMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          sender: "model",
          text: mockResponse,
        }),
      );

      // Verify webview messages
      const postMessageCalls = mockWebviewView.webview.postMessage.mock.calls;
      expect(postMessageCalls).toContainEqual([
        { type: "setLoading", isLoading: true },
      ]);
      expect(postMessageCalls).toContainEqual([
        { type: "setLoading", isLoading: false },
      ]);
    });

    it("should handle inference service errors", async () => {
      // Mock an error in inference service
      const mockError = new Error("Connection failed");
      mockInferenceService.query.mockRejectedValue(mockError);
      mockChatService.getMessages.mockResolvedValue([]);

      // Manually call resolveWebviewView to set up the webview
      chatWebviewProvider.resolveWebviewView(
        mockWebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      // Simulate sending a message
      const message = {
        type: "sendMessage",
        text: "Hello, world!",
        dataType: undefined,
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        chatWebviewProvider as any
      )._handleMessageFromWebview.bind(chatWebviewProvider);
      await handleMessageMethod(message);

      // Verify error handling
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "error",
        message: "Error: Connection failed",
      });

      // Verify loading was set back to false
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: false,
      });
    });

    it("should handle unknown errors", async () => {
      // Mock an error in inference service
      const mockError = { message: "Something went wrong", code: 500 };
      mockInferenceService.query.mockRejectedValue(mockError);
      mockChatService.getMessages.mockResolvedValue([]);

      // Manually call resolveWebviewView to set up the webview
      chatWebviewProvider.resolveWebviewView(
        mockWebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      // Simulate sending a message
      const message = {
        type: "sendMessage",
        text: "Hello, world!",
        dataType: undefined,
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        chatWebviewProvider as any
      )._handleMessageFromWebview.bind(chatWebviewProvider);
      await handleMessageMethod(message);

      // Verify error handling
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "error",
        message: "Error: Unknown error",
      });

      // Verify loading was set back to false
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: false,
      });
    });
  });

  describe("_onClearHistory", () => {
    it("should clear chat history", async () => {
      mockChatService.getMessages.mockResolvedValue([]);

      // Manually call resolveWebviewView to set up the webview
      chatWebviewProvider.resolveWebviewView(
        mockWebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      // Simulate clear history message
      const message = { type: "clearHistory" };

      // Use reflection to call private method
      const handleMessageMethod = (
        chatWebviewProvider as any
      )._handleMessageFromWebview.bind(chatWebviewProvider);
      await handleMessageMethod(message);

      // Verify chat service clear method was called
      expect(mockChatService.clearMessages).toHaveBeenCalled();

      // Verify webview received clear history message
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "clearHistory",
      });
    });
  });

  describe("_onDidReceiveMessage", () => {
    it("should handle message", async () => {
      const handleMessageMethod = jest.spyOn(
        chatWebviewProvider as any,
        "_handleMessageFromWebview",
      );
      mockChatService.getMessages.mockResolvedValue([]);

      // Manually resolve the webview view to set up events
      chatWebviewProvider.resolveWebviewView(
        mockWebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      // Get the message handler that was registered
      const messageHandler =
        mockWebviewView.webview.onDidReceiveMessage.mock.calls[0][0];

      // Create a test message
      const testMessage = { type: "sendMessage", text: "Hello" };

      // Manually trigger the message event
      await messageHandler(testMessage);

      // Verify that _handleMessageFromWebview was called with the correct message
      expect(handleMessageMethod).toHaveBeenCalledWith(testMessage);
    });
  });
});
