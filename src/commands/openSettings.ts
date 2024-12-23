import * as vscode from "vscode";

export async function openSettings() {
  vscode.commands.executeCommand(
    "workbench.action.openSettings",
    "@ext:tech-wave-swe.requirements-tracker",
  );
}