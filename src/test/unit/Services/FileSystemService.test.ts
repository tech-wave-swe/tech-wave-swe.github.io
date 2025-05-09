import { expect, jest } from "@jest/globals";
import fs from "fs";
import path from "path";
import FileSystemService from "../../../Services/FileSystemService";

// Mock the fs module
jest.mock("fs");

describe("FileSystemService", () => {
  const mockRootFolder = "/mock/root/folder";
  const mockFilePath = "test.txt";
  const mockFullPath = path.resolve(mockRootFolder, mockFilePath);

  const fileSystemService: FileSystemService = new FileSystemService(
    mockRootFolder,
  );

  describe("FileSystemService", () => {
    it("should read file successfully", () => {
      const mockFileContent = "Hello, World!";

      // Mock fs.readFileSync to return mock content
      (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

      const result = fileSystemService.read(mockFilePath);

      expect(result).toBe(mockFileContent);
      expect(fs.readFileSync).toHaveBeenCalledWith(mockFullPath, "utf-8");
    });

    it("should throw an error when file reading fails", () => {
      const mockError = new Error("File not found");

      // Mock fs.readFileSync to throw an error
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw mockError;
      });

      expect(() => fileSystemService.read(mockFilePath)).toThrow(
        `Error reading file ${mockFullPath}: ${mockError}`,
      );
    });

    it("should throw an error when root folder is not set", () => {
      fileSystemService.setRootFolder("");
      expect(() => fileSystemService.read(mockFilePath)).toThrow(
        "Root folder is not set."
      );
    });

    it("should update root folder when setRootFolder is called", () => {
      const newRootFolder = "/new/root/folder";
      const testFilePath = "test.txt";
      const newFullPath = path.resolve(newRootFolder, testFilePath);
      const mockContent = "New content";

      fileSystemService.setRootFolder(newRootFolder);
      (fs.readFileSync as jest.Mock).mockReturnValue(mockContent);

      const result = fileSystemService.read(testFilePath);

      expect(result).toBe(mockContent);
      expect(fs.readFileSync).toHaveBeenCalledWith(newFullPath, "utf-8");
    });

    it("should return correctly a checksum for a given file content", () => {
      const fileContent = "Hello, World!";
      const expectedChecksum =
        "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f";

      // Mock fs.readFileSync to return mock content
      (fs.readFileSync as jest.Mock).mockReturnValue(fileContent);

      const result = FileSystemService.getChecksum(mockFullPath);

      expect(result).toBe(expectedChecksum);
      expect(fs.readFileSync).toHaveBeenCalledWith(mockFullPath, "utf-8");
    });
  });

  it("should throw an error when checksum calculation fails", () => {
    const mockError = new Error("File not found");

    // Mock fs.readFileSync to throw an error
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    expect(() => FileSystemService.getChecksum(mockFullPath)).toThrow(
      `Error reading file ${mockFullPath}: ${mockError}`,
    );
  });
});
