import { jest } from "@jest/globals";

// __mocks__/vscode.ts
export const workspace = {
  getConfiguration: jest.fn().mockReturnValue({
    get: jest.fn(),
    update: jest.fn(),
    inspect: jest.fn(),
  }),
  // Add other mocked methods as needed
};

export const window = {
  withProgress: jest.fn(),
  showInformationMessage: jest.fn(),
  showWarningMessage: jest.fn(),
};

export const ProgressLocation = { Notification: 15 };

export const Uri = {
  file: jest.fn(),
  // Add other mocked methods as needed
};

// Add other VSCode modules you use
export default {
  workspace,
  window,
  Uri
};