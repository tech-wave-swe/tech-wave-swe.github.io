import fs from "fs";
import path from "path";
import crypto from "crypto";

export default class FileSystemService {
  private readonly _rootFolder: string;

  constructor(rootFolder: string) {
    this._rootFolder = rootFolder;
  }

  public read(filePath: string): string {
    const fullPath = path.resolve(this._rootFolder, filePath);

    try {
      return fs.readFileSync(fullPath, "utf-8");
    } catch (error) {
      throw new Error(`Error reading file ${fullPath}: ${error}`);
    }
  }

  public static getChecksum(filePath: string): string {
    const hash = crypto.createHash("sha256");
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      hash.update(fileContent);
      return hash.digest("hex");
    } catch (error) {
      throw new Error(`Error reading file ${filePath}: ${error}`);
    }
  }
}
