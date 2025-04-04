import {jest, expect} from "@jest/globals";
import {window} from "../Mock/vscode";
import {IndexCurrentFileCommand} from "../../../Commands/IndexCurrentFileCommand";
import {DocumentServiceFacade} from "../../../Facades/DocumentServiceFacade";
import path from "path";

// Mock path module
jest.mock('path', () => ({
  basename: jest.fn((filePath: string) => filePath.split('/').pop())
}));

describe("IndexCurrent", () => {

  let indexCurrentFileCommand: IndexCurrentFileCommand;
  let mockDocumentService: jest.Mocked<DocumentServiceFacade>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockDocumentService = {
      getCurrentFilePath: jest.fn().mockReturnValue("path/to/current/file"),
      processDocument: jest.fn(),
    } as unknown as jest.Mocked<DocumentServiceFacade>;

    indexCurrentFileCommand = new IndexCurrentFileCommand(mockDocumentService);
  });

  it('should return correct command name', () => {
    expect(indexCurrentFileCommand.getName()).toBe('requirementsTracker.indexCurrentFile');
  });

  it('should show warning when no active editor exists', async () => {
    // Ensure no active editor
    (window as any).activeTextEditor = undefined;

    await indexCurrentFileCommand.execute();

    // Verify warning message is shown
    expect(window.showWarningMessage).toHaveBeenCalledWith('No active editor to index');

    // Verify document service is not called
    expect(mockDocumentService.processDocument).not.toHaveBeenCalled();
  });

  it('should process document when active editor exists', async () => {
    // Mock active editor
    const mockDocument = {
      getText: jest.fn().mockReturnValue('file content'),
      fileName: '/path/to/testfile.ts'
    };

    (window as any).activeTextEditor = {
      document: mockDocument
    };

    await indexCurrentFileCommand.execute();

    // Verify document service is called with correct parameters
    expect(mockDocumentService.processDocument).toHaveBeenCalledWith(
      'file content',
      '/path/to/testfile.ts'
    );

    // Verify success message
    expect(window.showInformationMessage).toHaveBeenCalledWith(
      'Successfully indexed testfile.ts'
    );

    // Verify path.basename was called
    expect(path.basename).toHaveBeenCalledWith('/path/to/testfile.ts');
  });

  it('should show error message when document processing fails', async () => {
    // Mock active editor
    const mockDocument = {
      getText: jest.fn().mockReturnValue('file content'),
      fileName: '/path/to/testfile.ts'
    };

    (window as any).activeTextEditor = {
      document: mockDocument
    };

    // Make document service throw an error
    const error = new Error('Processing failed');
    mockDocumentService.processDocument.mockRejectedValue(error);

    await indexCurrentFileCommand.execute();

    // Verify error message
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      'Failed to index file: Error: Processing failed'
    );

    // Verify success message was not shown
    expect(window.showInformationMessage).not.toHaveBeenCalled();
  });
});