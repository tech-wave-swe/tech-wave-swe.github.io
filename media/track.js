// @ts-check
// @ts-ignore
const vscode = acquireVsCodeApi();

/**
 * @template T
 * @typedef {T extends null ? never : T} NonNull
 */

/**
 * @typedef {{filePath: string, lineNumber: number, snippet: string,score: number, relevanceExplanation: string}} CodeReference
 * @typedef {{id: string, name: string, description: string, type: string, priority: string, status: string, codeReference: CodeReference}} Requirement
 *
 * @typedef {{ implementationStatus: string, score: number, codeReferences: Array<CodeReference> }} RequirementDetail
 * @typedef {{
 *  totalRequirements: number,
 *  confirmedMatches: number,
 *  possibleMatches: number,
 *  unlikelyMatches: number,
 *  requirementDetails:
 *    Record<string, RequirementDetail>
 *  }} TrackingSummary
 */

document.addEventListener("DOMContentLoaded", function () {
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
        onRequirementsImported(message.summary, message.requirements);
        break;

      case "updateRequirements":
        onRequirementsUpdated(message.summary, message.requirements);
        break;

      case "trackingResults":
        onTrackingResults(message.summary, message.requirements);
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
        onStartEditMode(message.requirement, message.codeReference);
        break;

      case "stopEditMode":
        onStopEditMode();
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
        onShowResultsTab(message.summary, message.requirements);
        break;

      case "analysisResult":
        onAnalysisResult(
          message.summary,
          message.requirementId,
          message.analysis,
        );
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

  tabImport.addEventListener("click", handleTabImportClick);
  tabTrack.addEventListener("click", handleTabTrackClick);
  tabResults.addEventListener("click", handleTabResultsClick);
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

function handleTabImportClick() {
  vscode.postMessage({
    type: "tabToImport",
  });
}

function handleTabTrackClick() {
  vscode.postMessage({
    type: "tabToTrack",
  });
}

function handleTabResultsClick() {
  vscode.postMessage({
    type: "tabToResults",
  });
}

/**
 * Handle file input change event
 * @param {Event} event - The change event
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

/**
 * Handle track button click - find selected requirements and send tracking request
 */
function handleTrackButtonClick() {
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

function handleConfirmEditButtonClick() {
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

function handleCancelEditButtonClick() {
  vscode.postMessage({
    type: "cancelEditImplementation",
  });
}

// Message Event Handlers

/**
 * Handler for when requirements are imported
 * @param {TrackingSummary} summary
 * @param {Requirement[]} requirements
 */
function onRequirementsImported(summary, requirements) {
  updateRequirementsDisplay(summary, requirements);
}

/**
 * Handler for when requirements are updated
 * @param {TrackingSummary} summary
 * @param {Requirement[]} requirements
 */
function onRequirementsUpdated(summary, requirements) {
  updateRequirementsDisplay(summary, requirements);
}

/**
 * @param {TrackingSummary} summary
 * @param {Requirement[]} requirements
 */
function onTrackingResults(summary, requirements) {
  handleTrackingResultsEvent(summary, requirements);
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
 * @param {Requirement[]} requirements
 */
function onUpdateRequirementsTable(requirements) {
  updateRequirementsTable(requirements);
}

/**
 * Handles entering edit mode for a requirement implementation
 * @param {Requirement|null} requirement - The requirement being edited
 * @param {CodeReference} codeReference - The code reference to edit
 */
function onStartEditMode(requirement, codeReference) {
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

function onStopEditMode() {
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
 * @param {Requirement[]} requirements
 */
function onShowTrackTab(requirements) {
  updateRequirementsTable(requirements);

  const tabTrack = document.querySelector("#tab-track");
  if (tabTrack instanceof HTMLElement) {
    changeActiveTab(tabTrack);
  }
}

/**
 * @param {TrackingSummary} summary
 * @param {Requirement[]} requirements
 */
function onShowResultsTab(summary, requirements = []) {
  updateResultsDisplay(summary, requirements);

  const tabResults = document.querySelector("#tab-results");
  if (tabResults instanceof HTMLElement) {
    changeActiveTab(tabResults);
  }
}

/**
 * Handle analysis result from the API
 * @param {TrackingSummary} summary - The tracking summary containing requirement details
 * @param {string} requirementId - The ID of the requirement being analyzed
 * @param {string} analysis - The analysis text with special markers
 */
function onAnalysisResult(summary, requirementId, analysis) {
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

  /**
   * Extract content between markers in the analysis text
   * @param {string} text - The text to parse
   * @param {string} startMarker - The starting marker
   * @param {string} endMarker - The ending marker
   * @returns {string} The extracted content
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

  if (!summary || !summary.requirementDetails) {
    console.error("Tracking results or requirement details not found");
    return;
  }

  console.log(summary);

  // Get the selected code reference
  const result = summary.requirementDetails[requirementId];
  if (!result || !result.codeReferences) {
    console.error("Code references not found for requirement");
    return;
  }

  const selectedReference = result.codeReferences[implementationIndex];
  if (!selectedReference) {
    console.error(`No code reference found at index ${implementationIndex}`);
    return;
  }

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

  setReqActions(refItem, requirementId, codeReference, implementationIndex);

  const analysisCodeSnippet = analysisDiv.querySelector(
    ".analysis-code-snippet",
  );
  if (analysisCodeSnippet) {
    analysisCodeSnippet.appendChild(refItem);
  }
}

/**
 * @param {HTMLDivElement} refItem
 * @param {string} requirementId
 * @param {{ filePath: string; lineNumber: number; snippet: string; }} codeReference
 * @param {number} implementationIndex
 */
function setReqActions(
  refItem,
  requirementId,
  codeReference,
  implementationIndex,
) {
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
}

// UI Update Functions

/**
 * @param {TrackingSummary} summary
 * @param {Requirement[]} requirements
 */
function handleTrackingResultsEvent(summary, requirements) {
  updateResultsDisplay(summary, requirements);
  switchToTab(2); // Switch to results tab
}

/**
 * @param {TrackingSummary} summary
 * @param {Requirement[]} requirements
 */
function updateResultsDisplay(summary, requirements) {
  const summarySection = document.getElementById("summary-section");
  if (!summarySection) {
    console.error("Summary section not found");
    return;
  }

  // Show summary section
  summarySection.style.display = "block";

  // Update Views
  updateChartDisplay(summary);
  updateLegendDisplay(summary);
  updateRequirementsDisplay(summary, requirements);
}

/**
 * @param {TrackingSummary} summary
 */
function updateChartDisplay(summary) {
  const chartConfirmed = document.getElementById("chart-confirmed-match");
  const chartPossible = document.getElementById("chart-possible-match");
  const chartUnlikely = document.getElementById("chart-unlikely-match");

  if (!chartConfirmed || !chartPossible || !chartUnlikely || !summary) {
    console.error("Chart elements or tracking results not found");
    return;
  }

  const total = summary.totalRequirements;
  const confirmed = summary.confirmedMatches;
  const possible = summary.possibleMatches;
  const unlikely = summary.unlikelyMatches;

  chartConfirmed.style.width = `${(confirmed / total) * 100}%`;
  chartPossible.style.width = `${(possible / total) * 100}%`;
  chartUnlikely.style.width = `${(unlikely / total) * 100}%`;
}

/**
 * @param {TrackingSummary} summary
 */
function updateLegendDisplay(summary) {
  const legendConfirmed = document.getElementById("legend-confirmed-match");
  const legendPossible = document.getElementById("legend-possible-match");
  const legendUnlikely = document.getElementById("legend-unlikely-match");

  if (!legendConfirmed || !legendPossible || !legendUnlikely || !summary) {
    console.error("Legend elements or tracking results not found");
    return;
  }

  const confirmed = summary.confirmedMatches;
  const possible = summary.possibleMatches;
  const unlikely = summary.unlikelyMatches;

  // Update legend
  legendConfirmed.textContent = `Confirmed Match: ${confirmed}`;
  legendPossible.textContent = `Possible Match: ${possible}`;
  legendUnlikely.textContent = `Unlikely Match: ${unlikely}`;
}

/**
 * @param {TrackingSummary} summary
 * @param {Requirement[]} requirements
 */
/**
 * Adds dropdown toggle functionality to an element
 * @param {HTMLElement} element - The element to add toggle functionality to
 * @param {string} toggleSelector - Selector for the toggle element
 * @param {string} iconSelector - Selector for the icon within the toggle
 */
function addDropdownToggleEventHandler(element, toggleSelector, iconSelector) {
  const toggleElement = element.querySelector(toggleSelector);
  if (!toggleElement) return;

  toggleElement.addEventListener("click", (e) => {
    e.stopPropagation();
    element.classList.toggle("expanded");
    const toggleIcon = toggleElement.querySelector(iconSelector);
    if (toggleIcon) {
      if (element.classList.contains("expanded")) {
        toggleIcon.classList.replace(
          "codicon-chevron-down",
          "codicon-chevron-up",
        );
      } else {
        toggleIcon.classList.replace(
          "codicon-chevron-up",
          "codicon-chevron-down",
        );
      }
    }
  });
}

/**
 * @param {{ querySelector: (arg0: string) => any; }} refItem
 * @param {{ filePath: any; lineNumber: any; }} ref
 */
function setFilePath(refItem, ref) {
  const filePath = refItem.querySelector(".file-path");
  if (filePath) {
    filePath.addEventListener("click", (e) => {
      e.stopPropagation();
      vscode.postMessage({
        type: "openFile",
        filePath: ref.filePath,
        lineStart: ref.lineNumber,
      });
    });
  }
}

/**
 * Creates a code reference DOM element
 * @param {CodeReference} ref - The code reference data
 * @param {number} refIndex - The index of this reference
 * @param {string} requirementId - The ID of the requirement
 * @returns {HTMLDivElement} - The created code reference element
 */
function createCodeReferenceItem(ref, refIndex, requirementId) {
  const refItem = document.createElement("div");
  refItem.className = "code-reference nested-dropdown-container expanded";
  refItem.setAttribute("data-path", ref.filePath);
  refItem.setAttribute("data-line", String(ref.lineNumber));

  // Create the reference header (nested dropdown toggle)
  const refHeaderHTML = `
    <div class="dropdown-header ref-header">
      <div class="file-path">${ref.filePath}:${ref.lineNumber}</div>
      <div class="dropdown-toggle"><i class="codicon codicon-chevron-down"></i></div>
    </div>
  `;

  // Create the reference content
  const refContentHTML = `
    <div class="dropdown-content ref-content">
      <div class="code-snippet">${escapeHtml(formatSnippet(ref.snippet))}</div>
      <div class="req-action-wrapper">
        <div>
          <p>${ref.relevanceExplanation}</p>
        </div>
        <ul class="req-actions">
          <li class="edit-req-action"><i class="codicon codicon-edit"></i></li>
          <li class="confirm-req-action"><i class="codicon codicon-check"></i></li>
          <li class="delete-req-action"><i class="codicon codicon-trash"></i></li>
        </ul>
      </div>
    </div>
  `;

  // Combine reference header and content
  refItem.innerHTML = refHeaderHTML + refContentHTML;

  // Add toggle functionality to code reference
  addDropdownToggleEventHandler(refItem, ".ref-header", ".dropdown-toggle i");

  setFilePath(refItem, ref);

  setReqActions(refItem, requirementId, ref, refIndex);

  return refItem;
}

/**
 * Creates a requirement item DOM element
 * @param {string} reqId - The requirement ID
 * @param {RequirementDetail} result - The requirement result data
 * @param {Requirement} req - The requirement data
 * @returns {HTMLLIElement} - The created requirement item element
 */
function createRequirementItem(reqId, result, req) {
  const item = document.createElement("li");
  item.className = "requirement-item dropdown-container";
  item.setAttribute("data-requirement", reqId);

  let statusClass = "";
  switch (result.implementationStatus) {
    case "confirmed-match":
      statusClass = "status-confirmed-match";
      break;
    case "possible-match":
      statusClass = "status-possible-match";
      break;
    case "unlikely-match":
      statusClass = "status-unlikely-match";
      break;
  }

  // Create the requirement header (dropdown toggle)
  const reqHeaderHTML = `
    <div class="dropdown-header requirement-header">
      <div class="requirement-header-content">
        <div class="requirement-id">${req.name}</div>
        <span class="implementation-status ${statusClass}">
          ${result.implementationStatus.replace("-", " ")}
        </span>
      </div>
      <div class="dropdown-toggle"><i class="codicon codicon-chevron-down"></i></div>
    </div>
  `;

  // Create the requirement content with a unique container for code references
  const refsContainerId = `refs-${req.id.replace("{", "").replace("}", "")}`;
  const reqContentHTML = `
    <div class="dropdown-content requirement-content">
      <div class="requirement-description">${req.description}</div>
      <div class="requirement-meta">
        Type: ${req.type} | Priority: ${req.priority} | Status: ${req.status}
      </div>
      <div class="implementation-info">
        <span>Score: ${Math.round(result.score * 100)}%</span>
        <button class="analyze-button" data-requirement="${reqId}">
          <i class="codicon codicon-search"></i> Analyze Implementation
        </button>
      </div>
      <div class="ollama-analysis hidden">
        <div class="analysis-header">
          <span>Ollama's Analysis</span>
          <div class="loading-spinner hidden"></div>
        </div>
        <div class="analysis-content"></div>
        <div class="analysis-code-snippet"></div>
      </div>
      <div class="code-references" id="${refsContainerId}"></div>
    </div>
  `;

  // Combine header and content
  item.innerHTML = reqHeaderHTML + reqContentHTML;

  // Add toggle functionality to requirement
  addDropdownToggleEventHandler(
    item,
    ".requirement-header",
    ".dropdown-toggle i",
  );

  return item;
}

/**
 * Sets up analyze button event handlers for all requirements
 * @param {NodeListOf<Element>} analyzeButtons - The analyze buttons
 * @param {TrackingSummary} summary - The tracking summary data
 * @param {Requirement[]} requirements - The requirements data
 */
function setupAnalysisEventHandlers(analyzeButtons, summary, requirements) {
  analyzeButtons.forEach((analyzeButton) => {
    analyzeButton.addEventListener("click", async (e) => {
      e.stopPropagation();

      // Get the parent requirement item
      const requirementItem = analyzeButton.closest(".requirement-item");
      if (!requirementItem) {
        console.error("Could not find parent requirement item");
        return;
      }

      const analysisDiv = requirementItem.querySelector(".ollama-analysis");
      if (!analysisDiv) {
        console.error("Could not find analysis div");
        return;
      }

      const spinner = analysisDiv.querySelector(".loading-spinner");
      const contentDiv = analysisDiv.querySelector(".analysis-content");

      if (!spinner || !contentDiv) {
        console.error("Could not find spinner or content div");
        return;
      }

      // Get requirement ID and find the corresponding tracking result
      const reqId = requirementItem.getAttribute("data-requirement");
      if (!reqId || !summary.requirementDetails) {
        console.error("Missing requirement ID or tracking results");
        return;
      }

      const result = summary.requirementDetails[reqId];

      if (!result) {
        console.error(`No tracking results found for requirement ${reqId}`);
        return;
      }

      // Show loading state
      analysisDiv.classList.remove("hidden");
      spinner.classList.remove("hidden");
      contentDiv.textContent = "Analyzing...";

      // Find the requirement object
      const requirement = requirements.find((r) => r.id === reqId);
      if (!requirement) {
        console.error(`No requirement found for ID ${reqId}`);
        return;
      }

      console.log("Sending analyze implementation message", {
        requirement,
        codeReferences: result.codeReferences,
      });

      vscode.postMessage({
        type: "analyzeImplementation",
        requirementId: reqId,
        requirement: requirement,
        codeReferences: result.codeReferences,
      });

      // Create code reference container if it doesn't exist
      const refsContainerId = `refs-${reqId.replace("{", "").replace("}", "")}`;
      let refsContainer = requirementItem.querySelector(`#${refsContainerId}`);
      if (!refsContainer) {
        refsContainer = document.createElement("div");
        refsContainer.className = "code-references";
        refsContainer.id = refsContainerId;
        requirementItem.appendChild(refsContainer);
      }
    });
  });
}

/**
 * Populates a requirement's code references
 * @param {HTMLLIElement} item - The requirement item element
 * @param {CodeReference[]} codeReferences - The code references to add
 * @param {string} reqId - The requirement ID
 * @param {string} refsContainerId - The ID of the references container
 */
function populateCodeReferences(item, codeReferences, reqId, refsContainerId) {
  if (!codeReferences || codeReferences.length === 0) return;

  const refsContainer = item.querySelector(`#${refsContainerId}`);
  if (!refsContainer) return;

  const refsHeader = document.createElement("div");
  refsHeader.textContent = "Code References:";
  refsHeader.style.fontWeight = "bold";
  refsHeader.style.marginTop = "10px";
  refsHeader.style.marginBottom = "5px";
  refsContainer.appendChild(refsHeader);

  codeReferences.forEach((ref, refIndex) => {
    const refItem = createCodeReferenceItem(ref, refIndex, reqId);
    refsContainer.appendChild(refItem);
  });
}

/**
 * Main function to update the requirements display
 * @param {TrackingSummary} summary - The tracking summary data
 * @param {Requirement[]} requirements - The requirements data
 */
function updateRequirementsDisplay(summary, requirements = []) {
  const requirementsResults = document.getElementById("requirements-results");

  // Check if requirementsResults exists
  if (!requirementsResults) {
    console.error("Requirements results element not found");
    return;
  }

  // Generate requirement details
  requirementsResults.innerHTML = "";

  const details = summary?.requirementDetails || {};
  const requirementIds = Object.keys(details);

  if (requirementIds.length === 0) {
    requirementsResults.innerHTML = "<p>No requirements found.</p>";
    return;
  }

  const list = document.createElement("ul");
  list.className = "requirements-list";

  console.log(requirementIds);

  requirementIds.forEach((reqId) => {
    console.log(reqId);
    const result = details[reqId];
    const req = requirements?.find((r) => r?.id === reqId);

    if (!req) return;

    // Create the requirement item element
    const item = createRequirementItem(reqId, result, req);

    // Add code references to the requirement content
    const refsContainerId = `refs-${req.id.replace("{", "").replace("}", "")}`;
    populateCodeReferences(item, result.codeReferences, reqId, refsContainerId);

    list.appendChild(item);
  });

  requirementsResults.appendChild(list);

  // Set up analyze button event handlers
  const analyzeButtons = document.querySelectorAll(".analyze-button");
  setupAnalysisEventHandlers(analyzeButtons, summary, requirements);
}

/**
 * @param {Requirement[]} requirements
 */
function updateRequirementsTable(requirements) {
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

  // Make sure we have tabs before trying to operate on them
  if (tabs.length > 0) {
    tabs.forEach((t) => t.classList.remove("active"));
    if (tabs[tabId]) {
      tabs[tabId].classList.add("active");
    }
  }

  // Make sure we have tab contents before trying to operate on them
  if (tabContents.length > 0) {
    tabContents.forEach((c) => c.classList.remove("active"));
    if (tabContents[tabId]) {
      tabContents[tabId].classList.add("active");
    }
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

  // Get the tab ID
  const tabId = tab.getAttribute("data-tab");

  // Show corresponding content
  tabContents.forEach((content) => {
    content.classList.remove("active");

    // Check if tab content ID matches expected format
    if (content.id === `${tabId}-tab`) {
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
    setReqActions,
    setFilePath,
    addDropdownToggleEventHandler,
    createCodeReferenceItem,
    createRequirementItem,
    setupAnalysisEventHandlers,
    populateCodeReferences,
  };
}
