// import {expect, jest} from "@jest/globals";
// import {GlobalStateService, StateKeys} from "../../../Services/GlobalStateService";
// import {ChatMessage} from "../../../Models/ChatMessage";
// import {Requirement} from "../../../Models/Requirement";
//
// import * as vscode from "vscode";
//
// describe('GlobalStateService', () => {
//   let globalStateService: GlobalStateService;
//
//   beforeEach(() => {
//     // Create a fresh mock global state for each test
//
//     const defaultConfig: vscode.ExtensionContext["globalState"] = {
//       get: jest.fn<(key: string, defaultValue?: any) => any>(),
//       keys: jest.fn<() => readonly string[]>(),
//       setKeysForSync: jest.fn<(keys: readonly string[]) => void>(),
//       update: jest.fn<(key: string, value: any) => Thenable<void>>(),
//     };
//
//     globalStateService = new GlobalStateService(defaultConfig);
//   });
//
//   describe('updateState', () => {
//     it('should update state with chat messages', async () => {
//       const chatMessages: ChatMessage[] = [
//         {sender: 'user', text: 'Hello'},
//         {sender: 'model', text: 'Hi there'}
//       ];
//
//       await globalStateService.updateState(StateKeys.CHAT_MESSAGES, chatMessages);
//
//       expect(mockGlobalState.update).toHaveBeenCalledWith(
//         StateKeys.CHAT_MESSAGES,
//         chatMessages
//       );
//     });
//
//     it('should update state with requirements', async () => {
//       const requirements: Requirement[] = [
//         {id: '1', description: 'Requirement 1'},
//         {id: '2', description: 'Requirement 2'}
//       ];
//
//       await globalStateService.updateState(StateKeys.REQUIREMENTS, requirements);
//
//       expect(mockGlobalState.update).toHaveBeenCalledWith(
//         StateKeys.REQUIREMENTS,
//         requirements
//       );
//     });
//   });
//
//   describe('getState', () => {
//     it('should return chat messages from global state', () => {
//       const chatMessages: ChatMessage[] = [
//         {role: 'user', content: 'Hello'}
//       ];
//
//       // Mock the get method to return predefined chat messages
//       mockGlobalState.get.mockReturnValue(chatMessages);
//
//       const result = globalStateService.getState(StateKeys.CHAT_MESSAGES);
//
//       expect(result).toEqual(chatMessages);
//       expect(mockGlobalState.get).toHaveBeenCalledWith(
//         StateKeys.CHAT_MESSAGES,
//         []
//       );
//     });
//
//     it('should return empty array if no state exists', () => {
//       // Mock the get method to return undefined
//       mockGlobalState.get.mockReturnValue([]);
//
//       const result = globalStateService.getState(StateKeys.REQUIREMENTS);
//
//       expect(result).toEqual([]);
//       expect(mockGlobalState.get).toHaveBeenCalledWith(
//         StateKeys.REQUIREMENTS,
//         []
//       );
//     });
//   });
//
//   describe('clearState', () => {
//     it('should clear state to empty array by default', async () => {
//       await globalStateService.clearState(StateKeys.CHAT_MESSAGES);
//
//       expect(mockGlobalState.update).toHaveBeenCalledWith(
//         StateKeys.CHAT_MESSAGES,
//         []
//       );
//     });
//
//     it('should clear state with custom reset value', async () => {
//       const resetValue: Requirement[] = [
//         {id: 'reset', description: 'Reset requirement'}
//       ];
//
//       await globalStateService.clearState(
//         StateKeys.REQUIREMENTS,
//         resetValue
//       );
//
//       expect(mockGlobalState.update).toHaveBeenCalledWith(
//         StateKeys.REQUIREMENTS,
//         resetValue
//       );
//     });
//   });
// });