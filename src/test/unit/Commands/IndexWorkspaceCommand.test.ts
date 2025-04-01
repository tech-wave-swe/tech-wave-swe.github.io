import {jest, expect} from '@jest/globals';
import {IndexWorkspaceCommand} from "../../../Commands/IndexWorkspaceCommand";
import {DocumentServiceFacade} from "../../../Facades/DocumentServiceFacade";
import {window, ProgressLocation} from "../Mock/vscode";
import vscode from "vscode";

describe('IndexWorkspaceCommand', () => {

  let indexWorkspaceCommand: IndexWorkspaceCommand;
  let mockDocumentService: jest.Mocked<DocumentServiceFacade>;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  let mockWithProgressCallback: Function;

  beforeEach(() => {
    jest.clearAllMocks();

    mockDocumentService = {
      getWorkspacePath: jest.fn().mockReturnValue("path/to/workspace"),
      processWorkspaceFiles: jest.fn(),
    } as unknown as jest.Mocked<DocumentServiceFacade>;

    (vscode.window.withProgress as jest.Mock).mockImplementationOnce(
      (options, callback) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        mockWithProgressCallback = callback as Function;
        return Promise.resolve();
      }
    );

    indexWorkspaceCommand = new IndexWorkspaceCommand(mockDocumentService);
  });

  it('should return correct command name', () => {
    expect(indexWorkspaceCommand.getName()).toBe('requirementsTracker.indexWorkspace');
  });

  it('should call withProgress with correct options', async () => {
    await indexWorkspaceCommand.execute();

    expect(window.withProgress).toHaveBeenCalledWith(
      {
        location: ProgressLocation.Notification,
        title: 'Indexing workspace files',
        cancellable: true,
      },
      expect.any(Function)
    );
  });

  it('should process workspace files when executed', async () => {
    await indexWorkspaceCommand.execute();
    await mockWithProgressCallback();

    expect(mockDocumentService.processWorkspaceFiles).toHaveBeenCalled();
  });

  it('should show information message on successful indexing', async () => {
    await indexWorkspaceCommand.execute();
    await mockWithProgressCallback();

    expect(window.showInformationMessage).toHaveBeenCalledWith(
      'Successfully indexed workspace files'
    );
  });

  it('should show error message when document service fails', async () => {
    const error = new Error('Processing failed');
    mockDocumentService.processWorkspaceFiles.mockRejectedValue(error);

    await indexWorkspaceCommand.execute();
    await mockWithProgressCallback();

    expect(window.showErrorMessage).toHaveBeenCalledWith(
      'Failed to index workspace: Error: Processing failed'
    );
    expect(window.showInformationMessage).not.toHaveBeenCalled();
  });
});