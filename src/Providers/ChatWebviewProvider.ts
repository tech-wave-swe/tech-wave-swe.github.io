import * as vscode from "vscode";
import { InferenceService } from "../Services/InferenceService";
import { ChatMessage } from "../Models/ChatMessage";
import {WebviewView} from "vscode";
import path from "path";
import {ChatService} from "../Services/ChatService";
import {ChatWebView} from "../WebViews/ChatWebView";

export class ChatWebviewProvider implements vscode.WebviewViewProvider {
  private _webviewView?: vscode.WebviewView;
  private _inferenceService: InferenceService;
  private readonly _extensionUri: vscode.Uri;
  private _chatWebView: ChatWebView;

  private _chatService: ChatService;

  constructor(chatService: ChatService, inferenceService: InferenceService, extensionUri: vscode.Uri) {
    this._extensionUri = extensionUri;
    this._chatService = chatService;
    this._inferenceService = inferenceService;
    this._chatWebView = new ChatWebView(extensionUri);
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ): void {

    this._webviewViewConfigure(webviewView);
    this._webviewViewHandleEvents(webviewView);

    this._webviewView = webviewView;

    // Load chat history
    this._chatService.getMessages().then((messages) => {
      if (messages.length > 0) {
        this._sendMessageToWebview({ type: "setHistory", messages });
        this._sendMessageToWebview({ type: "setLoading", isLoading: false });
      } else {
        this._sendMessageToWebview({ type: "setLoading", isLoading: false });
      }
    });
  }

  private _webviewViewConfigure(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri, vscode.Uri.file(path.join(this._extensionUri.fsPath, 'node_modules')),],
    };

    webviewView.webview.html = this._chatWebView.getHtmlForWebview(webviewView.webview);
  }

  private _webviewViewHandleEvents(webviewView: WebviewView) {
    webviewView.webview.onDidReceiveMessage(async (message) => {
      await this._handleMessageFromWebview(message);
    });
  }

  private async _handleMessageFromWebview(message: { type: string; text: string; dataType: string | undefined; }): Promise<void> {
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

  private async _onSendMessage(message: {
    type: string;
    text: string;
    dataType: string | undefined;
  }) {
    const userMessage: ChatMessage = {
      sender: "user",
      text: message.text,
      timestamp: Date.now(),
    };

    await this._chatService.addMessage(userMessage);
    this._sendMessageToWebview({ type: "addMessage", message: userMessage });

    // Show a loading indicator
    this._sendMessageToWebview({ type: "setLoading", isLoading: true });

    try {
      // Get response from the inference service
      const response = await this._inferenceService.query(
        message.text,
        message.dataType,
      );

      const modelMessage: ChatMessage = {
        sender: "model",
        text: response,
        timestamp: Date.now(),
      };

      await this._chatService.addMessage(modelMessage);
      this._sendMessageToWebview({
        type: "addMessage",
        message: modelMessage,
      });

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

  private _sendMessageToWebview(message: any): void {
    if (this._webviewView) {
      this._webviewView.webview.postMessage(message);
    }
  }
}
