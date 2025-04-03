import * as path from "path";
import { FormattedDocument } from "../Models/FormattedDocument";
import { ConfigServiceFacade } from "../Facades/ConfigServiceFacade";

export class DocumentFormatterService {
  public formatSourceCode(code: string, filePath: string): FormattedDocument {
    const language = this._getLanguageFromPath(filePath);
    return this.formatByLanguage(code, language, filePath);
  }

  public splitIntoChunks(
    text: string,
    chunkSize = 0,
    chunkOverlap = 0,
  ): string[] {
    // Use config values or defaults, with upper limits for safety
    const size = Math.min(
      chunkSize || ConfigServiceFacade.GetInstance().getChunkSize(),
      4000,
    );
    const overlap = Math.min(
      chunkOverlap || ConfigServiceFacade.GetInstance().getChunkOverlap(),
      200,
    );

    // Handle empty or small texts quickly
    if (!text || text.length <= size) {
      return text ? [text] : [];
    }

    // Safety check for very large files
    if (text.length > 1000000) {
      // 1MB limit for aggressive chunking
      console.warn(
        `File too large (${text.length} chars), using smaller chunks with no overlap`,
      );
      return this._splitLargeText(text, 2000); // Smaller chunks for very large files
    }

    const chunks: string[] = [];
    let index = 0;

    while (index < text.length) {
      // Calculate safe end index
      const endIndex = Math.min(index + size, text.length);

      // Get chunk of appropriate size
      let chunk = text.substring(index, endIndex);

      // If not at the end, try to find a natural break point
      if (endIndex < text.length) {
        // Try to find line breaks, sentences, or other natural boundaries
        const lastLineBreak = chunk.lastIndexOf("\n");
        if (lastLineBreak !== -1 && lastLineBreak > size / 2) {
          // Cut at the line break if it's reasonably positioned
          chunk = chunk.substring(0, lastLineBreak + 1);
        } else {
          // If no good line break, look for sentence endings
          const sentenceBreaks = [". ", "! ", "? ", ".\n", "!\n", "?\n"];
          for (const breakChar of sentenceBreaks) {
            const lastSentence = chunk.lastIndexOf(breakChar);
            if (lastSentence !== -1 && lastSentence > size * 0.7) {
              chunk = chunk.substring(0, lastSentence + breakChar.length);
              break;
            }
          }
        }
      }

      // Safety check - if chunk is still too large, further split it
      if (chunk.length > 6000) {
        console.warn(`Chunk still too large (${chunk.length} chars), forcing split`);
        //const subChunks = this._splitLargeText(chunk, 2000);
        //chunks.push(...subChunks);
      } else {
        chunks.push(chunk);
      }

      // Move index forward, ensuring progress
      const nextIndex = index + chunk.length - overlap;

      // Prevent infinite loops by ensuring we advance
      if (nextIndex <= index) {
        index += Math.max(1, Math.floor(chunk.length / 2));
      } else {
        index = nextIndex;
      }
    }

    return chunks;
  }

  // Helper method for handling large files or chunks
  private _splitLargeText(text: string, maxChunkSize = 2000): string[] {
    const chunks: string[] = [];

    for (let i = 0; i < text.length; i += maxChunkSize) {
      // Calculate end with a safety margin
      const endIndex = Math.min(i + maxChunkSize, text.length);
      chunks.push(text.substring(i, endIndex));
    }

    return chunks;
  }

  public extractCodeBlocks(markdown: string): string[] {
    const codeBlockRegex = /```(?:[\w-]+)?\n([\s\S]*?)```/g;
    const codeBlocks: string[] = [];

    let match;
    while ((match = codeBlockRegex.exec(markdown)) !== null) {
      codeBlocks.push(match[1]);
    }

    return codeBlocks;
  }

  public formatByLanguage(
    code: string,
    language: string,
    filePath?: string,
  ): FormattedDocument {
    const chunkSize = ConfigServiceFacade.GetInstance().getChunkSize();
    const chunkOverlap = ConfigServiceFacade.GetInstance().getChunkOverlap();

    let chunks: string[];

    // Special handling for specific languages
    switch (language) {
      case "javascript":
      case "typescript":
      case "python":
      case "java":
      case "csharp":
        chunks = this._splitCodeIntoFunctions(code, language);
        break;

      case "markdown":
      case "text":
        chunks = this.splitIntoChunks(code, chunkSize, chunkOverlap);
        break;

      default:
        // Default to line-based chunking for unknown languages
        chunks = this.splitIntoChunks(code, chunkSize, chunkOverlap);
    }

    const result: FormattedDocument = {
      originalContent: code,
      chunks,
      language,
      metadata: {
        filePath,
        fileName: filePath ? path.basename(filePath) : undefined,
        fileType: language,
        createdAt: Date.now(),
        chunkSize,
        chunkOverlap,
        totalChunks: chunks.length,
      },
    };

    return result;
  }

  private _getLanguageFromPath(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();

    const languageMap: Record<string, string> = {
      ".js": "javascript",
      ".ts": "typescript",
      ".py": "python",
      ".java": "java",
      ".cs": "csharp",
      ".md": "markdown",
      ".txt": "text",
    };

    return languageMap[ext] || "text";
  }

  private _splitCodeIntoFunctions(code: string, language: string): string[] {
    // This is a simplified implementation; a production version would use
    // proper parsers for each language to identify function boundaries

    let functionRegex: RegExp;

    switch (language) {
      case "javascript":
      case "typescript":
        functionRegex =
          /(function\s+[\w$]+\s*\([\s\S]*?\)\s*\{[\s\S]*?\}|const\s+[\w$]+\s*=\s*(?:function\s*)?\([\s\S]*?\)\s*(?:=>)?\s*\{[\s\S]*?\}|class\s+[\w$]+[\s\S]*?\{[\s\S]*?\})/g;
        break;

      case "python":
        functionRegex =
          /(def\s+[\w$]+\s*\([\s\S]*?\)[\s\S]*?(?:return|pass|$))/g;
        break;

      case "java":
      case "csharp":
        functionRegex =
          /((?:public|private|protected|static|final|abstract|\s)*\s+[\w<>[\]]+\s+[\w$]+\s*\([\s\S]*?\)\s*\{[\s\S]*?\})/g;
        break;

      default:
        return this.splitIntoChunks(code);
    }

    const functions: string[] = [];
    let match;

    while ((match = functionRegex.exec(code)) !== null) {
      functions.push(match[1]);
    }

    // If no functions were found or there's code outside functions, add the whole file
    if (functions.length === 0) {
      return this.splitIntoChunks(code);
    }

    return functions;
  }
}
