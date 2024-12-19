//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
  // @ts-ignore
  const vscode = acquireVsCodeApi();

  const oldState = vscode.getState() || { table: [] };

  /** @type {Array<{ value: string }>} */
  let table = oldState.table;

  const confirmationButton = document.getElementById(
    "requirements-confirmation-button",
  );
  if (confirmationButton) {
    confirmationButton.addEventListener("click", () => {
      console.log("Button clicked");
      parseFile();
    });
  }

  // Handle messages sent from the extension to the webview
  window.addEventListener("message", (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.type) {
      case "parseFile": {
        parseFile();
        break;
      }
    }
  });

  /**
   * @param {string} message
   */
  function log(message) {
    vscode.postMessage({
      type: "log",
      message: message,
    });
  }

  function parseFile() {
    const file = document.getElementById("requirements-file-input");
    if (!file) {
      log("File input not found");
      return;
    }

    const csvFile = /** @type {HTMLInputElement} */ (file).files
      ? /** @type {HTMLInputElement} */ (file).files[0]
      : null;

    if (!csvFile) {
      log("No file selected");
      return;
    }
    if (!(csvFile.name.endsWith(".csv") || csvFile.name.endsWith(".reqif"))) {
      log("Please select a .csv or a .reqif file");
      return;
    }

    const inputElement = /** @type {HTMLInputElement} */ (document.getElementById("delimiter-input"));
    const delimiter = inputElement ? inputElement.value : ",";
    if (!delimiter) {
      log("Delimiter not specified");
      return;
    }

    const tableElement = document.getElementById("requirements-table");
    if (!tableElement) {
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      const content = reader.result;
      if (typeof content === "string") {
        const rows = content.split("\n");
        const header = rows[0];
        const headerRow = document.createElement("tr");
        header.split(delimiter).forEach((cell) => {
          const cellElement = document.createElement("th");
          cellElement.textContent = cell;
          headerRow.appendChild(cellElement);
        });
        tableElement.appendChild(headerRow);

        const contentRows = rows.slice(1);
        contentRows.forEach((row) => {
          const rowElement = document.createElement("tr");
          row.split(delimiter).forEach((cell) => {
            const cellElement = document.createElement("td");
            cellElement.textContent = cell.trim();
            rowElement.appendChild(cellElement);
          });
          tableElement.appendChild(rowElement);
        });
      } else {
        log("Failed to read file");
      }

      vscode.setState({ table: tableElement });
    };

    reader.readAsText(csvFile);
  }
})();