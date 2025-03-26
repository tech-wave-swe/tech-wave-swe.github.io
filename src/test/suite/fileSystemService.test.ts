import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import FileSystemService from "../../Services/FileSystemService";

describe("FileSystemService Tests", () => {
  let testDir: string;
  let fileSystemService: FileSystemService;

  before(() => {
    testDir = path.join(__dirname, "../../../test-tmp");
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    fileSystemService = new FileSystemService(testDir);
  });

  after(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it("should read a file correctly", () => {
    const testContent = "Test content";
    const testFile = "test-file.txt";
    fs.writeFileSync(path.join(testDir, testFile), testContent);

    const result = fileSystemService.read(testFile);

    assert.strictEqual(result, testContent);
  });

  it("should throw error when file does not exist", () => {
    const nonExistentFile = "non-existent-file.txt";

    assert.throws(() => {
      fileSystemService.read(nonExistentFile);
    }, /Error reading file/);
  });
});
