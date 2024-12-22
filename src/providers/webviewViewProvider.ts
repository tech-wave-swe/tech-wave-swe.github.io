import * as vscode from "vscode";
import { DocumentManager } from "../models";

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

    return `<!DOCTYPE html>
			  <html lang="en">
			  <head>
				  <meta charset="UTF-8">
				  <meta http-equiv="Content-Security-Policy" content="default-src 'none';
			style-src ${webview.cspSource};
			script-src 'nonce-${nonce}';">
				  <meta name="viewport" content="width=device-width, initial-scale=1.0">
				  <link href="${styleResetUri}" rel="stylesheet">
				  <link href="${styleVSCodeUri}" rel="stylesheet">
				  <link href="${styleMainUri}" rel="stylesheet">
				  <title>Requirement Tracker</title>
			  </head>
			  <body>
				  <h1>Requirement Tracker</h1>
				  <label for="myfile">Select a file to insert the requirements:</label>
				  <input type="file" id="requirements-file-input" name="requirements-file-input">
				  <button id="requirements-confirmation-button">Apply requirements</button>
				  <table id="requirements-table"></table>
				  <script nonce="${nonce}" src="${scriptUri}"></script>
			  </body>
			  </html>`;
  }
}
