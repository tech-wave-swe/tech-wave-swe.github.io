import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";

export class TestWorkspace {
  private workspacePath: string;

  constructor() {
    this.workspacePath = path.join(__dirname, "../../test-tmp");
  }

  async setup() {
    if (!fs.existsSync(this.workspacePath)) {
      fs.mkdirSync(this.workspacePath, { recursive: true });
    }

    vscode.workspace.updateWorkspaceFolders(0, 0, {
      uri: vscode.Uri.file(this.workspacePath),
      name: "Test Workspace",
    });
  }

  cleanup() {
    if (fs.existsSync(this.workspacePath)) {
      fs.rmSync(this.workspacePath, { recursive: true, force: true });
    }
  }

  get path() {
    return this.workspacePath;
  }
}
