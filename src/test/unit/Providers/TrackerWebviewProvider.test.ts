/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, jest } from "@jest/globals";
import * as vscode from "vscode";
import type { TextDocument, TextEditor } from "vscode";
import { TrackerWebView } from "../../../WebViews/TrackerWebView";
import { RequirementsServiceFacade } from "../../../Facades/RequirementsServiceFacade";
import { TrackerWebviewProvider } from "../../../Providers/TrackerWebviewProvider";
import { Requirement } from "../../../Models/Requirement";
import { TrackingResultSummary } from "../../../Models/TrackingModels";

jest.mock("path");

describe("TrackerWebviewProvider", () => {
  let trackerWebviewProvider: TrackerWebviewProvider;
  let mockTrackerWebview: jest.Mocked<TrackerWebView>;
  let mockRequirementsServiceFacade: jest.Mocked<RequirementsServiceFacade>;
  let mockExtensionUri: jest.Mocked<vscode.Uri>;
  let mockWebviewView: jest.Mocked<vscode.WebviewView>;
  let mockRequirements: Requirement[];

  beforeEach(() => {
    mockTrackerWebview = {
      getHtmlForWebview: jest.fn().mockReturnValue("<html>Mock Webview</html>"),
    } as unknown as jest.Mocked<TrackerWebView>;

    mockExtensionUri = {
      fsPath: "mock/extension/path",
    } as unknown as jest.Mocked<vscode.Uri>;

    mockRequirementsServiceFacade = {
      getAllRequirements: jest.fn<() => Requirement[]>(),
      importRequirements: jest.fn<() => Promise<Requirement[]>>(),
      trackRequirements: jest.fn(),
      clearRequirements: jest.fn(),
      deleteRequirement: jest.fn(),
      getUnimplementedRequirements: jest.fn(),
    } as unknown as jest.Mocked<RequirementsServiceFacade>;

    mockRequirements = [
      {
        id: "1",
        name: "Requirement 1",
        description: "Description 1",
        type: "requirement",
        version: "1.0.0",
        status: "implemented",
      },
      {
        id: "2",
        name: "Requirement 2",
        description: "Description 2",
        type: "requirement",
        version: "1.0.0",
        status: "implemented",
      },
    ];

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

    it("should handle showUnimplemented message", async () => {
      const mockUnimplementedReqs: Requirement[] = [
        {
          id: "REQ-002",
          name: "Unimplemented requirement",
          description: "Unimplemented requirement",
          type: "requirement",
          status: "not-implemented",
          version: "1.0.0",
        },
        {
          id: "REQ-003",
          name: "Another unimplemented requirement",
          description: "Another unimplemented requirement",
          type: "requirement",
          status: "not-implemented",
          version: "1.0.0",
        },
      ];
      mockRequirementsServiceFacade.getUnimplementedRequirements.mockResolvedValue(
        mockUnimplementedReqs,
      );

      const message = {
        type: "showUnimplemented",
      };

      // Use reflection to call private method
      const handleMessageMethod = (
        trackerWebviewProvider as any
      )._handleMessageFromWebview.bind(trackerWebviewProvider);
      await handleMessageMethod(message);

      expect(
        mockRequirementsServiceFacade.getUnimplementedRequirements,
      ).toHaveBeenCalled();

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: true,
      });

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "unimplementedRequirements",
        requirements: mockUnimplementedReqs,
      });

      expect(mockWebviewView.webview.postMessage).toHaveBeenCalledWith({
        type: "setLoading",
        isLoading: false,
      });
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
  });

  describe("_onDidReceiveMessage", () => {
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
  });
});
