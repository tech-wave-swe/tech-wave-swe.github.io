import * as assert from "assert";
import * as vscode from "vscode";
import { TestWorkspace } from "../testWorkspace";

suite("Extension Initialization Tests", () => {
  let workspace: TestWorkspace;

  suiteSetup(async () => {
    workspace = new TestWorkspace();
    await workspace.setup();

    const extension = vscode.extensions.getExtension(
      "tech-wave-swe.requirements-tracker",
    );
    await extension?.activate();
  });

  test("Extension should be present and activated", async () => {
    const extension = vscode.extensions.getExtension(
      "tech-wave-swe.requirements-tracker",
    );
    assert.ok(extension, "Extension should be present");
    assert.strictEqual(extension?.isActive, true, "Extension should be active");
  });

  test("Commands should be registered", async () => {
    const expectedCommands = [
      "requirementsTracker.clearChatHistory",
      "requirementsTracker.clearRequirementsHistory",
      "requirementsTracker.resetDatabase",
      "requirementsTracker.interrogateSelection",
      "requirementsTracker.interrogateDocument",
      "requirementsTracker.openSettings",
      "requirementsTracker.openSidebar",
    ];

    const allCommands = await vscode.commands.getCommands(true);

    for (const cmd of expectedCommands) {
      assert.ok(
        allCommands.includes(cmd),
        `Command "${cmd}" should be registered`,
      );
    }
  });

  test("Webview providers should be registered", async () => {
    try {
      await vscode.commands.executeCommand(
        "requirementsTracker.chatView.focus",
      );

      await vscode.commands.executeCommand(
        "requirementsTracker.trackerView.focus",
      );

      assert.ok(true, "Webview providers are properly registered");
    } catch (error) {
      assert.fail(`Webview providers should be registered: ${error}`);
    }
  });

  test("Configuration service should be initialized", () => {
    const extension = vscode.extensions.getExtension(
      "tech-wave-swe.requirements-tracker",
    );
    const api = extension?.exports;

    assert.ok(api?.getContext, "Extension API should expose context");
    assert.ok(api?.getContext(), "Context should be available through API");
  });

  test("Event handlers should be registered", async () => {
    const extension = vscode.extensions.getExtension(
      "tech-wave-swe.requirements-tracker",
    );
    const api = extension?.exports;
    const context = api?.getContext();

    assert.ok(
      context?.subscriptions.length > 0,
      "Event handlers should be registered in subscriptions",
    );
  });

  test("System services should be properly initialized", async () => {
    try {
      await vscode.commands.executeCommand("requirementsTracker.openSidebar");
      assert.ok(true, "System services are properly initialized");
    } catch (error) {
      assert.fail(`System services should be initialized: ${error}`);
    }
  });

  suiteTeardown(() => {
    workspace.cleanup();
  });
});
