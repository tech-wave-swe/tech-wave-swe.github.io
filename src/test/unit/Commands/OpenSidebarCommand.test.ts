import { expect } from "@jest/globals";
import { OpenSidebarCommand } from "../../../Commands/OpenSidebarCommand";
import { commands } from "../Mock/vscode";

describe("OpenSidebarCommand", () => {
  const openSidebarCommand: OpenSidebarCommand = new OpenSidebarCommand();

  it("should return the command name", () => {
    expect(openSidebarCommand.getName()).toBe(
      "requirementsTracker.openSidebar",
    );
  });

  it("should execute the command and open the sidebar", async () => {
    await openSidebarCommand.execute();

    expect(commands.executeCommand).toHaveBeenCalledWith(
      "workbench.view.extension.requirementsTracker",
    );
  });
});
