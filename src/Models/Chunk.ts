export interface Chunk {
  content: string;
  filePath: string;
  fileType: string;
  lineNumber: number;
  score?: number;
}
