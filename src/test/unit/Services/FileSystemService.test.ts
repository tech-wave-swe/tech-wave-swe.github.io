import {expect, jest} from '@jest/globals';
import fs from 'fs';
import path from 'path';
import FileSystemService from "../../../Services/FileSystemService";

// Mock the fs module
jest.mock('fs');

describe('FileSystemService', () => {
  const mockRootFolder = '/mock/root/folder';
  const mockFilePath = 'test.txt';
  const mockFullPath = path.resolve(mockRootFolder, mockFilePath);

  describe('read method', () => {
    it('should read file successfully', () => {
      // Arrange
      const mockFileContent = 'Hello, World!';

      // Mock fs.readFileSync to return mock content
      (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

      // Act
      const fileSystemService = new FileSystemService(mockRootFolder);
      const result = fileSystemService.read(mockFilePath);

      // Assert
      expect(result).toBe(mockFileContent);
      expect(fs.readFileSync).toHaveBeenCalledWith(mockFullPath, 'utf-8');
    });

    it('should throw an error when file reading fails', () => {
      // Arrange
      const mockError = new Error('File not found');

      // Mock fs.readFileSync to throw an error
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw mockError;
      });

      // Act & Assert
      const fileSystemService = new FileSystemService(mockRootFolder);
      expect(() => fileSystemService.read(mockFilePath)).toThrow(
        `Error reading file ${mockFullPath}: ${mockError}`
      );
    });
  });
});