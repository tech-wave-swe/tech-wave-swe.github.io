let vscode;
let temporarySelection = null;
let currentEditingReference = {
  id: null,
  cr: {}
};

document.addEventListener("DOMContentLoaded", function (e) {
  vscode = acquireVsCodeApi();

  setInitialState();
  handleEvents();
});

function setInitialState() {

}

function handleEvents() {
  const confirmButton = document.getElementById("confirm-edit");
  const cancelButton = document.getElementById("cancel-edit");

  confirmButton.addEventListener("click", (e) => confirmEdit());
  cancelButton.addEventListener("click", (e) => cancelEdit());

  window.addEventListener("message", (event) => {
    const message = event.data;

    switch (message.type) {
      case "selectionChanged":
        onSelectionChange(message);
        break;
    }
  });
}

function confirmEdit() {
  if (temporarySelection) return;

  // Mostra dialogo di conferma
  const confirmDialog = document.createElement("div");
  confirmDialog.className = "confirm-dialog";
  confirmDialog.innerHTML = `
      <div class="confirm-dialog-content">
        <h3>Conferma Modifica</h3>
        <p>Sei sicuro di voler cambiare il puntatore?</p>
        <p>Da: ${currentEditingReference.cr.originalPath}:${currentEditingReference.cr.originalLine}</p>
        <p>A: ${temporarySelection.cr.filePath}:${temporarySelection.cr.startLine}` +
    (temporarySelection.cr.startLine !== temporarySelection.cr.endLine ? `-${temporarySelection.cr.endLine}` : "") + `</p>
        <div class="confirm-dialog-actions">
          <button id="confirm-save" class="action-button confirm">Conferma</button>
          <button id="cancel-save" class="action-button cancel">Annulla</button>
        </div>
      </div>
    `;

  document.body.appendChild(confirmDialog);

  document.getElementById("confirm-save").addEventListener("click", () => {
    // Invia il messaggio a VS Code per salvare il nuovo puntatore
    this.vscode.postMessage({
      type: "saveEditedReference",
      requirementId: currentEditingReference.id,
      codeReference: currentEditingReference.cr,
    });

    confirmDialog.remove();
    this.exitEditMode();
  });

  document.getElementById("cancel-save").addEventListener("click", () => {
    confirmDialog.remove();
  });
}

function cancelEdit() {

}

function onSelectionChange(message) {
  const temporarySelection = {
    filePath: message.filePath,
    startLine: message.startLine,
    endLine: message.endLine
  };

  updateSelectionUI(temporarySelection);
}

function updateSelectionUI(selection) {
  const selectionElement = document.getElementById("current-selection");
  const confirmButton = document.getElementById("confirm-edit");

  if (selection) {
    selectionElement.textContent = `${selection.filePath}:${selection.startLine}` +
      (selection.startLine !== selection.endLine ? `-${selection.endLine}` : "");
    confirmButton.disabled = false;
  } else {
    selectionElement.textContent = "Nessuna selezione";
    confirmButton.disabled = true;
  }
}
