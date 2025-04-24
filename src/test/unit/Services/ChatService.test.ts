import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { ChatService } from "../../../Services/ChatService";
import {
  GlobalStateService,
  StateKeys,
} from "../../../Services/GlobalStateService";
import { ChatMessage } from "../../../Models/ChatMessage";

describe("ChatService", () => {
  let globalStateService: jest.Mocked<GlobalStateService>;
  let chatService: ChatService;

  beforeEach(() => {
    // Create mock GlobalStateService
    globalStateService = {
      updateState: jest.fn(),
      getState: jest.fn(),
      clearState: jest.fn(),
    } as unknown as jest.Mocked<GlobalStateService>;

    // Create ChatService instance with mocked GlobalStateService
    chatService = new ChatService(globalStateService);
  });

  it("should add a new message", async () => {
    // Mock existing messages
    globalStateService.getState.mockImplementation(() => {
      return [{ sender: "user", text: "Hello", timestamp: 1 }] as ChatMessage[];
    });

    const newMessage: ChatMessage = {
      sender: "model",
      text: "Hello",
      timestamp: 1,
    };

    await chatService.addMessage(newMessage);

    expect(globalStateService.getState).toHaveBeenCalledWith(
      StateKeys.CHAT_MESSAGES,
    );

    expect(globalStateService.updateState).toHaveBeenCalledWith(
      StateKeys.CHAT_MESSAGES,
      [...[{ sender: "user", text: "Hello", timestamp: 1 }], newMessage],
    );
  });

  it("should clear messages", async () => {
    await chatService.clearMessages();

    expect(globalStateService.clearState).toHaveBeenCalledWith(
      StateKeys.CHAT_MESSAGES,
    );
  });
});
