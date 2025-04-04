import * as vscode from "vscode";
import FileSystemService from "../Services/FileSystemService";

export class ChatWebView {
  private readonly _extensionUri: vscode.Uri;
  private readonly _fileSystemService: FileSystemService;

  constructor(extensionUri: vscode.Uri, fileSystemService: FileSystemService) {
    this._extensionUri = extensionUri;
    this._fileSystemService = fileSystemService;
  }

  public getHtmlForWebview(webview: vscode.Webview): string {
    try {
      const htmlPath = vscode.Uri.joinPath(
        this._extensionUri,
        "media",
        "chat.html",
      ).fsPath;
      const html = this._fileSystemService.read(htmlPath);

      return this._parseHTML(html, webview);
    } catch (error) {

      console.error(error);
      vscode.window.showErrorMessage(`Failed to load chat HTML file: ${error}`)
      return "";
    }
  }

  private _parseHTML(html: string, webview: vscode.Webview): string {
    // Get webview URIs for various resources
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"),
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"),
    );
    const styleChatUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "chat.css"),
    );
    const styleCodiconsUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "node_modules",
        "@vscode/codicons",
        "dist",
        "codicon.css",
      ),
    );
    const scriptChatUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "chat.js"),
    );

    const nonce = this.getNonce();

    // Replace placeholders in the HTML template
    return html
      .replace("{{styleSrc}}", webview.cspSource)
      .replace(/{{nonce}}/g, nonce)
      .replace("{{styleChatUri}}", styleChatUri.toString())
      .replace("{{styleResetUri}}", styleResetUri.toString())
      .replace("{{styleVSCodeUri}}", styleVSCodeUri.toString())
      .replace("{{styleCodiconsUri}}", styleCodiconsUri.toString())
      .replace("{{scriptChatUri}}", scriptChatUri.toString());
  }

  public getNonce(): string {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
