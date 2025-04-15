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
      queryStream: jest.fn(),
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
    it("should configure webview without loading chat history", async () => {
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
      
      // Note: Loading chat history requires a "getMessageHistory" message from the webview
      // which is not being sent in this test, so no messages should be posted
    });

    it("should load chat history when requested", async () => {
      const mockMessages: ChatMessage[] = [
        { sender: "user", text: "Hello", timestamp: Date.now() },
        { sender: "model", text: "Hi there", timestamp: Date.now() },
      ];

      mockChatService.getMessages.mockResolvedValue(mockMessages);

      // Call resolveWebviewView to set up the webview
      chatWebviewProvider.resolveWebviewView(
        mockWebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      // Simulate the webview requesting message history
      const message = { type: "getMessageHistory" };
      
      // Get the message handler and call it directly
      const handleMessageMethod = (
        chatWebviewProvider as any
      )._handleMessageFromWebview.bind(chatWebviewProvider);
      await handleMessageMethod(message);

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

    it("should handle empty chat history when requested", async () => {
      mockChatService.getMessages.mockResolvedValue([]);

      // Call resolveWebviewView
      chatWebviewProvider.resolveWebviewView(
        mockWebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      // Simulate the webview requesting message history
      const message = { type: "getMessageHistory" };
      
      // Get the message handler and call it directly
      const handleMessageMethod = (
        chatWebviewProvider as any
      )._handleMessageFromWebview.bind(chatWebviewProvider);
      await handleMessageMethod(message);

      // Verify clearing was sent to webview
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "clearHistory",
      });
      
      // Verify loading was set to false
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: false,
      });
    });
    
    it("should handle errors when loading chat history", async () => {
      // Mock an error when getting messages
      const mockError = new Error("Database error");
      mockChatService.getMessages.mockRejectedValue(mockError);
      
      // Spy on console.error
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Call resolveWebviewView
      chatWebviewProvider.resolveWebviewView(
        mockWebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      // Reset mock calls before the test
      mockWebviewView.webview.postMessage.mockClear();
      
      // Simulate the webview requesting message history
      const message = { type: "getMessageHistory" };
      
      // Get the message handler and call it directly
      const handleMessageMethod = (
        chatWebviewProvider as any
      )._handleMessageFromWebview.bind(chatWebviewProvider);
      await handleMessageMethod(message);

      // Verify error was logged
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to load chat history:",
        mockError
      );
      
      // Verify clearing was sent to webview as fallback
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "clearHistory",
      });
      
      // Verify loading was set to false in finally block
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: false,
      });
      
      // Restore console.error
      consoleErrorSpy.mockRestore();
    });
  });

  describe("_onSendMessage", () => {
    it("should send user message and get model response", async () => {
      // Mock inference service streaming
      const mockResponse = "This is a model response";
      mockInferenceService.queryStream.mockImplementation((text: string, callback: (token: string) => void) => {
        // Call the callback to simulate streaming
        callback("This ");
        callback("is ");
        callback("a model ");
        callback("response");
        return Promise.resolve();
      });
      
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
      expect(mockInferenceService.queryStream).toHaveBeenCalledWith(
        "Hello, world!",
        expect.any(Function)
      );
      
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
      
      // Verify initial empty message was sent
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "addMessage",
        message: expect.objectContaining({
          sender: "model",
          text: "",
        }),
      });
      
      // Verify updateMessage was called with final text
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "updateMessage",
        message: expect.objectContaining({
          sender: "model",
          text: mockResponse,
        }),
      });
    });

    it("should handle inference service errors", async () => {
      // Call resolveWebviewView to set up the webview
      chatWebviewProvider.resolveWebviewView(
        mockWebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      // Mock an error in inference service
      const mockError = new Error("Connection failed");
      mockInferenceService.queryStream.mockImplementationOnce(() => {
        throw mockError;
      });

      // Simulate sending a message
      const message = {
        type: "sendMessage",
        text: "Hello, world!",
      };

      // Call _handleMessageFromWebview directly
      const handleMessageMethod = (
        chatWebviewProvider as any
      )._handleMessageFromWebview.bind(chatWebviewProvider);
      await handleMessageMethod(message);

      // Verify error handling - note that the implementation wraps the error text in an object
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "error",
        message: {
          text: "Error: Connection failed"
        },
      });

      // Verify loading was set back to false
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: false,
      });
    });

    it("should handle unknown errors", async () => {
      // Call resolveWebviewView to set up the webview
      chatWebviewProvider.resolveWebviewView(
        mockWebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      // Mock an error in inference service with a non-Error object
      const mockError = { some: "unknown error" };
      mockInferenceService.queryStream.mockImplementationOnce(() => {
        throw mockError;
      });

      // Simulate sending a message
      const message = {
        type: "sendMessage",
        text: "Hello, world!",
      };

      // Call _handleMessageFromWebview directly
      const handleMessageMethod = (
        chatWebviewProvider as any
      )._handleMessageFromWebview.bind(chatWebviewProvider);
      await handleMessageMethod(message);

      // Verify error handling - note that the implementation wraps the error text in an object
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "error",
        message: {
          text: "Error: Unknown error"
        },
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
