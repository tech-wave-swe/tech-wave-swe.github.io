import { jest } from "@jest/globals";
import vscode from "vscode";

// __mocks__/vscode.ts
export const workspace = {
  getConfiguration: jest.fn().mockReturnValue({
    get: jest.fn(),
    update: jest.fn(),
    inspect: jest.fn(),
  }),
  openTextDocument: jest.fn<(uri: vscode.Uri) => Thenable<vscode.TextDocument>>(),

};

export const window = {
  withProgress: jest.fn(),
  showInformationMessage: jest.fn(),
  showWarningMessage: jest.fn(),
  showErrorMessage: jest.fn(),
  showTextDocument: jest.fn(),
};

export const ProgressLocation = { Notification: 15 };

export const Uri = {
  file: jest.fn(),
  // Add other mocked methods as needed
};

export const Position = jest.fn();

export const Selection = jest.fn();

export const Range = jest.fn();

// Add other VSCode modules you use
export default {
  workspace,
  window,
  Uri,
  Position,
  Selection,
  Range,
};