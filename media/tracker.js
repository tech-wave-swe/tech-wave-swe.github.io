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
  const loadingElement = document.getElementById("loading");
  const fileInput = document.getElementById("file-input");
  const importFormatSelect = document.getElementById("import-format");
  const importButton = document.getElementById("import-button");
  const trackAllCheckbox = document.getElementById("track-all");
  const trackButton = document.getElementById("track-button");
  const unimplementedButton = document.getElementById("unimplemented-button");
  const clearRequirements = document.getElementById("clear-requirements");
  const textContent = document.getElementById("text-content");
  const requirementSelection = document.getElementById("requirement-selection");
  const requirementsChecklist = document.getElementById(
    "requirements-checklist",
  );

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      handleTabClick(tabs, tab);
    });
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

  // Unimplemented button
  unimplementedButton.addEventListener("click", () => {
    handleUnimplementedButtonClick(trackAllCheckbox, requirementsChecklist);
  });

  // Clear requirements button
  clearRequirements.addEventListener("click", () => {
    handleClearRequirementsButtonClick();
  });

  // Handle messages from the extension
  window.addEventListener("message", (event) => {
    const message = event.data;

    switch (message.type) {
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
        handleTrackingResultsEvent(trackingResults);
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
    }
  });
}

function handleTabClick(tabs, tab) {
  const tabContents = document.querySelectorAll(".tab-content");

  const tabId = tab.getAttribute("data-tab");

  // Update active tab
  tabs.forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");

  // Show corresponding content
  tabContents.forEach((content) => {
    content.classList.remove("active");
    if (content.id === tabId + "-tab") {
      content.classList.add("active");
    }
  });

  if (tabId === "track") {
    updateRequirementsTable();
  }
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

  if (!trackAllCheckbox.checked) {
    // Get selected requirements
    requirementIds = Array.from(
      requirementsChecklist.querySelectorAll(
        'input[type="checkbox"]:checked',
      ),
    ).map((checkbox) => checkbox.value);

    if (requirementIds.length === 0) {
      alert("Please select at least one requirement to track");
      return;
    }
  }

  vscode.postMessage({
    type: "trackRequirements",
    requirementIds,
  });
}

function handleUnimplementedButtonClick(trackAllCheckbox, requirementsChecklist) {
  if (requirements.length === 0) {
    alert("No requirements available to track");
    return;
  }

  let requirementIds = undefined;

  if (!trackAllCheckbox.checked) {
    // Get selected requirements
    requirementIds = Array.from(
      requirementsChecklist.querySelectorAll(
        'input[type="checkbox"]:checked',
      ),
    ).map((checkbox) => checkbox.value);

    if (requirementIds.length === 0) {
      alert("Please select at least one requirement to track");
      return;
    }
  }

  vscode.postMessage({
    type: "trackRequirements",
    requirementIds,
  });
}

function handleTrackingResultsEvent(trackingResults) {
  updateResultsDisplay(trackingResults);

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

  switchToTab(2)
}

function handleClearRequirementsButtonClick() {
  vscode.postMessage({
    type: "clearRequirements"
  });
}

// Update tracking results display
function updateResultsDisplay(summary) {
  const summarySection = document.getElementById("summary-section");

  // Show summary section
  summarySection.style.display = "block";

  // Update Views
  updateChartDisplay(summary);
  updateLegendDisplay(summary);
  updateRequirementsDisplay(summary);
}

function updateChartDisplay(summary) {
  const chartImplemented = document.getElementById("chart-implemented");
  const chartPartially = document.getElementById("chart-partially");
  const chartNotImplemented = document.getElementById("chart-not-implemented");

  const total = summary.totalRequirements;
  const implemented = summary.implementedRequirements;
  const partially = summary.partiallyImplementedRequirements;
  const notImplemented = summary.unimplementedRequirements;

  // Update chart
  chartImplemented.style.width = `${(implemented / total) * 100}%`;
  chartPartially.style.width = `${(partially / total) * 100}%`;
  chartNotImplemented.style.width = `${(notImplemented / total) * 100}%`;
}

function updateLegendDisplay(summary) {
  const legendImplemented = document.getElementById("legend-implemented");
  const legendPartially = document.getElementById("legend-partially");
  const legendNotImplemented = document.getElementById(
    "legend-not-implemented",
  );

  // Update legend
  legendImplemented.textContent = `Implemented: ${summary.implementedRequirements}`;
  legendPartially.textContent = `Partially: ${summary.partiallyImplementedRequirements}`;
  legendNotImplemented.textContent = `Not Implemented: ${summary.unimplementedRequirements}`;
}

function updateRequirementsDisplay(summary) {
  const requirementsResults = document.getElementById("requirements-results");

  // Generate requirement details
  requirementsResults.innerHTML = "";

  const details = summary.requirementDetails;
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
    item.className = "requirement-item";

    let statusClass = "";
    switch (result.implementationStatus) {
      case "implemented":
        statusClass = "status-implemented";
        break;
      case "partially-implemented":
        statusClass = "status-partially";
        break;
      case "not-implemented":
        statusClass = "status-not-implemented";
        break;
    }

    item.innerHTML = `
        <div class="requirement-id">${req.id}</div>
        <div class="requirement-description">${req.description}</div>
        <div class="requirement-meta">
          Type: ${req.type} | Priority: ${req.priority} | Status: ${req.status}
        </div>
        <div class="implementation-info">
          <span class="implementation-status ${statusClass}">
            ${result.implementationStatus.replace("-", " ")}
          </span>
          <span>Score: ${Math.round(result.score * 100)}%</span>
        </div>
      `;

    if (result.codeReferences && result.codeReferences.length > 0) {
      const refsContainer = document.createElement("div");
      refsContainer.className = "code-references";

      const refsHeader = document.createElement("div");
      refsHeader.textContent = "Code References:";
      refsHeader.style.fontWeight = "bold";
      refsHeader.style.marginTop = "5px";
      refsContainer.appendChild(refsHeader);

      result.codeReferences.forEach((ref) => {
        const refItem = document.createElement("div");
        refItem.className = "code-reference";
        refItem.setAttribute("data-path", ref.filePath);
        refItem.setAttribute("data-line", ref.lineStart);

        refItem.innerHTML = `
            <div class="file-path">${ref.filePath}:${ref.lineStart}</div>
            <div class="code-snippet">${escapeHtml(formatSnippet(ref.snippet))}</div>
            ${ref.relevanceExplanation ? `<div class="relevance-info">${ref.relevanceExplanation}</div>` : ""}
          `;

        refItem.addEventListener("click", () => {
          vscode.postMessage({
            type: "openFile",
            filePath: ref.filePath,
            lineStart: ref.lineStart,
          });
        });

        refsContainer.appendChild(refItem);
      });

      item.appendChild(refsContainer);
    }

    list.appendChild(item);
  });

  requirementsResults.appendChild(list);
}

// Update requirements table
function updateRequirementsTable() {
  const requirementsWrapper = document.getElementById("requirements-table-wrapper");

  requirementsWrapper.innerHTML = "";
  reqReferences = [];

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
    <th className="req-table-id">ID</th>
    <th className="req-table-desc">Description</th>
    <th className="req-table-status">Status</th>
    <th className="req-table-actions">Actions</th>`;

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  tbody.id = "requirements-list";

  requirements.forEach((req) => {
    const item = document.createElement("tr");

    // {
    //   "id": "REQ-39",
    //   "description": "ADC oversampling features shall be disabled by default during initialization.",
    //   "type": "Requirement",
    //   "priority": "medium",
    //   "status": "draft",
    //   "version": "1.0",
    //   "metadata": {
    //   "createdAt": "2025-04-04T09:52:27.394Z",
    //     "source": "csv",
    //     "guid": "B4BC92E3-A4A0-4e93-91C6-A9FFF65B9656",
    //     "rawData": {
    //     "GUID": "{B4BC92E3-A4A0-4e93-91C6-A9FFF65B9656}",
    //       "Name": "REQ-39",
    //       "Notes": "ADC oversampling features shall be disabled by default during initialization.",
    //       "Type": "Requirement",
    //       "Version": "1.0"
    //   }
    // }
    // }

    item.innerHTML = `
      <td><input id="${req.id}" name="${req.id}" type="checkbox"></td>
      <td class="req-table-id">${req.id}</td>
      <td class="req-table-desc">${req.description}</td>
      <td class="req-table-status">${req.status}</td>
      <td class="req-table-actions">
        <ul>
          <li>
            <i class="codicon codicon-edit"></i>
          </li>
          <li>
            <i class="codicon codicon-trash"></i>
          </li>
        </ul>
      </td>
    `;

    tbody.appendChild(item);
  })

  table.appendChild(tbody);
  requirementsWrapper.appendChild(table);

  handleRequirementsEvents();
}

function handleRequirementsEvents() {
  const selectRequirements = document.querySelectorAll("td input");
  selectRequirements.forEach(requirement => {
    requirement.addEventListener("change", () => {
      if (!requirement.checked) {
        const trackAllCheckbox = document.getElementById("track-all");
        if (trackAllCheckbox.checked) {
          trackAllCheckbox.checked = false;
        }
      }
    });
  })
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
