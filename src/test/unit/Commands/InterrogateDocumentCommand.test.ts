import { jest, expect } from "@jest/globals";
import { InterrogateDocumentCommand } from "../../../Commands/InterrogateDocumentCommand";
import { ChatWebviewProvider } from "../../../Providers/ChatWebviewProvider";
import { RequirementsService } from "../../../Services/RequirementsService";
import { window, commands } from "../Mock/vscode";

describe("InterrogateDocumentCommand", () => {
  const chatWebviewProvider: jest.Mocked<ChatWebviewProvider> = {
    _handleMessageFromWebview: jest.fn(),
  } as unknown as jest.Mocked<ChatWebviewProvider>;

  const requirementsService: jest.Mocked<RequirementsService> = {
    getRequirements: jest.fn(),
  } as unknown as jest.Mocked<RequirementsService>;

  const interrogateDocumentCommand: InterrogateDocumentCommand =
    new InterrogateDocumentCommand(chatWebviewProvider, requirementsService);

  it("should return the command name", () => {
    expect(interrogateDocumentCommand.getName()).toBe(
      "requirementsTracker.interrogateDocument",
    );
  });

  it("should execute the command and handle no requirements loaded", async () => {
    (requirementsService.getRequirements as jest.Mock).mockReturnValue([]);

    await interrogateDocumentCommand.execute();

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

    await interrogateDocumentCommand.execute();

    expect(window.showErrorMessage).toHaveBeenCalledWith(
      "No active editor found.",
    );
  });

  it("should execute the command and handle no text found", async () => {
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

    await interrogateDocumentCommand.execute();

    expect(window.showErrorMessage).toHaveBeenCalledWith("No text found.");
  });

  it("should execute the command and send message to chat view", async () => {
    (requirementsService.getRequirements as jest.Mock).mockReturnValue([
      { id: "1", text: "Requirement 1" },
    ]);

    const mockEditor = {
      selection: {},
      document: {
        getText: jest.fn(() => "some text"),
      },
    };

    (window.activeTextEditor as unknown) = mockEditor;

    await interrogateDocumentCommand.execute();

    expect(commands.executeCommand).toHaveBeenCalledWith(
      "requirementsTracker.chatView.focus",
    );

    expect(
      chatWebviewProvider["_handleMessageFromWebview"],
    ).toHaveBeenCalledWith({
      type: "sendMessage",
      text: "Analyze the following code and provide insights based on the loaded requirements:\n\nsome text",
    });
  });
});
