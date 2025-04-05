import * as vscode from "vscode";
import { RequirementsServiceFacade } from "../Facades/RequirementsServiceFacade";
import { TrackerWebView } from "../WebViews/TrackerWebView";
import path from "path";

export class TrackerWebviewProvider implements vscode.WebviewViewProvider {
  private _webviewView?: vscode.WebviewView;
  private _trackerWebView: TrackerWebView;
  private _requirementsServiceFacade: RequirementsServiceFacade;
  private _extensionUri: vscode.Uri;

  constructor(
    requirementsServiceFacade: RequirementsServiceFacade,
    trackerWebView: TrackerWebView,
    extensionUri: vscode.Uri,
  ) {
    this._trackerWebView = trackerWebView;
    this._requirementsServiceFacade = requirementsServiceFacade;

    this._extensionUri = extensionUri;
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ): void {
    this._webviewViewConfiguration(webviewView);
    this._webviewViewHandleEvents(webviewView);

    this._webviewView = webviewView;

    // Show current requirements if available
    this._updateRequirementsDisplay();
  }

  private _webviewViewConfiguration(webviewView: vscode.WebviewView): void {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        this._extensionUri,
        vscode.Uri.file(path.join(this._extensionUri.fsPath, "node_modules")),
      ],
    };

    webviewView.webview.html = this._trackerWebView.getHtmlForWebview(
      webviewView.webview,
    );
  }

  private _webviewViewHandleEvents(webviewView: vscode.WebviewView): void {
    webviewView.webview.onDidReceiveMessage(async (message) => {
      await this._handleMessageFromWebview(message);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _sendMessageToWebview(message: any): void {
    if (this._webviewView) {
      this._webviewView.webview.postMessage(message);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async _handleMessageFromWebview(message: any): Promise<void> {
    switch (message.type) {
      case "importRequirements":
        await this._onImportRequirements(
          message.content,
          message.format,
          message.options,
        );
        break;

      case "trackRequirements":
        await this._onTrackRequirements(message.requirementIds);
        break;

      case "showUnimplemented":
        await this._onShowUnimplemented();
        break;

      case "openFile":
        await this._onOpenFile(message.filePath, message.lineStart);
        break;

      case "clearRequirements":
        await this._onClearRequirements();
        break;

      case "editRequirement":
        await this._onEditRequirement(message.requirementId);
        break;

      case "deleteRequirement":
        await this._onDeleteRequirement(message.requirementId);
        break;
      }
  }

  private async _onImportRequirements(
    fileContent: string,
    format: string,
    options: { delimiter?: string } = {},
  ): Promise<void> {
    console.log(
      `Starting file upload handler. Format: ${format}, Content length: ${fileContent.length}`,
    );
    this._sendMessageToWebview({ type: "setLoading", isLoading: true });

    try {
      console.log(
        `Calling requirementsService.importRequirements with format: ${format}`,
      );
      const requirements =
        await this._requirementsServiceFacade.importRequirements(
          fileContent,
          format,
          options,
        );

      console.log(`Import complete. Got ${requirements.length} requirements`);
      this._sendMessageToWebview({
        type: "requirementsImported",
        count: requirements.length,
        requirements: requirements,
      });

      // Update the requirements display
      this._updateRequirementsDisplay();

      vscode.window.showInformationMessage(
        `Successfully imported ${requirements.length} requirements`,
      );
    } catch (error) {
      console.error(`Error in handleFileUpload:`, error);
      vscode.window.showErrorMessage(`Failed to import requirements: ${error}`);

      this._sendMessageToWebview({
        type: "error",
        message: `Failed to import requirements: ${error}`,
      });
    } finally {
      this._sendMessageToWebview({ type: "setLoading", isLoading: false });
    }
  }

  private async _onTrackRequirements(requirementIds?: string[]): Promise<void> {
    this._sendMessageToWebview({ type: "setLoading", isLoading: true });

    try {
      const trackingResults =
        await this._requirementsServiceFacade.trackRequirements(requirementIds);

      console.log("Tracking complete. Results:", trackingResults);

      // Convert to a plain object for serialization
      const serializedResults = {
        ...trackingResults,
        requirementDetails: Object.fromEntries(
          trackingResults.requirementDetails,
        ),
      };

      console.log("Serialized result:", serializedResults);

      this._sendMessageToWebview({
        type: "trackingResults",
        summary: serializedResults,
      });

      console.log("Tracking complete");

      const time = new Date().toLocaleTimeString();
      console.log(`Tracking results received at ${time}`);

      vscode.window.showInformationMessage(
        `Analysis complete: ${trackingResults.confirmedMatches} implemented, ` +
          `${trackingResults.possibleMatches} partially implemented, ` +
          `${trackingResults.unlikelyMatches} not implemented`,
      );
    } catch (error) {
      console.error("Error tracking requirements:", error);
      this._sendMessageToWebview({
        type: "error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      const time = new Date().toLocaleTimeString();
      console.log(`Ended at ${time}`);

      this._sendMessageToWebview({ type: "setLoading", isLoading: false });
    }
  }

  private async _onShowUnimplemented(): Promise<void> {
    this._sendMessageToWebview({ type: "setLoading", isLoading: true });

    const unimplemented =
      await this._requirementsServiceFacade.getUnimplementedRequirements();

    this._sendMessageToWebview({
      type: "unimplementedRequirements",
      requirements: unimplemented,
    });

    this._sendMessageToWebview({ type: "setLoading", isLoading: false });
  }

  private async _onOpenFile(
    filePath: string,
    lineNumber: number,
  ): Promise<void> {
    try {
      const document = await vscode.workspace.openTextDocument(filePath);
      const editor = await vscode.window.showTextDocument(document);

      // Set the cursor position and reveal the line
      const position = new vscode.Position(lineNumber - 1, 0);
      editor.selection = new vscode.Selection(position, position);

      editor.revealRange(
        new vscode.Range(position, position),
        vscode.TextEditorRevealType.InCenter,
      );
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to open file: ${error}`);
    }
  }

  private async _onClearRequirements(): Promise<void> {
    this._sendMessageToWebview({type: "setLoading", isLoading: true});

    try {
      await this._requirementsServiceFacade.clearRequirements();
      vscode.window.showInformationMessage("Requirements cleared successfully");
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to clear requirements: ${error}`);
    } finally {
      this._sendMessageToWebview({type: "setLoading", isLoading: false});
      this._sendMessageToWebview({type: "updateRequirementsTable", requirements: this._requirementsServiceFacade.getAllRequirements()});
    }
  }

  private _updateRequirementsDisplay(): void {
    const requirements = this._requirementsServiceFacade.getAllRequirements();

    if (requirements.length > 0) {
      this._sendMessageToWebview({
        type: "updateRequirementsTable",
        requirements: requirements,
      });

      // Also send a refresh signal to ensure the view updates
      this._sendMessageToWebview({
        type: "refreshView",
      });
    }
  }

  private async _onEditRequirement(requirementId: string): Promise<void> {

  }

  private async _onDeleteRequirement(requirementId: string): Promise<void> {
    try {
      await this._requirementsServiceFacade.deleteRequirement(requirementId);
      vscode.window.showInformationMessage("Requirement deleted successfully");

      this._updateRequirementsDisplay();
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to delete requirement: ${error}`);
    }
  }
}
