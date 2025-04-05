/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from "@jest/globals";
import vscode from "vscode";

export const workspace = {
  getConfiguration: jest.fn().mockReturnValue({
    get: jest.fn(),
    update: jest.fn(),
    inspect: jest.fn(),
  }),
  openTextDocument:
    jest.fn<(uri: vscode.Uri) => Thenable<vscode.TextDocument>>(),
  workspaceFolders: [{ uri: { fsPath: "/test/workspace" }, name: "test" }],
  findFiles: jest.fn(),
};

export const window = {
  withProgress: jest.fn((_options, task: any) =>
    task({ report: jest.fn() }, { isCancellationRequested: false }),
  ),
  showInformationMessage: jest.fn(),
  showWarningMessage: jest.fn(),
  showErrorMessage: jest.fn(),
  showTextDocument: jest.fn(),
};

export const ProgressLocation = { Notification: 15 };
export const Uri = {
  file: jest.fn((path) => ({ fsPath: path })),
  joinPath: jest.fn(),
};
class RelativePattern {
  constructor(
    public base: any,
    public pattern: string,
  ) {}
}
export { RelativePattern };

export const commands = {
  registerCommand: jest.fn(),
};

export const Position = jest.fn();

export const Selection = jest.fn();

export const Range = jest.fn();

// Add other VSCode modules you use
export default {
  workspace,
  window,
  commands,
  Uri,
  Position,
  Selection,
  Range,
  ProgressLocation,
  RelativePattern,
};
