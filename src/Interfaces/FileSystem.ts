export interface FileSystem {
  read(filePath: string): string;
}