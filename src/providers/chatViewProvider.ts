import * as vscode from "vscode";
import * as fs from "fs";
import { StateManager } from "../stateManager";
import { interrogateOllama } from "../client";
import { Config } from "../config";

export class ChatViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "requirementsTracker.chatView";
  private _view?: vscode.WebviewView;
  private stateManager: StateManager;
  private static instance: ChatViewProvider | null = null;

  constructor(private readonly _extensionUri: vscode.Uri) {
    this.stateManager = StateManager.getInstance();
    ChatViewProvider.instance = this;
  }

  public static getInstance(): ChatViewProvider | null {
    return ChatViewProvider.instance;
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    const existingMessages = this.stateManager.getChatMessages();
    if (existingMessages.length > 0) {
      webviewView.webview.postMessage({
        type: "syncMessages",
        messages: existingMessages,
      });
    }

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "sendMessage":
          await this.handleNewMessage(data.message);
          break;
        case "confirmClearHistory":
          await this.handleClearHistory();
          break;
      }
    });
  }

  private async handleClearHistory() {
    const choice = await vscode.window.showQuickPick(["Yes", "No"], {
      title: "Are you sure you want to clear the chat history?",
    });
    if (choice === "Yes") {
      await this.stateManager.updateChatMessages([]);

      if (this._view) {
        this._view.webview.postMessage({
          type: "clearHistoryConfirmed",
        });
      }

      vscode.window.showInformationMessage("Chat history cleared.");
    }
  }

  public async handleNewMessage(message: string) {
    try {
      const messages = this.stateManager.getChatMessages();

      messages.push({
        sender: "You",
        text: message,
        timestamp: new Date().toISOString(),
      });

      await this.stateManager.updateChatMessages(messages);

      if (this._view) {
        this._view.webview.postMessage({
          type: "newMessage",
          message: messages[messages.length - 1],
        });
      }

      await this.handleAIResponse(message);
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to save message: ${error}`);
    }
  }

  private async handleAIResponse(userMessage: string) {
    try {
      const messages = this.stateManager.getChatMessages();
      const config = Config.getInstance();

      messages.push({
        sender: config.model,
        text: "Thinking...",
        timestamp: new Date().toISOString(),
      });

      console.log("Updating chat messages:", messages);

      await this.stateManager.updateChatMessages(messages);
      const messageIndex = messages.length - 1;

      let currentText = "";

      if (this._view) {
        this._view.webview.postMessage({
          type: "newMessage",
          message: messages[messages.length - 1],
        });
      }
      const handleToken = async (token: string) => {
        currentText += token;
        messages[messageIndex].text = currentText;

        await this.stateManager.updateChatMessages(messages);

        if (this._view) {
          this._view.webview.postMessage({
            type: "updateMessage",
            index: messageIndex,
            text: currentText,
          });
        }
      };

      await interrogateOllama(userMessage, handleToken);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to get AI response";

      if (this._view) {
        this._view.webview.postMessage({
          type: "error",
          message: errorMessage,
        });
      }

      const messages = this.stateManager.getChatMessages();
      if (messages.length > 0) {
        messages[messages.length - 1].text = `Error: ${errorMessage}`;
        await this.stateManager.updateChatMessages(messages);
      }

      vscode.window.showErrorMessage(`Chat AI Error: ${errorMessage}`);
    }
  }

  private getNonce() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "chatHandler.js"),
    );
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"),
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"),
    );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "main.css"),
    );

    const nonce = this.getNonce();

    const htmlPath = vscode.Uri.joinPath(
      this._extensionUri,
      "media",
      "chat.html",
    ).fsPath;
    let html = fs.readFileSync(htmlPath, "utf8");

    html = html
      .replace("{{styleSrc}}", webview.cspSource)
      .replace(/{{nonce}}/g, nonce)
      .replace("{{scriptUri}}", scriptUri.toString())
      .replace("{{styleResetUri}}", styleResetUri.toString())
      .replace("{{styleVSCodeUri}}", styleVSCodeUri.toString())
      .replace("{{styleMainUri}}", styleMainUri.toString());

    return html;
  }
}
