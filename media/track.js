// @ts-check
// @ts-ignore
const vscode = acquireVsCodeApi();

/**
 * @template T
 * @typedef {T extends null ? never : T} NonNull
 */

// Store requirements
/** @type {Array<{id: string, name: string, description: string, type: string, priority: string, status: string, codeReference?: {filePath: string, lineNumber: number}}>} */
let requirements = [];

/** @type {{
  totalRequirements: number,
  confirmedMatches: number,
  possibleMatches: number,
  unlikelyMatches: number,
  requirementDetails: Record<string, {
    implementationStatus: string,
    score: number,
    codeReferences: Array<{
      filePath: string,
      lineNumber: number,
      snippet: string,
      score: number,
      relevanceExplanation?: string
    }>
  }>
} | null} */
let trackingResults = null;

document.addEventListener("DOMContentLoaded", function (e) {
  initializeUI();
  attachEventListeners();
});

// Core Functions

/**
 * Initialize the UI components
 */
function initializeUI() {
  const importFormatSelect = document.getElementById("import-format");
  const trackAllCheckbox = document.getElementById("track-all");
  const csvOptions = document.getElementById("csv-options");

  if (!importFormatSelect || !trackAllCheckbox || !csvOptions) {
    console.error("Required DOM elements not found in initializeUI");
    return;
  }

  // Set initial state
  if (importFormatSelect instanceof HTMLSelectElement) {
    handleImportFormatChange(importFormatSelect.value);
  }

  if (trackAllCheckbox instanceof HTMLInputElement) {
    trackAllCheckbox.checked = false;
  }
}

/**
 * Attach all event listeners
 */
function attachEventListeners() {
  // Tab navigation
  attachTabEventListeners();

  // Import functionality
  attachImportEventListeners();

  // Track functionality
  attachTrackEventListeners();

  // Edit mode functionality
  attachEditModeEventListeners();

  // Message handler for VSCode communication
  setupMessageHandler();
}

/**
 * Set up message handler for VSCode extension communication
 */
function setupMessageHandler() {
  window.addEventListener("message", (event) => {
    const message = event.data;

    switch (message.type) {
      case "requirementsImported":
        onRequirementsImported(message.requirements);
        break;

      case "updateRequirements":
        onRequirementsUpdated(message.requirements);
        break;

      case "trackingResults":
        onTrackingResults(message.summary);
        break;

      case "setLoading":
        onSetLoading(message.isLoading);
        break;

      case "error":
        onError(message.message);
        break;

      case "updateRequirementsTable":
        onUpdateRequirementsTable(message.requirements);
        break;

      case "startEditMode":
        onStartEditMode(message);
        break;

      case "stopEditMode":
        onStopEditMode(message);
        break;

      case "updateSelectedReference":
        onUpdateSelectedReference(message.codeReference);
        break;

      case "showImportTab":
        onShowImportTab();
        break;

      case "showTrackTab":
        onShowTrackTab(message.requirements);
        break;

      case "showResultsTab":
        onShowResultsTab(message.summary);
        break;

      case "analysisResult":
        onAnalysisResult(message);
        break;
    }
  });
}

// Event Listeners Attachment

/**
 * Attach tab related event listeners
 */
function attachTabEventListeners() {
  const tabImport = document.querySelector("#tab-import");
  const tabTrack = document.querySelector("#tab-track");
  const tabResults = document.querySelector("#tab-results");

  if (!tabImport || !tabTrack || !tabResults) {
    console.error("Tab elements not found");
    return;
  }

  tabImport.addEventListener(
    "click",
    /** @param {Event} event */ (event) =>
      handleTabImportClick(/** @type {MouseEvent} */ (event)),
  );
  tabTrack.addEventListener(
    "click",
    /** @param {Event} event */ (event) =>
      handleTabTrackClick(/** @type {MouseEvent} */ (event)),
  );
  tabResults.addEventListener(
    "click",
    /** @param {Event} event */ (event) =>
      handleTabResultsClick(/** @type {MouseEvent} */ (event)),
  );
}

/**
 * Attach import related event listeners
 */
function attachImportEventListeners() {
  const fileInput = document.getElementById("file-input");
  const importFormatSelect = document.getElementById("import-format");
  const importButton = document.getElementById("import-button");

  if (!fileInput || !importFormatSelect || !importButton) {
    console.error("Import elements not found");
    return;
  }

  // File input handling
  fileInput.addEventListener("change", handleFileInputChange);

  // Format selection
  if (importFormatSelect instanceof HTMLSelectElement) {
    importFormatSelect.addEventListener("change", () =>
      handleImportFormatChange(importFormatSelect.value),
    );
  }

  // Import button
  importButton.addEventListener("click", handleImportButtonClick);
}

/**
 * Attach track related event listeners
 */
function attachTrackEventListeners() {
  const trackAllCheckbox = document.getElementById("track-all");
  const trackButton = document.getElementById("track-button");
  const clearRequirements = document.getElementById("clear-requirements");

  if (!trackAllCheckbox || !trackButton || !clearRequirements) {
    console.error("Track elements not found");
    return;
  }

  // Track all checkbox
  if (trackAllCheckbox instanceof HTMLInputElement) {
    trackAllCheckbox.addEventListener("change", () =>
      handleTrackAllChange(trackAllCheckbox),
    );
  }

  // Track button
  trackButton.addEventListener("click", handleTrackButtonClick);

  // Clear requirements button
  clearRequirements.addEventListener(
    "click",
    handleClearRequirementsButtonClick,
  );
}

/**
 * Attach edit mode related event listeners
 */
function attachEditModeEventListeners() {
  const confirmEditButton = document.getElementById("confirm-edit");
  const cancelEditButton = document.getElementById("cancel-edit");

  if (!confirmEditButton || !cancelEditButton) {
    console.error("Edit mode elements not found");
    return;
  }

  // Confirm edit button
  confirmEditButton.addEventListener("click", handleConfirmEditButtonClick);

  // Cancel edit button
  cancelEditButton.addEventListener("click", handleCancelEditButtonClick);
}

// Event Handlers

/**
 * @param {MouseEvent} event
 */
function handleTabImportClick(event) {
  vscode.postMessage({
    type: "tabToImport",
  });
}

/**
 * @param {MouseEvent} event
 */
function handleTabTrackClick(event) {
  vscode.postMessage({
    type: "tabToTrack",
  });
}

/**
 * @param {MouseEvent} event
 */
function handleTabResultsClick(event) {
  vscode.postMessage({
    type: "tabToResults",
  });
}

/**
 * @param {Event} event
 */
function handleFileInputChange(event) {
  const fileInput = event.target;
  if (
    !(fileInput instanceof HTMLInputElement) ||
    !fileInput.files ||
    fileInput.files.length === 0
  ) {
    return;
  }

  const file = fileInput.files[0];
  const textContent = document.getElementById("text-content");
  if (!(textContent instanceof HTMLTextAreaElement)) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target && typeof e.target.result === "string") {
      textContent.value = e.target.result;
    }
  };
  reader.readAsText(file);
}

/**
 * @param {string} formatValue
 */
function handleImportFormatChange(formatValue) {
  const csvOptions = document.getElementById("csv-options");
  if (!csvOptions) {
    console.error("Required element not found");
    return;
  }

  csvOptions.style.display = formatValue === "csv" ? "block" : "none";
}

/**
 * @param {HTMLInputElement} checkbox
 */
function handleTrackAllChange(checkbox) {
  const selectRequirements = document.querySelectorAll("td input");
  selectRequirements.forEach((req) => {
    if (req instanceof HTMLInputElement) {
      req.checked = checkbox.checked;
    }
  });
}

function handleImportButtonClick() {
  const importFormatSelect = document.getElementById("import-format");
  const textContent = document.getElementById("text-content");

  if (
    !(importFormatSelect instanceof HTMLSelectElement) ||
    !(textContent instanceof HTMLTextAreaElement)
  ) {
    console.error("Required elements not found");
    return;
  }

  const format = importFormatSelect.value;
  const content = textContent.value.trim();
  const options = {};

  // Get delimiter if CSV is selected
  if (format === "csv") {
    const delimiter = document.getElementById("csv-delimiter");
    if (delimiter instanceof HTMLInputElement && delimiter.value !== ",") {
      options.delimiter = delimiter.value;
    }
  }

  if (!content) {
    alert("Please provide content to import");
    return;
  }

  vscode.postMessage({
    type: "importRequirements",
    format,
    content,
    options,
  });
}

function handleTrackButtonClick() {
  if (requirements.length === 0) {
    alert("No requirements available to track");
    return;
  }

  const checkboxes = document.querySelectorAll("td input:checked");
  const selectedCheckboxes = Array.from(checkboxes).filter(
    (checkbox) => checkbox instanceof HTMLInputElement,
  );
  const requirementIds = selectedCheckboxes
    .map((checkbox) => checkbox.id)
    .filter((id) => id !== "");

  if (requirementIds.length === 0) {
    alert("Please select at least one requirement to track");
    return;
  }

  vscode.postMessage({
    type: "trackRequirements",
    requirementIds,
  });
}

function handleClearRequirementsButtonClick() {
  vscode.postMessage({
    type: "clearRequirements",
  });
}

/**
 * @param {MouseEvent} event
 */
function handleConfirmEditButtonClick(event) {
  const confirmEditButton = document.getElementById("confirm-edit");

  if (
    confirmEditButton instanceof HTMLButtonElement &&
    !confirmEditButton.hasAttribute("disabled")
  ) {
    vscode.postMessage({
      type: "confirmEditImplementation",
    });
  }
}

/**
 * @param {MouseEvent} event
 */
function handleCancelEditButtonClick(event) {
  vscode.postMessage({
    type: "cancelEditImplementation",
  });
}

// Message Event Handlers

/**
 * @param {any[]} importedRequirements
 */
function onRequirementsImported(importedRequirements) {
  requirements = importedRequirements;
  updateRequirementsDisplay();
}

/**
 * @param {any[]} updatedRequirements
 */
function onRequirementsUpdated(updatedRequirements) {
  requirements = updatedRequirements;
  updateRequirementsDisplay();
}

/**
 * @param {any} summary
 */
function onTrackingResults(summary) {
  trackingResults = summary;
  handleTrackingResultsEvent();
}

/**
 * @param {boolean} isLoading
 */
function onSetLoading(isLoading) {
  const loadingElement = document.getElementById("loading");
  if (!loadingElement) return;

  loadingElement.style.display = isLoading ? "flex" : "none";
}

/**
 * @param {string} message
 */
function onError(message) {
  alert(message);
}

/**
 * @param {any[]} updatedRequirements
 */
function onUpdateRequirementsTable(updatedRequirements) {
  requirements = updatedRequirements;
  updateRequirementsTable();
}

/**
 * @param {{ requirementId: string, codeReference: any }} message
 */
function onStartEditMode(message) {
  const { requirementId, codeReference } = message;
  const requirement = requirements.find((req) => req.id === requirementId);

  if (!requirement) {
    console.error("Requirement not found");
    return;
  }

  const editModeUI = document.getElementById("edit-mode-ui");
  if (!editModeUI) {
    console.error("Edit mode UI not found");
    return;
  }

  const originalPath = editModeUI.querySelector("#edit-mode-original-path");
  const originalLine = editModeUI.querySelector("#edit-mode-original-line");

  if (
    !(originalPath instanceof HTMLElement) ||
    !(originalLine instanceof HTMLElement)
  ) {
    console.error("Edit mode path/line elements not found");
    return;
  }

  originalPath.innerHTML = codeReference.filePath;
  originalLine.innerHTML = (codeReference.lineNumber + 1).toString();

  editModeUI.classList.remove("hidden");
}

/**
 * @param {any} message
 */
function onStopEditMode(message) {
  const currentSelection = document.getElementById("current-selection");
  const confirmEditButton = document.getElementById("confirm-edit");
  const editModeUI = document.getElementById("edit-mode-ui");

  if (!currentSelection || !confirmEditButton || !editModeUI) {
    console.error("Required elements not found in handleStopEditMode");
    return;
  }

  if (confirmEditButton instanceof HTMLButtonElement) {
    confirmEditButton.setAttribute("disabled", "");
  }

  currentSelection.innerText = "No text selected";
  editModeUI.classList.add("hidden");
}

/**
 * @param {{ filePath: string, lineNumber: number, snippet: string }} codeReference
 */
function onUpdateSelectedReference(codeReference) {
  const currentSelection = document.getElementById("current-selection");
  const confirmEditButton = document.getElementById("confirm-edit");

  if (!currentSelection || !(confirmEditButton instanceof HTMLButtonElement)) {
    console.error(
      "Required elements not found in handleUpdateSelectedReference",
    );
    return;
  }

  confirmEditButton.removeAttribute("disabled");
  currentSelection.innerText = codeReference.snippet;
}

function onShowImportTab() {
  const tabImport = document.querySelector("#tab-import");
  if (tabImport instanceof HTMLElement) {
    changeActiveTab(tabImport);
  }
}

/**
 * @param {any[]} reqs
 */
function onShowTrackTab(reqs) {
  requirements = reqs;
  updateRequirementsTable();

  const tabTrack = document.querySelector("#tab-track");
  if (tabTrack instanceof HTMLElement) {
    changeActiveTab(tabTrack);
  }
}

/**
 * @param {any} summary
 */
function onShowResultsTab(summary) {
  trackingResults = summary;
  updateResultsDisplay();

  const tabResults = document.querySelector("#tab-results");
  if (tabResults instanceof HTMLElement) {
    changeActiveTab(tabResults);
  }
}

/**
 * @param {{ requirementId: string, analysis: string }} message
 */
function onAnalysisResult(message) {
  const { requirementId, analysis } = message;
  const reqItem = document.querySelector(
    `.requirement-item[data-requirement="${requirementId}"]`,
  );

  if (!reqItem) {
    console.error(`Could not find requirement item for ${requirementId}`);
    return;
  }

  const analysisDiv = reqItem.querySelector(".ollama-analysis");
  if (!analysisDiv) {
    console.error(
      `Could not find analysis div for requirement ${requirementId}`,
    );
    return;
  }

  const spinner = analysisDiv.querySelector(".loading-spinner");
  const contentDiv = analysisDiv.querySelector(".analysis-content");

  if (!spinner || !contentDiv) {
    console.error(
      `Could not find spinner or content div for requirement ${requirementId}`,
    );
    return;
  }

  spinner.classList.add("hidden");

  // Parse marked sections
  /**
   * @param {string} text
   * @param {string} startMarker
   * @param {string} endMarker
   */
  const getMarkedContent = (text, startMarker, endMarker) => {
    const start = text.indexOf(startMarker) + startMarker.length;
    const end = text.indexOf(endMarker);
    return text.substring(start, end).trim();
  };

  const codeSnippet = getMarkedContent(analysis, "[CODE_START]", "[CODE_END]");
  const implementationIndex =
    parseInt(getMarkedContent(analysis, "[INDEX_START]", "[INDEX_END]")) - 1;
  const analysisText = getMarkedContent(
    analysis,
    "[ANALYSIS_START]",
    "[ANALYSIS_END]",
  );

  if (!trackingResults?.requirementDetails) {
    console.error("Tracking results or requirement details not found");
    return;
  }

  // Get the selected code reference
  const result = trackingResults.requirementDetails[requirementId];
  if (!result?.codeReferences) {
    console.error("Code references not found for requirement");
    return;
  }

  console.log(implementationIndex);

  const selectedReference = result.codeReferences[implementationIndex];

  console.log(selectedReference);

  // Update analysis content
  contentDiv.innerHTML = `
    <div class="analysis-text">
      <p>${analysisText}</p>
    </div>`;

  // Create code reference div within the analysis content
  const refItem = document.createElement("div");
  refItem.className = "code-reference nested-dropdown-container expanded";
  refItem.setAttribute("data-path", selectedReference.filePath);
  refItem.setAttribute("data-line", String(selectedReference.lineNumber));

  // Create reference header
  const refHeaderHTML = `
    <div class="dropdown-header ref-header">
      <div class="file-path">${selectedReference.filePath}:${selectedReference.lineNumber}</div>
      <div class="dropdown-toggle"><i class="codicon codicon-chevron-down"></i></div>
    </div>
  `;

  // Create reference content with action buttons
  const refContentHTML = `
    <div class="dropdown-content ref-content">
      <div class="code-snippet">${escapeHtml(formatSnippet(codeSnippet))}</div>
      <div class="req-action-wrapper">
        <div>
          <p>Best matching implementation</p>
        </div>
        <ul class="req-actions">
          <li class="edit-req-action"><i class="codicon codicon-edit"></i></li>
          <li class="confirm-req-action"><i class="codicon codicon-check"></i></li>
          <li class="delete-req-action"><i class="codicon codicon-trash"></i></li>
        </ul>
      </div>
    </div>
  `;

  refItem.innerHTML = refHeaderHTML + refContentHTML;

  // Add event handlers for the action buttons
  const codeReference = {
    filePath: selectedReference.filePath,
    lineNumber: selectedReference.lineNumber,
    snippet: codeSnippet,
  };

  const confirmReqAction = refItem.querySelector(".confirm-req-action");
  if (confirmReqAction) {
    confirmReqAction.addEventListener("click", (e) => {
      e.stopPropagation();
      vscode.postMessage({
        type: "confirmRequirementImplementation",
        requirementId,
        codeReference,
      });
    });
  }

  const deleteReqAction = refItem.querySelector(".delete-req-action");
  if (deleteReqAction) {
    deleteReqAction.addEventListener("click", (e) => {
      e.stopPropagation();
      vscode.postMessage({
        type: "rejectRequirementImplementation",
        requirementId,
        codeReferenceId: implementationIndex,
      });
    });
  }

  const editReqAction = refItem.querySelector(".edit-req-action");
  if (editReqAction) {
    editReqAction.addEventListener("click", (e) => {
      e.stopPropagation();
      vscode.postMessage({
        type: "startEditMode",
        requirementId,
        codeReferenceId: implementationIndex,
        codeReference,
      });
    });
  }

  const analysisCodeSnippet = analysisDiv.querySelector(
    ".analysis-code-snippet",
  );
  if (analysisCodeSnippet) {
    analysisCodeSnippet.appendChild(refItem);
  }
}

// UI Update Functions

function updateRequirementsDisplay() {
  updateRequirementsTable();
}

function handleTrackingResultsEvent() {
  updateResultsDisplay();
  switchToTab(2); // Switch to results tab
}

function updateResultsDisplay() {
  const summarySection = document.getElementById("summary-section");
  if (!summarySection) {
    console.error("Summary section not found");
    return;
  }

  // Show summary section
  summarySection.style.display = "block";

  // Update Views
  updateChartDisplay();
  updateLegendDisplay();
  updateRequirementsDisplay();
}

function updateChartDisplay() {
  const chartConfirmed = document.getElementById("chart-confirmed-match");
  const chartPossible = document.getElementById("chart-possible-match");
  const chartUnlikely = document.getElementById("chart-unlikely-match");

  if (!chartConfirmed || !chartPossible || !chartUnlikely || !trackingResults) {
    console.error("Chart elements or tracking results not found");
    return;
  }

  const total = trackingResults.totalRequirements;
  const confirmed = trackingResults.confirmedMatches;
  const possible = trackingResults.possibleMatches;
  const unlikely = trackingResults.unlikelyMatches;

  chartConfirmed.style.width = `${(confirmed / total) * 100}%`;
  chartPossible.style.width = `${(possible / total) * 100}%`;
  chartUnlikely.style.width = `${(unlikely / total) * 100}%`;
}

function updateLegendDisplay() {
  const legendConfirmed = document.getElementById("legend-confirmed-match");
  const legendPossible = document.getElementById("legend-possible-match");
  const legendUnlikely = document.getElementById("legend-unlikely-match");

  if (
    !legendConfirmed ||
    !legendPossible ||
    !legendUnlikely ||
    !trackingResults
  ) {
    console.error("Legend elements or tracking results not found");
    return;
  }

  const confirmed = trackingResults.confirmedMatches;
  const possible = trackingResults.possibleMatches;
  const unlikely = trackingResults.unlikelyMatches;

  // Update legend
  legendConfirmed.textContent = `Confirmed Match: ${confirmed}`;
  legendPossible.textContent = `Possible Match: ${possible}`;
  legendUnlikely.textContent = `Unlikely Match: ${unlikely}`;
}

function updateRequirementsTable() {
  const requirementsWrapper = document.getElementById(
    "requirements-table-wrapper",
  );
  if (!requirementsWrapper) {
    console.error("Requirements wrapper not found");
    return;
  }

  requirementsWrapper.innerHTML = "";

  if (requirements.length === 0) {
    requirementsWrapper.innerHTML = "<p>No requirements available.</p>";
    return;
  }

  const table = document.createElement("table");
  table.className = "requirements-table";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `
    <th></th>
    <th class="req-table-id">ID</th>
    <th class="req-table-desc">Description</th>
    <th class="req-table-status">Status</th>
    <th class="req-table-actions">Actions</th>`;

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  tbody.id = "requirements-list";

  requirements.forEach((req) => {
    if (!req) return;

    const item = document.createElement("tr");
    const viewAction = req.codeReference
      ? `
        <li class="view-req-action" title="View tracked implementation" data-requirement="${req.id}" data-path="${req.codeReference.filePath}" data-line="${req.codeReference.lineNumber}">
            <i class="codicon codicon-code"></i>
        </li>
    `
      : "";

    item.innerHTML = `
      <td><input id="${req.id}" name="${req.id}" type="checkbox"></td>
      <td class="req-table-id">${req.name || ""}</td>
      <td class="req-table-desc">${req.description || ""}</td>
      <td class="req-table-status">${req.status || ""}</td>
      <td class="req-table-actions">
        <ul>
          ${viewAction}
          <li class="edit-req-action" title="Edit tracked implementation" data-requirement="${req.id}">
            <i class="codicon codicon-edit"></i>
          </li>
          <li class="delete-req-action" title="Delete Requirement" data-requirement="${req.id}">
            <i class="codicon codicon-trash"></i>
          </li>
        </ul>
      </td>
    `;
    tbody.appendChild(item);
  });

  table.appendChild(tbody);
  requirementsWrapper.appendChild(table);

  handleRequirementsEvents();
}

/**
 * Add event handlers for requirement action buttons
 */
function handleRequirementsEvents() {
  const selectRequirements = document.querySelectorAll("td input");
  const deleteReqActions = document.querySelectorAll(".delete-req-action");
  const editReqActions = document.querySelectorAll(".edit-req-action");
  const viewReqActions = document.querySelectorAll(".view-req-action");

  // Select Requirements interaction
  selectRequirements.forEach((requirement) => {
    if (requirement instanceof HTMLInputElement) {
      requirement.addEventListener("change", () => {
        if (!requirement.checked) {
          const trackAllCheckbox = document.getElementById("track-all");
          if (
            trackAllCheckbox instanceof HTMLInputElement &&
            trackAllCheckbox.checked
          ) {
            trackAllCheckbox.checked = false;
          }
        }
      });
    }
  });

  // Actions
  deleteReqActions.forEach((deleteReqAction) => {
    if (deleteReqAction instanceof HTMLElement) {
      deleteReqAction.addEventListener("click", () => {
        const requirementId = deleteReqAction.dataset?.requirement;
        if (!requirementId) return;

        vscode.postMessage({
          type: "deleteRequirement",
          requirementId,
        });
      });
    }
  });

  editReqActions.forEach((editReqAction) => {
    if (editReqAction instanceof HTMLElement) {
      editReqAction.addEventListener("click", () => {
        const requirementId = editReqAction.getAttribute("data-requirement");
        if (!requirementId) return;

        vscode.postMessage({
          type: "editRequirement",
          requirementId,
        });
      });
    }
  });

  viewReqActions.forEach((viewReqAction) => {
    if (viewReqAction instanceof HTMLElement) {
      viewReqAction.addEventListener("click", () => {
        const filePath = viewReqAction.getAttribute("data-path");
        const lineNumber = viewReqAction.getAttribute("data-line");

        if (!filePath || !lineNumber) return;

        vscode.postMessage({
          type: "openFile",
          filePath,
          lineStart: parseInt(lineNumber),
        });
      });
    }
  });
}

// Utility Functions

/**
 * Safely asserts that a value is not null and returns it
 * @template T
 * @param {T | null | undefined} value - Value to check
 * @param {string} message - Error message if value is null
 * @returns {NonNull<T>}
 */
function assertNonNull(value, message) {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
  return /** @type {NonNull<T>} */ (value);
}

/**
 *
 * @param {unknown} error - The error to handle
 */
function handleError(error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  vscode.postMessage({
    type: "error",
    message: message,
  });
}

/**
 * @param {string} text
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * @param {string} snippet
 */
function formatSnippet(snippet) {
  if (!snippet) {
    return "";
  }
  if (snippet.length > 300) {
    return snippet.substring(0, 300) + "...";
  }
  return snippet;
}

/**
 * @param {number} tabId
 */
function switchToTab(tabId) {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((t) => t.classList.remove("active"));
  if (tabs[tabId]) {
    tabs[tabId].classList.add("active");
  }

  tabContents.forEach((c) => c.classList.remove("active"));
  if (tabContents[tabId]) {
    tabContents[tabId].classList.add("active");
  }
}

/**
 * @param {HTMLElement} tab
 */
function changeActiveTab(tab) {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  // Update active tab
  tabs.forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");

  // Show corresponding content
  tabContents.forEach((content) => {
    content.classList.remove("active");
    if (content.id === `${tab.getAttribute("data-tab")}-tab`) {
      content.classList.add("active");
    }
  });
}

/* istanbul ignore next */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    // Core functions
    initializeUI,
    attachEventListeners,
    attachTabEventListeners,
    attachImportEventListeners,
    attachTrackEventListeners,
    attachEditModeEventListeners,

    // Event handlers
    handleTabImportClick,
    handleTabTrackClick,
    handleTabResultsClick,
    handleFileInputChange,
    handleImportFormatChange,
    handleTrackAllChange,
    handleImportButtonClick,
    handleTrackButtonClick,
    handleClearRequirementsButtonClick,
    handleConfirmEditButtonClick,
    handleCancelEditButtonClick,

    // Message handlers
    onRequirementsImported,
    onRequirementsUpdated,
    onTrackingResults,
    onSetLoading,
    onError,
    onUpdateRequirementsTable,
    onStartEditMode,
    onStopEditMode,
    onUpdateSelectedReference,
    onShowImportTab,
    onShowTrackTab,
    onShowResultsTab,
    onAnalysisResult,

    // UI update functions
    updateRequirementsDisplay,
    handleTrackingResultsEvent,
    updateResultsDisplay,
    updateChartDisplay,
    updateLegendDisplay,
    updateRequirementsTable,
    handleRequirementsEvents,

    // Utility functions
    assertNonNull,
    handleError,
    escapeHtml,
    formatSnippet,
    switchToTab,
    changeActiveTab,
  };
}
