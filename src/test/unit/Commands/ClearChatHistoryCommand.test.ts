import {jest, expect} from "@jest/globals";
import {ClearChatHistoryCommand} from "../../../Commands/ClearChatHistoryCommand";
import {ChatService} from "../../../Services/ChatService";
import {window} from "../Mock/vscode";

describe("ClearChatHistoryCommand", () => {

  let clearChatHistoryCommand: ClearChatHistoryCommand;
  let mockChatService: ChatService;

  beforeEach(() => {
    jest.clearAllMocks();

    mockChatService = {
      clearMessages: jest.fn<() => Promise<void>>().mockResolvedValue(undefined)
    } as unknown as ChatService;

    clearChatHistoryCommand = new ClearChatHistoryCommand(mockChatService);
  });

  it('should return correct command name', () => {
    expect(clearChatHistoryCommand.getName()).toBe('requirementsTracker.clearChatHistory');
  });

  it('should call clearMessages on the ChatService when executed', async () => {
    await clearChatHistoryCommand.execute();

    expect(mockChatService.clearMessages).toHaveBeenCalledTimes(1);
  });

  it('should show information message after clearing chat history', async () => {
    await clearChatHistoryCommand.execute();

    expect(window.showInformationMessage).toHaveBeenCalledWith('Chat history cleared');
  });

  it('should show information message only after chat service completes', async () => {
    // Create a chat service with a delayed clearMessages function
    const delayedPromise = new Promise<void>(resolve => setTimeout(resolve, 10));
    const chatServiceWithDelay = {
      clearMessages: jest.fn().mockReturnValue(delayedPromise)
    } as unknown as ChatService;

    const commandWithDelay = new ClearChatHistoryCommand(chatServiceWithDelay);
    const executionPromise = commandWithDelay.execute();

    expect(chatServiceWithDelay.clearMessages).toHaveBeenCalledTimes(1);
    expect(window.showInformationMessage).not.toHaveBeenCalled();

    // Now await the execution to complete
    await executionPromise;
    expect(window.showInformationMessage).toHaveBeenCalledWith('Chat history cleared');
  });

  it('should propagate errors from ChatService', async () => {
    // Create a chat service that throws an error
    const error = new Error('Failed to clear messages');
    const errorChatService = {
      clearMessages: jest.fn<() => Promise<void>>().mockRejectedValue(error)
    } as unknown as ChatService;

    const errorCommand = new ClearChatHistoryCommand(errorChatService);

    await expect(errorCommand.execute()).rejects.toThrow('Failed to clear messages');
    expect(window.showInformationMessage).not.toHaveBeenCalled();
  });
});