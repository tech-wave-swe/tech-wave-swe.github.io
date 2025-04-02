import {jest, expect} from "@jest/globals";
import vscode from "vscode";
import FileSystemService from "../../../Services/FileSystemService";
import {Uri, window} from "../Mock/vscode";
import {TrackerWebView} from "../../../WebViews/TrackerWebView";

describe("TrackerWebView", () => {

  let trackerWebView: TrackerWebView;
  let mockExtensionUri: jest.Mocked<vscode.Uri>;
  let mockFileSystemService: jest.Mocked<FileSystemService>;
  let mockHtml: string;

  beforeEach(() => {

    mockHtml = "<html>Test Content</html>";

    mockExtensionUri = {
      fsPath: "mock/extension/path",
      with: jest.fn(),
      toString: jest.fn(),
    } as unknown as jest.Mocked<vscode.Uri>;

    mockFileSystemService = {
      read: jest.fn<(path: string) => Promise<string>>(),
    } as unknown as jest.Mocked<FileSystemService>;

    trackerWebView = new TrackerWebView(mockExtensionUri, mockFileSystemService);
  });

  describe("getHtmlForWebview", () => {

    it("should return HTML content for the webview without css/js", () => {
      const mockParsePath = "mock/extension/path/media/tracker.css";

      const mockWebview = {
        asWebviewUri: jest.fn().mockReturnValue(mockParsePath),
      } as unknown as jest.Mocked<vscode.Webview>;

      (Uri.joinPath as jest.Mock).mockReturnValue({
        fsPath: "mock/extension/path/media/tracker.html",
      });

      mockFileSystemService.read.mockReturnValue(mockHtml);

      trackerWebView.getHtmlForWebview(mockWebview);

      expect(mockFileSystemService.read).toHaveBeenCalledWith(
        "mock/extension/path/media/tracker.html",
      );
    });

    it("should return HTML content for the webview with css/js", () => {
      mockHtml = "<html>Test Content + {{styleSrc}} + {{styleTrackerUri}}</html>";
      const mockParsePath = "mock/extension/path/media/tracker.css";
      const mockCspSource = "mock/csp/source";

      const mockWebview = {
        asWebviewUri: jest.fn().mockReturnValue(mockParsePath),
        cspSource: jest.fn().mockReturnValue(mockCspSource),
      } as unknown as jest.Mocked<vscode.Webview>;

      (Uri.joinPath as jest.Mock).mockReturnValue({
        fsPath: "mock/extension/path/media/tracker.html",
      });

      mockFileSystemService.read.mockReturnValue(mockHtml);

      const result = trackerWebView.getHtmlForWebview(mockWebview);

      expect(mockFileSystemService.read).toHaveBeenCalledWith(
        "mock/extension/path/media/tracker.html",
      );

      expect(result).toContain(mockCspSource);
      expect(result).toContain(mockParsePath);
    });

    it("should handle error while reading HTML file", () => {
      const mockWebview = {
        asWebviewUri: jest.fn(),
        cspSource: jest.fn(),
      } as unknown as jest.Mocked<vscode.Webview>;

      (Uri.joinPath as jest.Mock).mockReturnValue({
        fsPath: "mock/extension/path/media/tracker.html",
      });

      mockFileSystemService.read.mockImplementation(() => {
        throw new Error("File not found");
      });

      trackerWebView.getHtmlForWebview(mockWebview);

      expect(window.showErrorMessage).toHaveBeenCalledWith(
        "Failed to load tracker HTML file: Error: File not found",
      );
    });
  });

  describe("getNonce", () => {

    it('should return a string with length of 32', () => {
      const result = trackerWebView.getNonce();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(32);
    });

    it('should only contain alphanumeric characters', () => {
      const result = trackerWebView.getNonce();
      expect(result).toMatch(/^[A-Za-z0-9]+$/);
    });

    it('should generate different nonces on multiple calls', () => {
      const nonce1 = trackerWebView.getNonce();
      const nonce2 = trackerWebView.getNonce();
      const nonce3 = trackerWebView.getNonce();

      expect(nonce1).not.toBe(nonce2);
      expect(nonce1).not.toBe(nonce3);
      expect(nonce2).not.toBe(nonce3);
    });
  });
});