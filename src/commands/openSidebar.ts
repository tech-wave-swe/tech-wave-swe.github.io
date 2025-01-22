import * as vscode from "vscode";

export async function openSidebar() {
	vscode.commands.executeCommand("workbench.view.extension.requirementsTracker");
}