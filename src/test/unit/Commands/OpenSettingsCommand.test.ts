import { expect } from "@jest/globals";
import { OpenSettingsCommand } from "../../../Commands/OpenSettingsCommand";
import { commands } from "../Mock/vscode";

describe("OpenSettingsCommand", () => {
  const openSettingsCommand: OpenSettingsCommand = new OpenSettingsCommand();

  it("should return the command name", () => {
    expect(openSettingsCommand.getName()).toBe(
      "requirementsTracker.openSettings",
    );
  });

  it("should execute the command and open the sidebar", async () => {
    await openSettingsCommand.execute();

    expect(commands.executeCommand).toHaveBeenCalledWith(
      "workbench.action.openSettings",
      "@ext:tech-wave-swe.requirements-tracker",
    );
  });
});
