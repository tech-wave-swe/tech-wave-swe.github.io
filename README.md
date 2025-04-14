# Documentazione TechWave

[![Main Coverage Status](https://coveralls.io/repos/github/tech-wave-swe/tech-wave-swe.github.io/badge.svg?branch=main)](https://coveralls.io/github/tech-wave-swe/tech-wave-swe.github.io?branch=main)
[![Develop Coverage Status](https://coveralls.io/repos/github/tech-wave-swe/tech-wave-swe.github.io/badge.svg?branch=develop)](https://coveralls.io/github/tech-wave-swe/tech-wave-swe.github.io?branch=develop)

Questa repository contiene tutta la documentazione prodotta durante lo sviluppo del progetto di Ingegneria del Software (SWE) dal gruppo 5 TechWave.

La documentazione è situata nella cartella docs, insieme ai file di configurazione per Docusaurus

A sua volta, la sottocartella docs contiene 3 cartelle per i documenti principali:
-   **Candidature**: Contiene tutti i documenti compilati presentati per la cadidatura.
-   **RTB**: Contiene tutti i documenti compilati presentati per la _Requirements & Technologies Baseline_
-   **PB**: Contiene tutti i documenti compilati presentati per la _Product Baseline_

## How to run

Requisiti:
- Node.js
- TypeScript compiler (tsc)
- Visual Studio Code

### Steps

1) Clonare questa repo localmente

2) Eseguire il seguente comando
   ```bash
   npm install
   ```
3) Premere F5 o andare sulla sezione "Run and Debug" ed eseguire la task "Run Extension"


create tests to cover only the las tlines where is used queryselector on tags "confirm-req-action" "delete-req-action" "edit-req-action" and "analysis-code-snippet", and the event listeners are added, also can we test is similaryl to this?

    it("should properly attach importFormatSelect event listener that calls the correct handlers", () => {
      // Attach event listeners
      helperFunctions.attachImportEventListeners();

      // Trigger click events on the tabs to ensure the attached listeners are called
      const tabImport = document.getElementById("import-format");

      // Simulate clicking on import tab
      tabImport?.dispatchEvent(new Event("change"));
      const csvOptions = document.getElementById("csv-options");

      expect(csvOptions?.style.display).toBe("block");
    });


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
  Eif (confirmReqAction) {
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
  Eif (deleteReqAction) {
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
  Eif (editReqAction) {
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
  Iif (analysisCodeSnippet) {
    analysisCodeSnippet.appendChild(refItem);
  }
