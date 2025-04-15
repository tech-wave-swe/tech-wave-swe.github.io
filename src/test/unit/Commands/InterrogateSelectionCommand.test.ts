import { jest, expect } from "@jest/globals";
import { InterrogateSelectionCommand } from "../../../Commands/InterrogateSelectionCommand";
import { ChatWebviewProvider } from "../../../Providers/ChatWebviewProvider";
import { RequirementsService } from "../../../Services/RequirementsService";
import { window, commands } from "../Mock/vscode";

describe("InterrogateSelectionCommand", () => {
  const chatWebviewProvider: jest.Mocked<ChatWebviewProvider> = {
    _handleMessageFromWebview: jest.fn(),
  } as unknown as jest.Mocked<ChatWebviewProvider>;

  const requirementsService: jest.Mocked<RequirementsService> = {
    getRequirements: jest.fn(),
  } as unknown as jest.Mocked<RequirementsService>;

  const interrogateSelectionCommand: InterrogateSelectionCommand =
    new InterrogateSelectionCommand(chatWebviewProvider, requirementsService);

  it("should return the command name", () => {
    expect(interrogateSelectionCommand.getName()).toBe(
      "requirementsTracker.interrogateSelection",
    );
  });

  it("should execute the command and handle no requirements loaded", async () => {
    (requirementsService.getRequirements as jest.Mock).mockReturnValue([]);

    await interrogateSelectionCommand.execute();

    expect(commands.executeCommand).toHaveBeenCalledWith(
      "requirementsTracker.trackerView.focus",
    );
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      "Please load requirements file first in the Requirements Tracker view.",
    );
  });

  it("should execute the command and handle no active editor", async () => {
    (requirementsService.getRequirements as jest.Mock).mockReturnValue([
      { id: "1", text: "Requirement 1" },
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.activeTextEditor as any) = null;

    await interrogateSelectionCommand.execute();

    expect(window.showErrorMessage).toHaveBeenCalledWith(
      "No active editor found.",
    );
  });

  it("should execute the command and handle no text selected", async () => {
    (requirementsService.getRequirements as jest.Mock).mockReturnValue([
      { id: "1", text: "Requirement 1" },
    ]);

    const mockEditor = {
      selection: {},
      document: {
        getText: jest.fn(() => ""),
      },
    };

    (window.activeTextEditor as unknown) = mockEditor;

    await interrogateSelectionCommand.execute();

    expect(window.showErrorMessage).toHaveBeenCalledWith("No text selected.");
  });

  it("should execute the command and send message to chat view", async () => {
    (requirementsService.getRequirements as jest.Mock).mockReturnValue([
      { id: "1", text: "Requirement 1" },
    ]);

    const mockEditor = {
      selection: {},
      document: {
        getText: jest.fn(() => "selected text"),
      },
    };

    (window.activeTextEditor as unknown) = mockEditor;

    await interrogateSelectionCommand.execute();

    expect(commands.executeCommand).toHaveBeenCalledWith(
      "requirementsTracker.chatView.focus",
    );

    expect(
      chatWebviewProvider["_handleMessageFromWebview"],
    ).toHaveBeenCalledWith({
      type: "sendMessage",
      text: `Analyze the following code and provide insights based on the loaded requirements:\n\nCode:\nselected text\nRequirements:\n${{ id: "1", text: "Requirement 1" }}\n`,
    });
  });
});
