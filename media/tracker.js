// @ts-check
// @ts-ignore
const vscode = acquireVsCodeApi();

/**
 * @template T
 * @typedef {T extends null ? never : T} NonNull
 */

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

/**
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

// Store requirements
// let requirements = [];
// let trackingResults = null;

document.addEventListener("DOMContentLoaded", function (e) {
  setInitialState();
});

function setInitialState() {
  const importFormatSelect = /** @type {HTMLSelectElement} */ (
    document.getElementById("import-format")
  );
  const trackAllCheckbox = /** @type {HTMLInputElement} */ (
    document.getElementById("track-all")
  );
  const csvOptions = document.getElementById("csv-options");

  if (!importFormatSelect || !trackAllCheckbox || !csvOptions) {
    console.error("Required DOM elements not found in setInitialState");
    return;
  }

  // Initial state
  csvOptions.style.display =
    importFormatSelect.value === "csv" ? "block" : "none";
  trackAllCheckbox.checked = false;
}

const tabImport = /** @type {HTMLElement} */ (
  document.querySelector("#tab-import")
);
const tabTrack = /** @type {HTMLElement} */ (
  document.querySelector("#tab-track")
);
const tabResults = /** @type {HTMLElement} */ (
  document.querySelector("#tab-results")
);
const loadingElement = document.getElementById("loading");
const fileInput = /** @type {HTMLInputElement} */ (
  document.getElementById("file-input")
);
const importFormatSelect = /** @type {HTMLSelectElement} */ (
  document.getElementById("import-format")
);
const importButton = document.getElementById("import-button");
const trackAllCheckbox = /** @type {HTMLInputElement} */ (
  document.getElementById("track-all")
);
const trackButton = document.getElementById("track-button");
const clearRequirements = document.getElementById("clear-requirements");
const textContent = /** @type {HTMLTextAreaElement} */ (
  document.getElementById("text-content")
);
const requirementSelection = document.getElementById("requirement-selection");
const requirementsChecklist = document.getElementById("requirements-checklist");

// Check for required elements
if (
  !tabImport ||
  !tabTrack ||
  !tabResults ||
  !loadingElement ||
  !fileInput ||
  !importFormatSelect ||
  !importButton ||
  !trackAllCheckbox ||
  !trackButton ||
  !clearRequirements ||
  !textContent
) {
  console.error("Required DOM elements not found in handleEvents");
  throw new Error("Required DOM elements not found in handleEvents");
}

const confirmEditButton = /** @type {HTMLButtonElement} */ (
  document.getElementById("confirm-edit")
);
const cancelEditButton = /** @type {HTMLButtonElement} */ (
  document.getElementById("cancel-edit")
);

if (!confirmEditButton || !cancelEditButton) {
  console.error("Edit buttons not found");
  throw new Error("Edit buttons not found");
}

// Tab switching
tabImport.addEventListener("click", function (e) {
  if (!tabImport) return;
  handleTabImportClick(e);
});

tabTrack.addEventListener("click", function (e) {
  if (!tabTrack) return;
  handleTabTrackClick(e);
});

tabResults.addEventListener("click", function (e) {
  if (!tabResults) return;
  handleTabResults(e);
});

// File input handling
if (!fileInput || !textContent) {
  console.error("Required elements not found");
  throw new Error("Required elements not found");
}
fileInput.addEventListener("change", (event) => {
  if (!fileInput.files || fileInput.files.length === 0) return;

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target && typeof e.target.result === "string") {
      textContent.value = e.target.result;
    }
  };
  reader.readAsText(file);
});

// Show/hide CSV options based on format selection
if (!importFormatSelect) {
  console.error("importFormatSelect element not found");
  throw new Error("importFormatSelect element not found");
}

// function handleImportFormatChange(select) {
//   const csvOptions = document.getElementById("csv-options");
//   if (csvOptions) {
//     csvOptions.style.display = select.value === "csv" ? "block" : "none";
//   }
// }

importFormatSelect.addEventListener("change", (event) => {
  const csvOptions = document.getElementById("csv-options");
  if (csvOptions) {
    csvOptions.style.display = importFormatSelect.value === "csv" ? "block" : "none";
  }
});

// Set initial state
handleImportFormatChange(importFormatSelect);

// Import button
if (!importButton) {
  console.error("Import button element not found");
  throw new Error("Import button element not found");
}
importButton.addEventListener("click", () => {
  handleImportButtonClick(importFormatSelect, textContent);
});

function handleTrackAllChange(checkbox) {
  const selectRequirements = document.querySelectorAll("td input");
  selectRequirements.forEach((req) => {
    if (req instanceof HTMLInputElement) {
      req.checked = checkbox.checked;
    }
  });
}

// Track all checkbox
if (!trackAllCheckbox) {
  console.error("Track all checkbox not found");
  throw new Error("Track all checkbox not found");
}
trackAllCheckbox.addEventListener("change", (event) => {
  const selectRequirements = document.querySelectorAll("td input");
  selectRequirements.forEach((req) => {
    if (req instanceof HTMLInputElement) {
      req.checked = trackAllCheckbox.checked;
    }
  });
});

// Track button
if (!trackButton) {
  console.error("Track button not found");
  throw new Error("Track button not found");
}
trackButton.addEventListener("click", (event) => {
  if (requirements.length === 0) {
    alert("No requirements available to track");
    return;
  }

  const checkboxes = document.querySelectorAll("td input:checked");
  const selectedCheckboxes = Array.from(checkboxes).filter(
    (checkbox) => checkbox instanceof HTMLInputElement,
  );
  const requirementIds = selectedCheckboxes.map((checkbox) => checkbox.id);

  if (requirementIds.length === 0) {
    alert("Please select at least one requirement to track");
    return;
  }

  vscode.postMessage({
    type: "trackRequirements",
    requirementIds,
  });
});

// Clear requirements button
clearRequirements.addEventListener("click", () => {
  handleClearRequirementsButtonClick();
});

// Confirm edit button
confirmEditButton.addEventListener("click", () => {
  if (!confirmEditButton.hasAttribute("disabled")) {
    vscode.postMessage({
      type: "confirmEditImplementation",
    });
  }
});

// Cancel edit button
cancelEditButton.addEventListener("click", (e) => {
  handleCancelEditButtonClick(e);
});

// Handle messages from the extension
window.addEventListener("message", (event) => {
  const message = event.data;

  switch (message.type) {
    case "analysisResult": {
      const { requirementId, analysis } = message;
      const reqItem = document.querySelector(
        `.requirement-item[data-requirement="${requirementId}"]`,
      );

      if (!reqItem) {
        console.error(`Could not find requirement item for ${requirementId}`);
        return;
      }

      console.log("Found requirement item:", reqItem);
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
       *
       * @param {string} text
       * @param {string} startMarker
       * @param {string} endMarker
       * @returns
       */
      const getMarkedContent = (text, startMarker, endMarker) => {
        const start = text.indexOf(startMarker) + startMarker.length;
        const end = text.indexOf(endMarker);
        return text.substring(start, end).trim();
      };

      const codeSnippet = getMarkedContent(
        analysis,
        "[CODE_START]",
        "[CODE_END]",
      );
      const implementationIndex =
        parseInt(getMarkedContent(analysis, "[INDEX_START]", "[INDEX_END]")) -
        1;
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

      const selectedReference = result.codeReferences[implementationIndex];

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
      break;
    }

    case "requirementsImported":
      requirements = message.requirements;
      updateRequirementsDisplay();
      break;

    case "updateRequirements":
      requirements = message.requirements;
      updateRequirementsDisplay();
      break;

    case "trackingResults":
      trackingResults = message.summary;
      handleTrackingResultsEvent();
      break;

    case "unimplementedRequirements":
      handleUnimplementedRequirements();
      break;

    case "setLoading":
      loadingElement.style.display = message.isLoading ? "flex" : "none";
      break;

    case "error":
      alert(message.message);
      break;

    case "updateRequirementsTable":
      requirements = message.requirements;
      updateRequirementsTable();
      break;

    case "startEditMode":
      handleStartEditMode(message);
      break;

    case "stopEditMode":
      handleStopEditMode(message);
      break;

    case "updateSelectedReference":
      handleUpdateSelectedReference(message.codeReference);
      break;

    case "showImportTab":
      handleShowTabImport(tabImport);
      break;

    case "showTrackTab":
      handleShowTabTrack(tabTrack, message.requirements);
      break;

    case "showResultsTab":
      handleShowTabResults(tabResults, message.summary);
      break;
  }
});
// }
//   });
// }

/**
 * @param {HTMLElement} tab
 */
function handleShowTabImport(tab) {
  changeActiveTab(tab);
}

/**
 * @param {HTMLElement} tab
 * @param {{ id: string; name: string; description: string; type: string; priority: string; status: string; codeReference?: { filePath: string; lineNumber: number; } | undefined; }[]} reqs
 */
function handleShowTabTrack(tab, reqs) {
  console.log(reqs);

  requirements = reqs;
  updateRequirementsTable();

  changeActiveTab(tab);
}

/**
 * @param {HTMLElement} tab
 * @param {{ totalRequirements: number; confirmedMatches: number; possibleMatches: number; unlikelyMatches: number; requirementDetails: Record<string, { implementationStatus: string; score: number; codeReferences: { filePath: string; lineNumber: number; snippet: string; score: number; relevanceExplanation?: string | undefined; }[]; }>; } | null} summary
 */
function handleShowTabResults(tab, summary) {
  console.log(summary);

  trackingResults = summary;
  updateResultsDisplay();

  changeActiveTab(tab);
}

/**
 *
 * @param {Event} event
 */
function handleConfirmEditButtonClick(event) {
  const target = event.target instanceof HTMLElement ? event.target : null;
  if (target && !target.getAttribute("disabled")) {
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

/**
 * @param {{ filePath: string; lineNumber: number; snippet: string; score: number; relevanceExplanation?: string; contextRange?: { start: number; end: number; }; }} codeReference
 */
function handleUpdateSelectedReference(codeReference) {
  const currentSelection = document.getElementById("current-selection");
  const confirmEditButton = /** @type {HTMLButtonElement} */ (
    document.getElementById("confirm-edit")
  );

  if (!currentSelection || !confirmEditButton) {
    console.error(
      "Required elements not found in handleUpdateSelectedReference",
    );
    return;
  }

  confirmEditButton.removeAttribute("disabled");
  currentSelection.innerText = codeReference.snippet;
}

/**
 * @param {{ requirementId: string; codeReference: any; }} message
 */
function handleStartEditMode(message) {
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

  const originalPath = /** @type {HTMLElement} */ (
    editModeUI.querySelector("#edit-mode-original-path")
  );
  const originalLine = /** @type {HTMLElement} */ (
    editModeUI.querySelector("#edit-mode-original-line")
  );

  if (!originalPath || !originalLine) {
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
function handleStopEditMode(message) {
  const currentSelection = document.getElementById("current-selection");
  const confirmEditButton = /** @type {HTMLButtonElement} */ (
    document.getElementById("confirm-edit")
  );
  const editModeUI = document.getElementById("edit-mode-ui");

  if (!currentSelection || !confirmEditButton || !editModeUI) {
    console.error("Required elements not found in handleStopEditMode");
    return;
  }

  confirmEditButton.setAttribute("disabled", "");
  currentSelection.innerText = "No text selected";

  editModeUI.classList.add("hidden");
}

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
function handleTabResults(event) {
  vscode.postMessage({
    type: "tabToResults",
  });
}

/**
 * @param {{ classList: { add: (arg0: string) => void; }; getAttribute: (arg0: string) => any; }} tab
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

/**
 * @param {Event} event
 * @param {HTMLTextAreaElement} textContent
 */
function handleFileInputChange(event, textContent) {
  const fileInput = /** @type {HTMLInputElement} */ (event.target);
  const file = fileInput?.files?.[0];
  if (!file || !textContent) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target?.result;
    if (typeof result === "string") {
      textContent.value = result;
    }
  };
  reader.readAsText(file);
}

/**
 * @param {HTMLSelectElement} importFormatSelect
 */
function handleImportFormatChange(importFormatSelect) {
  const csvOptions = document.getElementById("csv-options");
  if (!csvOptions || !importFormatSelect) {
    console.error("Required elements not found");
    return;
  }

  csvOptions.style.display =
    importFormatSelect.value === "csv" ? "block" : "none";
}

/**
 * @param {HTMLSelectElement} importFormatSelect
 * @param {HTMLTextAreaElement} textContent
 */
function handleImportButtonClick(importFormatSelect, textContent) {
  if (!importFormatSelect || !textContent) {
    console.error("Required elements not found");
    return;
  }

  const format = importFormatSelect.value;
  const content = textContent.value.trim();
  const options = {};

  // Get delimiter if CSV is selected
  if (format === "csv") {
    const delimiter = /** @type {HTMLInputElement} */ (
      document.getElementById("csv-delimiter")
    );
    if (delimiter && delimiter.value !== ",") {
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
 * @param {HTMLElement | null} requirementSelection
 * @param {HTMLInputElement} trackAllCheckbox
 */
function handleTrackAllCheckboxChange(requirementSelection, trackAllCheckbox) {
  if (!trackAllCheckbox) return;

  const selectRequirements = document.querySelectorAll("td input");
  selectRequirements.forEach((checkbox) => {
    if (checkbox instanceof HTMLInputElement) {
      checkbox.checked = trackAllCheckbox.checked;
    }
  });
}

function handleTrackButtonClick() {
  if (requirements.length === 0) {
    alert("No requirements available to track");
    return;
  }

  const checkboxes = document.querySelectorAll("td input");
  const requirementIds = Array.from(checkboxes)
    .filter((check) => check instanceof HTMLInputElement && check.checked)
    .map((checkbox) => checkbox.id);

  if (requirementIds.length === 0) {
    alert("Please select at least one requirement to track");
    return;
  }

  vscode.postMessage({
    type: "trackRequirements",
    requirementIds,
  });
}

function handleTrackingResultsEvent() {
  updateResultsDisplay();

  // Switch to results tab
  switchToTab(2);
}

function handleUnimplementedRequirements() {
  const requirementsResults = document.getElementById("requirements-results");

  if (!requirementsResults) {
    console.error("Requirements results element not found");
    return;
  }

  requirementsResults.innerHTML = "<h3>Unimplemented Requirements</h3>";
  const unimplementedList = document.createElement("ul");
  unimplementedList.className = "requirements-list";

  if (!requirements || requirements.length === 0) {
    requirementsResults.innerHTML +=
      "<p>All requirements appear to be implemented!</p>";
  } else {
    requirements.forEach((req) => {
      const item = document.createElement("li");
      item.className = "requirement-item";
      item.innerHTML = `
                <div class="requirement-id">${req.id}</div>
                <div class="requirement-description">${req.description}</div>
                <div class="requirement-meta">
                  Type: ${req.type} | Priority: ${req.priority} | Status: ${req.status}
                </div>
                <div class="implementation-info">
                  <span class="implementation-status status-not-implemented">Not implemented</span>
                </div>
              `;
      unimplementedList.appendChild(item);
    });
    requirementsResults.appendChild(unimplementedList);
  }

  switchToTab(2);
}

function handleClearRequirementsButtonClick() {
  vscode.postMessage({
    type: "clearRequirements",
  });
}

// Update tracking results display
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
  const chartConfirmed = /** @type {HTMLElement} */ (
    document.getElementById("chart-confirmed-match")
  );
  const chartPossible = /** @type {HTMLElement} */ (
    document.getElementById("chart-possible-match")
  );
  const chartUnlikely = /** @type {HTMLElement} */ (
    document.getElementById("chart-unlikely-match")
  );

  if (!chartConfirmed || !chartPossible || !chartUnlikely || !trackingResults) {
    console.error("Chart elements or tracking results not found");
    return;
  }

  const total = trackingResults.totalRequirements;
  const confirmed = trackingResults.confirmedMatches;
  const possible = trackingResults.possibleMatches;
  const unlikely = trackingResults.unlikelyMatches;

  // Update chart
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

function updateRequirementsDisplay() {
  const requirementsResults = document.getElementById("requirements-results");
  if (!requirementsResults) {
    console.error("Requirements results container not found");
    return;
  }

  // Generate requirement details
  requirementsResults.innerHTML = "";

  const details = trackingResults?.requirementDetails;
  if (!details) {
    requirementsResults.innerHTML = "<p>No requirements found.</p>";
    return;
  }

  const requirementIds = Object.keys(details);

  if (requirementIds.length === 0) {
    requirementsResults.innerHTML = "<p>No requirements found.</p>";
    return;
  }

  const list = document.createElement("ul");
  list.className = "requirements-list";

  requirementIds.forEach((reqId) => {
    const result = details[reqId];
    const req = requirements.find((r) => r.id === reqId);

    if (!req) {
      return;
    }

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
    const reqHeader = assertNonNull(
      item.querySelector(".requirement-header"),
      "Requirement header not found",
    );
    reqHeader.addEventListener("click", (e) => {
      e.stopPropagation();
      item.classList.toggle("expanded");
      const toggleIcon = assertNonNull(
        reqHeader.querySelector(".dropdown-toggle i"),
        "Toggle icon not found",
      );
      if (item.classList.contains("expanded")) {
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
    });

    list.appendChild(item);

    // Add code references to the requirement content
    if (result.codeReferences && result.codeReferences.length > 0) {
      const refsContainer = assertNonNull(
        item.querySelector(`#${refsContainerId}`),
        "References container not found",
      );

      const refsHeader = document.createElement("div");
      refsHeader.textContent = "Code References:";
      refsHeader.style.fontWeight = "bold";
      refsHeader.style.marginTop = "10px";
      refsHeader.style.marginBottom = "5px";
      refsContainer.appendChild(refsHeader);

      result.codeReferences.forEach((ref, refIndex) => {
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
        const refHeader = assertNonNull(
          refItem.querySelector(".ref-header"),
          "Reference header not found",
        );
        refHeader.addEventListener("click", (e) => {
          e.stopPropagation();
          refItem.classList.toggle("expanded");
          const toggleIcon = assertNonNull(
            refHeader.querySelector(".dropdown-toggle i"),
            "Toggle icon not found",
          );
          if (refItem.classList.contains("expanded")) {
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
        });

        // Keep the openFile functionality but attach it to the file path specifically
        const filePath = assertNonNull(
          refItem.querySelector(".file-path"),
          "File path element not found",
        );
        filePath.addEventListener("click", (e) => {
          e.stopPropagation(); // Prevent triggering the dropdown toggle
          vscode.postMessage({
            type: "openFile",
            filePath: ref.filePath,
            lineStart: ref.lineNumber,
          });
        });

        // Add eventHandling for feedback buttons
        refItem
          .querySelectorAll(".confirm-req-action")
          .forEach((actionButton) => {
            actionButton.addEventListener("click", (e) => {
              e.stopPropagation(); // Prevent triggering the dropdown toggle

              vscode.postMessage({
                type: "confirmRequirementImplementation",
                requirementId: reqId,
                codeReference: ref,
              });
            });
          });

        refItem
          .querySelectorAll(".delete-req-action")
          .forEach((actionButton) => {
            actionButton.addEventListener("click", (e) => {
              e.stopPropagation(); // Prevent triggering the dropdown toggle

              vscode.postMessage({
                type: "rejectRequirementImplementation",
                requirementId: reqId,
                codeReferenceId: refIndex,
              });
            });
          });

        refItem.querySelectorAll(".edit-req-action").forEach((actionButton) => {
          actionButton.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering the dropdown toggle

            vscode.postMessage({
              type: "startEditMode",
              requirementId: reqId,
              codeReferenceId: refIndex,
              codeReference: ref,
            });
          });
        });

        refsContainer.appendChild(refItem);
      });
    }
  });

  requirementsResults.appendChild(list);

  const analyzeButtons = document.querySelectorAll(".analyze-button");

  // Analyze Implementation interaction
  analyzeButtons.forEach((analyzeButton) => {
    analyzeButton.addEventListener("click", async (e) => {
      e.stopPropagation();

      console.log("Analyze button clicked");

      console.log("Tracking results:", trackingResults);

      // Get the parent requirement item
      const requirementItem = assertNonNull(
        analyzeButton.closest(".requirement-item"),
        "Requirement item not found",
      );
      const analysisDiv = assertNonNull(
        requirementItem.querySelector(".ollama-analysis"),
        "Analysis div not found",
      );
      const spinner = assertNonNull(
        analysisDiv.querySelector(".loading-spinner"),
        "Spinner not found",
      );
      const contentDiv = assertNonNull(
        analysisDiv.querySelector(".analysis-content"),
        "Content div not found",
      );

      // Get requirement ID and find the corresponding tracking result
      const reqId = assertNonNull(
        requirementItem.getAttribute("data-requirement"),
        "Requirement ID not found",
      );
      const result = trackingResults?.requirementDetails?.[reqId];

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
      const refsContainerId = `refs-${reqId?.replace("{", "").replace("}", "")}`;
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

// Update requirements table
function updateRequirementsTable() {
  const requirementsWrapper = /** @type {HTMLElement} */ (
    document.getElementById("requirements-table-wrapper")
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
          const trackAllCheckbox = /** @type {HTMLInputElement} */ (
            document.getElementById("track-all")
          );
          if (trackAllCheckbox?.checked) {
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
    editReqAction.addEventListener("click", () => {
      const requirementId = editReqAction.getAttribute("data-requirement");
      if (!requirementId) return;

      vscode.postMessage({
        type: "editRequirement",
        requirementId,
      });
    });
  });

  viewReqActions.forEach((viewReqAction) => {
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
  });
}

// Helper to escape HTML
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

// Helper to format code snippets
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
  tabs[tabId].classList.add("active");
  tabContents.forEach((c) => c.classList.remove("active"));
  tabContents[tabId].classList.add("active");
}

// Export helper functions for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    escapeHtml,
    formatSnippet,
    assertNonNull,
  };
}
