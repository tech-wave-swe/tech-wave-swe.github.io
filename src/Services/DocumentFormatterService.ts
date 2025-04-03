import * as path from "path";
import { Chunk } from "../Models/Chunk";

export class DocumentFormatterService {
  public formatSourceCode(code: string, filePath: string): Chunk[] {
    const language = this._getLanguageFromPath(filePath);
    const chunks: Chunk[] = [];

    code.split("\n").forEach((line, index) => {
      if (line.trim().length > 0) {
        chunks.push({
          content: line,
          filePath: filePath,
          fileType: language,
          lineNumber: index + 1,
        });
      }
    });

    return chunks;
  }

  private _getLanguageFromPath(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    const languageMap: Record<string, string> = {
      ".c": "c",
      ".h": "c",
      ".cpp": "cpp",
      ".hpp": "cpp",
      ".rs": "rust",
    };

    return languageMap[ext] || "text";
  }
}
