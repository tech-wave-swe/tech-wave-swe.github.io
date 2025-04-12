import * as vscode from "vscode";
import { InferenceService } from "../Services/InferenceService";
import { ChatMessage } from "../Models/ChatMessage";
import { WebviewView } from "vscode";
import path from "path";
import { ChatService } from "../Services/ChatService";
import { ChatWebView } from "../WebViews/ChatWebView";

export class ChatWebviewProvider implements vscode.WebviewViewProvider {
  private _webviewView?: vscode.WebviewView;
  private _inferenceService: InferenceService;
  private _chatWebView: ChatWebView;
  private readonly _extensionUri: vscode.Uri;
  private _chatService: ChatService;

  constructor(
    chatService: ChatService,
    inferenceService: InferenceService,
    chatWebView: ChatWebView,
    extensionUri: vscode.Uri,
  ) {
    this._extensionUri = extensionUri;
    this._chatService = chatService;
    this._inferenceService = inferenceService;
    this._chatWebView = chatWebView;
  }

  public async resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ): Promise<void> {
    this._webviewViewConfigure(webviewView);
    this._webviewViewHandleEvents(webviewView);

    this._webviewView = webviewView;

    // Set initial loading state
    this._sendMessageToWebview({ type: "setLoading", isLoading: true });

    try {
      // Load chat history
      const messages = await this._chatService.getMessages();
      if (messages.length > 0) {
        this._sendMessageToWebview({ type: "setHistory", messages });
      } else {
        this._sendMessageToWebview({ type: "clearHistory" });
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
      this._sendMessageToWebview({ type: "clearHistory" });
    } finally {
      this._sendMessageToWebview({ type: "setLoading", isLoading: false });
    }
  }

  private _webviewViewConfigure(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        this._extensionUri,
        vscode.Uri.file(path.join(this._extensionUri.fsPath, "node_modules")),
      ],
    };

    webviewView.webview.html = this._chatWebView.getHtmlForWebview(
      webviewView.webview,
    );
  }

  private _webviewViewHandleEvents(webviewView: WebviewView) {
    webviewView.webview.onDidReceiveMessage(async (message) => {
      await this._handleMessageFromWebview(message);
    });
  }

  private async _handleMessageFromWebview(message: {
    type: string;
    text: string;
  }): Promise<void> {
    switch (message.type) {
      case "sendMessage": {
        await this._onSendMessage(message);
        break;
      }

      case "clearHistory":
        await this._onClearHistory();
        break;
    }
  }

  private async _onSendMessage(message: { type: string; text: string }) {
    const userMessage: ChatMessage = {
      sender: "user",
      text: message.text,
      timestamp: Date.now(),
    };

    await this._chatService.addMessage(userMessage);
    this._sendMessageToWebview({ type: "addMessage", message: userMessage });

    // Show a loading indicator
    this._sendMessageToWebview({ type: "setLoading", isLoading: true });

    let accumulatedText = "";
    const timestamp = Date.now();

    try {
      // Create and add initial empty model message
      const initialMessage: ChatMessage = {
        sender: "model",
        text: "",
        timestamp: timestamp,
      };
      this._sendMessageToWebview({
        type: "addMessage",
        message: initialMessage,
      });

      // Start streaming updates
      await this._inferenceService.queryStream(
        message.text,
        (token: string) => {
          accumulatedText += token;

          // Update the existing message with new content
          const modelMessage: ChatMessage = {
            sender: "model",
            text: accumulatedText,
            timestamp: timestamp,
          };
          this._sendMessageToWebview({
            type: "updateMessage",
            message: modelMessage,
          });
        },
      );

      // Save the final message to chat history
      const finalMessage: ChatMessage = {
        sender: "model",
        text: accumulatedText,
        timestamp: timestamp,
      };
      await this._chatService.addMessage(finalMessage);
    } catch (error) {
      this._sendMessageToWebview({
        type: "error",
        message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    } finally {
      this._sendMessageToWebview({ type: "setLoading", isLoading: false });
    }
  }

  private async _onClearHistory() {
    await this._chatService.clearMessages();
    this._sendMessageToWebview({ type: "clearHistory" });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _sendMessageToWebview(message: any): void {
    if (this._webviewView) {
      this._webviewView.webview.postMessage(message);
    }
  }
}
