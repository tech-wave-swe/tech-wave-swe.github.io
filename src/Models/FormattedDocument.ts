export interface FormattedDocument {
  originalContent: string;
  chunks: string[];
  language: string;
  metadata: {
    filePath?: string;
    fileName?: string;
    fileType?: string;
    createdAt: number;
    chunkSize: number;
    chunkOverlap: number;
    totalChunks: number;
    [key: string]: any;
  };
}
