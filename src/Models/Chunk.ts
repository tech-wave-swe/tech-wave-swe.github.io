export interface Chunk {
  content: string;
  lineContent: string;
  filePath: string;
  fileType: string;
  lineNumber: number;
  score?: number;
}
