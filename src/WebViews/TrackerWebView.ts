import * as vscode from "vscode";
import FileSystemService from "../Services/FileSystemService";

export class TrackerWebView {
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
        "tracker.html",
      ).fsPath;
      const html = this._fileSystemService.read(htmlPath);

      return this._parseHTML(html, webview);
    } catch (error) {
      console.error(error);
      vscode.window.showErrorMessage(`Failed to load tracker HTML file: ${error}`);
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
    const styleTrackerUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "tracker.css"),
    );
    const scriptTrackerUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "track.js"),
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

    console.log(styleCodiconsUri);

    const nonce = this.getNonce();

    // Replace placeholders in the HTML template
    return html
      .replace("{{styleSrc}}", webview.cspSource)
      .replace(/{{nonce}}/g, nonce)
      .replace("{{styleTrackerUri}}", styleTrackerUri.toString())
      .replace("{{styleResetUri}}", styleResetUri.toString())
      .replace("{{styleVSCodeUri}}", styleVSCodeUri.toString())
      .replace("{{styleCodiconsUri}}", styleCodiconsUri.toString())
      .replace("{{scriptTrackerUri}}", scriptTrackerUri.toString());
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
