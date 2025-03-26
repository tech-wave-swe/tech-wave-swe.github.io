import * as vscode from "vscode";
import {RequirementsServiceFacade} from "../Facades/RequirementsServiceFacade";
import {
  TrackingResultSummary,
  TrackingResult,
} from "../Models/TrackingModels";
import {TrackerWebView} from "../WebViews/TrackerWebView";
import path from "path";

export class TrackerWebviewProvider implements vscode.WebviewViewProvider {
  private _context: vscode.ExtensionContext;
  private _webviewView?: vscode.WebviewView;
  private _trackerWebView: TrackerWebView;
  private _requirementsServiceFacade: RequirementsServiceFacade;
  private _extensionUri: vscode.Uri;

  constructor(
    context: vscode.ExtensionContext,
    requirementsServiceFacade: RequirementsServiceFacade,
  ) {
    this._context = context;
    this._trackerWebView = new TrackerWebView(context.extensionUri);
    this._requirementsServiceFacade = requirementsServiceFacade;

    this._extensionUri = this._context.extensionUri;
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
      localResourceRoots: [this._extensionUri, vscode.Uri.file(path.join(this._extensionUri.fsPath, 'node_modules')),],
    };

    webviewView.webview.html = this._trackerWebView.getHtmlForWebview(
      webviewView.webview,
    );
  }

  private _webviewViewHandleEvents(webviewView: vscode.WebviewView): void {
    webviewView.webview.onDidReceiveMessage(
      async (message) => {
        await this._handleMessageFromWebview(message);
      }
    );
  }

  private _sendMessageToWebview(message: any): void {
    if (this._webviewView) {
      this._webviewView.webview.postMessage(message);
    }
  }

  private async _handleMessageFromWebview(message: any): Promise<void> {
    try {
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
      }
    } catch (error) {
      this._sendMessageToWebview({
        type: "error",
        message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
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
    this._sendMessageToWebview({type: "setLoading", isLoading: true});

    try {
      console.log(
        `Calling requirementsService.importRequirements with format: ${format}`,
      );
      const requirements = await this._requirementsServiceFacade.importRequirements(
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
      this._sendMessageToWebview({type: "setLoading", isLoading: false});
    }
  }

  private async _onTrackRequirements(
    requirementIds?: string[],
  ): Promise<void> {
    this._sendMessageToWebview({type: "setLoading", isLoading: true});

    const trackingResults =
      await this._requirementsServiceFacade.trackRequirements(requirementIds);

    this._sendMessageToWebview({
      type: "trackingResults",
      summary: this._serializeTrackingResultSummary(trackingResults),
    });

    vscode.window.showInformationMessage(
      `Tracked ${trackingResults.totalRequirements} requirements: ` +
      `${trackingResults.implementedRequirements} implemented, ` +
      `${trackingResults.partiallyImplementedRequirements} partially implemented, ` +
      `${trackingResults.unimplementedRequirements} not implemented`,
    );

    this._sendMessageToWebview({type: "setLoading", isLoading: false});
  }

  private async _onShowUnimplemented(): Promise<void> {
    this._sendMessageToWebview({type: "setLoading", isLoading: true});

    const unimplemented =
      await this._requirementsServiceFacade.getUnimplementedRequirements();

    this._sendMessageToWebview({
      type: "unimplementedRequirements",
      requirements: unimplemented,
    });

    this._sendMessageToWebview({type: "setLoading", isLoading: false});
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

  private _updateRequirementsDisplay(): void {
    const requirements = this._requirementsServiceFacade.getAllRequirements();

    if (requirements.length > 0) {
      this._sendMessageToWebview({
        type: "updateRequirements",
        requirements,
      });
    }
  }

  private _serializeTrackingResultSummary(summary: TrackingResultSummary) {
    // Convert Map to a serializable object for sending to webview
    const detailsObject: Record<string, TrackingResult> = {};

    summary.requirementDetails.forEach((value, key) => {
      detailsObject[key] = value;
    });

    return {
      totalRequirements: summary.totalRequirements,
      implementedRequirements: summary.implementedRequirements,
      partiallyImplementedRequirements:
      summary.partiallyImplementedRequirements,
      unimplementedRequirements: summary.unimplementedRequirements,
      requirementDetails: detailsObject,
    };
  }
}
