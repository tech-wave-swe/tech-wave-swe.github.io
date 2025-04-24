import * as assert from "assert";
import * as vscode from "vscode";
import * as sinon from "sinon";
import { TestWorkspace } from "../testWorkspace";
import {
  GlobalStateService,
  StateKeys,
} from "../../Services/GlobalStateService";
import { ResetDatabaseCommand } from "../../Commands/ResetDatabaseCommand";
import { InterrogateSelectionCommand } from "../../Commands/InterrogateSelectionCommand";
import { InterrogateDocumentCommand } from "../../Commands/InterrogateDocumentCommand";
import { IVectorDatabase } from "../../Interfaces/IVectorDatabase";
import { ChatWebviewProvider } from "../../Providers/ChatWebviewProvider";
import { RequirementsService } from "../../Services/RequirementsService";
import { RequirementStatus } from "../../Models/Requirement";

suite("Commands Integration Tests", () => {
  let workspace: TestWorkspace;
  let showInformationMessageStub: sinon.SinonStub;
  let showErrorMessageStub: sinon.SinonStub;

  suiteSetup(async () => {
    workspace = new TestWorkspace();
    await workspace.setup();

    const extension = vscode.extensions.getExtension(
      "tech-wave-swe.requirements-tracker",
    );
    await extension?.activate();

    showInformationMessageStub = sinon
      .stub(vscode.window, "showInformationMessage")
      .resolves({ title: "Yes" } as vscode.MessageItem);
    showErrorMessageStub = sinon.stub(vscode.window, "showErrorMessage");
  });

  setup(() => {
    showInformationMessageStub.resetHistory();
    showErrorMessageStub.resetHistory();
  });

  test("ClearChatHistoryCommand should clear chat history", async () => {
    const extension = vscode.extensions.getExtension(
      "tech-wave-swe.requirements-tracker",
    );
    const api = extension?.exports;
    const context = api?.getContext();

    const globalStateService = new GlobalStateService(context.workspaceState);
    await globalStateService.updateState(StateKeys.CHAT_MESSAGES, [
      { sender: "user", text: "Test message", timestamp: Date.now() },
    ]);

    await vscode.commands.executeCommand(
      "requirementsTracker.clearChatHistory",
    );

    const messagesAfter = globalStateService.getState(StateKeys.CHAT_MESSAGES);
    assert.strictEqual(
      messagesAfter.length,
      0,
      "Chat history should be cleared",
    );

    assert.strictEqual(
      showInformationMessageStub.called,
      true,
      "Information message should be shown",
    );
    assert.strictEqual(
      showInformationMessageStub.firstCall.args[0],
      "Chat history cleared",
      "Correct message should be shown",
    );
  });

  test("ClearRequirementsHistoryCommand should clear requirements history", async () => {
    const extension = vscode.extensions.getExtension(
      "tech-wave-swe.requirements-tracker",
    );
    const api = extension?.exports;
    const context = api?.getContext();

    const globalStateService = new GlobalStateService(context.workspaceState);
    await globalStateService.updateState(StateKeys.REQUIREMENTS, [
      {
        id: "REQ-001",
        name: "Test Requirement",
        description: "Test",
        type: "Functional",
        version: "1.0",
        status: "Not Tracked",
      },
    ]);

    await vscode.commands.executeCommand(
      "requirementsTracker.clearRequirementsHistory",
    );

    const requirementsAfter = globalStateService.getState(
      StateKeys.REQUIREMENTS,
    );
    assert.strictEqual(
      requirementsAfter.length,
      0,
      "Requirements history should be cleared",
    );

    assert.strictEqual(
      showInformationMessageStub.called,
      true,
      "Information message should be shown",
    );
    assert.strictEqual(
      showInformationMessageStub.firstCall.args[0],
      "Requirements history cleared",
      "Correct message should be shown",
    );
  });

  test("OpenSettingsCommand should open settings", async () => {
    const executeCommandStub = sinon
      .stub(vscode.commands, "executeCommand")
      .callThrough();

    try {
      await vscode.commands.executeCommand("requirementsTracker.openSettings");

      const openSettingsCalled = executeCommandStub.calledWith(
        "workbench.action.openSettings",
        "@ext:tech-wave-swe.requirements-tracker",
      );

      assert.strictEqual(
        openSettingsCalled,
        true,
        "Settings should be opened with the correct filter",
      );
    } finally {
      executeCommandStub.restore();
    }
  });

  test("OpenSidebarCommand should open sidebar", async () => {
    const executeCommandStub = sinon
      .stub(vscode.commands, "executeCommand")
      .callThrough();

    try {
      await vscode.commands.executeCommand("requirementsTracker.openSidebar");

      const openSidebarCalled = executeCommandStub.calledWith(
        "workbench.view.extension.requirementsTracker",
      );

      assert.strictEqual(openSidebarCalled, true, "Sidebar should be opened");
    } finally {
      executeCommandStub.restore();
    }
  });

  test("ResetDatabaseCommand should prompt user and reset database when confirmed", async function () {
    const resetDatabaseSpy = sinon.spy(async () => Promise.resolve());
    const mockVectorDatabase: Partial<IVectorDatabase> = {
      resetDatabase: resetDatabaseSpy,
    };

    const resetCommand = new ResetDatabaseCommand(
      mockVectorDatabase as IVectorDatabase,
    );

    const warningMessageStub = sinon
      .stub(vscode.window, "showWarningMessage")
      .resolves("Yes" as unknown as vscode.MessageItem);

    try {
      await resetCommand.execute();

      assert.strictEqual(
        warningMessageStub.called,
        true,
        "Warning message should be shown",
      );
      assert.strictEqual(
        warningMessageStub.firstCall.args[0],
        "This will delete all indexed data. Are you sure?",
        "Correct warning message should be shown",
      );

      assert.strictEqual(
        resetDatabaseSpy.called,
        true,
        "resetDatabase should be called",
      );

      assert.strictEqual(
        showInformationMessageStub.calledWith(
          "Database has been reset successfully",
        ),
        true,
        "Success message should be shown",
      );
    } finally {
      warningMessageStub.restore();
    }
  });

  test("InterrogateSelectionCommand should validate requirements are loaded", async function () {
    const mockRequirementsService: Partial<RequirementsService> = {
      getRequirements: () => [],
    };

    const mockChatWebviewProvider: Partial<ChatWebviewProvider> = {};

    const command = new InterrogateSelectionCommand(
      mockChatWebviewProvider as ChatWebviewProvider,
      mockRequirementsService as RequirementsService,
    );

    const executeCommandStub = sinon
      .stub(vscode.commands, "executeCommand")
      .resolves();

    try {
      await command.execute();

      assert.strictEqual(
        executeCommandStub.calledWith("requirementsTracker.trackerView.focus"),
        true,
        "Should focus tracker view when no requirements",
      );

      assert.strictEqual(
        showErrorMessageStub.called,
        true,
        "Error message should be shown",
      );
      assert.strictEqual(
        showErrorMessageStub.firstCall.args[0],
        "Please load requirements file first in the Requirements Tracker view.",
        "Correct error message should be shown",
      );
    } finally {
      executeCommandStub.restore();
    }
  });

  test("InterrogateDocumentCommand should validate active editor exists", async function () {
    const mockRequirementsService: Partial<RequirementsService> = {
      getRequirements: () => [
        {
          id: "REQ-001",
          name: "Test",
          description: "Test",
          type: "",
          version: "",
          status: RequirementStatus.NOT_TRACKED,
        },
      ],
    };

    const mockChatWebviewProvider: Partial<ChatWebviewProvider> = {};

    const command = new InterrogateDocumentCommand(
      mockChatWebviewProvider as ChatWebviewProvider,
      mockRequirementsService as RequirementsService,
    );

    const originalActiveTextEditor = Object.getOwnPropertyDescriptor(
      vscode.window,
      "activeTextEditor",
    );

    try {
      Object.defineProperty(vscode.window, "activeTextEditor", {
        value: undefined,
        configurable: true,
      });

      await command.execute();

      assert.strictEqual(
        showErrorMessageStub.called,
        true,
        "Error message should be shown",
      );
      assert.strictEqual(
        showErrorMessageStub.firstCall.args[0],
        "No active editor found.",
        "Correct error message should be shown",
      );
    } finally {
      if (originalActiveTextEditor) {
        Object.defineProperty(
          vscode.window,
          "activeTextEditor",
          originalActiveTextEditor,
        );
      }
    }
  });

  suiteTeardown(() => {
    showInformationMessageStub.restore();
    showErrorMessageStub.restore();

    workspace.cleanup();
  });
});
