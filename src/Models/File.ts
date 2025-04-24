export interface File {
  originalContent: string;
  filePath: string;
  checksum: string;
  score?: number;
}
