let vscode;

// Store requirements
let requirements = [];
let trackingResults = null;

document.addEventListener("DOMContentLoaded", function (e) {
  vscode = acquireVsCodeApi();

  setInitialState();
  handleEvents();
});

function setInitialState() {
  const importFormatSelect = document.getElementById("import-format");
  const trackAllCheckbox = document.getElementById("track-all");

  // Initial state
  document.getElementById("csv-options").style.display =
    importFormatSelect.value === "csv" ? "block" : "none";

  trackAllCheckbox.checked = false;
}

function handleEvents() {
  const tabs = document.querySelectorAll(".tab");
  const tabImport = document.querySelector("#tab-import");
  const tabTrack = document.querySelector("#tab-track");
  const tabResults = document.querySelector("#tab-results");
  const loadingElement = document.getElementById("loading");
  const fileInput = document.getElementById("file-input");
  const importFormatSelect = document.getElementById("import-format");
  const importButton = document.getElementById("import-button");
  const trackAllCheckbox = document.getElementById("track-all");
  const trackButton = document.getElementById("track-button");
  const clearRequirements = document.getElementById("clear-requirements");
  const textContent = document.getElementById("text-content");
  const requirementSelection = document.getElementById("requirement-selection");
  const requirementsChecklist = document.getElementById(
    "requirements-checklist",
  );

  const confirmEditButton = document.getElementById("confirm-edit");
  const cancelEditButton = document.getElementById("cancel-edit");

  // Tab switching
  tabImport.addEventListener("click", function (e) {
    handleTabImportClick(e);
  });

  tabTrack.addEventListener("click", function (e) {
    handleTabTrackClick(e);
  });

  tabResults.addEventListener("click", function (e) {
    handleTabResults(e);
  });

  // File input handling
  fileInput.addEventListener("change", (event) => {
    handleFileInputChange(event, textContent);
  });

  // Show/hide CSV options based on format selection
  importFormatSelect.addEventListener("change", () => {
    handleImportFormatChange(importFormatSelect);
  });

  // Import button
  importButton.addEventListener("click", () => {
    handleImportButtonClick(importFormatSelect, textContent);
  });

  // Track all checkbox
  trackAllCheckbox.addEventListener("change", () => {
    handleTrackAllCheckboxChange(requirementSelection, trackAllCheckbox);
  });

  // Track button
  trackButton.addEventListener("click", () => {
    handleTrackButtonClick(trackAllCheckbox, requirementsChecklist);
  });

  // Clear requirements button
  clearRequirements.addEventListener("click", () => {
    handleClearRequirementsButtonClick();
  });

  // Confirm edit button
  confirmEditButton.addEventListener("click", (e) => {
    handleConfirmEditButtonClick(e);
  });

  // Cancel edit button
  cancelEditButton.addEventListener("click", (e) => {
    handleCancelEditButtonClick(e);
  });

  // Handle messages from the extension
  window.addEventListener("message", (event) => {
    const message = event.data;

    switch (message.type) {
      case "analysisResult":
        const { requirementId, analysis } = message;
        const reqItem = document.querySelector(
          `.requirement-item[data-requirement="${requirementId}"]`,
        );

        if (reqItem) {
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

          if (spinner) {
            spinner.classList.add("hidden");
          } else {
            console.error(
              `Could not find loading spinner for requirement ${requirementId}`,
            );
            return;
          }

          if (contentDiv) {
            // Parse marked sections
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
              parseInt(
                getMarkedContent(analysis, "[INDEX_START]", "[INDEX_END]"),
              ) - 1;
            const analysisText = getMarkedContent(
              analysis,
              "[ANALYSIS_START]",
              "[ANALYSIS_END]",
            );

            // Get the selected code reference
            const result = trackingResults.requirementDetails[requirementId];
            const selectedReference =
              result.codeReferences[implementationIndex];

            // const refsContainerId = `refs-${requirementId.replace("{", "").replace("}", "")}`;
            // const refsContainer = reqItem.querySelector(`#${refsContainerId}`);

            // Update analysis content
            contentDiv.innerHTML = `
              <div class="analysis-text">
                <p>${analysisText}</p>
              </div>`;

            // Create code reference div within the analysis content
            const refItem = document.createElement("div");
            refItem.className =
              "code-reference nested-dropdown-container expanded";
            refItem.setAttribute("data-path", selectedReference.filePath);
            refItem.setAttribute("data-line", selectedReference.lineNumber);

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
              lineNumber: selectedReference.lineNumber, // We'll need to get this from the analysis
              snippet: codeSnippet,
            };

            refItem
              .querySelector(".confirm-req-action")
              .addEventListener("click", (e) => {
                e.stopPropagation();
                vscode.postMessage({
                  type: "confirmRequirementImplementation",
                  requirementId,
                  codeReference,
                });
              });

            refItem
              .querySelector(".delete-req-action")
              .addEventListener("click", (e) => {
                e.stopPropagation();
                vscode.postMessage({
                  type: "rejectRequirementImplementation",
                  requirementId,
                  codeReferenceId: implementationIndex,
                });
              });

            refItem
              .querySelector(".edit-req-action")
              .addEventListener("click", (e) => {
                e.stopPropagation();
                vscode.postMessage({
                  type: "startEditMode",
                  requirementId,
                  codeReferenceId: implementationIndex,
                  codeReference,
                });
              });
            const analysisCodeSnippet = analysisDiv.querySelector(
              ".analysis-code-snippet",
            );
            analysisCodeSnippet.appendChild(refItem);
          } else {
            console.error(
              `Could not find content div for requirement ${requirementId}`,
            );
            return;
          }
        }
        break;

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

      // Show Tabs
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
}

function handleShowTabImport(tab) {
  changeActiveTab(tab);
}

function handleShowTabTrack(tab, reqs) {
  console.log(reqs);

  requirements = reqs;
  updateRequirementsTable();

  changeActiveTab(tab);
}

function handleShowTabResults(tab, summary) {
  console.log(summary);

  trackingResults = summary;
  updateResultsDisplay();

  changeActiveTab(tab);
}

function handleConfirmEditButtonClick(event) {
  if (!event.target.getAttribute("disabled")) {
    vscode.postMessage({
      type: "confirmEditImplementation",
    });
  }
}

function handleCancelEditButtonClick(event) {
  vscode.postMessage({
    type: "cancelEditImplementation",
  });
}

function handleUpdateSelectedReference(codeReference) {
  const currentSelection = document.getElementById("current-selection");
  const confirmEditButton = document.getElementById("confirm-edit");
  const cancelEditButton = document.getElementById("cancel-edit");

  confirmEditButton.removeAttribute("disabled");

  currentSelection.innerText = codeReference.snippet;
}

function handleStartEditMode(message) {
  const { requirementId, codeReference } = message;
  const requirement = requirements.find((req) => req.id === requirementId);

  if (!requirement) {
    console.error("Requirement not found");
    return;
  }

  const editModeUI = document.getElementById("edit-mode-ui");
  const originalPath = editModeUI.querySelector("#edit-mode-original-path");
  const originalLine = editModeUI.querySelector("#edit-mode-original-line");

  originalPath.innerHTML = codeReference.filePath;
  originalLine.innerHTML = (codeReference.lineNumber + 1).toString();

  editModeUI.classList.remove("hidden");
}

function handleStopEditMode(message) {
  const currentSelection = document.getElementById("current-selection");
  const confirmEditButton = document.getElementById("confirm-edit");
  const editModeUI = document.getElementById("edit-mode-ui");

  confirmEditButton.setAttribute("disabled", "");
  currentSelection.innerText = "No text selected";

  editModeUI.classList.add("hidden");
}

function handleTabImportClick(event) {
  vscode.postMessage({
    type: "tabToImport",
  });
}

function handleTabTrackClick(event) {
  vscode.postMessage({
    type: "tabToTrack",
  });
}

function handleTabResults(event) {
  vscode.postMessage({
    type: "tabToResults",
  });
}

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

function handleFileInputChange(event, textContent) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    textContent.value = e.target.result;
  };
  reader.readAsText(file);
}

function handleImportFormatChange(importFormatSelect) {
  const csvOptions = document.getElementById("csv-options");

  csvOptions.style.display =
    importFormatSelect.value === "csv" ? "block" : "none";
}

function handleImportButtonClick(importFormatSelect, textContent) {
  const format = importFormatSelect.value;
  const content = textContent.value.trim();
  const options = {};

  // Get delimiter if CSV is selected
  if (format === "csv") {
    const delimiter = document.getElementById("csv-delimiter").value;
    if (delimiter && delimiter !== ",") {
      options.delimiter = delimiter;
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

function handleTrackAllCheckboxChange(requirementSelection, trackAllCheckbox) {
  const selectRequirements = document.querySelectorAll("td input");

  selectRequirements.forEach((checkbox) => {
    checkbox.checked = trackAllCheckbox.checked;
  });
}

function handleTrackButtonClick(trackAllCheckbox, requirementsChecklist) {
  if (requirements.length === 0) {
    alert("No requirements available to track");
    return;
  }

  let requirementIds = undefined;

  // Get selected requirements
  requirementIds = Array.from(document.querySelectorAll("td input"))
    .filter((check) => check.checked)
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

function handleUnimplementedRequirements(message) {
  const requirementsResults = document.getElementById("requirements-results");

  requirementsResults.innerHTML = "<h3>Unimplemented Requirements</h3>";
  const unimplementedList = document.createElement("ul");
  unimplementedList.className = "requirements-list";

  if (message.requirements.length === 0) {
    requirementsResults.innerHTML +=
      "<p>All requirements appear to be implemented!</p>";
  } else {
    message.requirements.forEach((req) => {
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

  // Generate requirement details
  requirementsResults.innerHTML = "";

  const details = trackingResults.requirementDetails;
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
    const reqHeader = item.querySelector(".requirement-header");
    reqHeader.addEventListener("click", (e) => {
      e.stopPropagation();
      item.classList.toggle("expanded");
      const toggleIcon = reqHeader.querySelector(".dropdown-toggle i");
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
      const refsContainer = item.querySelector(`#${refsContainerId}`);

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
        refItem.setAttribute("data-line", ref.lineNumber);

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
        const refHeader = refItem.querySelector(".ref-header");
        refHeader.addEventListener("click", (e) => {
          e.stopPropagation();
          refItem.classList.toggle("expanded");
          const toggleIcon = refHeader.querySelector(".dropdown-toggle i");
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
        refItem.querySelector(".file-path").addEventListener("click", (e) => {
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
      const requirementItem = analyzeButton.closest(".requirement-item");
      const analysisDiv = requirementItem.querySelector(".ollama-analysis");
      const spinner = analysisDiv.querySelector(".loading-spinner");
      const contentDiv = analysisDiv.querySelector(".analysis-content");

      // Get requirement ID and find the corresponding tracking result
      const reqId = requirementItem.getAttribute("data-requirement"); // Make sure this attribute exists
      const result = trackingResults.requirementDetails[reqId];

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

// Update requirements table
function updateRequirementsTable() {
  const requirementsWrapper = document.getElementById(
    "requirements-table-wrapper",
  );

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
      <td class="req-table-id">${req.name}</td>
      <td class="req-table-desc">${req.description}</td>
      <td class="req-table-status">${req.status}</td>
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
    requirement.addEventListener("change", () => {
      if (!requirement.checked) {
        const trackAllCheckbox = document.getElementById("track-all");
        if (trackAllCheckbox.checked) {
          trackAllCheckbox.checked = false;
        }
      }
    });
  });

  // Actions
  deleteReqActions.forEach((deleteReqAction) => {
    deleteReqAction.addEventListener("click", () => {
      const requirementId = deleteReqAction.dataset.requirement;

      vscode.postMessage({
        type: "deleteRequirement",
        requirementId,
      });
    });
  });

  editReqActions.forEach((editReqAction) => {
    editReqAction.addEventListener("click", () => {
      const requirementId = editReqAction.getAttribute("data-requirement");
      vscode.postMessage({
        type: "editRequirement",
        requirementId,
      });
    });
  });

  viewReqActions.forEach((viewReqAction) => {
    viewReqAction.addEventListener("click", () => {
      const requirementId = viewReqAction.getAttribute("data-requirement");
      const filePath = viewReqAction.getAttribute("data-path");
      const lineNumber = viewReqAction.getAttribute("data-line");

      vscode.postMessage({
        type: "openFile",
        filePath: filePath,
        lineStart: parseInt(lineNumber),
      });
    });
  });
}

// Helper to escape HTML
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Helper to format code snippets
function formatSnippet(snippet) {
  if (!snippet) {
    return "";
  }
  if (snippet.length > 300) {
    return snippet.substring(0, 300) + "...";
  }
  return snippet;
}

function switchToTab(tabId) {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((t) => t.classList.remove("active"));
  tabs[tabId].classList.add("active");
  tabContents.forEach((c) => c.classList.remove("active"));
  tabContents[tabId].classList.add("active");
}
