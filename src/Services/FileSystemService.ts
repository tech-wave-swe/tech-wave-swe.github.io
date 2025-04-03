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

  public static getChecksum(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash("sha256");
      const stream = fs.createReadStream(filePath);

      stream.on("data", (data) => {
        hash.update(data);
      });

      stream.on("end", () => {
        resolve(hash.digest("hex"));
      });

      stream.on("error", reject);
    });
  }
}
