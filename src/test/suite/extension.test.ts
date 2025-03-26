import * as assert from "assert";
import * as vscode from "vscode";

describe("Extension Test", () => {
  it("should activate the extension", async () => {
    const extension = vscode.extensions.getExtension(
      "tech-wave-swe.requirements-tracker",
    );
    assert.ok(extension);

    await extension.activate();

    const commands = await vscode.commands.getCommands();
    assert.ok(commands.includes("requirementsTracker.indexCurrentFile")); // Find a better way to test this
  });
});
