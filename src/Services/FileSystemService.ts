import fs from "fs";
import path from "path";
import {FileSystem} from "../Interfaces/FileSystem";

export default class FileSystemService implements FileSystem {
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
}
