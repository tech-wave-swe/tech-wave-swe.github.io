import * as vscode from "vscode";
import { interrogateOllama } from "./client";
import { DocumentManager } from "./models";
import { Config } from "./config";

export function activate(context: vscode.ExtensionContext) {
  const provider = new RequirementsTrackerViewProvider(context.extensionUri);

  try {
    const config = Config.getInstance();
    config.getAllSettings();

    // vscode.window.showInformationMessage('All settings loaded successfully.');
  } catch (error) {
    if (error instanceof Error) {
      vscode.window.showErrorMessage(`Configuration Error: ${error.message}`);
    } else {
      vscode.window.showErrorMessage(
        "An unknown error occurred while loading settings.",
      );
    }
  }

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      RequirementsTrackerViewProvider.viewType,
      provider,
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "requirements-tracker.interrogate",
      async () => {
        const prompt = await vscode.window.showInputBox({
          prompt: "Enter the message to send to Ollama",
        });
        if (prompt) {
          vscode.window.showInformationMessage("Interrogating Ollama...");
          const response = await interrogateOllama(prompt);
          if (response !== "Error generating LLM response.") {
            vscode.window.showInformationMessage(response);
            return;
          }
          vscode.window.showInformationMessage("Failed to interrogate Ollama.");
        }
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("requirements-tracker.settings", () => {
      vscode.commands.executeCommand(
        "workbench.action.openSettings",
        "@ext:tech-wave-swe.requirements-tracker",
      );
    }),
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "requirements-tracker.debug-settings",
      async () => {
        const config = Config.getInstance();

        const settings = config.getAllSettings();

        vscode.window.showInformationMessage(JSON.stringify(settings));
      },
    ),
  );
}

class RequirementsTrackerViewProvider implements vscode.WebviewViewProvider {
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

    const nonce = getNonce();

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

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
