import * as path from "path";
import { Chunk } from "../Models/Chunk";

export class DocumentFormatterService {
  public formatSourceCode(code: string, filePath: string): Chunk[] {
    const language = this._getLanguageFromPath(filePath);
    const chunks: Chunk[] = [];
    const lines = code.split("\n");

    // Process chunks with context
    lines.forEach((line, index) => {
      if (line.trim().length > 0) {
        // Get context window (3 lines before and after)
        const contextStart = Math.max(0, index - 3);
        const contextEnd = Math.min(lines.length - 1, index + 3);
        const contextLines = lines.slice(contextStart, contextEnd + 1);

        chunks.push({
          content: contextLines.join("\n"),
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
