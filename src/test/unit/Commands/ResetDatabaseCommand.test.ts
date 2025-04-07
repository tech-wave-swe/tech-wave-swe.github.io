import { jest, expect } from "@jest/globals";
import { ResetDatabaseCommand } from "../../../Commands/ResetDatabaseCommand";
import { IVectorDatabase } from "../../../Interfaces/IVectorDatabase";
import { window } from "../Mock/vscode";

describe("ResetDatabaseCommand", () => {
  let resetDatabaseCommand: ResetDatabaseCommand;
  let mockVectorDatabase: jest.Mocked<IVectorDatabase>;

  beforeEach(() => {
    mockVectorDatabase = {
      resetDatabase: jest.fn(),
    } as unknown as jest.Mocked<IVectorDatabase>;

    resetDatabaseCommand = new ResetDatabaseCommand(mockVectorDatabase);
  });

  it("should return the command name", () => {
    expect(resetDatabaseCommand.getName()).toBe(
      "requirementsTracker.resetDatabase",
    );
  });

  it("should execute the command and reset the database", async () => {
    (
      window.showWarningMessage as jest.Mock<() => Promise<string>>
    ).mockResolvedValue("Yes");
    await resetDatabaseCommand.execute();

    expect(mockVectorDatabase.resetDatabase).toHaveBeenCalled();
    expect(window.showInformationMessage).toHaveBeenCalledWith(
      "Database has been reset successfully",
    );
  });

  it("should not reset the database if user selects 'No'", async () => {
    (
      window.showWarningMessage as jest.Mock<() => Promise<string>>
    ).mockResolvedValue("No");
    await resetDatabaseCommand.execute();

    expect(mockVectorDatabase.resetDatabase).not.toHaveBeenCalled();
  });

  it("should handle errors when resetting the database", async () => {
    (
      window.showWarningMessage as jest.Mock<() => Promise<string>>
    ).mockResolvedValue("Yes");
    const errorMessage = "Test error";
    (
      mockVectorDatabase.resetDatabase as jest.Mock<() => Promise<void>>
    ).mockRejectedValue(new Error(errorMessage));

    await resetDatabaseCommand.execute();

    expect(window.showErrorMessage).toHaveBeenCalledWith(
      `Failed to reset database: Error: ${errorMessage}`,
    );
  });
});
