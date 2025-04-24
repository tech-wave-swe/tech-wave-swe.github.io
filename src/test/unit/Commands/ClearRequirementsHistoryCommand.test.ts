import { expect } from "@jest/globals";
import { ClearRequirementsHistoryCommand } from "../../../Commands/ClearRequirementsHistoryCommand";
import { RequirementsService } from "../../../Services/RequirementsService";
import { window } from "../Mock/vscode";

describe("OpenSidebarCommand", () => {
  const mockRequirementsService = {
    clearRequirements: jest.fn(),
  } as unknown as jest.Mocked<RequirementsService>;

  const clearRequirementsHistoryCommand: ClearRequirementsHistoryCommand =
    new ClearRequirementsHistoryCommand(mockRequirementsService);

  it("should return the command name", () => {
    expect(clearRequirementsHistoryCommand.getName()).toBe(
      "requirementsTracker.clearRequirementsHistory",
    );
  });

  it("should execute the command and open the sidebar", async () => {
    await clearRequirementsHistoryCommand.execute();
    expect(mockRequirementsService.clearRequirements).toHaveBeenCalled();
    expect(window.showInformationMessage).toHaveBeenCalledWith(
      "Requirements history cleared",
    );
  });
});
