/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, jest } from "@jest/globals";
import {
  GlobalStateService,
  StateKeys,
} from "../../../Services/GlobalStateService";
import { ChatMessage } from "../../../Models/ChatMessage";
import { Requirement } from "../../../Models/Requirement";

import * as vscode from "vscode";

describe("GlobalStateService", () => {
  let globalStateService: GlobalStateService;
  let defaultGlobalState: jest.Mocked<vscode.ExtensionContext["globalState"]>;

  beforeEach(() => {
    // Create a fresh mock global state for each test

    defaultGlobalState = {
      get: jest.fn<(key: string, defaultValue?: any) => any>(),
      keys: jest.fn<() => readonly string[]>(),
      setKeysForSync: jest.fn<(keys: readonly string[]) => void>(),
      update: jest.fn<(key: string, value: any) => Thenable<void>>(),
    };

    globalStateService = new GlobalStateService(defaultGlobalState);
  });

  describe("updateState", () => {
    it("should update state with chat messages", async () => {
      const chatMessages: ChatMessage[] = [
        { sender: "user", text: "Hello", timestamp: Date.now() },
        { sender: "model", text: "Hi there", timestamp: Date.now() },
      ];

      await globalStateService.updateState(
        StateKeys.CHAT_MESSAGES,
        chatMessages,
      );

      expect(defaultGlobalState.update).toHaveBeenCalledWith(
        StateKeys.CHAT_MESSAGES,
        chatMessages,
      );
    });

    it("should update state with requirements", async () => {
      const requirements: Requirement[] = [
        {
          id: "req1",
          name: "Requirement 1",
          description: "Requirement 1",
          type: "requirement",
          status: "implemented",
          version: "1.0.0",
        },
        {
          id: "req2",
          name: "Requirement 2",
          description: "Requirement 2",
          type: "requirement",
          status: "implemented",
          version: "1.0.0",
        },
      ];

      await globalStateService.updateState(
        StateKeys.REQUIREMENTS,
        requirements,
      );

      expect(defaultGlobalState.update).toHaveBeenCalledWith(
        StateKeys.REQUIREMENTS,
        requirements,
      );
    });
  });

  describe("getState", () => {
    it("should return chat messages from global state", () => {
      const chatMessages: ChatMessage[] = [
        { sender: "user", text: "Hello", timestamp: Date.now() },
      ];

      // Mock the get method to return predefined chat messages
      defaultGlobalState.get.mockReturnValue(chatMessages);

      const result = globalStateService.getState(StateKeys.CHAT_MESSAGES);

      expect(result).toEqual(chatMessages);
      expect(defaultGlobalState.get).toHaveBeenCalledWith(
        StateKeys.CHAT_MESSAGES,
        [],
      );
    });

    it("should return empty array if no state exists", () => {
      // Mock the get method to return undefined
      defaultGlobalState.get.mockReturnValue([]);

      const result = globalStateService.getState(StateKeys.REQUIREMENTS);

      expect(result).toEqual([]);
      expect(defaultGlobalState.get).toHaveBeenCalledWith(
        StateKeys.REQUIREMENTS,
        [],
      );
    });
  });

  describe("clearState", () => {
    it("should clear state to empty array by default", async () => {
      await globalStateService.clearState(StateKeys.CHAT_MESSAGES);

      expect(defaultGlobalState.update).toHaveBeenCalledWith(
        StateKeys.CHAT_MESSAGES,
        [],
      );
    });

    it("should clear state with custom reset value", async () => {
      const resetValue: Requirement[] = [
        {
          id: "req1",
          name: "Requirement 1",
          description: "Requirement 1",
          type: "requirement",
          status: "implemented",
          version: "1.0.0",
        },
      ];

      await globalStateService.clearState(StateKeys.REQUIREMENTS, resetValue);

      expect(defaultGlobalState.update).toHaveBeenCalledWith(
        StateKeys.REQUIREMENTS,
        resetValue,
      );
    });
  });
});
