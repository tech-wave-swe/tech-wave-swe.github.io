/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, jest } from "@jest/globals";
import type { TextDocument, TextEditor } from "vscode";
import * as vscode from "vscode";
import { TrackerWebView } from "../../../WebViews/TrackerWebView";
import { RequirementsServiceFacade } from "../../../Facades/RequirementsServiceFacade";
import { TrackerWebviewProvider } from "../../../Providers/TrackerWebviewProvider";
import { Requirement, RequirementStatus } from "../../../Models/Requirement";
import { TrackingResultSummary } from "../../../Models/TrackingModels";
import { TrackingResultService } from "../../../Services/TrackingResultService";

jest.mock("path");

describe("TrackerWebviewProvider", () => {
  let trackerWebviewProvider: TrackerWebviewProvider;
  let mockTrackerWebview: jest.Mocked<TrackerWebView>;
  let mockRequirementsServiceFacade: jest.Mocked<RequirementsServiceFacade>;
  let mockExtensionUri: jest.Mocked<vscode.Uri>;
  let mockWebviewView: jest.Mocked<vscode.WebviewView>;
  let mockTrackingResultService: jest.Mocked<TrackingResultService>;
  let mockRequirements: Requirement[];
  let mockTrackingResultSummary: jest.Mocked<TrackingResultSummary>;

  beforeEach(() => {
    mockTrackerWebview = {
      getHtmlForWebview: jest.fn().mockReturnValue("<html>Mock Webview</html>"),
    } as unknown as jest.Mocked<TrackerWebView>;

    mockExtensionUri = {
      fsPath: "mock/extension/path",
    } as unknown as jest.Mocked<vscode.Uri>;

    mockRequirements = [
      {
        id: "1",
        name: "Requirement 1",
        description: "Description 1",
        type: "requirement",
        version: "1.0.0",
        status: RequirementStatus.TRACKED,
      },
      {
        id: "2",
        name: "Requirement 2",
        description: "Description 2",
        type: "requirement",
        version: "1.0.0",
        status: RequirementStatus.TRACKED,
      },
    ];

    mockRequirementsServiceFacade = {
      getAllRequirements: jest.fn<() => Requirement[]>(),
      importRequirements: jest.fn<() => Promise<Requirement[]>>(),
      trackRequirements: jest.fn(),
      clearRequirements: jest.fn(),
      deleteRequirement: jest.fn(),
      getUnimplementedRequirements: jest.fn(),
      updateRequirementCodeReference: jest.fn(),
      analyzeImplementation: jest.fn(),
    } as unknown as jest.Mocked<RequirementsServiceFacade>;

    mockTrackingResultSummary = {
      totalRequirements: 2,
      confirmedMatches: 0,
      possibleMatches: 0,
      unlikelyMatches: 0,
      requirementDetails: new Map<string, Requirement>([
        ["REQ-001", mockRequirements[0]],
        ["REQ-002", mockRequirements[1]],
      ]),
    } as unknown as jest.Mocked<TrackingResultSummary>;

    mockTrackingResultService = {
      getTrakingResultSummary: jest.fn(() => mockTrackingResultSummary),
      getRequirementDetails: jest.fn(),
      saveTrackingResult: jest.fn(),
      confirmResult: jest.fn(),
      removeCodeReference: jest.fn(),
    } as unknown as jest.Mocked<TrackingResultService>;

    // Create a mock WebviewView
    mockWebviewView = {
      webview: {
        options: {},
        html: "",
        onDidReceiveMessage: jest.fn(),
        postMessage: jest.fn(),
      },
      onDidChangeVisibility: jest.fn(),
    } as unknown as jest.Mocked<vscode.WebviewView>;

    trackerWebviewProvider = new TrackerWebviewProvider(
      mockRequirementsServiceFacade,
      mockTrackerWebview,
      mockTrackingResultService,
      mockExtensionUri,
    );
  });

  describe("resolveWebviewView", () => {
    it("should configure the webview and update requirements display", () => {
      mockRequirementsServiceFacade.getAllRequirements.mockReturnValue(
        mockRequirements,
      );

      trackerWebviewProvider.resolveWebviewView(
        mockWebviewView as unknown as vscode.WebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      expect(mockWebviewView.webview.options.enableScripts).toBe(true);
      expect(mockWebviewView.webview.html).toBe("<html>Mock Webview</html>");

      expect(mockWebviewView.webview.onDidReceiveMessage).toHaveBeenCalled();

      expect(
        mockRequirementsServiceFacade.getAllRequirements,
      ).toHaveBeenCalled();
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "updateRequirementsTable",
        requirements: mockRequirements,
      });
    });

    it("should not send update message when no requirements exist", () => {
      mockRequirementsServiceFacade.getAllRequirements.mockReturnValue([]);

      trackerWebviewProvider.resolveWebviewView(
        mockWebviewView as unknown as vscode.WebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      expect(
        mockRequirementsServiceFacade.getAllRequirements,
      ).toHaveBeenCalled();

      expect(mockWebviewView.webview.postMessage).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: "updateRequirements" }),
      );
    });
  });

  describe("message handling", () => {
    beforeEach(() => {
      mockRequirementsServiceFacade.getAllRequirements.mockReturnValue(
        mockRequirements,
      );

      trackerWebviewProvider.resolveWebviewView(
        mockWebviewView as unknown as vscode.WebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      (trackerWebviewProvider as any)._messageHandler =
        mockWebviewView.webview.onDidReceiveMessage.mock.calls[0][0];

      mockWebviewView.webview.postMessage.mockClear();
    });

    it("should handle importRequirements message", async () => {
      mockRequirementsServiceFacade.importRequirements.mockResolvedValue(
        mockRequirements,
      );

      const message = {
        type: "importRequirements",
        content: "file content",
        format: "csv",
        options: { delimiter: "," },
      };

      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(
        mockRequirementsServiceFacade.importRequirements,
      ).toHaveBeenCalledWith("file content", "csv", { delimiter: "," });

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: true,
      });

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "requirementsImported",
        count: 2,
        requirements: mockRequirements,
      });

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: false,
      });

      expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
        "Successfully imported 2 requirements",
      );
    });

    it("should handle importRequirements message with default options", async () => {
      mockRequirementsServiceFacade.importRequirements.mockResolvedValue(
        mockRequirements,
      );

      const message = {
        type: "importRequirements",
        content: "file content",
        format: "csv",
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(
        mockRequirementsServiceFacade.importRequirements,
      ).toHaveBeenCalledWith("file content", "csv", {});

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: true,
      });

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "requirementsImported",
        count: 2,
        requirements: mockRequirements,
      });

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: false,
      });

      expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
        "Successfully imported 2 requirements",
      );
    });

    it("should handle importRequirements errors", async () => {
      const mockError = new Error("Import failed");
      mockRequirementsServiceFacade.importRequirements.mockRejectedValue(
        mockError,
      );

      const message = {
        type: "importRequirements",
        content: "invalid content",
        format: "csv",
        options: { delimiter: "," },
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: true,
      });

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "error",
        message: "Failed to import requirements: Error: Import failed",
      });

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: false,
      });

      expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(
        "Failed to import requirements: Error: Import failed",
      );
    });

    it("should handle trackRequirements message", async () => {
      // Mock tracking results
      const mockTrackingResults: TrackingResultSummary = {
        totalRequirements: 10,
        confirmedMatches: 5,
        possibleMatches: 3,
        unlikelyMatches: 2,
        requirementDetails: new Map([
          [
            "REQ-001",
            {
              requirementId: "REQ-001",
              score: 55,
              implementationStatus: "confirmed-match",
              codeReferences: [
                {
                  filePath: "path/to/file.ts",
                  lineNumber: 10,
                  snippet: "function test() {}",
                  score: 55,
                  relevanceExplanation: "Match score: 55%",
                  contextRange: {
                    start: 7,
                    end: 13,
                  },
                },
              ],
            },
          ],
          [
            "REQ-002",
            {
              requirementId: "REQ-002",
              score: 55,
              implementationStatus: "confirmed-match",
              codeReferences: [
                {
                  filePath: "path/to/file.ts",
                  lineNumber: 10,
                  snippet: "function test() {}",
                  score: 55,
                  relevanceExplanation: "Match score: 55%",
                  contextRange: {
                    start: 7,
                    end: 13,
                  },
                },
              ],
            },
          ],
        ]),
      };
      mockRequirementsServiceFacade.trackRequirements.mockResolvedValue(
        mockTrackingResults,
      );

      const message = {
        type: "trackRequirements",
        requirementIds: ["REQ-001", "REQ-002"],
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(
        mockRequirementsServiceFacade.trackRequirements,
      ).toHaveBeenCalledWith(["REQ-001", "REQ-002"]);

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: true,
      });

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "trackingResults",
        summary: {
          totalRequirements: 10,
          confirmedMatches: 5,
          possibleMatches: 3,
          unlikelyMatches: 2,
          requirementDetails: {
            "REQ-001": {
              requirementId: "REQ-001",
              score: 55,
              implementationStatus: "confirmed-match",
              codeReferences: [
                {
                  filePath: "path/to/file.ts",
                  lineNumber: 10,
                  snippet: "function test() {}",
                  score: 55,
                  relevanceExplanation: "Match score: 55%",
                  contextRange: {
                    start: 7,
                    end: 13,
                  },
                },
              ],
            },
            "REQ-002": {
              requirementId: "REQ-002",
              score: 55,
              implementationStatus: "confirmed-match",
              codeReferences: [
                {
                  filePath: "path/to/file.ts",
                  lineNumber: 10,
                  snippet: "function test() {}",
                  score: 55,
                  relevanceExplanation: "Match score: 55%",
                  contextRange: {
                    start: 7,
                    end: 13,
                  },
                },
              ],
            },
          },
        },
      });

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: false,
      });

      expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
        "Analysis complete: 5 implemented, 3 partially implemented, 2 not implemented",
      );
    });

    it("should handle unknown message types", async () => {
      const message = {
        type: "unknownType",
        data: "test data",
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(mockWebviewView.webview.postMessage).not.toHaveBeenCalled();
    });

    it("should handle openFile message", async () => {
      const mockDocument = { uri: "file://test.ts" } as unknown as TextDocument;
      const mockEditor = {
        selection: undefined,
        revealRange: jest.fn(),
      } as unknown as TextEditor;

      mockRequirementsServiceFacade.importRequirements.mockResolvedValue(
        mockRequirements,
      );

      (
        vscode.workspace.openTextDocument as jest.Mock<
          () => Thenable<TextDocument>
        >
      ).mockResolvedValue(mockDocument);
      (
        vscode.window.showTextDocument as jest.Mock<() => Thenable<TextEditor>>
      ).mockResolvedValue(mockEditor);

      const message = {
        type: "openFile",
        filePath: "path/to/file.txt",
        lineStart: 10,
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(vscode.workspace.openTextDocument).toHaveBeenCalledWith(
        "path/to/file.txt",
      );
      expect(vscode.window.showTextDocument).toHaveBeenCalledWith(mockDocument);

      expect(vscode.Position).toHaveBeenCalledWith(9, 0);
      expect(vscode.Selection).toHaveBeenCalled();
      expect(vscode.Range).toHaveBeenCalled();
    });

    it("should handle openFile errors", async () => {
      const mockError = new Error("File not found");
      (
        vscode.workspace.openTextDocument as jest.Mock<
          () => Thenable<TextDocument>
        >
      ).mockRejectedValue(mockError);

      const message = {
        type: "openFile",
        filePath: "/invalid/path.ts",
        lineStart: 1,
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(
        "Failed to open file: Error: File not found",
      );
    });

    it("should handle clearRequirements message", async () => {
      (
        mockRequirementsServiceFacade.getAllRequirements as jest.Mock<
          () => Requirement[]
        >
      ).mockReturnValue([]);

      const message = {
        type: "clearRequirements",
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(
        mockRequirementsServiceFacade.clearRequirements,
      ).toHaveBeenCalled();
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "updateRequirementsTable",
        requirements: [],
      });
    });

    it("should handle clearRequirements error", async () => {
      (
        mockRequirementsServiceFacade.clearRequirements as jest.Mock<
          () => Promise<void>
        >
      ).mockRejectedValue(new Error("Test Error"));

      const message = {
        type: "clearRequirements",
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(
        mockRequirementsServiceFacade.clearRequirements,
      ).toHaveBeenCalled();
      expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(
        "Failed to clear requirements: Error: Test Error",
      );
    });

    it("should handle editRequirement message", async () => {
      (
        mockRequirementsServiceFacade.getAllRequirements as jest.Mock<
          () => Requirement[]
        >
      ).mockReturnValue([]);

      const message = {
        type: "editRequirement",
        requirementId: "1",
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);
    });

    it("should handle deleteRequirement message", async () => {
      (
        mockRequirementsServiceFacade.getAllRequirements as jest.Mock<
          () => Requirement[]
        >
      ).mockReturnValue([mockRequirements[1]]);

      const message = {
        type: "deleteRequirement",
        requirementId: "1",
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(
        mockRequirementsServiceFacade.deleteRequirement,
      ).toHaveBeenCalledWith("1");
      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "updateRequirementsTable",
        requirements: [mockRequirements[1]],
      });
    });

    it("should handle deleteRequirement error", async () => {
      (
        mockRequirementsServiceFacade.deleteRequirement as jest.Mock<
          (id: string) => Promise<void>
        >
      ).mockRejectedValue(new Error("Test Error"));

      const message = {
        type: "deleteRequirement",
        requirementId: "1",
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(
        mockRequirementsServiceFacade.deleteRequirement,
      ).toHaveBeenCalledWith("1");
      expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(
        "Failed to delete requirement: Error: Test Error",
      );
    });

    it("should handle Error thrown errors", async () => {
      const expectedMessages = [
        { type: "setLoading", isLoading: true },
        { type: "error", message: "Something went wrong" },
        { type: "setLoading", isLoading: false },
      ];

      const mockError: Error = new Error("Something went wrong");
      mockRequirementsServiceFacade.trackRequirements.mockRejectedValue(
        mockError,
      );

      const message = {
        type: "trackRequirements",
        requirementIds: ["REQ-001"],
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      // Verify error handling
      expectedMessages.forEach((msg, index) => {
        expect(mockWebviewView.webview.postMessage).toHaveBeenNthCalledWith(
          index + 1,
          msg,
        );
      });
    });

    it("should handle non-Error thrown errors", async () => {
      const expectedMessages = [
        { type: "setLoading", isLoading: true },
        { type: "error", message: "Unknown error occurred" },
        { type: "setLoading", isLoading: false },
      ];
      const stringError = "Something went wrong";
      mockRequirementsServiceFacade.trackRequirements.mockImplementation(() => {
        throw stringError;
      });

      const message = {
        type: "trackRequirements",
        requirementIds: ["REQ-001"],
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      // Verify error handling
      expectedMessages.forEach((msg, index) => {
        expect(mockWebviewView.webview.postMessage).toHaveBeenNthCalledWith(
          index + 1,
          msg,
        );
      });
    });

    it("should handle object thrown as errors", async () => {
      const expectedMessages = [
        { type: "setLoading", isLoading: true },
        { type: "error", message: "Unknown error occurred" },
        { type: "setLoading", isLoading: false },
      ];

      const objectError = { code: 500, message: "Internal server error" };
      mockRequirementsServiceFacade.trackRequirements.mockImplementation(() => {
        throw objectError;
      });

      const message = {
        type: "trackRequirements",
        requirementIds: ["REQ-001"],
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expectedMessages.forEach((msg, index) => {
        expect(mockWebviewView.webview.postMessage).toHaveBeenNthCalledWith(
          index + 1,
          msg,
        );
      });
    });

    it("should handle analyzeImplementation message", async () => {
      const mockAnalysisResult = "Test analysis result";

      mockRequirementsServiceFacade.analyzeImplementation.mockResolvedValue(mockAnalysisResult);

      const message = {
        type: "analyzeImplementation",
        requirementId: "REQ-001",
        requirement: mockRequirements[0],
        codeReferences: [{
          filePath: "test/file.ts",
          lineNumber: 1,
          snippet: "test code",
          score: 85,
          contextRange: { start: 1, end: 2 }
        }]
      };

      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(mockRequirementsServiceFacade.analyzeImplementation).toHaveBeenCalledWith(
        mockRequirements[0],
        message.codeReferences
      );

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "analysisResult",
        requirementId: "REQ-001",
        analysis: mockAnalysisResult
      });
    });

    it("should handle analyzeImplementation error", async () => {
      mockRequirementsServiceFacade.analyzeImplementation.mockRejectedValue(
        new Error("Analysis failed")
      );

      const message = {
        type: "analyzeImplementation",
        requirementId: "REQ-001",
        requirement: mockRequirements[0],
        codeReferences: [{
          filePath: "test/file.ts",
          lineNumber: 1,
          snippet: "test code",
          score: 85,
          contextRange: { start: 1, end: 2 }
        }]
      };

      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(
        "Analysis failed: Error: Analysis failed"
      );
    });

    it("should handle text editor selection changes in edit mode", () => {
      // Set up edit mode
      const startEditMessage = {
        type: "startEditMode",
        requirementId: "REQ-001",
        codeReferenceId: 1,
        codeReference: {
          filePath: "test/file.ts",
          lineNumber: 1,
          snippet: "test code",
          score: 85,
          contextRange: { start: 1, end: 2 }
        }
      };

      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      handleMessageMethod(startEditMessage);

      // Create mock selection event
      const mockEditor = {
        document: {
          uri: { fsPath: "test/file.ts" },
          getText: jest.fn().mockReturnValue("selected code")
        },
        selection: {
          start: { line: 5, character: 0 },
          end: { line: 7, character: 10 },
          active: { line: 5, character: 0 }
        }
      };

      const event = {
        textEditor: mockEditor,
        selections: [mockEditor.selection]
      };

      // Test selection change
      trackerWebviewProvider.onChangeTextEditorSelection(event as any);

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "updateSelectedReference",
        codeReference: {
          filePath: "test/file.ts",
          lineNumber: 5,
          snippet: "selected code",
          score: 1,
          contextRange: {
            start: 5,
            end: 7
          }
        }
      });
    });

    it("should not handle text editor selection changes when not in edit mode", () => {
      const mockEditor = {
        document: {
          uri: { fsPath: "test/file.ts" },
          getText: jest.fn()
        },
        selection: {
          start: { line: 5, character: 0 },
          end: { line: 7, character: 10 },
          active: { line: 5, character: 0 }
        }
      };

      const event = {
        textEditor: mockEditor,
        selections: [mockEditor.selection]
      };

      trackerWebviewProvider.onChangeTextEditorSelection(event as any);

      expect(mockEditor.document.getText).not.toHaveBeenCalled();
      expect(mockWebviewView.webview.postMessage).not.toHaveBeenCalled();
    });

    it("should handle confirmRequirementImplementation message", async () => {
      const message = {
        type: "confirmRequirementImplementation",
        requirementId: "REQ-001",
        codeReference: {
          filePath: "path/to/file.ts",
          lineNumber: 10,
          snippet: "function test() {}",
          score: 55,
          contextRange: {
            start: 7,
            end: 13,
          },
        },
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(
        mockRequirementsServiceFacade.updateRequirementCodeReference
      ).toHaveBeenCalledWith("REQ-001", message.codeReference);
      expect(mockTrackingResultService.confirmResult).toHaveBeenCalledWith(
        "REQ-001"
      );
      expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
        "Requirement confirmed successfully"
      );
    });

    it("should handle rejectRequirementImplementation message", async () => {
      const message = {
        type: "rejectRequirementImplementation",
        requirementId: "REQ-001",
        codeReferenceId: 1,
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(mockTrackingResultService.removeCodeReference).toHaveBeenCalledWith(
        "REQ-001",
        1
      );
      expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
        "Code reference rejected successfully"
      );
    });

    it("should handle startEditMode message", async () => {
      const message = {
        type: "startEditMode",
        requirementId: "REQ-001",
        codeReferenceId: 1,
        codeReference: {
          filePath: "path/to/file.ts",
          lineNumber: 10,
          snippet: "function test() {}",
          score: 55,
          contextRange: {
            start: 7,
            end: 13,
          },
        },
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "startEditMode",
        requirementId: "REQ-001",
        codeReference: message.codeReference,
      });
      expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
        "Edit mode started. Select the implementation of the current requirement."
      );
    });

    it("should handle endEditMode message", async () => {
      const message = {
        type: "endEditMode",
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
        "Edit mode ended"
      );
    });

    it("should handle confirmEditImplementation message", async () => {
      // Set up the edit mode state first
      const startEditMessage = {
        type: "startEditMode",
        requirementId: "REQ-001",
        codeReferenceId: 1,
        codeReference: {
          filePath: "path/to/file.ts",
          lineNumber: 10,
          snippet: "function test() {}",
          score: 55,
          contextRange: {
            start: 7,
            end: 13,
          },
        },
      };

      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(startEditMessage);

      // Simulate selection of new reference
      (trackerWebviewProvider as any)._currentSelectedReference = {
        filePath: "path/to/new/file.ts",
        lineNumber: 20,
        snippet: "function newTest() {}",
        score: 75,
        contextRange: {
          start: 15,
          end: 25,
        },
      };

      const confirmMessage = {
        type: "confirmEditImplementation",
      };

      await handleMessageMethod(confirmMessage);

      expect(
        mockRequirementsServiceFacade.updateRequirementCodeReference
      ).toHaveBeenCalledWith("REQ-001", {
        filePath: "path/to/new/file.ts",
        lineNumber: 20,
        snippet: "function newTest() {}",
        score: 75,
        contextRange: {
          start: 15,
          end: 25,
        },
      });
      expect(mockTrackingResultService.confirmResult).toHaveBeenCalledWith(
        "REQ-001"
      );
      expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
        "Requirement confirmed successfully"
      );
    });

    it("should handle cancelEditImplementation message", async () => {
      // Set up the edit mode state first
      const startEditMessage = {
        type: "startEditMode",
        requirementId: "REQ-001",
        codeReferenceId: 1,
        codeReference: {
          filePath: "path/to/file.ts",
          lineNumber: 10,
          snippet: "function test() {}",
          score: 55,
          contextRange: {
            start: 7,
            end: 13,
          },
        },
      };

      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(startEditMessage);

      const cancelMessage = {
        type: "cancelEditImplementation",
      };

      await handleMessageMethod(cancelMessage);

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "stopEditMode",
      });
    });

    it("should handle message", async () => {
      const handleMessageMethod = jest.spyOn(
        trackerWebviewProvider as any,
        "_handleMessageFromWebview",
      );
      mockRequirementsServiceFacade.getAllRequirements.mockReturnValue(
        mockRequirements,
      );

      trackerWebviewProvider.resolveWebviewView(
        mockWebviewView as unknown as vscode.WebviewView,
        {} as vscode.WebviewViewResolveContext,
        {} as vscode.CancellationToken,
      );

      const messageHandler =
        mockWebviewView.webview.onDidReceiveMessage.mock.calls[0][0];

      const testMessage = { type: "sendMessage", text: "Hello" };

      // Manually trigger the message event
      await messageHandler(testMessage);

      // Verify that _handleMessageFromWebview was called with the correct message
      expect(handleMessageMethod).toHaveBeenCalledWith(testMessage);
    });

    it("should handle confirmEditImplementation error when no current editing reference", async () => {
      const message = {
        type: "confirmEditImplementation"
      };

      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);

      await expect(handleMessageMethod(message)).rejects.toThrow("No current editing reference");
    });

    it("should handle confirmEditImplementation error when no selected reference", async () => {
      // Set up edit mode first
      const startEditMessage = {
        type: "startEditMode",
        requirementId: "REQ-001",
        codeReferenceId: 1,
        codeReference: {
          filePath: "path/to/file.ts",
          lineNumber: 10,
          snippet: "function test() {}",
          score: 55,
          contextRange: { start: 7, end: 13 }
        }
      };

      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(startEditMessage);

      const confirmMessage = {
        type: "confirmEditImplementation"
      };

      await expect(handleMessageMethod(confirmMessage)).rejects.toThrow("No current selected reference");
    });

    it("should handle cancelEditImplementation error when no current editing reference", async () => {
      const message = {
        type: "cancelEditImplementation"
      };

      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);

      await expect(handleMessageMethod(message)).rejects.toThrow("No current editing reference");
    });

    it("should handle refreshView for non-empty requirements", async () => {
      mockRequirementsServiceFacade.getAllRequirements.mockReturnValue(mockRequirements);

      // Call _updateRequirementsDisplay directly since that's what happens in the implementation
      (trackerWebviewProvider as any)._updateRequirementsDisplay();

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "updateRequirementsTable",
        requirements: mockRequirements
      });

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "refreshView"
      });
    });

    it("should handle error with custom message formatting", async () => {
      const customError = new Error("Custom error message");
      mockRequirementsServiceFacade.trackRequirements.mockRejectedValue(customError);

      const message = {
        type: "trackRequirements",
        requirementIds: ["REQ-001"]
      };

      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      // Verify all the calls in order
      const expectedCalls = [
        { type: "setLoading", isLoading: true },
        { type: "error", message: "Custom error message" },
        { type: "setLoading", isLoading: false }
      ];

      expectedCalls.forEach((expectedCall, index) => {
        expect(mockWebviewView.webview.postMessage).toHaveBeenNthCalledWith(
          index + 1,
          expectedCall
        );
      });
    });

    it("should handle stopEditMode and clear references", async () => {
      // Set up the edit mode state first
      const startEditMessage = {
        type: "startEditMode",
        requirementId: "REQ-001",
        codeReferenceId: 1,
        codeReference: {
          filePath: "test/file.ts",
          lineNumber: 1,
          snippet: "test code",
          score: 85,
          contextRange: { start: 1, end: 2 }
        }
      };

      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(startEditMessage);

      // Clear jest mock call history before testing stopEditMode
      mockWebviewView.webview.postMessage.mockClear();

      // Call _stopEditMode directly since that's what endEditMode does
      (trackerWebviewProvider as any)._stopEditMode();

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "stopEditMode"
      });
    });

    describe('stopEditMode scenarios', () => {
      beforeEach(async () => {
        // Setup edit mode before each test
        const startEditMessage = {
          type: "startEditMode",
          requirementId: "REQ-001",
          codeReferenceId: 1,
          codeReference: {
            filePath: "test/file.ts",
            lineNumber: 1,
            snippet: "test code",
            score: 85,
            contextRange: { start: 1, end: 2 }
          }
        };

        const handleMessageMethod = (
          trackerWebviewProvider as any
        )._handleMessageFromWebview.bind(trackerWebviewProvider);
        await handleMessageMethod(startEditMessage);
        mockWebviewView.webview.postMessage.mockClear();
      });

      it('should stop edit mode when confirming requirement implementation', async () => {
        const message = {
          type: "confirmRequirementImplementation",
          requirementId: "REQ-001",
          codeReference: {
            filePath: "test/file.ts",
            lineNumber: 1,
            snippet: "test code",
            score: 85,
            contextRange: { start: 1, end: 2 }
          }
        };

        const handleMessageMethod = (
          trackerWebviewProvider as any
        )._handleMessageFromWebview.bind(trackerWebviewProvider);
        await handleMessageMethod(message);

        expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
          type: "stopEditMode"
        });
      });

      it('should stop edit mode when importing requirements', async () => {
        mockRequirementsServiceFacade.importRequirements.mockResolvedValue([]);
        
        const message = {
          type: "importRequirements",
          content: "content",
          format: "csv"
        };

        const handleMessageMethod = (
          trackerWebviewProvider as any
        )._handleMessageFromWebview.bind(trackerWebviewProvider);
        await handleMessageMethod(message);

        expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
          type: "stopEditMode"
        });
      });

      it('should stop edit mode when tracking requirements', async () => {
        const message = {
          type: "trackRequirements",
          requirementIds: ["REQ-001"]
        };

        const handleMessageMethod = (
          trackerWebviewProvider as any
        )._handleMessageFromWebview.bind(trackerWebviewProvider);
        await handleMessageMethod(message);

        expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
          type: "stopEditMode"
        });
      });

      it('should stop edit mode when opening a file', async () => {
        const message = {
          type: "openFile",
          filePath: "test/file.ts",
          lineStart: 1
        };

        const handleMessageMethod = (
          trackerWebviewProvider as any
        )._handleMessageFromWebview.bind(trackerWebviewProvider);
        await handleMessageMethod(message);

        expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
          type: "stopEditMode"
        });
      });

      it('should stop edit mode when clearing requirements', async () => {
        const message = {
          type: "clearRequirements"
        };

        const handleMessageMethod = (
          trackerWebviewProvider as any
        )._handleMessageFromWebview.bind(trackerWebviewProvider);
        await handleMessageMethod(message);

        expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
          type: "stopEditMode"
        });
      });

      it('should stop edit mode when updating requirements display', async () => {
        mockRequirementsServiceFacade.getAllRequirements.mockReturnValue(mockRequirements);
        (trackerWebviewProvider as any)._updateRequirementsDisplay();

        expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
          type: "stopEditMode"
        });
      });

      it('should stop edit mode when editing a requirement', async () => {
        const message = {
          type: "editRequirement",
          requirementId: "REQ-001"
        };

        const handleMessageMethod = (
          trackerWebviewProvider as any
        )._handleMessageFromWebview.bind(trackerWebviewProvider);
        await handleMessageMethod(message);

        expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
          type: "stopEditMode"
        });
      });

      it('should stop edit mode when deleting a requirement', async () => {
        const message = {
          type: "deleteRequirement",
          requirementId: "REQ-001"
        };

        const handleMessageMethod = (
          trackerWebviewProvider as any
        )._handleMessageFromWebview.bind(trackerWebviewProvider);
        await handleMessageMethod(message);

        expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
          type: "stopEditMode"
        });
      });

      it('should handle end edit mode message', async () => {
        const message = {
          type: "endEditMode"
        };

        const handleMessageMethod = (
          trackerWebviewProvider as any
        )._handleMessageFromWebview.bind(trackerWebviewProvider);
        await handleMessageMethod(message);

        expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
          "Edit mode ended"
        );
        expect((trackerWebviewProvider as any)._isEditMode).toBe(false);
        expect((trackerWebviewProvider as any)._currentEditingReference).toBeUndefined();
      });

      it('should stop edit mode when rejecting requirement implementation', async () => {
        const message = {
          type: "rejectRequirementImplementation",
          requirementId: "REQ-001",
          codeReferenceId: 1
        };

        const handleMessageMethod = (
          trackerWebviewProvider as any
        )._handleMessageFromWebview.bind(trackerWebviewProvider);
        await handleMessageMethod(message);

        expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
          type: "stopEditMode"
        });

        expect(mockTrackingResultService.removeCodeReference).toHaveBeenCalledWith(
          "REQ-001",
          1
        );

        expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
          "Code reference rejected successfully"
        );
      });
    });
  });
});
