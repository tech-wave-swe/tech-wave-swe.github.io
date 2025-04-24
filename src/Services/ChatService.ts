import {ChatMessage} from "../Models/ChatMessage";
import {GlobalStateService, StateKeys} from "./GlobalStateService";

export class ChatService {
  private _globalStateService: GlobalStateService;

  constructor(globalStateService: GlobalStateService) {
    this._globalStateService = globalStateService;
  }

  public async addMessage(message: ChatMessage): Promise<void> {
    const messages = await this.getMessages();
    messages.push(message);

    await this.saveMessages(messages);
  }

  public async saveMessages(messages: ChatMessage[]): Promise<void> {
    await this._globalStateService.updateState(StateKeys.CHAT_MESSAGES, messages);
  }

  public async getMessages(): Promise<ChatMessage[]> {
    return this._globalStateService.getState(StateKeys.CHAT_MESSAGES) as ChatMessage[];
  }

  public async clearMessages(): Promise<void> {
    await this._globalStateService.clearState(StateKeys.CHAT_MESSAGES);
  }
}
