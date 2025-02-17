import * as vscode from "vscode";
import { DocumentManager } from "../models";
import * as fs from "fs";

export class RequirementsTrackerViewProvider
  implements vscode.WebviewViewProvider
{
  public static readonly viewType = "requirementsTracker.trackerView";
  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

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

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "warning":
          vscode.window.showWarningMessage(
            "Requirements Tracker: " + data.message,
          );
          break;
        case "error":
          vscode.window.showErrorMessage(
            "Requirements Tracker: " + data.message,
          );
          break;
        case "addDocuments":
          await this._handleAddDocuments(data.documents);
          break;
        default:
          console.warn(
            `Requirements Tracker: Unknown message type: ${data.type}`,
          );
      }
    });
  }

  private async _handleAddDocuments(documents: Record<string, string>[]) {
    if (!documents || !Array.isArray(documents)) {
      console.error("Invalid documents data");
      return;
    }

    for (const doc of documents) {
      const id =
        doc.id ||
        `doc-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      const content = JSON.stringify(doc);

      try {
        const documentManager = DocumentManager.getInstance();
        await documentManager.addDocumentFromText(id, content);
        console.log(`Document '${id}' added successfully.`);
      } catch (error) {
        console.error(`Failed to add document '${id}':`, error);
      }
    }

    vscode.window.showInformationMessage(
      `${documents.length} document(s) were added successfully.`,
    );
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
      vscode.Uri.joinPath(this._extensionUri, "media", "main.js"),
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
      "tracker.html",
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
