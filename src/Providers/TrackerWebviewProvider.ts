import * as vscode from "vscode";
import { RequirementsServiceFacade } from "../Facades/RequirementsServiceFacade";
import { TrackerWebView } from "../WebViews/TrackerWebView";
import path from "path";
import { TrackingResultService } from "../Services/TrackingResultService";
import { CodeReference } from "../Models/TrackingModels";
import { TextEditorSelectionChangeEvent } from "vscode";
import { Requirement } from "../Models/Requirement";

export class TrackerWebviewProvider implements vscode.WebviewViewProvider {
  private _webviewView?: vscode.WebviewView;
  private _trackerWebView: TrackerWebView;
  private _requirementsServiceFacade: RequirementsServiceFacade;
  private readonly _extensionUri: vscode.Uri;
  private _trackingResultService: TrackingResultService;

  private _isEditMode: boolean;
  private _currentEditingReference:
    | {
        requirementId: string;
        codeReferenceId: number;
        codeReference: CodeReference;
      }
    | undefined;
  private _currentSelectedReference: CodeReference | undefined;

  constructor(
    requirementsServiceFacade: RequirementsServiceFacade,
    trackerWebView: TrackerWebView,
    trackingResultService: TrackingResultService,
    extensionUri: vscode.Uri,
  ) {
    this._trackerWebView = trackerWebView;
    this._requirementsServiceFacade = requirementsServiceFacade;
    this._trackingResultService = trackingResultService;

    this._extensionUri = extensionUri;

    this._isEditMode = false;
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ): void {
    this._webviewViewConfiguration(webviewView);
    this._webviewViewHandleEvents(webviewView);

    this._webviewView = webviewView;

    this._sendMessageToWebview({ type: "showImportTab" });

    if (this._isEditMode) {
      this._sendMessageToWebview({
        type: "startEditMode",
        requirementId: this._currentEditingReference?.requirementId,
        codeReference: this._currentEditingReference?.codeReference,
      });
    }
  }

  public onChangeTextEditorSelection(
    event: TextEditorSelectionChangeEvent,
  ): void {
    if (!this._isEditMode) {
      return;
    }

    const editor = event.textEditor;
    const selection = editor.selection;

    if (selection) {
      const selectionRange = new vscode.Range(
        selection.start.line,
        0,
        selection.end.line,
        selection.end.character,
      );

      this._currentSelectedReference = {
        filePath: editor.document.uri.fsPath,
        lineNumber: selection.active.line,
        snippet: editor.document.getText(selectionRange),
        score: 1,
        contextRange: {
          start: selection.start.line,
          end: selection.end.line,
        },
      };
    }

    this._sendMessageToWebview({
      type: "updateSelectedReference",
      codeReference: this._currentSelectedReference,
    });
  }

  private async _onAnalyzeImplementation(
    requirementId: string,
    requirement: Requirement,
    codeReferences: CodeReference[],
  ): Promise<void> {
    try {
      const analysis =
        await this._requirementsServiceFacade.analyzeImplementation(
          requirement,
          codeReferences,
        );

      console.log("Analysis result:", analysis);
      this._sendMessageToWebview({
        type: "analysisResult",
        requirementId,
        analysis,
      });
    } catch (error) {
      vscode.window.showErrorMessage(`Analysis failed: ${error}`);
    }
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
      case "analyzeImplementation":
        await this._onAnalyzeImplementation(
          message.requirementId,
          message.requirement,
          message.codeReferences,
        );
        break;

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

      case "confirmRequirementImplementation":
        await this._onConfirmRequirementImplementation(
          message.requirementId,
          message.codeReference,
        );
        break;

      case "rejectRequirementImplementation":
        await this._onRejectRequirementImplementation(
          message.requirementId,
          message.codeReferenceId,
        );
        break;

      // Edit Mode

      case "startEditMode":
        await this._onStartEditMode(
          message.requirementId,
          message.codeReferenceId,
          message.codeReference,
        );
        break;

      case "endEditMode":
        await this._onEndEditMode();
        break;

      case "confirmEditImplementation":
        await this._onConfirmEditImplementation();
        break;

      case "cancelEditImplementation":
        await this._onCancelEditImplementation();
        break;

      // Tabs
      case "tabToImport":
        this._onTabToImport();
        break;

      case "tabToTrack":
        this._onTabToTrack();
        break;

      case "tabToResults":
        this._onTabToResults();
        break;

      // Error Handling
      case "handleError":
        vscode.window.showErrorMessage(message.error);
        break;
    }
  }

  private _onTabToImport(): void {
    console.log("Switching to import tab");
    this._sendMessageToWebview({ type: "showImportTab" });
  }

  private _onTabToTrack(): void {
    console.log("Switching to track");
    this._sendMessageToWebview({
      type: "showTrackTab",
      requirements: this._requirementsServiceFacade.getAllRequirements(),
    });
  }

  private _onTabToResults(): void {
    const trackingResults =
      this._trackingResultService.getTrakingResultSummary();

    if (trackingResults) {
      // Convert to a plain object for serialization
      const serializedResults = {
        ...trackingResults,
        requirementDetails: Object.fromEntries(
          trackingResults.requirementDetails,
        ),
      };
      console.log("Switching to result results");
      this._sendMessageToWebview({
        type: "showResultsTab",
        summary: serializedResults,
      });
    }
  }

  private async _onCancelEditImplementation(): Promise<void> {
    if (!this._currentEditingReference) {
      throw new Error("No current editing reference");
    }

    this._stopEditMode();
  }

  private async _onConfirmEditImplementation(): Promise<void> {
    if (!this._currentEditingReference) {
      throw new Error("No current editing reference");
    }

    if (!this._currentSelectedReference) {
      throw new Error("No current selected reference");
    }

    await this._requirementsServiceFacade.updateRequirementCodeReference(
      this._currentEditingReference.requirementId,
      this._currentSelectedReference,
    );

    await this._trackingResultService.confirmResult(
      this._currentEditingReference.requirementId,
    );

    vscode.window.showInformationMessage("Requirement confirmed successfully");

    this._stopEditMode();

    // Update the requirements display
    this._updateTrackingResultsDisplay();
    this._updateRequirementsDisplay();
  }

  private async _onStartEditMode(
    requirementId: string,
    codeReferenceId: number,
    codeReference: CodeReference,
  ): Promise<void> {
    await this._startEditMode(requirementId, codeReferenceId, codeReference);
  }

  private async _startEditMode(
    requirementId: string,
    codeReferenceId: number,
    codeReference: CodeReference,
  ): Promise<void> {
    this._isEditMode = true;
    this._currentEditingReference = {
      requirementId: requirementId,
      codeReferenceId: codeReferenceId,
      codeReference: codeReference,
    };

    vscode.window.showInformationMessage(
      "Edit mode started. Select the implementation of the current requirement.",
    );

    this._sendMessageToWebview({
      type: "startEditMode",
      requirementId: requirementId,
      codeReference: codeReference,
    });
  }

  private async _onEndEditMode(): Promise<void> {
    this._isEditMode = false;
    this._currentEditingReference = undefined;

    vscode.window.showInformationMessage("Edit mode ended");
  }

  private async _onRejectRequirementImplementation(
    requirementId: string,
    codeReferenceId: number,
  ): Promise<void> {
    await this._trackingResultService.removeCodeReference(
      requirementId,
      codeReferenceId,
    );

    vscode.window.showInformationMessage(
      "Code reference rejected successfully",
    );

    if (this._isEditMode) {
      this._stopEditMode();
    }

    this._updateTrackingResultsDisplay();
  }

  private async _onConfirmRequirementImplementation(
    requirementId: string,
    codeReference: CodeReference,
  ): Promise<void> {
    await this._requirementsServiceFacade.updateRequirementCodeReference(
      requirementId,
      codeReference,
    );
    await this._trackingResultService.confirmResult(requirementId);

    vscode.window.showInformationMessage("Requirement confirmed successfully");

    if (this._isEditMode) {
      this._stopEditMode();
    }

    this._updateTrackingResultsDisplay();
    this._updateRequirementsDisplay();
  }

  private async _onImportRequirements(
    fileContent: string,
    format: string,
    options: { delimiter?: string } = {},
  ): Promise<void> {
    if (this._isEditMode) {
      this._stopEditMode();
    }

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
    if (this._isEditMode) {
      this._stopEditMode();
    }

    this._sendMessageToWebview({ type: "setLoading", isLoading: true });

    try {
      const trackingResults =
        await this._requirementsServiceFacade.trackRequirements(requirementIds);

      console.log("Tracking complete. Results:", trackingResults);

      await this._trackingResultService.saveTrackingResult(trackingResults);

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

  private async _onOpenFile(
    filePath: string,
    lineNumber: number,
  ): Promise<void> {
    if (this._isEditMode) {
      this._stopEditMode();
    }

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
    if (this._isEditMode) {
      this._stopEditMode();
    }

    this._sendMessageToWebview({ type: "setLoading", isLoading: true });

    try {
      await this._requirementsServiceFacade.clearRequirements();
      await this._trackingResultService.clearRequirements();

      vscode.window.showInformationMessage("Requirements cleared successfully");
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to clear requirements: ${error}`);
    } finally {
      this._sendMessageToWebview({ type: "setLoading", isLoading: false });
      this._sendMessageToWebview({
        type: "updateRequirementsTable",
        requirements: this._requirementsServiceFacade.getAllRequirements(),
      });
    }
  }

  private _updateRequirementsDisplay(): void {
    if (this._isEditMode) {
      this._stopEditMode();
    }

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

  private _updateTrackingResultsDisplay(): void {
    const trackingResults =
      this._trackingResultService.getTrakingResultSummary();

    if (trackingResults) {
      // Convert to a plain object for serialization
      const serializedResults = {
        ...trackingResults,
        requirementDetails: Object.fromEntries(
          trackingResults.requirementDetails,
        ),
      };

      this._sendMessageToWebview({
        type: "trackingResults",
        summary: serializedResults,
      });
    }
  }

  private async _onEditRequirement(requirementId: string): Promise<void> {
    if (this._isEditMode) {
      this._stopEditMode();
    }

    const requirement =
      this._requirementsServiceFacade.getRequirement(requirementId);

    if (!requirement) {
      vscode.window.showErrorMessage("Requirement not found");
      return;
    }

    let codeReference = requirement.codeReference;
    if (!codeReference) {
      codeReference = {
        filePath: "",
        lineNumber: 0,
        snippet: "",
        score: 0,
      };
    }

    await this._startEditMode(requirement.id, 0, codeReference);
  }

  private async _onDeleteRequirement(requirementId: string): Promise<void> {
    if (this._isEditMode) {
      this._stopEditMode();
    }

    try {
      await this._requirementsServiceFacade.deleteRequirement(requirementId);
      await this._trackingResultService.deleteRequirement(requirementId);
      vscode.window.showInformationMessage("Requirement deleted successfully");

      this._updateRequirementsDisplay();
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to delete requirement: ${error}`);
    }
  }

  private _stopEditMode(): void {
    // Clear the current editing reference
    this._currentEditingReference = undefined;
    this._currentSelectedReference = undefined;
    this._isEditMode = false;

    this._sendMessageToWebview({ type: "stopEditMode" });
  }
}
