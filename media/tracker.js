(function () {
  const vscode = acquireVsCodeApi();

  // DOM elements
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const loadingElement = document.getElementById("loading");
  const importFormatSelect = document.getElementById("import-format");
  const fileInput = document.getElementById("file-input");
  const textContent = document.getElementById("text-content");
  const importButton = document.getElementById("import-button");
  const trackAllCheckbox = document.getElementById("track-all");
  const requirementSelection = document.getElementById("requirement-selection");
  const requirementsChecklist = document.getElementById(
    "requirements-checklist",
  );
  const trackButton = document.getElementById("track-button");
  const unimplementedButton = document.getElementById("unimplemented-button");
  const summarySection = document.getElementById("summary-section");
  const chartConfirmed = document.getElementById("chart-confirmed-match");
  const chartPossible = document.getElementById("chart-possible-match");
  const chartUnlikely = document.getElementById("chart-unlikely-match");
  const legendConfirmed = document.getElementById("legend-confirmed-match");
  const legendPossible = document.getElementById("legend-possible-match");
  const legendUnlikely = document.getElementById("legend-unlikely-match");
  const requirementsResults = document.getElementById("requirements-results");

  // Store requirements
  let requirements = [];
  let trackingResults = null;

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
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
    });
  });

  // File input handling
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      textContent.value = e.target.result;
    };
    reader.readAsText(file);
  });

  // Show/hide CSV options based on format selection
  importFormatSelect.addEventListener("change", () => {
    const csvOptions = document.getElementById("csv-options");
    csvOptions.style.display =
      importFormatSelect.value === "csv" ? "block" : "none";
  });

  // Initial state
  document.getElementById("csv-options").style.display =
    importFormatSelect.value === "csv" ? "block" : "none";

  // Import button
  importButton.addEventListener("click", () => {
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
  });

  // Track all checkbox
  trackAllCheckbox.addEventListener("change", () => {
    requirementSelection.style.display = trackAllCheckbox.checked
      ? "none"
      : "block";
  });

  // Track button
  trackButton.addEventListener("click", () => {
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
  });

  // Unimplemented button
  unimplementedButton.addEventListener("click", () => {
    vscode.postMessage({
      type: "showUnimplemented",
    });
  });

  // Update requirements display
  function updateRequirementsDisplay() {
    requirementsChecklist.innerHTML = "";

    requirements.forEach((req) => {
      const item = document.createElement("div");
      item.style.marginBottom = "5px";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = req.name;
      checkbox.id = "req-" + req.id;
      checkbox.checked = false;

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.textContent = `${req.name}: ${req.description.substring(0, 50)}${req.description.length > 50 ? "..." : ""}`;

      item.appendChild(checkbox);
      item.appendChild(label);
      requirementsChecklist.appendChild(item);
    });
  }

  // Update tracking results display
  function updateResultsDisplay(summary) {
    summarySection.style.display = "block";

    const total = summary.totalRequirements;
    const confirmed = summary.confirmedMatches;
    const possible = summary.possibleMatches;
    const unlikely = summary.unlikelyMatches;

    // Update chart
    chartConfirmed.style.width = `${(confirmed / total) * 100}%`;
    chartPossible.style.width = `${(possible / total) * 100}%`;
    chartUnlikely.style.width = `${(unlikely / total) * 100}%`;

    // Update legend
    legendConfirmed.textContent = `Confirmed Match: ${confirmed}`;
    legendPossible.textContent = `Possible Match: ${possible}`;
    legendUnlikely.textContent = `Unlikely Match: ${unlikely}`;

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

      if (!req) return;

      const item = document.createElement("li");
      item.className = "requirement-item";

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

      item.innerHTML = `
        <div class="requirement-name">${req.name}</div>
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
          refItem.setAttribute("data-line", ref.lineNumber);

          refItem.innerHTML = `
            <div class="file-path">${ref.filePath}:${ref.lineNumber}</div>
            <div class="code-snippet">${escapeHtml(formatSnippet(ref.snippet))}</div>
            ${ref.relevanceExplanation ? `<div class="relevance-info">${ref.relevanceExplanation}</div>` : ""}
          `;

          refItem.addEventListener("click", () => {
            vscode.postMessage({
              type: "openFile",
              filePath: ref.filePath,
              lineStart: ref.lineNumber,
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
    if (!snippet) return "";
    if (snippet.length > 300) {
      return snippet.substring(0, 300) + "...";
    }
    return snippet;
  }

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
        updateResultsDisplay(trackingResults);
        // Switch to results tab
        tabs.forEach((t) => t.classList.remove("active"));
        tabs[2].classList.add("active");
        tabContents.forEach((c) => c.classList.remove("active"));
        tabContents[2].classList.add("active");
        break;

      case "unimplementedRequirements":
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
                <span class="implementation-status status-unlikely-match">Match not found</span>
              </div>
            `;
            unimplementedList.appendChild(item);
          });
          requirementsResults.appendChild(unimplementedList);
        }

        // Switch to results tab
        tabs.forEach((t) => t.classList.remove("active"));
        tabs[2].classList.add("active");
        tabContents.forEach((c) => c.classList.remove("active"));
        tabContents[2].classList.add("active");
        break;

      case "setLoading":
        loadingElement.style.display = message.isLoading ? "flex" : "none";
        break;

      case "error":
        alert(message.message);
        break;
    }
  });
})();
