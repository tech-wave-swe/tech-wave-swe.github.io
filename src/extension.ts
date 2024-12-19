import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const provider = new RequirementsTrackerViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      RequirementsTrackerViewProvider.viewType,
      provider,
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("requirements-tracker.interrogate", async () => {
      const prompt = await vscode.window.showInputBox({
        prompt: "Enter the message to send to Ollama",
      });
      if (prompt) {
        provider.interrogateOllama(prompt);
      }    
    }),
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
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.type) {
        case "log":
          console.log(data.message);
          break;
      }
    });
  }

  public interrogateOllama(prompt: string) {
    const request = fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-coder-v2",
        prompt: prompt,
        format: "json",
        stream: false,
      }),
    });

    request.catch((error) => {
      vscode.window.showInformationMessage(error);
    });

    request
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        vscode.window.showInformationMessage(JSON.stringify(data, null, 2));
      });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "main.js"),
    );

    // Do the same for the stylesheet.
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"),
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"),
    );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "main.css"),
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading styles from our extension directory,
					and only allow scripts that have a specific nonce.
					(See the 'webview-sample' extension sample for img-src content security policy examples)
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
				<link href="${styleMainUri}" rel="stylesheet">

				<title>Cat Colors</title>
			</head>
			<body>

				<h1>Requirement Tracker</h1>

  			<label for="myfile">Select a file to insert the requirements:</label>
				<input type="file" id="requirements-file-input" name="requirements-file-input">

        <label for="delimiter-input">Delimiter:</label>
        <input type="text" id="delimiter-input" value="$" placeholder="Enter delimiter" />

				<button id="requirements-confirmation-button">Apply requirements</button>

				<table id="requirements-table">
				</table>

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
