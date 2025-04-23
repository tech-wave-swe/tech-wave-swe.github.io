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
      try {
        // Try to remove with retries on Windows
        if (process.platform === 'win32') {
          this.removeWithRetries(this.workspacePath);
        } else {
          // Original behavior for non-Windows
          fs.rmSync(this.workspacePath, { recursive: true, force: true });
        }
      } catch (err: any) {
        console.warn(`Warning: Could not completely clean up ${this.workspacePath}: ${err.message}`);
      }
    }
  }

  removeWithRetries(dirPath: string, maxRetries = 5) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        fs.rmSync(dirPath, { recursive: true, force: true });
        return;
      } catch (err) {
        if (attempt === maxRetries - 1) {
          throw err; // Rethrow on last attempt
        }

        // Exponential backoff
        const delay = 100 * Math.pow(2, attempt);

        // Synchronous sleep
        const start = Date.now();
        while (Date.now() - start < delay) {
          // Empty busy wait
        }
      }
    }
  }

  get path() {
    return this.workspacePath;
  }
}
