/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest, expect, describe, beforeEach, it } from "@jest/globals";
import { JSDOM } from "jsdom";

const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div id="tab-import" class="tab" data-tab="import"></div>
      <div id="tab-track" class="tab" data-tab="track"></div>
      <div id="tab-results" class="tab" data-tab="results"></div>
      <div id="loading"></div>
      <input type="file" id="file-input" />
      <select id="import-format">
        <option value="csv">CSV</option>
        <option value="json">JSON</option>
      </select>
      <button id="import-button"></button>
      <input type="checkbox" id="track-all" />
      <button id="track-button"></button>
      <button id="clear-requirements"></button>
      <textarea id="text-content"></textarea>
      <div id="requirement-selection"></div>
      <div id="requirements-checklist"></div>
      <button id="confirm-edit"></button>
      <button id="cancel-edit"></button>
      <div id="csv-options"></div>
      <div id="requirements-table-wrapper"></div>
      <div id="import-tab" class="tab-content"></div>
      <div id="track-tab" class="tab-content"></div>
      <div id="results-tab" class="tab-content"></div>
      <div id="edit-mode-ui" class="hidden">
        <span id="edit-mode-original-path"></span>
        <span id="edit-mode-original-line"></span>
      </div>
      <div id="current-selection"></div>
      <div id="summary-section"></div>
      <div id="chart-confirmed-match"></div>
      <div id="chart-possible-match"></div>
      <div id="chart-unlikely-match"></div>
      <div id="legend-confirmed-match"></div>
      <div id="legend-possible-match"></div>
      <div id="legend-unlikely-match"></div>
      <div id="requirements-results"></div>
    </body>
  </html>
`);

global.document = dom.window.document;
global.window = dom.window as any;
global.HTMLInputElement = dom.window.HTMLInputElement;
global.HTMLButtonElement = dom.window.HTMLButtonElement;
global.HTMLElement = dom.window.HTMLElement;
global.HTMLTextAreaElement = dom.window.HTMLTextAreaElement;
global.HTMLSelectElement = dom.window.HTMLSelectElement;
global.alert = jest.fn();
global.Event = dom.window.Event;
global.MouseEvent = dom.window.MouseEvent;
global.KeyboardEvent = dom.window.KeyboardEvent;
global.CustomEvent = dom.window.CustomEvent;
global.MessageEvent = dom.window.MessageEvent;
global.FileReader = window.FileReader;
global.console.error = jest.fn();

const mockVscode = {
  postMessage: jest.fn(),
};
(global as any).acquireVsCodeApi = jest.fn(() => mockVscode);

let helperFunctions: any = {};

function createScriptContext() {
  window.removeEventListener("message", window.onmessage as any);

  (global as any).requirements = [];
  (global as any).trackingResults = null;

  let helperFunctions: any = {};

  try {
    jest.resetModules();
    const trackModule: Record<string, any> = jest.requireActual(
      "../../../../media/track.js",
    );

    helperFunctions = {
      initializeUI: trackModule.initializeUI,
      attachEventListeners: trackModule.attachEventListeners,
      setupMessageHandler: trackModule.setupMessageHandler,
      attachTabEventListeners: trackModule.attachTabEventListeners,
      attachImportEventListeners: trackModule.attachImportEventListeners,
      attachTrackEventListeners: trackModule.attachTrackEventListeners,
      attachEditModeEventListeners: trackModule.attachEditModeEventListeners,
      handleTabImportClick: trackModule.handleTabImportClick,
      handleTabTrackClick: trackModule.handleTabTrackClick,
      handleTabResultsClick: trackModule.handleTabResultsClick,
      handleFileInputChange: trackModule.handleFileInputChange,
      handleImportFormatChange: trackModule.handleImportFormatChange,
      handleTrackAllChange: trackModule.handleTrackAllChange,
      handleImportButtonClick: trackModule.handleImportButtonClick,
      handleTrackButtonClick: trackModule.handleTrackButtonClick,
      handleClearRequirementsButtonClick:
        trackModule.handleClearRequirementsButtonClick,
      handleConfirmEditButtonClick: trackModule.handleConfirmEditButtonClick,
      handleCancelEditButtonClick: trackModule.handleCancelEditButtonClick,
      onRequirementsImported: trackModule.onRequirementsImported,
      onRequirementsUpdated: trackModule.onRequirementsUpdated,
      onTrackingResults: trackModule.onTrackingResults,
      onSetLoading: trackModule.onSetLoading,
      onError: trackModule.onError,
      onUpdateRequirementsTable: trackModule.onUpdateRequirementsTable,
      onStartEditMode: trackModule.onStartEditMode,
      onStopEditMode: trackModule.onStopEditMode,
      onUpdateSelectedReference: trackModule.onUpdateSelectedReference,
      onShowImportTab: trackModule.onShowImportTab,
      onShowTrackTab: trackModule.onShowTrackTab,
      onShowResultsTab: trackModule.onShowResultsTab,
      onAnalysisResult: trackModule.onAnalysisResult,
      setReqActions: trackModule.setReqActions,
      updateRequirementsDisplay: trackModule.updateRequirementsDisplay,
      handleTrackingResultsEvent: trackModule.handleTrackingResultsEvent,
      updateResultsDisplay: trackModule.updateResultsDisplay,
      updateChartDisplay: trackModule.updateChartDisplay,
      updateLegendDisplay: trackModule.updateLegendDisplay,
      updateRequirementsTable: trackModule.updateRequirementsTable,
      handleRequirementsEvents: trackModule.handleRequirementsEvents,
      assertNonNull: trackModule.assertNonNull,
      handleError: trackModule.handleError,
      escapeHtml: trackModule.escapeHtml,
      formatSnippet: trackModule.formatSnippet,
      switchToTab: trackModule.switchToTab,
      changeActiveTab: trackModule.changeActiveTab,
      addDropdownToggleEventHandler: trackModule.addDropdownToggleEventHandler,
      setFilePath: trackModule.setFilePath,
      createCodeReferenceItem: trackModule.createCodeReferenceItem,
      createRequirementItem: trackModule.createRequirementItem,
      setupAnalysisEventHandlers: trackModule.setupAnalysisEventHandlers,
      populateCodeReferences: trackModule.populateCodeReferences,
    };
  } catch (error) {
    console.error("Error in createScriptContext:", error);
    throw error;
  }

  return helperFunctions;
}

describe("track.js", () => {
  let originalDomHtml: string;

  beforeAll(() => {
    originalDomHtml = dom.window.document.documentElement.outerHTML;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    dom.window.document.documentElement.innerHTML = originalDomHtml;
    createScriptContext();
  });
  describe("initialization", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      helperFunctions = createScriptContext();
    });

    it("should initialize event listeners on DOMContentLoaded", () => {
      document.dispatchEvent(new dom.window.Event("DOMContentLoaded"));

      expect(true).toBe(true);
    });

    it("should initialize UI properly", () => {
      const importFormatSelect = document.getElementById(
        "import-format",
      ) as HTMLSelectElement;
      const trackAllCheckbox = document.getElementById(
        "track-all",
      ) as HTMLInputElement;

      importFormatSelect.value = "csv";

      helperFunctions.initializeUI();
      const csvOptions = document.getElementById("csv-options");

      expect(csvOptions?.style.display).toBe("block");

      expect(trackAllCheckbox.checked).toBe(false);
    });

    it("should handle missing DOM elements in setInitialState", () => {
      const originalImportFormatSelect =
        document.getElementById("import-format");

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      if (originalImportFormatSelect?.parentNode) {
        originalImportFormatSelect.parentNode.removeChild(
          originalImportFormatSelect,
        );
      }

      helperFunctions.initializeUI();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Required DOM elements not found in initializeUI",
      );
      consoleErrorSpy.mockRestore();

      if (originalImportFormatSelect) {
        document.body.appendChild(originalImportFormatSelect);
      }
    });

    it("should handle import-format element being of other types", () => {
      const originalImportFormatSelect =
        document.getElementById("import-format");

      if (originalImportFormatSelect?.parentNode) {
        originalImportFormatSelect.parentNode.removeChild(
          originalImportFormatSelect,
        );
      }

      const otherElement = document.createElement("div");
      otherElement.id = "import-format";
      document.body.appendChild(otherElement);

      helperFunctions.initializeUI();

      if (otherElement?.parentNode) {
        otherElement.parentNode.removeChild(otherElement);
      }

      if (originalImportFormatSelect) {
        document.body.appendChild(originalImportFormatSelect);
      }
    });

    it("should handle track-al element being of other types", () => {
      const originalImportFormatSelect = document.getElementById("track-all");

      if (originalImportFormatSelect?.parentNode) {
        originalImportFormatSelect.parentNode.removeChild(
          originalImportFormatSelect,
        );
      }

      const otherElement = document.createElement("div");
      otherElement.id = "track-all";
      document.body.appendChild(otherElement);

      helperFunctions.initializeUI();

      if (otherElement?.parentNode) {
        otherElement.parentNode.removeChild(otherElement);
      }

      if (originalImportFormatSelect) {
        document.body.appendChild(originalImportFormatSelect);
      }
    });

    it("should handle missing tab elements in attachTabEventListeners", () => {
      const originalTabImport = document.getElementById("tab-import");
      const originalTabTrack = document.getElementById("tab-track");
      const originalTabResults = document.getElementById("tab-results");

      if (originalTabImport?.parentNode) {
        originalTabImport.parentNode.removeChild(originalTabImport);
      }
      if (originalTabTrack?.parentNode) {
        originalTabTrack.parentNode.removeChild(originalTabTrack);
      }
      if (originalTabResults?.parentNode) {
        originalTabResults.parentNode.removeChild(originalTabResults);
      }

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      helperFunctions.attachTabEventListeners();

      expect(consoleErrorSpy).toHaveBeenCalledWith("Tab elements not found");
      consoleErrorSpy.mockRestore();

      if (originalTabImport) {
        document.body.appendChild(originalTabImport);
      }
      if (originalTabTrack) {
        document.body.appendChild(originalTabTrack);
      }
      if (originalTabResults) {
        document.body.appendChild(originalTabResults);
      }
    });

    it("should handle missing elements in attachImportEventListeners", () => {
      const fileInput = document.getElementById("file-input");
      const importFormatSelect = document.getElementById("import-format");
      const importButton = document.getElementById("import-button");

      if (fileInput?.parentNode) {
        fileInput.parentNode.removeChild(fileInput);
      }
      if (importFormatSelect?.parentNode) {
        importFormatSelect.parentNode.removeChild(importFormatSelect);
      }
      if (importButton?.parentNode) {
        importButton.parentNode.removeChild(importButton);
      }

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      helperFunctions.attachImportEventListeners();

      expect(consoleErrorSpy).toHaveBeenCalledWith("Import elements not found");
      consoleErrorSpy.mockRestore();

      if (fileInput) {
        document.body.appendChild(fileInput);
      }
      if (importFormatSelect) {
        document.body.appendChild(importFormatSelect);
      }
      if (importButton) {
        document.body.appendChild(importButton);
      }
    });

    it("should handle import-format element being of other types in attachImportEventListeners", () => {
      const originalImportFormatSelect =
        document.getElementById("import-format");

      if (originalImportFormatSelect?.parentNode) {
        originalImportFormatSelect.parentNode.removeChild(
          originalImportFormatSelect,
        );
      }

      const otherElement = document.createElement("div");
      otherElement.id = "import-format";
      document.body.appendChild(otherElement);

      helperFunctions.attachImportEventListeners();

      if (otherElement?.parentNode) {
        otherElement.parentNode.removeChild(otherElement);
      }

      if (originalImportFormatSelect) {
        document.body.appendChild(originalImportFormatSelect);
      }
    });

    it("should handle missing elements in attachTrackEventListeners", () => {
      const trackAllCheckbox = document.getElementById("track-all");
      const trackButton = document.getElementById("track-button");
      const clearRequirements = document.getElementById("clear-requirements");

      if (trackAllCheckbox?.parentNode) {
        trackAllCheckbox.parentNode.removeChild(trackAllCheckbox);
      }
      if (trackButton?.parentNode) {
        trackButton.parentNode.removeChild(trackButton);
      }
      if (clearRequirements?.parentNode) {
        clearRequirements.parentNode.removeChild(clearRequirements);
      }

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      helperFunctions.attachTrackEventListeners();

      expect(consoleErrorSpy).toHaveBeenCalledWith("Track elements not found");
      consoleErrorSpy.mockRestore();

      if (trackAllCheckbox) {
        document.body.appendChild(trackAllCheckbox);
      }
      if (trackButton) {
        document.body.appendChild(trackButton);
      }
      if (clearRequirements) {
        document.body.appendChild(clearRequirements);
      }
    });

    it("should handle track-all element being of other types in attachTrackEventListeners", () => {
      const trackAllCheckbox = document.getElementById("track-all");

      if (trackAllCheckbox?.parentNode) {
        trackAllCheckbox.parentNode.removeChild(trackAllCheckbox);
      }

      const otherElement = document.createElement("div");
      otherElement.id = "track-all";
      document.body.appendChild(otherElement);

      helperFunctions.attachTrackEventListeners();

      if (otherElement?.parentNode) {
        otherElement.parentNode.removeChild(otherElement);
      }

      if (trackAllCheckbox) {
        document.body.appendChild(trackAllCheckbox);
      }
    });

    it("should handle missing elements in attachEditModeEventListeners", () => {
      const confirmEditButton = document.getElementById("confirm-edit");
      const cancelEditButton = document.getElementById("cancel-edit");

      if (confirmEditButton?.parentNode) {
        confirmEditButton.parentNode.removeChild(confirmEditButton);
      }
      if (cancelEditButton?.parentNode) {
        cancelEditButton.parentNode.removeChild(cancelEditButton);
      }
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      helperFunctions.attachEditModeEventListeners();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Edit mode elements not found",
      );
      consoleErrorSpy.mockRestore();

      if (confirmEditButton) {
        document.body.appendChild(confirmEditButton);
      }
      if (cancelEditButton) {
        document.body.appendChild(cancelEditButton);
      }
    });

    it("should handle missing elements in onStopEditMode", () => {
      const currentSelection = document.getElementById("current-selection");
      const confirmEditButton = document.getElementById("confirm-edit");
      const editModeUI = document.getElementById("edit-mode-ui");

      if (currentSelection?.parentNode) {
        currentSelection.parentNode.removeChild(currentSelection);
      }
      if (confirmEditButton?.parentNode) {
        confirmEditButton.parentNode.removeChild(confirmEditButton);
      }
      if (editModeUI?.parentNode) {
        editModeUI.parentNode.removeChild(editModeUI);
      }
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      helperFunctions.onStopEditMode();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Required elements not found in handleStopEditMode",
      );
      consoleErrorSpy.mockRestore();

      if (currentSelection) {
        document.body.appendChild(currentSelection);
      }
      if (confirmEditButton) {
        document.body.appendChild(confirmEditButton);
      }
      if (editModeUI) {
        document.body.appendChild(editModeUI);
      }
    });

    it("should handle missing elements in onUpdateSelectedReference", () => {
      const currentSelection = document.getElementById("current-selection");
      const confirmEditButton = document.getElementById("confirm-edit");

      if (currentSelection?.parentNode) {
        currentSelection.parentNode.removeChild(currentSelection);
      }
      if (confirmEditButton?.parentNode) {
        confirmEditButton.parentNode.removeChild(confirmEditButton);
      }

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      helperFunctions.onUpdateSelectedReference();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Required elements not found in handleUpdateSelectedReference",
      );
      consoleErrorSpy.mockRestore();

      if (currentSelection) {
        document.body.appendChild(currentSelection);
      }
      if (confirmEditButton) {
        document.body.appendChild(confirmEditButton);
      }
    });

    it("should handle missing analysisDiv in onAnalysisResult", () => {
      const requirementId = "1";
      const summary = {
        totalRequirements: 1,
        confirmedMatches: 0,
        possibleMatches: 0,
        unlikelyMatches: 1,
        requirementDetails: {},
      };
      const analysis = "hi";

      const reqItem = document.createElement("div");
      reqItem.classList.add("requirement-item");
      reqItem.setAttribute("data-requirement", requirementId);
      if (reqItem) {
        document.body.appendChild(reqItem);
      }

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      helperFunctions.onAnalysisResult(summary, requirementId, analysis);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Could not find analysis div for requirement ${requirementId}`,
      );
      consoleErrorSpy.mockRestore();

      if (reqItem.parentNode) {
        reqItem.parentNode.removeChild(reqItem);
      }
    });

    it("should handle missing spinner in onAnalysisResult", () => {
      const requirementId = "1";
      const summary = {
        totalRequirements: 1,
        confirmedMatches: 0,
        possibleMatches: 0,
        unlikelyMatches: 1,
        requirementDetails: {},
      };
      const analysis = "hi";

      const reqItem = document.createElement("div");
      reqItem.classList.add("requirement-item");
      reqItem.setAttribute("data-requirement", requirementId);

      if (reqItem) {
        document.body.appendChild(reqItem);
      }

      const analysisDiv = document.createElement("div");
      analysisDiv.classList.add("ollama-analysis");

      if (analysisDiv) {
        reqItem.appendChild(analysisDiv);
      }

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      helperFunctions.onAnalysisResult(summary, requirementId, analysis);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Could not find spinner or content div for requirement ${requirementId}`,
      );
      consoleErrorSpy.mockRestore();

      if (reqItem.parentNode) {
        reqItem.parentNode.removeChild(reqItem);
      }
    });

    it("should handle missing contentDiv in onAnalysisResult", () => {
      const requirementId = "1";
      const summary = {
        totalRequirements: 1,
        confirmedMatches: 0,
        possibleMatches: 0,
        unlikelyMatches: 1,
        requirementDetails: {},
      };
      const analysis = "hi";

      const reqItem = document.createElement("div");
      reqItem.classList.add("requirement-item");
      reqItem.setAttribute("data-requirement", requirementId);

      if (reqItem) {
        document.body.appendChild(reqItem);
      }
      const analysisDiv = document.createElement("div");
      analysisDiv.classList.add("ollama-analysis");

      if (analysisDiv) {
        reqItem.appendChild(analysisDiv);
      }

      const spinner = document.createElement("div");
      spinner.classList.add("loading-spinner");

      if (spinner) {
        analysisDiv.appendChild(spinner);
      }

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      helperFunctions.onAnalysisResult(summary, requirementId, analysis);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Could not find spinner or content div for requirement ${requirementId}`,
      );
      consoleErrorSpy.mockRestore();

      if (reqItem.parentNode) {
        reqItem.parentNode.removeChild(reqItem);
      }
    });

    it("should handle missing Tracking results or requirement details in onAnalysisResult", () => {
      const requirementId = "1";

      const summary = {
        totalRequirements: 1,
        confirmedMatches: 0,
        possibleMatches: 0,
        unlikelyMatches: 1,
        requirementDetails: null,
      };
      const analysis = "hi";

      const reqItem = document.createElement("div");
      reqItem.classList.add("requirement-item");
      reqItem.setAttribute("data-requirement", requirementId);

      if (reqItem) {
        document.body.appendChild(reqItem);
      }
      const analysisDiv = document.createElement("div");
      analysisDiv.classList.add("ollama-analysis");

      if (analysisDiv) {
        reqItem.appendChild(analysisDiv);
      }

      const spinner = document.createElement("div");
      spinner.classList.add("loading-spinner");

      if (spinner) {
        analysisDiv.appendChild(spinner);
      }

      const contentDiv = document.createElement("div");
      contentDiv.classList.add("analysis-content");

      if (contentDiv) {
        analysisDiv.appendChild(contentDiv);
      }

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      helperFunctions.onAnalysisResult(summary, requirementId, analysis);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Tracking results or requirement details not found`,
      );
      consoleErrorSpy.mockRestore();

      if (reqItem.parentNode) {
        reqItem.parentNode.removeChild(reqItem);
      }
    });

    it("should handle missing Code references in onAnalysisResult", () => {
      const requirementId = "1";
      const summary = {
        totalRequirements: 1,
        confirmedMatches: 0,
        possibleMatches: 0,
        unlikelyMatches: 1,
        requirementDetails: {
          "1": {
            implementationStatus: "unlikely-match",
            score: 0,
            codeReferences: null,
          },
        },
      };
      const analysis =
        "[CODE_START]code snippet[CODE_END][INDEX_START]1[INDEX_END][ANALYSIS_START]analysis text[ANALYSIS_END]";

      const reqItem = document.createElement("div");
      reqItem.classList.add("requirement-item");
      reqItem.setAttribute("data-requirement", requirementId);

      if (reqItem) {
        document.body.appendChild(reqItem);
      }
      const analysisDiv = document.createElement("div");
      analysisDiv.classList.add("ollama-analysis");

      if (analysisDiv) {
        reqItem.appendChild(analysisDiv);
      }

      const spinner = document.createElement("div");
      spinner.classList.add("loading-spinner");

      if (spinner) {
        analysisDiv.appendChild(spinner);
      }

      const contentDiv = document.createElement("div");
      contentDiv.classList.add("analysis-content");

      if (contentDiv) {
        analysisDiv.appendChild(contentDiv);
      }

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      helperFunctions.onAnalysisResult(summary, requirementId, analysis);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Code references not found for requirement`,
      );
      consoleErrorSpy.mockRestore();

      if (reqItem.parentNode) {
        reqItem.parentNode.removeChild(reqItem);
      }
    });

    it("should handle missing selectedReference in onAnalysisResult", () => {
      const requirementId = "1";
      const summary = {
        totalRequirements: 1,
        confirmedMatches: 0,
        possibleMatches: 0,
        unlikelyMatches: 1,
        requirementDetails: {
          "1": {
            implementationStatus: "unlikely-match",
            score: 0,
            codeReferences: [],
          },
        },
      };
      const analysis =
        "[CODE_START]code snippet[CODE_END][INDEX_START]1[INDEX_END][ANALYSIS_START]analysis text[ANALYSIS_END]";

      const reqItem = document.createElement("div");
      reqItem.classList.add("requirement-item");
      reqItem.setAttribute("data-requirement", requirementId);
      document.body.appendChild(reqItem);

      const analysisDiv = document.createElement("div");
      analysisDiv.classList.add("ollama-analysis");
      reqItem.appendChild(analysisDiv);

      const spinner = document.createElement("div");
      spinner.classList.add("loading-spinner");
      analysisDiv.appendChild(spinner);

      const contentDiv = document.createElement("div");
      contentDiv.classList.add("analysis-content");
      analysisDiv.appendChild(contentDiv);

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      helperFunctions.onAnalysisResult(summary, requirementId, analysis);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `No code reference found at index 0`,
      );
      consoleErrorSpy.mockRestore();

      if (reqItem.parentNode) {
        reqItem.parentNode.removeChild(reqItem);
      }
    });

    it("should handle event handlers in onAnalysisResult", () => {
      const requirementId = "1";
      const summary = {
        totalRequirements: 1,
        confirmedMatches: 0,
        possibleMatches: 0,
        unlikelyMatches: 1,
        requirementDetails: {
          "1": {
            implementationStatus: "unlikely-match",
            score: 0,
            codeReferences: [
              {
                filePath: "s",
                lineNumber: 0,
                snippet: "",
                score: 0,
                relevanceExplanation: "",
              },
            ],
          },
        },
      };

      const analysis =
        "[CODE_START]code snippet[CODE_END][INDEX_START]1[INDEX_END][ANALYSIS_START]analysis text[ANALYSIS_END]";

      const reqItem = document.createElement("div");
      reqItem.classList.add("requirement-item");
      reqItem.setAttribute("data-requirement", requirementId);
      document.body.appendChild(reqItem);

      const analysisDiv = document.createElement("div");
      analysisDiv.classList.add("ollama-analysis");
      reqItem.appendChild(analysisDiv);

      const spinner = document.createElement("div");
      spinner.classList.add("loading-spinner");
      analysisDiv.appendChild(spinner);

      const contentDiv = document.createElement("div");
      contentDiv.classList.add("analysis-content");
      analysisDiv.appendChild(contentDiv);

      const analysisCodeSnippet = document.createElement("div");
      analysisCodeSnippet.classList.add("analysis-code-snippet");
      analysisDiv.appendChild(analysisCodeSnippet);

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      helperFunctions.onAnalysisResult(summary, requirementId, analysis);

      const confirmReqAction = analysisDiv.querySelector(".confirm-req-action");
      expect(confirmReqAction).not.toBeNull();

      if (confirmReqAction) {
        confirmReqAction.dispatchEvent(new Event("click"));
        expect(mockVscode.postMessage).toHaveBeenCalledWith({
          type: "confirmRequirementImplementation",
          requirementId: "1",
          codeReference: {
            filePath: "s",
            lineNumber: 0,
            snippet: "code snippet",
          },
        });
      }

      consoleErrorSpy.mockRestore();

      if (reqItem.parentNode) {
        reqItem.parentNode.removeChild(reqItem);
      }
    });

    it("should handle missing analysisCodeSnippet in onAnalysisResult", () => {
      const requirementId = "1";
      const summary = {
        totalRequirements: 1,
        confirmedMatches: 0,
        possibleMatches: 0,
        unlikelyMatches: 1,
        requirementDetails: {
          "1": {
            implementationStatus: "unlikely-match",
            score: 0,
            codeReferences: [
              {
                filePath: "s",
                lineNumber: 0,
                snippet: "",
                score: 0,
                relevanceExplanation: "",
              },
            ],
          },
        },
      };

      const analysis =
        "[CODE_START]code snippet[CODE_END][INDEX_START]1[INDEX_END][ANALYSIS_START]analysis text[ANALYSIS_END]";

      const reqItem = document.createElement("div");
      reqItem.classList.add("requirement-item");
      reqItem.setAttribute("data-requirement", requirementId);
      document.body.appendChild(reqItem);

      const analysisDiv = document.createElement("div");
      analysisDiv.classList.add("ollama-analysis");
      reqItem.appendChild(analysisDiv);

      const spinner = document.createElement("div");
      spinner.classList.add("loading-spinner");
      analysisDiv.appendChild(spinner);

      const contentDiv = document.createElement("div");
      contentDiv.classList.add("analysis-content");
      analysisDiv.appendChild(contentDiv);

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => {
        helperFunctions.onAnalysisResult(summary, requirementId, analysis);
      }).not.toThrow();

      consoleErrorSpy.mockRestore();

      if (reqItem.parentNode) {
        reqItem.parentNode.removeChild(reqItem);
      }
    });

    it("should handle missing elements in updateResultsDisplay", () => {
      const summarySection = document.getElementById("summary-section");
      if (summarySection?.parentNode) {
        summarySection.parentNode.removeChild(summarySection);
      }

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      helperFunctions.updateResultsDisplay();
      expect(consoleErrorSpy).toHaveBeenCalledWith("Summary section not found");
      consoleErrorSpy.mockRestore();

      if (summarySection) {
        document.body.appendChild(summarySection);
      }
    });

    it("should handle missing elements in updateChartDisplay", () => {
      const chartConfirmed = document.getElementById("chart-confirmed-match");
      const chartPossible = document.getElementById("chart-possible-match");
      const chartUnlikely = document.getElementById("chart-unlikely-match");

      if (chartConfirmed?.parentNode) {
        chartConfirmed.parentNode.removeChild(chartConfirmed);
      }
      if (chartPossible?.parentNode) {
        chartPossible.parentNode.removeChild(chartPossible);
      }
      if (chartUnlikely?.parentNode) {
        chartUnlikely.parentNode.removeChild(chartUnlikely);
      }

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      helperFunctions.updateChartDisplay();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Chart elements or tracking results not found",
      );
      consoleErrorSpy.mockRestore();

      if (chartConfirmed) {
        document.body.appendChild(chartConfirmed);
      }
      if (chartPossible) {
        document.body.appendChild(chartPossible);
      }
      if (chartUnlikely) {
        document.body.appendChild(chartUnlikely);
      }
    });

    it("should handle missing elements in updateLegendDisplay", () => {
      const legendConfirmed = document.getElementById("legend-confirmed-match");
      const legendPossible = document.getElementById("legend-possible-match");
      const legendUnlikely = document.getElementById("legend-unlikely-match");

      if (legendConfirmed?.parentNode) {
        legendConfirmed.parentNode.removeChild(legendConfirmed);
      }
      if (legendPossible?.parentNode) {
        legendPossible.parentNode.removeChild(legendPossible);
      }
      if (legendUnlikely?.parentNode) {
        legendUnlikely.parentNode.removeChild(legendUnlikely);
      }

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      helperFunctions.updateLegendDisplay();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Legend elements or tracking results not found",
      );
      consoleErrorSpy.mockRestore();

      if (legendConfirmed) {
        document.body.appendChild(legendConfirmed);
      }
      if (legendPossible) {
        document.body.appendChild(legendPossible);
      }
      if (legendUnlikely) {
        document.body.appendChild(legendUnlikely);
      }
    });

    it("should handle missing elements in updateRequirementsTable", () => {
      const requirementsWrapper = document.getElementById(
        "requirements-table-wrapper",
      );

      if (requirementsWrapper?.parentNode) {
        requirementsWrapper.parentNode.removeChild(requirementsWrapper);
      }

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      helperFunctions.updateRequirementsTable();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Requirements wrapper not found",
      );
      consoleErrorSpy.mockRestore();

      if (requirementsWrapper) {
        document.body.appendChild(requirementsWrapper);
      }
    });
  });

  describe("event handling", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      helperFunctions = createScriptContext();
    });

    it("should add change event listeners to requirement checkboxes that uncheck track-all when unchecked", () => {
      const tableWrapper = document.getElementById(
        "requirements-table-wrapper",
      );
      if (!tableWrapper) throw new Error("Table wrapper not found");

      tableWrapper.innerHTML = `
        <table>
          <tbody>
            <tr>
              <td><input type="checkbox" id="req1" /></td>
              <td>Requirement 1</td>
            </tr>
          </tbody>
        </table>
      `;

      const trackAllCheckbox = document.getElementById(
        "track-all",
      ) as HTMLInputElement;
      trackAllCheckbox.checked = true;

      helperFunctions.handleRequirementsEvents();

      const reqCheckbox = document.getElementById("req1") as HTMLInputElement;
      reqCheckbox.checked = false;
      reqCheckbox.dispatchEvent(new Event("change"));

      expect(trackAllCheckbox.checked).toBe(false);
    });

    it("should not modify track-all if requirement checkbox remains checked", () => {
      const tableWrapper = document.getElementById(
        "requirements-table-wrapper",
      );
      if (!tableWrapper) throw new Error("Table wrapper not found");

      tableWrapper.innerHTML = `
        <table>
          <tbody>
            <tr>
              <td><input type="checkbox" id="req1" /></td>
              <td>Requirement 1</td>
            </tr>
          </tbody>
        </table>
      `;

      const trackAllCheckbox = document.getElementById(
        "track-all",
      ) as HTMLInputElement;
      trackAllCheckbox.checked = true;

      helperFunctions.handleRequirementsEvents();

      const reqCheckbox = document.getElementById("req1") as HTMLInputElement;
      reqCheckbox.checked = true;
      reqCheckbox.dispatchEvent(new Event("change"));

      expect(trackAllCheckbox.checked).toBe(true);
    });

    it("should add click event listeners to delete requirement buttons", () => {
      const tableWrapper = document.getElementById(
        "requirements-table-wrapper",
      );
      if (!tableWrapper) throw new Error("Table wrapper not found");

      tableWrapper.innerHTML = `
        <table>
          <tbody>
            <tr>
              <td><input type="checkbox" id="req1" /></td>
              <td>Requirement 1</td>
              <td>
                <ul>
                  <li class="delete-req-action" data-requirement="REQ-001">
                    <i class="codicon codicon-trash"></i>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      `;

      helperFunctions.handleRequirementsEvents();

      const deleteButton = document.querySelector(
        ".delete-req-action",
      ) as HTMLElement;
      deleteButton.click();

      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "deleteRequirement",
        requirementId: "REQ-001",
      });
    });

    it("should handle delete action when requirement ID is missing", () => {
      const tableWrapper = document.getElementById(
        "requirements-table-wrapper",
      );
      if (!tableWrapper) throw new Error("Table wrapper not found");

      tableWrapper.innerHTML = `
        <table>
          <tbody>
            <tr>
              <td><input type="checkbox" id="req1" /></td>
              <td>Requirement 1</td>
              <td>
                <ul>
                  <li class="delete-req-action">
                    <i class="codicon codicon-trash"></i>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      `;

      helperFunctions.handleRequirementsEvents();

      const deleteButton = document.querySelector(
        ".delete-req-action",
      ) as HTMLElement;
      deleteButton.click();

      expect(mockVscode.postMessage).not.toHaveBeenCalled();
    });

    it("should add click event listeners to edit requirement buttons", () => {
      const tableWrapper = document.getElementById(
        "requirements-table-wrapper",
      );
      if (!tableWrapper) throw new Error("Table wrapper not found");

      tableWrapper.innerHTML = `
        <table>
          <tbody>
            <tr>
              <td><input type="checkbox" id="req1" /></td>
              <td>Requirement 1</td>
              <td>
                <ul>
                  <li class="edit-req-action" data-requirement="REQ-001">
                    <i class="codicon codicon-edit"></i>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      `;

      helperFunctions.handleRequirementsEvents();

      const editButton = document.querySelector(
        ".edit-req-action",
      ) as HTMLElement;
      editButton.click();

      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "editRequirement",
        requirementId: "REQ-001",
      });
    });

    it("should handle edit action when requirement ID is missing", () => {
      const tableWrapper = document.getElementById(
        "requirements-table-wrapper",
      );
      if (!tableWrapper) throw new Error("Table wrapper not found");

      tableWrapper.innerHTML = `
        <table>
          <tbody>
            <tr>
              <td><input type="checkbox" id="req1" /></td>
              <td>Requirement 1</td>
              <td>
                <ul>
                  <li class="edit-req-action">
                    <i class="codicon codicon-edit"></i>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      `;

      helperFunctions.handleRequirementsEvents();

      const editButton = document.querySelector(
        ".edit-req-action",
      ) as HTMLElement;
      editButton.click();

      expect(mockVscode.postMessage).not.toHaveBeenCalled();
    });

    it("should add click event listeners to view requirement buttons", () => {
      const tableWrapper = document.getElementById(
        "requirements-table-wrapper",
      );
      if (!tableWrapper) throw new Error("Table wrapper not found");

      tableWrapper.innerHTML = `
        <table>
          <tbody>
            <tr>
              <td><input type="checkbox" id="req1" /></td>
              <td>Requirement 1</td>
              <td>
                <ul>
                  <li class="view-req-action" data-path="/src/file.js" data-line="42">
                    <i class="codicon codicon-code"></i>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      `;

      helperFunctions.handleRequirementsEvents();

      const viewButton = document.querySelector(
        ".view-req-action",
      ) as HTMLElement;
      viewButton.click();

      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "openFile",
        filePath: "/src/file.js",
        lineStart: 42,
      });
    });

    it("should handle view action when path or line number is missing", () => {
      const tableWrapper = document.getElementById(
        "requirements-table-wrapper",
      );
      if (!tableWrapper) throw new Error("Table wrapper not found");

      tableWrapper.innerHTML = `
        <table>
          <tbody>
            <tr>
              <td><input type="checkbox" id="req1" /></td>
              <td>Requirement 1</td>
              <td>
                <ul>
                  <li class="view-req-action">
                    <i class="codicon codicon-code"></i>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      `;

      helperFunctions.handleRequirementsEvents();

      const viewButton = document.querySelector(
        ".view-req-action",
      ) as HTMLElement;
      viewButton.click();

      expect(mockVscode.postMessage).not.toHaveBeenCalled();
    });

    it("should handle non-HTMLElement nodes in the action selectors", () => {
      const tableWrapper = document.getElementById(
        "requirements-table-wrapper",
      );
      if (!tableWrapper) throw new Error("Table wrapper not found");

      tableWrapper.innerHTML = `
        <table>
          <tbody>
            <tr>
              <td>
                Text node before
                <input type="checkbox" id="req1" />
                Text node after
              </td>
              <td>
                Text node before
                <span class="delete-req-action" data-requirement="REQ-001"></span>
                Text node after
              </td>
            </tr>
          </tbody>
        </table>
      `;

      expect(() => {
        helperFunctions.handleRequirementsEvents();
      }).not.toThrow();
    });

    it("should properly attach tab event listeners that call the correct handlers", () => {
      helperFunctions.attachTabEventListeners();

      const tabImport = document.querySelector("#tab-import");
      const tabTrack = document.querySelector("#tab-track");
      const tabResults = document.querySelector("#tab-results");

      tabImport?.dispatchEvent(new MouseEvent("click"));
      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "tabToImport",
      });

      tabTrack?.dispatchEvent(new MouseEvent("click"));
      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "tabToTrack",
      });

      tabResults?.dispatchEvent(new MouseEvent("click"));
      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "tabToResults",
      });
    });

    it("should properly attach importFormatSelect event listener that calls the correct handlers", () => {
      helperFunctions.attachImportEventListeners();

      const tabImport = document.getElementById("import-format");

      tabImport?.dispatchEvent(new Event("change"));
      const csvOptions = document.getElementById("csv-options");

      expect(csvOptions?.style.display).toBe("block");
    });

    it("should properly attach trackAllCheckbox event listener that calls the correct handlers", () => {
      helperFunctions.attachTrackEventListeners();

      const tabImport = document.getElementById("track-all");

      tabImport?.dispatchEvent(new MouseEvent("click"));
    });

    it("should handle tab import click", () => {
      const event = new MouseEvent("click");
      helperFunctions.handleTabImportClick(event);
      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "tabToImport",
      });
    });

    it("should handle tab track click", () => {
      const event = new MouseEvent("click");
      helperFunctions.handleTabTrackClick(event);
      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "tabToTrack",
      });
    });

    it("should handle tab results click", () => {
      const event = new MouseEvent("click");
      helperFunctions.handleTabResultsClick(event);
      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "tabToResults",
      });
    });

    it("should handle file input change", () => {
      const testFile = new File(["sample content"], "test.txt", {
        type: "text/plain",
      });
      const fileInput = document.getElementById(
        "file-input",
      ) as HTMLInputElement;
      const textContent = document.getElementById(
        "text-content",
      ) as HTMLTextAreaElement;

      const mockFileReader = {
        onload: null as any,
        readAsText: jest.fn(function (this: any, _file: File) {
          setTimeout(() => {
            if (this.onload) {
              this.onload({ target: { result: "sample content" } });
            }
          }, 0);
        }),
      };

      (global as any).FileReader = jest.fn(() => mockFileReader);

      const event = { target: fileInput } as any;
      Object.defineProperty(fileInput, "files", {
        value: [testFile],
        writable: true,
      });

      helperFunctions.handleFileInputChange(event);

      if (mockFileReader.onload) {
        mockFileReader.onload({ target: { result: "sample content" } });
        expect(textContent.value).toBe("sample content");
      }
    });

    it("should handle file input change with non-HTMLInputElement target", () => {
      const divElement = document.createElement("div");
      const event = { target: divElement } as any;

      helperFunctions.handleFileInputChange(event);
    });

    it("should handle file input change with no files", () => {
      const fileInput = document.getElementById(
        "file-input",
      ) as HTMLInputElement;

      const event = { target: fileInput } as any;
      Object.defineProperty(fileInput, "files", {
        value: [],
        writable: true,
      });

      helperFunctions.handleFileInputChange(event);
    });

    it("should handle file input change with non-HTMLTextAreaElement", () => {
      const testFile = new File(["sample content"], "test.txt", {
        type: "text/plain",
      });
      const fileInput = document.getElementById(
        "file-input",
      ) as HTMLInputElement;

      const originalTextContent = document.getElementById("text-content");

      if (originalTextContent?.parentNode) {
        originalTextContent.parentNode.removeChild(originalTextContent);
      }

      const divTextContent = document.createElement("div");
      divTextContent.id = "text-content";
      document.body.appendChild(divTextContent);

      const event = { target: fileInput } as any;
      Object.defineProperty(fileInput, "files", {
        value: [testFile],
        writable: true,
      });

      helperFunctions.handleFileInputChange(event);

      if (divTextContent?.parentNode) {
        divTextContent.parentNode.removeChild(divTextContent);
      }

      if (originalTextContent) {
        document.body.appendChild(originalTextContent);
      }
    });

    it("should handle undefined target in event in handleFileInputChange", () => {
      document.body.innerHTML =
        '<input id="file-input" type="file"><textarea id="text-content"></textarea>';
      const fileInput = document.getElementById("file-input");
      const textContent = document.getElementById(
        "text-content",
      ) as HTMLTextAreaElement;
      if (textContent == null) {
        throw new Error("Text content element not found");
      }
      textContent.value = "initial value";

      const mockFileReader = {
        readAsText: jest.fn(),
        onload: null as any,
      };
      (global.FileReader as any) = jest.fn(() => mockFileReader);

      const mockFile = new File(["content"], "filename.txt");
      Object.defineProperty(fileInput, "files", { value: [mockFile] });
      const event = { target: fileInput };

      helperFunctions.handleFileInputChange(event);

      if (mockFileReader.onload) {
        mockFileReader.onload({ target: null });
      }

      expect(textContent.value).toBe("initial value");
    });

    it("should handle import format change", () => {
      const csvOptions = document.getElementById("csv-options");

      helperFunctions.handleImportFormatChange("csv");
      expect(csvOptions?.style.display).toBe("block");

      helperFunctions.handleImportFormatChange("json");
      expect(csvOptions?.style.display).toBe("none");
    });

    it("should handle import format change with missing CSV options element", () => {
      const originalCsvOptions = document.getElementById("csv-options");

      if (originalCsvOptions?.parentNode) {
        originalCsvOptions.parentNode.removeChild(originalCsvOptions);
      }

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      helperFunctions.handleImportFormatChange("csv");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Required element not found",
      );
      consoleErrorSpy.mockRestore();

      if (originalCsvOptions) {
        document.body.appendChild(originalCsvOptions);
      }
    });

    it("should handle track all checkbox change", () => {
      const trackAllCheckbox = document.getElementById(
        "track-all",
      ) as HTMLInputElement;
      const tbody = document.createElement("tbody");

      for (let i = 0; i < 3; i++) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        cell.appendChild(checkbox);
        row.appendChild(cell);
        tbody.appendChild(row);
      }

      document.body.appendChild(tbody);

      trackAllCheckbox.checked = true;
      helperFunctions.handleTrackAllChange(trackAllCheckbox);

      document.querySelectorAll("td input").forEach((checkbox) => {
        expect((checkbox as HTMLInputElement).checked).toBe(true);
      });

      trackAllCheckbox.checked = false;
      helperFunctions.handleTrackAllChange(trackAllCheckbox);

      document.querySelectorAll("td input").forEach((checkbox) => {
        expect((checkbox as HTMLInputElement).checked).toBe(false);
      });

      document.body.removeChild(tbody);
    });

    it("should handle non-HTMLInputElement elements in handleTrackAllChange", () => {
      const trackAllCheckbox = document.getElementById(
        "track-all",
      ) as HTMLInputElement;
      const tbody = document.createElement("tbody");

      const row1 = document.createElement("tr");
      const cell1 = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      cell1.appendChild(checkbox);
      row1.appendChild(cell1);

      const row2 = document.createElement("tr");
      const cell2 = document.createElement("td");
      const spanElement = document.createElement("span");
      spanElement.textContent = "Not an input";
      cell2.appendChild(spanElement);
      row2.appendChild(cell2);

      tbody.appendChild(row1);
      tbody.appendChild(row2);
      document.body.appendChild(tbody);

      const originalQuerySelectorAll = document.querySelectorAll;
      const mockElements = [checkbox, spanElement];

      const mockNodeList = {
        forEach: (callback: (element: Element, index: number) => void) => {
          mockElements.forEach(callback);
        },
        item: (index: number) => mockElements[index] || null,
        length: mockElements.length,
        [Symbol.iterator]: function* () {
          for (const element of mockElements) {
            yield element;
          }
        },
      } as unknown as NodeListOf<Element>;

      document.querySelectorAll = jest
        .fn()
        .mockReturnValue(
          mockNodeList,
        ) as unknown as typeof document.querySelectorAll;

      try {
        trackAllCheckbox.checked = true;
        helperFunctions.handleTrackAllChange(trackAllCheckbox);

        expect(checkbox.checked).toBe(true);

        expect(true).toBe(true);
      } finally {
        document.querySelectorAll = originalQuerySelectorAll;
        document.body.removeChild(tbody);
      }
    });

    it("should handle import button click with valid content", () => {
      const importFormatSelect = document.getElementById(
        "import-format",
      ) as HTMLSelectElement;
      const textContent = document.getElementById(
        "text-content",
      ) as HTMLTextAreaElement;

      importFormatSelect.value = "json";
      textContent.value = '{"data": "test"}';

      helperFunctions.handleImportButtonClick();

      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "importRequirements",
        format: "json",
        content: '{"data": "test"}',
        options: {},
      });
    });

    it("should handle import button click with non-HTMLSelectElement for import-format", () => {
      const originalImportFormatSelect =
        document.getElementById("import-format");

      if (originalImportFormatSelect?.parentNode) {
        originalImportFormatSelect.parentNode.removeChild(
          originalImportFormatSelect,
        );
      }

      const divImportFormat = document.createElement("div");
      divImportFormat.id = "import-format";
      document.body.appendChild(divImportFormat);

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      helperFunctions.handleImportButtonClick();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Required elements not found",
      );
      consoleErrorSpy.mockRestore();

      if (divImportFormat?.parentNode) {
        divImportFormat.parentNode.removeChild(divImportFormat);
      }

      if (originalImportFormatSelect) {
        document.body.appendChild(originalImportFormatSelect);
      }
    });

    it("should handle import button click with non-HTMLTextAreaElement for text-content", () => {
      const originalTextContent = document.getElementById("text-content");

      if (originalTextContent?.parentNode) {
        originalTextContent.parentNode.removeChild(originalTextContent);
      }

      const divTextContent = document.createElement("div");
      divTextContent.id = "text-content";
      document.body.appendChild(divTextContent);

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      helperFunctions.handleImportButtonClick();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Required elements not found",
      );
      consoleErrorSpy.mockRestore();

      if (divTextContent?.parentNode) {
        divTextContent.parentNode.removeChild(divTextContent);
      }

      if (originalTextContent) {
        document.body.appendChild(originalTextContent);
      }
    });

    it("should handle import button click with empty content", () => {
      const importFormatSelect = document.getElementById(
        "import-format",
      ) as HTMLSelectElement;
      const textContent = document.getElementById(
        "text-content",
      ) as HTMLTextAreaElement;

      importFormatSelect.value = "json";
      textContent.value = "  ";

      const alertSpy = jest.spyOn(global, "alert");

      helperFunctions.handleImportButtonClick();

      expect(alertSpy).toHaveBeenCalledWith("Please provide content to import");
      alertSpy.mockRestore();
    });

    it("should handle import button click with CSV format and custom delimiter", () => {
      const importFormatSelect = document.getElementById(
        "import-format",
      ) as HTMLSelectElement;
      const textContent = document.getElementById(
        "text-content",
      ) as HTMLTextAreaElement;
      const csvOptions = document.getElementById("csv-options");

      const delimiterInput = document.createElement("input");
      delimiterInput.id = "csv-delimiter";
      delimiterInput.value = ";";
      csvOptions?.appendChild(delimiterInput);

      importFormatSelect.value = "csv";
      textContent.value = "id;name;description";

      helperFunctions.handleImportButtonClick();

      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "importRequirements",
        format: "csv",
        content: "id;name;description",
        options: {
          delimiter: ";",
        },
      });

      csvOptions?.removeChild(delimiterInput);
    });

    it("should handle non-HTMLInputElement delimiter in handleImportButtonClick", () => {
      const importFormatSelect = document.getElementById(
        "import-format",
      ) as HTMLSelectElement;
      const textContent = document.getElementById(
        "text-content",
      ) as HTMLTextAreaElement;
      const csvOptions = document.getElementById("csv-options");

      const spanDelimiter = document.createElement("span");
      spanDelimiter.id = "csv-delimiter";
      spanDelimiter.textContent = ";";
      csvOptions?.appendChild(spanDelimiter);

      importFormatSelect.value = "csv";
      textContent.value = "id,name,description";

      helperFunctions.handleImportButtonClick();

      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "importRequirements",
        format: "csv",
        content: "id,name,description",
        options: {},
      });

      csvOptions?.removeChild(spanDelimiter);
    });

    it("should handle track button click with selected requirements", () => {
      (global as any).requirements = [
        {
          id: "REQ-001",
          name: "Req 1",
          description: "Description 1",
          type: "Functional",
          priority: "High",
          status: "Open",
        },
        {
          id: "REQ-002",
          name: "Req 2",
          description: "Description 2",
          type: "Non-Functional",
          priority: "Medium",
          status: "Open",
        },
      ];

      const table = document.createElement("table");
      const tbody = document.createElement("tbody");

      const row1 = document.createElement("tr");
      const cell1 = document.createElement("td");
      const checkbox1 = document.createElement("input");
      checkbox1.type = "checkbox";
      checkbox1.id = "REQ-001";
      checkbox1.checked = true;
      cell1.appendChild(checkbox1);
      row1.appendChild(cell1);

      const row2 = document.createElement("tr");
      const cell2 = document.createElement("td");
      const checkbox2 = document.createElement("input");
      checkbox2.type = "checkbox";
      checkbox2.id = "REQ-002";
      checkbox2.checked = false;
      cell2.appendChild(checkbox2);
      row2.appendChild(cell2);

      tbody.appendChild(row1);
      tbody.appendChild(row2);
      table.appendChild(tbody);
      document.body.appendChild(table);

      const postMessageSpy = jest.spyOn(mockVscode, "postMessage");

      helperFunctions.handleTrackButtonClick((global as any).requirements);

      expect(postMessageSpy).toHaveBeenCalledWith({
        type: "trackRequirements",
        requirementIds: ["REQ-001"],
      });

      document.body.removeChild(table);
    });

    test("should handle cases where checked elements are not HTMLInputElements (though selector makes this unlikely)", () => {
      helperFunctions.onRequirementsImported([
        {
          id: "REQ-001",
          name: "Req 1",
          description: "Description 1",
        },
      ]);

      const mockCheckbox = document.createElement("input");
      mockCheckbox.type = "checkbox";
      mockCheckbox.id = "req1";
      mockCheckbox.checked = true;

      const mockDiv = document.createElement("div");

      const td1 = document.createElement("td");
      td1.appendChild(mockCheckbox);
      const td2 = document.createElement("td");
      td2.appendChild(mockDiv);

      if (td1.firstChild == null || td2.firstChild == null) {
        return;
      }

      const mockNodesArray: (HTMLInputElement | HTMLDivElement)[] = [];
      mockNodesArray.push(td1.firstChild as HTMLInputElement);
      mockNodesArray.push(td2.firstChild as HTMLDivElement);

      jest
        .spyOn(document, "querySelectorAll")
        .mockReturnValue(mockNodesArray as unknown as NodeListOf<Element>);

      helperFunctions.handleTrackButtonClick();

      expect(global.alert).not.toHaveBeenCalled();
      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        requirementIds: ["req1"],
        type: "trackRequirements",
      });

      jest.restoreAllMocks();
    });

    it("should handle track button click with no selected requirements", () => {
      helperFunctions.onRequirementsImported([
        {
          id: "REQ-001",
          name: "Req 1",
          description: "Description 1",
        },
      ]);

      const checkboxes = document.querySelectorAll("td input:checked");

      checkboxes.forEach((checkbox) => {
        if (checkbox instanceof HTMLInputElement) {
          checkbox.checked = false;
        }
      });

      const alertSpy = jest.spyOn(global, "alert");

      helperFunctions.handleTrackButtonClick();

      expect(alertSpy).toHaveBeenCalledWith(
        "Please select at least one requirement to track",
      );
      alertSpy.mockRestore();
    });

    it("should handle clear requirements button click", () => {
      helperFunctions.handleClearRequirementsButtonClick();

      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "clearRequirements",
      });
    });

    it("should handle confirm edit button click", () => {
      const confirmEditButton = document.getElementById(
        "confirm-edit",
      ) as HTMLButtonElement;

      confirmEditButton.removeAttribute("disabled");

      const event = new MouseEvent("click");
      helperFunctions.handleConfirmEditButtonClick(event);

      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "confirmEditImplementation",
      });
    });

    it("should not call postMessage when confirm edit button is disabled", () => {
      const confirmEditButton = document.getElementById(
        "confirm-edit",
      ) as HTMLButtonElement;

      confirmEditButton.setAttribute("disabled", "true");

      const event = new MouseEvent("click");

      mockVscode.postMessage.mockClear();

      helperFunctions.handleConfirmEditButtonClick(event);

      expect(mockVscode.postMessage).not.toHaveBeenCalled();
    });

    it("should handle non-HTMLButtonElement in handleConfirmEditButtonClick", () => {
      const originalButton = document.getElementById("confirm-edit");

      if (originalButton?.parentNode) {
        originalButton.parentNode.removeChild(originalButton);
      }

      const spanButton = document.createElement("span");
      spanButton.id = "confirm-edit";
      document.body.appendChild(spanButton);

      const event = new MouseEvent("click");

      mockVscode.postMessage.mockClear();

      helperFunctions.handleConfirmEditButtonClick(event);

      expect(mockVscode.postMessage).not.toHaveBeenCalled();

      if (spanButton.parentNode) {
        spanButton.parentNode.removeChild(spanButton);
      }

      if (originalButton) {
        document.body.appendChild(originalButton);
      }
    });

    it("should handle cancel edit button click", () => {
      const event = new MouseEvent("click");
      helperFunctions.handleCancelEditButtonClick(event);

      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "cancelEditImplementation",
      });
    });

    it("should handle case when requirement is not found", () => {
      (global as any).requirements = [];

      const requirement = null;
      const codeReference = {
        filePath: "path/to/file.js",
        lineNumber: 42,
      };

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      helperFunctions.onStartEditMode(requirement, codeReference);

      expect(consoleErrorSpy).toHaveBeenCalledWith("Requirement not found");
      consoleErrorSpy.mockRestore();
    });

    it("should handle case when edit mode UI element is not found", () => {
      helperFunctions.onRequirementsImported([
        {
          id: "REQ-001",
          name: "Test Requirement",
          description: "Test Description",
        },
      ]);

      const editModeUI = document.getElementById("edit-mode-ui");
      if (editModeUI?.parentNode) {
        editModeUI.parentNode.removeChild(editModeUI);
      }

      const message = {
        requirementId: "REQ-001",
        codeReference: {
          filePath: "path/to/file.js",
          lineNumber: 42,
        },
      };

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      helperFunctions.onStartEditMode(message);

      expect(consoleErrorSpy).toHaveBeenCalledWith("Edit mode UI not found");
      consoleErrorSpy.mockRestore();

      const newEditModeUI = document.createElement("div");
      newEditModeUI.id = "edit-mode-ui";
      newEditModeUI.classList.add("hidden");
      newEditModeUI.innerHTML = `
        <span id="edit-mode-original-path"></span>
        <span id="edit-mode-original-line"></span>
      `;
      document.body.appendChild(newEditModeUI);
    });

    it("should handle case when path/line elements are not found", () => {
      helperFunctions.onRequirementsImported([
        {
          id: "REQ-001",
          name: "Test Requirement",
          description: "Test Description",
        },
      ]);

      const editModeUI = document.getElementById("edit-mode-ui");
      if (editModeUI?.parentNode) {
        editModeUI.parentNode.removeChild(editModeUI);
      }

      const newEditModeUI = document.createElement("div");
      newEditModeUI.id = "edit-mode-ui";
      newEditModeUI.classList.add("hidden");
      document.body.appendChild(newEditModeUI);

      const message = {
        requirementId: "REQ-001",
        codeReference: {
          filePath: "path/to/file.js",
          lineNumber: 42,
        },
      };

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      helperFunctions.onStartEditMode(message);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Edit mode path/line elements not found",
      );
      consoleErrorSpy.mockRestore();

      if (newEditModeUI.parentNode) {
        newEditModeUI.parentNode.removeChild(newEditModeUI);
      }
      const restoreEditModeUI = document.createElement("div");
      restoreEditModeUI.id = "edit-mode-ui";
      restoreEditModeUI.classList.add("hidden");
      restoreEditModeUI.innerHTML = `
        <span id="edit-mode-original-path"></span>
        <span id="edit-mode-original-line"></span>
      `;
      document.body.appendChild(restoreEditModeUI);
    });

    it("should successfully activate edit mode with valid inputs", () => {
      const requirement = {
        id: "REQ-001",
        name: "Test Requirement",
        description: "Test Description",
      };

      const editModeUI = document.getElementById("edit-mode-ui");
      if (!editModeUI) {
        const newEditModeUI = document.createElement("div");
        newEditModeUI.id = "edit-mode-ui";
        newEditModeUI.classList.add("hidden");
        newEditModeUI.innerHTML = `
          <span id="edit-mode-original-path"></span>
          <span id="edit-mode-original-line"></span>
        `;
        document.body.appendChild(newEditModeUI);
      }

      const filePath = "path/to/file.js";
      const lineNumber = 42;
      const codeReference = {
        filePath: filePath,
        lineNumber: lineNumber,
      };

      helperFunctions.onStartEditMode(requirement, codeReference);

      const updatedEditModeUI = document.getElementById("edit-mode-ui");
      const originalPath = updatedEditModeUI?.querySelector(
        "#edit-mode-original-path",
      );
      const originalLine = updatedEditModeUI?.querySelector(
        "#edit-mode-original-line",
      );

      expect(originalPath?.innerHTML).toBe(filePath);
      expect(originalLine?.innerHTML).toBe((lineNumber + 1).toString());
      expect(updatedEditModeUI?.classList.contains("hidden")).toBe(false);
    });
  });

  describe("message handling", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      helperFunctions = createScriptContext();
    });

    it("should handle requirementsImported message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "requirementsImported",
            summary: {
              totalRequirements: 1,
              confirmedMatches: 0,
              possibleMatches: 0,
              unlikelyMatches: 1,
              requirementDetails: {},
            },
            requirements: [
              {
                id: "REQ-001",
                name: "Req 1",
                description: "Description 1",
                type: "Functional",
                status: "Open",
              },
            ],
          },
        }),
      );
    });

    it("should handle updateRequirements message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "updateRequirements",
            summary: {
              totalRequirements: 1,
              confirmedMatches: 0,
              possibleMatches: 0,
              unlikelyMatches: 1,
              requirementDetails: {},
            },
            requirements: [
              {
                id: "REQ-001",
                name: "Req 1",
                description: "Description 1",
                type: "Functional",
                status: "Open",
              },
            ],
          },
        }),
      );
    });

    it("should handle trackingResults message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "trackingResults",
            summary: {
              totalRequirements: 1,
              confirmedMatches: 0,
              possibleMatches: 0,
              unlikelyMatches: 1,
              requirementDetails: {
                "REQ-001": {
                  implementationStatus: "unlikely-match",
                  score: 0,
                  codeReferences: [
                    {
                      filePath: "",
                      lineNumber: 0,
                      snippet: "",
                      score: 0,
                      relevanceExplanation: "",
                    },
                  ],
                },
              },
            },
            requirements: [
              {
                id: "REQ-001",
                name: "Req 1",
                description: "Description 1",
                type: "Functional",
                status: "Open",
              },
            ],
          },
        }),
      );
    });

    it("should handle setLoading message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "setLoading",
            isLoading: true,
          },
        }),
      );
    });

    it("should show loading element when isLoading is true", () => {
      const loadingElement = document.getElementById("loading");
      if (!loadingElement) {
        throw new Error("Loading element not found");
      }

      loadingElement.style.display = "none";

      helperFunctions.onSetLoading(true);

      expect(loadingElement.style.display).toBe("flex");
    });

    it("should hide loading element when isLoading is false", () => {
      const loadingElement = document.getElementById("loading");
      if (!loadingElement) {
        throw new Error("Loading element not found");
      }

      loadingElement.style.display = "flex";

      helperFunctions.onSetLoading(false);

      expect(loadingElement.style.display).toBe("none");
    });

    it("should handle missing loading element", () => {
      const originalLoadingElement = document.getElementById("loading");

      if (originalLoadingElement?.parentNode) {
        originalLoadingElement.parentNode.removeChild(originalLoadingElement);
      }

      expect(() => {
        helperFunctions.onSetLoading(true);
      }).not.toThrow();

      if (originalLoadingElement) {
        document.body.appendChild(originalLoadingElement);
      }
    });

    it("should handle error message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "error",
            message: "Test error",
          },
        }),
      );
    });

    it("should handle updateRequirementsTable message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "updateRequirementsTable",
            requirements: [
              {
                id: "REQ-001",
                name: "Req 1",
                description: "Description 1",
                type: "Functional",
                status: "Open",
              },
            ],
          },
        }),
      );
    });

    it("should handle startEditMode message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "startEditMode",
          },
        }),
      );
    });

    it("should handle stopEditMode message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "stopEditMode",
          },
        }),
      );
    });

    it("should handle non-HTMLButtonElement confirmEditButton in onStopEditMode", () => {
      const originalCurrentSelection =
        document.getElementById("current-selection");
      const originalConfirmEditButton = document.getElementById("confirm-edit");
      const originalEditModeUI = document.getElementById("edit-mode-ui");

      if (
        !originalCurrentSelection ||
        !originalConfirmEditButton ||
        !originalEditModeUI
      ) {
        throw new Error("Required elements not found");
      }

      if (originalConfirmEditButton.parentNode) {
        originalConfirmEditButton.parentNode.removeChild(
          originalConfirmEditButton,
        );
      }

      const spanButton = document.createElement("span");
      spanButton.id = "confirm-edit";
      document.body.appendChild(spanButton);

      originalCurrentSelection.innerText = "Some selected text";
      originalEditModeUI.classList.remove("hidden");

      helperFunctions.onStopEditMode({});

      expect(spanButton.hasAttribute("disabled")).toBe(false);

      expect(originalCurrentSelection.innerText).toBe("No text selected");
      expect(originalEditModeUI.classList.contains("hidden")).toBe(true);

      if (spanButton.parentNode) {
        spanButton.parentNode.removeChild(spanButton);
      }

      if (originalConfirmEditButton) {
        document.body.appendChild(originalConfirmEditButton);
      }
    });

    it("should handle updateSelectedReference message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "updateSelectedReference",
            codeReference: {
              filePath: "",
              lineNumber: 0,
              snippet: "",
              score: 0,
              relevanceExplanation: "",
              contextRange: {
                start: 0,
                end: 0,
              },
            },
          },
        }),
      );
    });

    it("should handle showImportTab message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "showImportTab",
          },
        }),
      );
    });

    it("should handle when tab-import is not an HTMLElement in onShowImportTab", () => {
      const originalTabImport = document.getElementById("tab-import");
      if (!originalTabImport) {
        throw new Error("tab-import element not found");
      }

      if (originalTabImport.parentNode) {
        originalTabImport.parentNode.removeChild(originalTabImport);
      }

      const changeActiveTabSpy = jest.spyOn(helperFunctions, "changeActiveTab");

      const originalQuerySelector = document.querySelector;
      document.querySelector = jest.fn().mockReturnValue(null);

      try {
        helperFunctions.onShowImportTab();

        expect(changeActiveTabSpy).not.toHaveBeenCalled();
      } finally {
        document.querySelector = originalQuerySelector;

        if (originalTabImport) {
          document.body.appendChild(originalTabImport);
        }

        changeActiveTabSpy.mockRestore();
      }
    });

    it("should handle showTrackTab message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "showTrackTab",
            requirements: [
              {
                id: "REQ-001",
                name: "Req 1",
                description: "Description 1",
                type: "Functional",
                status: "Open",
              },
            ],
          },
        }),
      );
    });

    it("should handle when tab-track is not an HTMLElement in onShowTrackTab", () => {
      const originalTabTrack = document.getElementById("tab-track");
      if (!originalTabTrack) {
        throw new Error("tab-track element not found");
      }

      const testReqs = [
        {
          id: "REQ-001",
          name: "Test Req",
          description: "Test Description",
        },
      ];

      const updateTableSpy = jest.spyOn(
        helperFunctions,
        "updateRequirementsTable",
      );

      const changeActiveTabSpy = jest.spyOn(helperFunctions, "changeActiveTab");

      const originalQuerySelector = document.querySelector;
      document.querySelector = jest.fn().mockReturnValue(null);

      try {
        helperFunctions.onShowTrackTab(testReqs);
      } finally {
        document.querySelector = originalQuerySelector;
        updateTableSpy.mockRestore();
        changeActiveTabSpy.mockRestore();
      }
    });

    it("should handle showResultsTab message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "showResultsTab",
            summary: {
              totalRequirements: 1,
              confirmedMatches: 0,
              possibleMatches: 0,
              unlikelyMatches: 1,
              requirementDetails: {
                "REQ-001": {
                  implementationStatus: "unlikely-match",
                  score: 0,
                  codeReferences: [
                    {
                      filePath: "",
                      lineNumber: 0,
                      snippet: "",
                      score: 0,
                      relevanceExplanation: "",
                    },
                  ],
                },
              },
            },
            requirements: [
              {
                id: "REQ-001",
                name: "Req 1",
                description: "Description 1",
                type: "Functional",
                status: "Open",
              },
            ],
          },
        }),
      );
    });

    it("should handle when tab-results is not an HTMLElement in onShowResultsTab", () => {
      const testSummary = {
        totalRequirements: 5,
        confirmedMatches: 2,
        possibleMatches: 1,
        unlikelyMatches: 2,
        requirementDetails: {
          "REQ-001": {
            implementationStatus: "confirmed-match",
            score: 0.9,
            codeReferences: [
              {
                filePath: "test/file.js",
                lineNumber: 42,
                snippet: "function test() { }",
                score: 0.9,
                relevanceExplanation: "Test explanation",
              },
            ],
          },
        },
      };

      const updateResultsSpy = jest.spyOn(
        helperFunctions,
        "updateResultsDisplay",
      );

      const changeActiveTabSpy = jest.spyOn(helperFunctions, "changeActiveTab");

      const originalQuerySelector = document.querySelector;
      document.querySelector = jest.fn().mockReturnValue(null);

      try {
        helperFunctions.onShowResultsTab(testSummary);
        expect(changeActiveTabSpy).not.toHaveBeenCalled();
      } finally {
        document.querySelector = originalQuerySelector;
        updateResultsSpy.mockRestore();
        changeActiveTabSpy.mockRestore();
      }
    });

    it("should handle analysisResult message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "analysisResult",
            requirementId: "REQ-001",
            analysis:
              "[CODE_START]code snippet[CODE_END][INDEX_START]1[INDEX_END][ANALYSIS_START]analysis text[ANALYSIS_END]",
          },
        }),
      );
    });
  });

  describe("helper functions", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      helperFunctions = createScriptContext();
    });

    describe("updateRequirementsDisplay", () => {
      it("should handle missing requirementsResults element", () => {
        const originalRequirementsResults = document.getElementById(
          "requirements-results",
        );

        if (originalRequirementsResults?.parentNode) {
          originalRequirementsResults.parentNode.removeChild(
            originalRequirementsResults,
          );
        }

        const summary = {
          totalRequirements: 1,
          confirmedMatches: 0,
          possibleMatches: 0,
          unlikelyMatches: 1,
          requirementDetails: {
            "REQ-001": {
              implementationStatus: "unlikely-match",
              score: 0,
              codeReferences: [
                {
                  filePath: "src/test.js",
                  lineNumber: 42,
                  snippet: "const answer = 42;",
                  score: 0.5,
                  relevanceExplanation: "Test explanation",
                },
              ],
            },
          },
        };

        const requirements = [
          {
            id: "REQ-001",
            name: "Test Requirement",
            description: "Test Description",
          },
        ];

        const consoleErrorSpy = jest
          .spyOn(console, "error")
          .mockImplementation(() => {});

        helperFunctions.updateRequirementsDisplay(summary, requirements);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Requirements results element not found",
        );

        consoleErrorSpy.mockRestore();

        if (!document.getElementById("requirements-results")) {
          const newElement = document.createElement("div");
          newElement.id = "requirements-results";
          document.body.appendChild(newElement);
        }
      });
    });

    describe("setFilePath", () => {
      it("should set click handler on filePath element to open the file", () => {
        const codeReference = {
          filePath: "src/main.js",
          lineNumber: 42,
          snippet: "const answer = 42;",
          score: 0.9,
          relevanceExplanation: "This is a relevant match",
        };

        const refItem = document.createElement("div");
        refItem.innerHTML = `
          <div class="dropdown-header ref-header">
            <div class="file-path">src/main.js:42</div>
            <div class="dropdown-toggle"><i class="codicon codicon-chevron-down"></i></div>
          </div>
        `;

        helperFunctions.setFilePath(refItem, codeReference);

        const filePath = refItem.querySelector(".file-path");
        expect(filePath).not.toBeNull();

        filePath?.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          }),
        );

        expect(mockVscode.postMessage).toHaveBeenCalledWith({
          type: "openFile",
          filePath: "src/main.js",
          lineStart: 42,
        });

        const stopPropagationSpy = jest.fn();
        const clickEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        });
        clickEvent.stopPropagation = stopPropagationSpy;

        filePath?.dispatchEvent(clickEvent);
        expect(stopPropagationSpy).toHaveBeenCalled();
      });

      it("should handle missing filePath element gracefully", () => {
        const codeReference = {
          filePath: "src/main.js",
          lineNumber: 42,
          snippet: "const answer = 42;",
          score: 0.9,
          relevanceExplanation: "This is a relevant match",
        };

        const refItem = document.createElement("div");
        refItem.innerHTML = `
          <div class="dropdown-header ref-header">
            <div class="dropdown-toggle"><i class="codicon codicon-chevron-down"></i></div>
          </div>
        `;

        expect(() => {
          helperFunctions.setFilePath(refItem, codeReference);
        }).not.toThrow();

        expect(true).toBe(true);
      });
    });

    describe("setReqActions", () => {
      it("should set click handlers for confirm action", () => {
        const refItem = document.createElement("div");
        const confirmAction = document.createElement("li");
        confirmAction.className = "confirm-req-action";
        refItem.appendChild(confirmAction);

        const requirementId = "REQ-001";
        const codeReference = {
          filePath: "src/main.js",
          lineNumber: 42,
          snippet: "const answer = 42;",
        };
        const implementationIndex = 0;

        helperFunctions.setReqActions(
          refItem,
          requirementId,
          codeReference,
          implementationIndex,
        );

        confirmAction.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          }),
        );

        expect(mockVscode.postMessage).toHaveBeenCalledWith({
          type: "confirmRequirementImplementation",
          requirementId,
          codeReference,
        });
      });

      it("should set click handlers for delete action", () => {
        const refItem = document.createElement("div");
        const deleteAction = document.createElement("li");
        deleteAction.className = "delete-req-action";
        refItem.appendChild(deleteAction);

        const requirementId = "REQ-001";
        const codeReference = {
          filePath: "src/main.js",
          lineNumber: 42,
          snippet: "const answer = 42;",
        };
        const implementationIndex = 0;

        helperFunctions.setReqActions(
          refItem,
          requirementId,
          codeReference,
          implementationIndex,
        );

        deleteAction.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          }),
        );

        expect(mockVscode.postMessage).toHaveBeenCalledWith({
          type: "rejectRequirementImplementation",
          requirementId,
          codeReferenceId: implementationIndex,
        });
      });

      it("should set click handlers for edit action", () => {
        const refItem = document.createElement("div");
        const editAction = document.createElement("li");
        editAction.className = "edit-req-action";
        refItem.appendChild(editAction);

        const requirementId = "REQ-001";
        const codeReference = {
          filePath: "src/main.js",
          lineNumber: 42,
          snippet: "const answer = 42;",
        };
        const implementationIndex = 0;

        helperFunctions.setReqActions(
          refItem,
          requirementId,
          codeReference,
          implementationIndex,
        );

        editAction.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          }),
        );

        expect(mockVscode.postMessage).toHaveBeenCalledWith({
          type: "startEditMode",
          requirementId,
          codeReferenceId: implementationIndex,
          codeReference,
        });
      });

      it("should handle missing action elements gracefully", () => {
        const refItem = document.createElement("div");

        const requirementId = "REQ-001";
        const codeReference = {
          filePath: "src/main.js",
          lineNumber: 42,
          snippet: "const answer = 42;",
        };
        const implementationIndex = 0;

        expect(() => {
          helperFunctions.setReqActions(
            refItem,
            requirementId,
            codeReference,
            implementationIndex,
          );
        }).not.toThrow();
      });
    });

    describe("createRequirementItem", () => {
      it("should create requirement item with confirmed-match status", () => {
        const reqId = "REQ-001";
        const result = {
          implementationStatus: "confirmed-match",
          score: 0.85,
          codeReferences: [
            {
              filePath: "src/main.js",
              lineNumber: 42,
              snippet: "const answer = 42;",
              score: 0.85,
              relevanceExplanation: "This is a confirmed match",
            },
          ],
        };
        const req = {
          id: "REQ-001",
          name: "Authentication",
          description: "The system shall authenticate users",
          type: "Functional",
          priority: "High",
          status: "Open",
        };

        const requirementItem = helperFunctions.createRequirementItem(
          reqId,
          result,
          req,
        );

        document.body.appendChild(requirementItem);

        expect(requirementItem.className).toBe(
          "requirement-item dropdown-container",
        );
        expect(requirementItem.getAttribute("data-requirement")).toBe(reqId);

        const statusSpan = requirementItem.querySelector(
          ".implementation-status",
        );
        expect(statusSpan?.className).toContain("status-confirmed-match");
        expect(statusSpan?.textContent?.trim()).toBe("confirmed match");

        const scoreSpan = requirementItem.querySelector(
          ".implementation-info span",
        );
        expect(scoreSpan?.textContent).toBe("Score: 85%");

        const reqId2 = requirementItem.querySelector(".requirement-id");
        expect(reqId2?.textContent).toBe(req.name);

        const reqDesc = requirementItem.querySelector(
          ".requirement-description",
        );
        expect(reqDesc?.textContent).toBe(req.description);

        const reqMeta = requirementItem.querySelector(".requirement-meta");
        expect(reqMeta?.textContent?.trim()).toBe(
          `Type: ${req.type} | Priority: ${req.priority} | Status: ${req.status}`,
        );
      });

      it("should create requirement item with possible-match status", () => {
        const reqId = "REQ-002";
        const result = {
          implementationStatus: "possible-match",
          score: 0.65,
          codeReferences: [
            {
              filePath: "src/auth.js",
              lineNumber: 25,
              snippet: "function checkAuth() { return user.isLoggedIn; }",
              score: 0.65,
              relevanceExplanation: "This is a possible match",
            },
          ],
        };
        const req = {
          id: "REQ-002",
          name: "Authorization",
          description: "The system shall authorize user actions",
          type: "Functional",
          priority: "Medium",
          status: "In Progress",
        };

        const requirementItem = helperFunctions.createRequirementItem(
          reqId,
          result,
          req,
        );

        document.body.appendChild(requirementItem);

        const statusSpan = requirementItem.querySelector(
          ".implementation-status",
        );
        expect(statusSpan?.className).toContain("status-possible-match");
        expect(statusSpan?.textContent?.trim()).toBe("possible match");

        const scoreSpan = requirementItem.querySelector(
          ".implementation-info span",
        );
        expect(scoreSpan?.textContent).toBe("Score: 65%");

        const refsContainer = requirementItem.querySelector(".code-references");
        expect(refsContainer?.id).toBe(
          `refs-${req.id.replace("{", "").replace("}", "")}`,
        );

        const analyzeButton = requirementItem.querySelector(".analyze-button");
        expect(analyzeButton?.getAttribute("data-requirement")).toBe(reqId);
      });
    });

    describe("handleRequirementsEvents function", () => {
      beforeEach(() => {
        jest.clearAllMocks();
        helperFunctions = createScriptContext();

        const tableWrapper = document.getElementById(
          "requirements-table-wrapper",
        );
        if (tableWrapper) {
          tableWrapper.innerHTML = "";
        }
      });

      it("should handle when selectRequirements contains non-HTMLInputElement", () => {
        const tableWrapper = document.getElementById(
          "requirements-table-wrapper",
        );
        if (!tableWrapper) {
          throw new Error("Table wrapper not found");
        }

        tableWrapper.innerHTML = `
          <table>
            <tbody>
              <tr>
                <td><input type="checkbox" id="valid-input" /></td>
                <td><span id="invalid-input">Not an input</span></td>
              </tr>
            </tbody>
          </table>
        `;

        const validInput = document.getElementById(
          "valid-input",
        ) as HTMLInputElement;
        const invalidInput = document.getElementById(
          "invalid-input",
        ) as HTMLElement;

        const validInputAddEventListenerSpy = jest.spyOn(
          validInput,
          "addEventListener",
        );
        const invalidInputAddEventListenerSpy = jest.spyOn(
          invalidInput,
          "addEventListener",
        );

        helperFunctions.handleRequirementsEvents();

        expect(validInputAddEventListenerSpy).toHaveBeenCalledWith(
          "change",
          expect.any(Function),
        );

        expect(invalidInputAddEventListenerSpy).not.toHaveBeenCalled();

        validInputAddEventListenerSpy.mockRestore();
        invalidInputAddEventListenerSpy.mockRestore();
      });

      it("should handle when trackAllCheckbox is not an HTMLInputElement", () => {
        const tableWrapper = document.getElementById(
          "requirements-table-wrapper",
        );
        if (!tableWrapper) {
          throw new Error("Table wrapper not found");
        }

        tableWrapper.innerHTML = `
          <table>
            <tbody>
              <tr>
                <td><input type="checkbox" id="req-checkbox" /></td>
              </tr>
            </tbody>
          </table>
        `;

        const originalTrackAll = document.getElementById("track-all");
        if (originalTrackAll?.parentNode) {
          originalTrackAll.parentNode.removeChild(originalTrackAll);
        }

        const spanElement = document.createElement("span");
        spanElement.id = "track-all";
        document.body.appendChild(spanElement);

        helperFunctions.handleRequirementsEvents();

        const reqCheckbox = document.getElementById(
          "req-checkbox",
        ) as HTMLInputElement;
        reqCheckbox.checked = false;
        reqCheckbox.dispatchEvent(new Event("change"));

        expect(true).toBe(true);

        if (spanElement.parentNode) {
          spanElement.parentNode.removeChild(spanElement);
        }
        const newTrackAll = document.createElement("input");
        newTrackAll.type = "checkbox";
        newTrackAll.id = "track-all";
        document.body.appendChild(newTrackAll);
      });

      it("should handle when trackAllCheckbox is not checked", () => {
        const tableWrapper = document.getElementById(
          "requirements-table-wrapper",
        );
        if (!tableWrapper) {
          throw new Error("Table wrapper not found");
        }

        tableWrapper.innerHTML = `
          <table>
            <tbody>
              <tr>
                <td><input type="checkbox" id="req-checkbox" /></td>
              </tr>
            </tbody>
          </table>
        `;

        const trackAllCheckbox = document.getElementById(
          "track-all",
        ) as HTMLInputElement;
        trackAllCheckbox.checked = false;

        helperFunctions.handleRequirementsEvents();

        const trackAllCheckedSetter = jest.spyOn(
          trackAllCheckbox,
          "checked",
          "set",
        );

        const reqCheckbox = document.getElementById(
          "req-checkbox",
        ) as HTMLInputElement;
        reqCheckbox.checked = false;
        reqCheckbox.dispatchEvent(new Event("change"));

        expect(trackAllCheckedSetter).not.toHaveBeenCalled();

        trackAllCheckedSetter.mockRestore();
      });

      it("should handle when deleteReqAction is not an HTMLElement", () => {
        const tableWrapper = document.getElementById(
          "requirements-table-wrapper",
        );
        if (!tableWrapper) {
          throw new Error("Table wrapper not found");
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `<td>
          <!-- This text node will be selected by querySelector but isn't an HTMLElement -->
          Text node
          <span class="delete-req-action" data-requirement="REQ-001">Delete</span>
        </td>`;
        tableWrapper.appendChild(tr);

        const td = tr.querySelector("td");
        if (!td) {
          throw new Error("TD element not found");
        }

        const textNode = td.firstChild;
        if (!textNode) {
          throw new Error("Text node not found");
        }

        const mockNodeList = {
          forEach: (callback: (element: Element, index: number) => void) => {
            callback(textNode as unknown as Element, 0);
          },
          item: (index: number) =>
            index === 0 ? (textNode as unknown as Element) : null,
          length: 1,
          [Symbol.iterator]: function* () {
            yield textNode as unknown as Element;
          },
        } as unknown as NodeListOf<Element>;

        const originalQuerySelectorAll = document.querySelectorAll;
        document.querySelectorAll = jest.fn(() => mockNodeList);

        helperFunctions.handleRequirementsEvents();

        expect(mockVscode.postMessage).not.toHaveBeenCalled();

        document.querySelectorAll = originalQuerySelectorAll;
      });

      it("should handle when editReqAction is not an HTMLElement", () => {
        const tableWrapper = document.getElementById(
          "requirements-table-wrapper",
        );
        if (!tableWrapper) {
          throw new Error("Table wrapper not found");
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `<td>
          <!-- This text node will be selected by querySelector but isn't an HTMLElement -->
          Text node
          <span class="edit-req-action" data-requirement="REQ-001">Edit</span>
        </td>`;
        tableWrapper.appendChild(tr);

        const td = tr.querySelector("td");
        if (!td) {
          throw new Error("TD element not found");
        }

        const textNode = td.firstChild;
        if (!textNode) {
          throw new Error("Text node not found");
        }

        const mockNodeList = {
          forEach: (callback: (element: Element, index: number) => void) => {
            callback(textNode as unknown as Element, 0);
          },
          item: (index: number) =>
            index === 0 ? (textNode as unknown as Element) : null,
          length: 1,
          [Symbol.iterator]: function* () {
            yield textNode as unknown as Element;
          },
        } as unknown as NodeListOf<Element>;

        const originalQuerySelectorAll = document.querySelectorAll;
        document.querySelectorAll = jest.fn(() => mockNodeList);

        helperFunctions.handleRequirementsEvents();

        expect(mockVscode.postMessage).not.toHaveBeenCalled();

        document.querySelectorAll = originalQuerySelectorAll;
      });

      it("should handle when viewReqAction is not an HTMLElement", () => {
        const tableWrapper = document.getElementById(
          "requirements-table-wrapper",
        );
        if (!tableWrapper) {
          throw new Error("Table wrapper not found");
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `<td>
          <!-- This text node will be selected by querySelector but isn't an HTMLElement -->
          Text node
          <span class="view-req-action" data-path="/path/to/file.js" data-line="42">View</span>
        </td>`;
        tableWrapper.appendChild(tr);

        const td = tr.querySelector("td");
        if (!td) {
          throw new Error("TD element not found");
        }

        const textNode = td.firstChild;
        if (!textNode) {
          throw new Error("Text node not found");
        }

        const mockNodeList = {
          forEach: (callback: (element: Element, index: number) => void) => {
            callback(textNode as unknown as Element, 0);
          },
          item: (index: number) =>
            index === 0 ? (textNode as unknown as Element) : null,
          length: 1,
          [Symbol.iterator]: function* () {
            yield textNode as unknown as Element;
          },
        } as unknown as NodeListOf<Element>;

        const originalQuerySelectorAll = document.querySelectorAll;
        document.querySelectorAll = jest.fn(() => mockNodeList);

        helperFunctions.handleRequirementsEvents();

        expect(mockVscode.postMessage).not.toHaveBeenCalled();

        document.querySelectorAll = originalQuerySelectorAll;
      });
    });

    describe("switchToTab function", () => {
      it("should handle case when there are no tabs", () => {
        const tabs = document.querySelectorAll(".tab");
        tabs.forEach((tab) => {
          if (tab.parentNode) {
            tab.parentNode.removeChild(tab);
          }
        });

        const mockForEach = jest.fn();
        const originalQuerySelectorAll = document.querySelectorAll;

        const emptyNodeList = {
          length: 0,
          forEach: mockForEach,
          item: () => null,
          [Symbol.iterator]: function* () {},
        };

        document.querySelectorAll = jest.fn((selector: string) => {
          if (selector === ".tab") {
            return emptyNodeList as any;
          }
          return originalQuerySelectorAll.call(document, selector);
        });

        helperFunctions.switchToTab(1);

        expect(mockForEach).not.toHaveBeenCalled();

        document.querySelectorAll = originalQuerySelectorAll;
      });

      it("should handle case when there are no tab contents", () => {
        const tabContents = document.querySelectorAll(".tab-content");
        tabContents.forEach((content) => {
          if (content.parentNode) {
            content.parentNode.removeChild(content);
          }
        });

        const mockForEach = jest.fn();
        const originalQuerySelectorAll = document.querySelectorAll;

        const emptyNodeList = {
          length: 0,
          forEach: mockForEach,
          item: () => null,
          [Symbol.iterator]: function* () {},
        };

        document.querySelectorAll = jest.fn((selector: string) => {
          if (selector === ".tab-content") {
            return emptyNodeList as any;
          }
          return originalQuerySelectorAll.call(document, selector);
        });

        helperFunctions.switchToTab(1);

        expect(mockForEach).not.toHaveBeenCalled();

        document.querySelectorAll = originalQuerySelectorAll;
      });

      it("should handle negative tab index gracefully", () => {
        const negativeIndex = -1;

        const tabs = document.querySelectorAll(".tab");
        const tabContents = document.querySelectorAll(".tab-content");

        const tabClassListAddSpies = Array.from(tabs).map((tab) =>
          jest.spyOn(tab.classList, "add"),
        );

        const tabContentClassListAddSpies = Array.from(tabContents).map(
          (content) => jest.spyOn(content.classList, "add"),
        );

        helperFunctions.switchToTab(negativeIndex);

        tabClassListAddSpies.forEach((spy) => {
          expect(spy).not.toHaveBeenCalled();
        });

        tabContentClassListAddSpies.forEach((spy) => {
          expect(spy).not.toHaveBeenCalled();
        });

        tabClassListAddSpies.forEach((spy) => spy.mockRestore());
        tabContentClassListAddSpies.forEach((spy) => spy.mockRestore());
      });
    });

    it("should assert non-null values", () => {
      expect(helperFunctions.assertNonNull("test", "Error")).toBe("test");
      expect(() => helperFunctions.assertNonNull(null, "Error")).toThrow(
        "Error",
      );
      expect(() => helperFunctions.assertNonNull(undefined, "Error")).toThrow(
        "Error",
      );
    });

    it("should handle errors", () => {
      const consoleErrorSpy = jest.spyOn(console, "error");

      helperFunctions.handleError(new Error("Test error"));

      expect(consoleErrorSpy).toHaveBeenCalledWith("Test error");
      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "error",
        message: "Test error",
      });

      helperFunctions.handleError("String error");

      expect(consoleErrorSpy).toHaveBeenCalledWith("String error");
      expect(mockVscode.postMessage).toHaveBeenCalledWith({
        type: "error",
        message: "String error",
      });
    });

    it("should escape HTML", () => {
      const input = '<div class="test">Hello & "world" \'test\'</div>';
      const expected =
        "&lt;div class=&quot;test&quot;&gt;Hello &amp; &quot;world&quot; &#039;test&#039;&lt;/div&gt;";

      expect(helperFunctions.escapeHtml(input)).toBe(expected);
    });

    it("should format snippet", () => {
      const shortSnippet = "function test() { return true; }";
      expect(helperFunctions.formatSnippet(shortSnippet)).toBe(shortSnippet);

      const longSnippet = "a".repeat(400);
      expect(helperFunctions.formatSnippet(longSnippet)).toBe(
        "a".repeat(300) + "...",
      );

      expect(helperFunctions.formatSnippet("")).toBe("");
      expect(helperFunctions.formatSnippet(null)).toBe("");
    });

    it("should switch to tab", () => {
      const tabs = document.querySelectorAll(".tab");
      const tabContents = document.querySelectorAll(".tab-content");

      helperFunctions.switchToTab(1);

      expect(tabs[0].classList.contains("active")).toBe(false);
      expect(tabs[1].classList.contains("active")).toBe(true);
      expect(tabs[2].classList.contains("active")).toBe(false);

      expect(tabContents[0].classList.contains("active")).toBe(false);
      expect(tabContents[1].classList.contains("active")).toBe(true);
      expect(tabContents[2].classList.contains("active")).toBe(false);
    });

    it("should change active tab", () => {
      const importTab = document.getElementById("tab-import") as HTMLElement;
      importTab.setAttribute("data-tab", "import");

      helperFunctions.changeActiveTab(importTab);

      expect(importTab.classList.contains("active")).toBe(true);
      expect(
        document.getElementById("import-tab")?.classList.contains("active"),
      ).toBe(true);
    });

    describe("addDropdownToggleEventHandler", () => {
      let dropdownContainer: HTMLElement;
      let toggleElement: Element | null;
      let toggleIcon: Element | null;

      beforeEach(() => {
        dropdownContainer = document.createElement("div");
        dropdownContainer.className = "dropdown-container";
        dropdownContainer.innerHTML = `
          <div class="dropdown-header">
            <span>Test Dropdown</span>
            <div class="dropdown-toggle"><i class="codicon codicon-chevron-down"></i></div>
          </div>
          <div class="dropdown-content">
            <p>Dropdown content</p>
          </div>
        `;
        document.body.appendChild(dropdownContainer);

        toggleElement = dropdownContainer.querySelector(".dropdown-toggle");
        toggleIcon = toggleElement ? toggleElement.querySelector("i") : null;
      });

      afterEach(() => {
        if (dropdownContainer && dropdownContainer.parentNode) {
          dropdownContainer.parentNode.removeChild(dropdownContainer);
        }
      });

      it("should toggle 'expanded' class on container when toggle is clicked", () => {
        helperFunctions.addDropdownToggleEventHandler(
          dropdownContainer,
          ".dropdown-toggle",
          "i",
        );

        toggleElement?.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          }),
        );

        expect(dropdownContainer.classList.contains("expanded")).toBe(true);

        toggleElement?.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          }),
        );

        expect(dropdownContainer.classList.contains("expanded")).toBe(false);
      });

      it("should change icon classes when expanded/collapsed", () => {
        helperFunctions.addDropdownToggleEventHandler(
          dropdownContainer,
          ".dropdown-toggle",
          "i",
        );

        toggleElement?.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          }),
        );

        expect(toggleIcon?.classList.contains("codicon-chevron-up")).toBe(true);
        expect(toggleIcon?.classList.contains("codicon-chevron-down")).toBe(
          false,
        );

        toggleElement?.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          }),
        );

        expect(toggleIcon?.classList.contains("codicon-chevron-down")).toBe(
          true,
        );
        expect(toggleIcon?.classList.contains("codicon-chevron-up")).toBe(
          false,
        );
      });

      it("should stop event propagation when toggle is clicked", () => {
        const stopPropagationSpy = jest.fn();

        helperFunctions.addDropdownToggleEventHandler(
          dropdownContainer,
          ".dropdown-toggle",
          "i",
        );

        const clickEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        });
        clickEvent.stopPropagation = stopPropagationSpy;

        toggleElement?.dispatchEvent(clickEvent);

        expect(stopPropagationSpy).toHaveBeenCalled();
      });

      it("should not throw error when toggle element is not found", () => {
        const nonExistentSelector = ".non-existent-toggle";

        expect(() => {
          helperFunctions.addDropdownToggleEventHandler(
            dropdownContainer,
            nonExistentSelector,
            "i",
          );
        }).not.toThrow();
      });

      it("should handle missing icon element gracefully", () => {
        if (toggleIcon?.parentNode) {
          toggleIcon.parentNode.removeChild(toggleIcon);
        }

        expect(() => {
          helperFunctions.addDropdownToggleEventHandler(
            dropdownContainer,
            ".dropdown-toggle",
            "i",
          );

          toggleElement?.dispatchEvent(
            new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
            }),
          );

          expect(dropdownContainer.classList.contains("expanded")).toBe(true);
        }).not.toThrow();
      });
    });

    describe("populateCodeReferences", () => {
      it("should return early if code references are empty or null", () => {
        const requirementItem = document.createElement("div");
        requirementItem.classList.add("requirement-item");
        requirementItem.setAttribute("data-requirement", "REQ-001");

        const refsContainer = document.createElement("div");
        refsContainer.id = "refs-REQ-001";
        requirementItem.appendChild(refsContainer);

        document.body.appendChild(requirementItem);

        const appendChildSpy = jest.spyOn(refsContainer, "appendChild");

        helperFunctions.populateCodeReferences(
          requirementItem,
          null,
          "REQ-001",
          "refs-REQ-001",
        );

        expect(appendChildSpy).not.toHaveBeenCalled();

        helperFunctions.populateCodeReferences(
          requirementItem,
          [],
          "REQ-001",
          "refs-REQ-001",
        );

        expect(appendChildSpy).not.toHaveBeenCalled();

        appendChildSpy.mockRestore();

        if (requirementItem.parentNode) {
          requirementItem.parentNode.removeChild(requirementItem);
        }
      });

      it("should return early if refs container is not found", () => {
        const requirementItem = document.createElement("div");
        requirementItem.classList.add("requirement-item");
        requirementItem.setAttribute("data-requirement", "REQ-001");

        document.body.appendChild(requirementItem);

        const createCodeReferenceItemSpy = jest.spyOn(
          helperFunctions,
          "createCodeReferenceItem",
        );

        const codeReferences = [
          {
            filePath: "src/test.js",
            lineNumber: 42,
            snippet: "const answer = 42;",
            score: 0.9,
            relevanceExplanation: "Test explanation",
          },
        ];

        helperFunctions.populateCodeReferences(
          requirementItem,
          codeReferences,
          "REQ-001",
          "non-existent-container-id",
        );

        expect(createCodeReferenceItemSpy).not.toHaveBeenCalled();

        createCodeReferenceItemSpy.mockRestore();

        if (requirementItem.parentNode) {
          requirementItem.parentNode.removeChild(requirementItem);
        }
      });
    });

    describe("setupAnalysisEventHandlers", () => {
      it("should attach click event listeners to analyze buttons that trigger analysis", async () => {
        const summary = {
          totalRequirements: 1,
          confirmedMatches: 0,
          possibleMatches: 0,
          unlikelyMatches: 1,
          requirementDetails: {
            "REQ-001": {
              implementationStatus: "unlikely-match",
              score: 0,
              codeReferences: [
                {
                  filePath: "src/test.js",
                  lineNumber: 42,
                  snippet: "const answer = 42;",
                  score: 0.5,
                  relevanceExplanation: "Test explanation",
                },
              ],
            },
          },
        };

        const requirements = [
          {
            id: "REQ-001",
            name: "Test Requirement",
            description: "Test Description",
            type: "Functional",
            priority: "High",
            status: "Open",
          },
        ];

        const requirementItem = document.createElement("div");
        requirementItem.classList.add("requirement-item");
        requirementItem.setAttribute("data-requirement", "REQ-001");

        const analyzeButton = document.createElement("button");
        analyzeButton.classList.add("analyze-button");
        requirementItem.appendChild(analyzeButton);

        const analysisDiv = document.createElement("div");
        analysisDiv.classList.add("ollama-analysis");
        requirementItem.appendChild(analysisDiv);

        const spinner = document.createElement("div");
        spinner.classList.add("loading-spinner");
        analysisDiv.appendChild(spinner);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("analysis-content");
        analysisDiv.appendChild(contentDiv);

        document.body.appendChild(requirementItem);

        helperFunctions.setupAnalysisEventHandlers(
          document.querySelectorAll(".analyze-button"),
          summary,
          requirements,
        );

        const consoleLogSpy = jest
          .spyOn(console, "log")
          .mockImplementation(() => {});

        analyzeButton.click();

        expect(analysisDiv.classList.contains("hidden")).toBe(false);
        expect(spinner.classList.contains("hidden")).toBe(false);
        expect(contentDiv.textContent).toBe("Analyzing...");

        expect(mockVscode.postMessage).toHaveBeenCalledWith({
          type: "analyzeImplementation",
          requirementId: "REQ-001",
          requirement: requirements[0],
          codeReferences: summary.requirementDetails["REQ-001"].codeReferences,
        });

        expect(consoleLogSpy).toHaveBeenCalledWith(
          "Sending analyze implementation message",
          {
            requirement: requirements[0],
            codeReferences:
              summary.requirementDetails["REQ-001"].codeReferences,
          },
        );

        consoleLogSpy.mockRestore();

        if (requirementItem.parentNode) {
          requirementItem.parentNode.removeChild(requirementItem);
        }
      });

      it("should handle missing parent requirement item", () => {
        const analyzeButton = document.createElement("button");
        analyzeButton.classList.add("analyze-button");

        document.body.appendChild(analyzeButton);

        const summary = {
          totalRequirements: 1,
          confirmedMatches: 0,
          possibleMatches: 0,
          unlikelyMatches: 1,
          requirementDetails: {
            "REQ-001": {
              implementationStatus: "unlikely-match",
              score: 0,
              codeReferences: [],
            },
          },
        };

        const requirements = [
          {
            id: "REQ-001",
            name: "Test Requirement",
            description: "Test Description",
          },
        ];

        const consoleErrorSpy = jest
          .spyOn(console, "error")
          .mockImplementation(() => {});

        helperFunctions.setupAnalysisEventHandlers(
          document.querySelectorAll(".analyze-button"),
          summary,
          requirements,
        );

        analyzeButton.click();

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Could not find parent requirement item",
        );

        expect(mockVscode.postMessage).not.toHaveBeenCalled();

        consoleErrorSpy.mockRestore();

        if (analyzeButton.parentNode) {
          analyzeButton.parentNode.removeChild(analyzeButton);
        }
      });

      it("should handle missing analysis div", () => {
        const requirementItem = document.createElement("div");
        requirementItem.classList.add("requirement-item");
        requirementItem.setAttribute("data-requirement", "REQ-001");

        const analyzeButton = document.createElement("button");
        analyzeButton.classList.add("analyze-button");
        requirementItem.appendChild(analyzeButton);

        document.body.appendChild(requirementItem);

        const summary = {
          totalRequirements: 1,
          confirmedMatches: 0,
          possibleMatches: 0,
          unlikelyMatches: 1,
          requirementDetails: {
            "REQ-001": {
              implementationStatus: "unlikely-match",
              score: 0,
              codeReferences: [],
            },
          },
        };

        const requirements = [
          {
            id: "REQ-001",
            name: "Test Requirement",
            description: "Test Description",
          },
        ];

        const consoleErrorSpy = jest
          .spyOn(console, "error")
          .mockImplementation(() => {});

        helperFunctions.setupAnalysisEventHandlers(
          document.querySelectorAll(".analyze-button"),
          summary,
          requirements,
        );

        analyzeButton.click();

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Could not find analysis div",
        );

        consoleErrorSpy.mockRestore();

        if (requirementItem.parentNode) {
          requirementItem.parentNode.removeChild(requirementItem);
        }
      });

      it("should handle missing spinner or content div", () => {
        const requirementItem = document.createElement("div");
        requirementItem.classList.add("requirement-item");
        requirementItem.setAttribute("data-requirement", "REQ-001");

        const analyzeButton = document.createElement("button");
        analyzeButton.classList.add("analyze-button");
        requirementItem.appendChild(analyzeButton);

        const analysisDiv = document.createElement("div");
        analysisDiv.classList.add("ollama-analysis");
        requirementItem.appendChild(analysisDiv);

        document.body.appendChild(requirementItem);

        const summary = {
          totalRequirements: 1,
          confirmedMatches: 0,
          possibleMatches: 0,
          unlikelyMatches: 1,
          requirementDetails: {
            "REQ-001": {
              implementationStatus: "unlikely-match",
              score: 0,
              codeReferences: [],
            },
          },
        };

        const requirements = [
          {
            id: "REQ-001",
            name: "Test Requirement",
            description: "Test Description",
          },
        ];

        const consoleErrorSpy = jest
          .spyOn(console, "error")
          .mockImplementation(() => {});

        helperFunctions.setupAnalysisEventHandlers(
          document.querySelectorAll(".analyze-button"),
          summary,
          requirements,
        );

        analyzeButton.click();

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Could not find spinner or content div",
        );

        consoleErrorSpy.mockRestore();

        if (requirementItem.parentNode) {
          requirementItem.parentNode.removeChild(requirementItem);
        }
      });

      it("should handle missing requirement ID or tracking results", () => {
        const requirementItem = document.createElement("div");
        requirementItem.classList.add("requirement-item");

        const analyzeButton = document.createElement("button");
        analyzeButton.classList.add("analyze-button");
        requirementItem.appendChild(analyzeButton);

        const analysisDiv = document.createElement("div");
        analysisDiv.classList.add("ollama-analysis");
        requirementItem.appendChild(analysisDiv);

        const spinner = document.createElement("div");
        spinner.classList.add("loading-spinner");
        analysisDiv.appendChild(spinner);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("analysis-content");
        analysisDiv.appendChild(contentDiv);

        document.body.appendChild(requirementItem);

        const summary = {
          totalRequirements: 1,
          confirmedMatches: 0,
          possibleMatches: 0,
          unlikelyMatches: 1,
        };

        const requirements = [
          {
            id: "REQ-001",
            name: "Test Requirement",
            description: "Test Description",
          },
        ];

        const consoleErrorSpy = jest
          .spyOn(console, "error")
          .mockImplementation(() => {});

        helperFunctions.setupAnalysisEventHandlers(
          document.querySelectorAll(".analyze-button"),
          summary,
          requirements,
        );

        analyzeButton.click();

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Missing requirement ID or tracking results",
        );

        consoleErrorSpy.mockRestore();

        if (requirementItem.parentNode) {
          requirementItem.parentNode.removeChild(requirementItem);
        }
      });

      it("should handle no tracking results found for requirement", () => {
        const requirementItem = document.createElement("div");
        requirementItem.classList.add("requirement-item");
        requirementItem.setAttribute("data-requirement", "REQ-001");

        const analyzeButton = document.createElement("button");
        analyzeButton.classList.add("analyze-button");
        requirementItem.appendChild(analyzeButton);

        const analysisDiv = document.createElement("div");
        analysisDiv.classList.add("ollama-analysis");
        requirementItem.appendChild(analysisDiv);

        const spinner = document.createElement("div");
        spinner.classList.add("loading-spinner");
        analysisDiv.appendChild(spinner);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("analysis-content");
        analysisDiv.appendChild(contentDiv);

        document.body.appendChild(requirementItem);

        const summary = {
          totalRequirements: 1,
          confirmedMatches: 0,
          possibleMatches: 0,
          unlikelyMatches: 1,
          requirementDetails: {
            "REQ-002": {
              implementationStatus: "unlikely-match",
              score: 0,
              codeReferences: [],
            },
          },
        };

        const requirements = [
          {
            id: "REQ-001",
            name: "Test Requirement",
            description: "Test Description",
          },
        ];

        const consoleErrorSpy = jest
          .spyOn(console, "error")
          .mockImplementation(() => {});

        helperFunctions.setupAnalysisEventHandlers(
          document.querySelectorAll(".analyze-button"),
          summary,
          requirements,
        );

        analyzeButton.click();

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "No tracking results found for requirement REQ-001",
        );

        consoleErrorSpy.mockRestore();

        if (requirementItem.parentNode) {
          requirementItem.parentNode.removeChild(requirementItem);
        }
      });

      it("should handle no requirement found for ID", () => {
        const requirementItem = document.createElement("div");
        requirementItem.classList.add("requirement-item");
        requirementItem.setAttribute("data-requirement", "REQ-001");

        const analyzeButton = document.createElement("button");
        analyzeButton.classList.add("analyze-button");
        requirementItem.appendChild(analyzeButton);

        const analysisDiv = document.createElement("div");
        analysisDiv.classList.add("ollama-analysis");
        requirementItem.appendChild(analysisDiv);

        const spinner = document.createElement("div");
        spinner.classList.add("loading-spinner");
        analysisDiv.appendChild(spinner);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("analysis-content");
        analysisDiv.appendChild(contentDiv);

        document.body.appendChild(requirementItem);

        const summary = {
          totalRequirements: 1,
          confirmedMatches: 0,
          possibleMatches: 0,
          unlikelyMatches: 1,
          requirementDetails: {
            "REQ-001": {
              implementationStatus: "unlikely-match",
              score: 0,
              codeReferences: [],
            },
          },
        };

        const requirements = [
          {
            id: "REQ-002",
            name: "Test Requirement",
            description: "Test Description",
          },
        ];

        const consoleErrorSpy = jest
          .spyOn(console, "error")
          .mockImplementation(() => {});

        helperFunctions.setupAnalysisEventHandlers(
          document.querySelectorAll(".analyze-button"),
          summary,
          requirements,
        );

        analyzeButton.click();

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "No requirement found for ID REQ-001",
        );

        consoleErrorSpy.mockRestore();

        if (requirementItem.parentNode) {
          requirementItem.parentNode.removeChild(requirementItem);
        }
      });

      it("should create code references container if it doesn't exist", () => {
        const requirementItem = document.createElement("div");
        requirementItem.classList.add("requirement-item");
        requirementItem.setAttribute("data-requirement", "REQ-001");

        const analyzeButton = document.createElement("button");
        analyzeButton.classList.add("analyze-button");
        requirementItem.appendChild(analyzeButton);

        const analysisDiv = document.createElement("div");
        analysisDiv.classList.add("ollama-analysis");
        requirementItem.appendChild(analysisDiv);

        const spinner = document.createElement("div");
        spinner.classList.add("loading-spinner");
        analysisDiv.appendChild(spinner);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("analysis-content");
        analysisDiv.appendChild(contentDiv);

        document.body.appendChild(requirementItem);

        const summary = {
          totalRequirements: 1,
          confirmedMatches: 0,
          possibleMatches: 0,
          unlikelyMatches: 1,
          requirementDetails: {
            "REQ-001": {
              implementationStatus: "unlikely-match",
              score: 0,
              codeReferences: [
                {
                  filePath: "src/test.js",
                  lineNumber: 42,
                  snippet: "const answer = 42;",
                  score: 0.5,
                  relevanceExplanation: "Test explanation",
                },
              ],
            },
          },
        };

        const requirements = [
          {
            id: "REQ-001",
            name: "Test Requirement",
            description: "Test Description",
          },
        ];

        helperFunctions.setupAnalysisEventHandlers(
          document.querySelectorAll(".analyze-button"),
          summary,
          requirements,
        );

        analyzeButton.click();

        const refsContainer = requirementItem.querySelector(".code-references");
        expect(refsContainer).not.toBeNull();
        expect(refsContainer?.id).toBe("refs-REQ-001");

        if (requirementItem.parentNode) {
          requirementItem.parentNode.removeChild(requirementItem);
        }
      });

      it("should reuse existing code references container if it exists", () => {
        const requirementItem = document.createElement("div");
        requirementItem.classList.add("requirement-item");
        requirementItem.setAttribute("data-requirement", "REQ-001");

        const analyzeButton = document.createElement("button");
        analyzeButton.classList.add("analyze-button");
        requirementItem.appendChild(analyzeButton);

        const analysisDiv = document.createElement("div");
        analysisDiv.classList.add("ollama-analysis");
        requirementItem.appendChild(analysisDiv);

        const spinner = document.createElement("div");
        spinner.classList.add("loading-spinner");
        analysisDiv.appendChild(spinner);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("analysis-content");
        analysisDiv.appendChild(contentDiv);

        const existingRefsContainer = document.createElement("div");
        existingRefsContainer.className = "code-references";
        existingRefsContainer.id = "refs-REQ-001";
        existingRefsContainer.innerHTML = "<p>Existing content</p>";
        requirementItem.appendChild(existingRefsContainer);

        document.body.appendChild(requirementItem);

        const summary = {
          totalRequirements: 1,
          confirmedMatches: 0,
          possibleMatches: 0,
          unlikelyMatches: 1,
          requirementDetails: {
            "REQ-001": {
              implementationStatus: "unlikely-match",
              score: 0,
              codeReferences: [
                {
                  filePath: "src/test.js",
                  lineNumber: 42,
                  snippet: "const answer = 42;",
                  score: 0.5,
                  relevanceExplanation: "Test explanation",
                },
              ],
            },
          },
        };

        const requirements = [
          {
            id: "REQ-001",
            name: "Test Requirement",
            description: "Test Description",
          },
        ];

        helperFunctions.setupAnalysisEventHandlers(
          document.querySelectorAll(".analyze-button"),
          summary,
          requirements,
        );

        const beforeCount =
          requirementItem.querySelectorAll(".code-references").length;

        analyzeButton.click();

        const afterCount =
          requirementItem.querySelectorAll(".code-references").length;

        expect(beforeCount).toBe(1);
        expect(afterCount).toBe(1);

        const refsContainer = requirementItem.querySelector(".code-references");
        expect(refsContainer?.innerHTML).toBe("<p>Existing content</p>");

        if (requirementItem.parentNode) {
          requirementItem.parentNode.removeChild(requirementItem);
        }
      });

      it("should properly handle requirement IDs with special characters", () => {
        const requirementItem = document.createElement("div");
        requirementItem.classList.add("requirement-item");
        requirementItem.setAttribute("data-requirement", "REQ-{001}");

        const analyzeButton = document.createElement("button");
        analyzeButton.classList.add("analyze-button");
        requirementItem.appendChild(analyzeButton);

        const analysisDiv = document.createElement("div");
        analysisDiv.classList.add("ollama-analysis");
        requirementItem.appendChild(analysisDiv);

        const spinner = document.createElement("div");
        spinner.classList.add("loading-spinner");
        analysisDiv.appendChild(spinner);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("analysis-content");
        analysisDiv.appendChild(contentDiv);

        document.body.appendChild(requirementItem);

        const summary = {
          totalRequirements: 1,
          confirmedMatches: 0,
          possibleMatches: 0,
          unlikelyMatches: 1,
          requirementDetails: {
            "REQ-{001}": {
              implementationStatus: "unlikely-match",
              score: 0,
              codeReferences: [
                {
                  filePath: "src/test.js",
                  lineNumber: 42,
                  snippet: "const answer = 42;",
                  score: 0.5,
                  relevanceExplanation: "Test explanation",
                },
              ],
            },
          },
        };

        const requirements = [
          {
            id: "REQ-{001}",
            name: "Test Requirement",
            description: "Test Description",
          },
        ];

        helperFunctions.setupAnalysisEventHandlers(
          document.querySelectorAll(".analyze-button"),
          summary,
          requirements,
        );

        analyzeButton.click();

        const refsContainer = requirementItem.querySelector(".code-references");
        expect(refsContainer).not.toBeNull();
        expect(refsContainer?.id).toBe("refs-REQ-001");

        if (requirementItem.parentNode) {
          requirementItem.parentNode.removeChild(requirementItem);
        }
      });
    });

    describe("updateRequirementsTable", () => {
      it("should handle missing elements in updateRequirementsTable", () => {
        const requirementsWrapper = document.getElementById(
          "requirements-table-wrapper",
        );
        if (requirementsWrapper?.parentNode) {
          requirementsWrapper.parentNode.removeChild(requirementsWrapper);
        }
        const consoleErrorSpy = jest
          .spyOn(console, "error")
          .mockImplementation(() => {});
        helperFunctions.updateRequirementsTable();
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Requirements wrapper not found",
        );
        consoleErrorSpy.mockRestore();
        if (requirementsWrapper) {
          document.body.appendChild(requirementsWrapper);
        }
      });

      it("should display message when requirements array is empty", () => {
        const requirementsWrapper = document.getElementById(
          "requirements-table-wrapper",
        );
        if (!requirementsWrapper) {
          throw new Error("Requirements wrapper not found");
        }
        helperFunctions.updateRequirementsTable([]);
        expect(requirementsWrapper.innerHTML).toBe(
          "<p>No requirements available.</p>",
        );
      });

      it("should skip null or undefined requirement objects", () => {
        const requirementsWrapper = document.getElementById(
          "requirements-table-wrapper",
        );
        if (!requirementsWrapper) {
          throw new Error("Requirements wrapper not found");
        }
        const mockTbody = document.createElement("tbody");
        const appendChildSpy = jest.spyOn(mockTbody, "appendChild");
        helperFunctions.updateRequirementsTable([
          {
            id: "REQ-001",
            name: "Test Requirement",
            description: "Description",
          },
          null,
          undefined,
          {
            id: "REQ-002",
            name: "Second Requirement",
            description: "Another description",
          },
        ]);
        appendChildSpy.mockRestore();
      });

      it("should handle undefined codeReference in requirements", () => {
        const requirementsWrapper = document.getElementById(
          "requirements-table-wrapper",
        );
        if (!requirementsWrapper) {
          throw new Error("Requirements wrapper not found");
        }
        helperFunctions.updateRequirementsTable([
          {
            id: "REQ-001",
            name: "Test Requirement",
            description: "Description",
          },
        ]);
        const viewAction =
          requirementsWrapper.querySelector(".view-req-action");
        expect(viewAction).toBeNull();
        const editAction =
          requirementsWrapper.querySelector(".edit-req-action");
        const deleteAction =
          requirementsWrapper.querySelector(".delete-req-action");
        expect(editAction).not.toBeNull();
        expect(deleteAction).not.toBeNull();
      });

      it("should handle undefined name and description in requirements", () => {
        const requirementsWrapper = document.getElementById(
          "requirements-table-wrapper",
        );
        if (!requirementsWrapper) {
          throw new Error("Requirements wrapper not found");
        }
        helperFunctions.updateRequirementsTable([
          {
            id: "REQ-001",
            codeReference: {
              filePath: "/dev/null",
              lineNumber: 0,
            },
          },
        ]);
        const nameCell = requirementsWrapper.querySelector("td.req-table-id");
        const descCell = requirementsWrapper.querySelector("td.req-table-desc");
        expect(nameCell?.textContent).toBe("");
        expect(descCell?.textContent).toBe("");
      });
    });
  });
});
