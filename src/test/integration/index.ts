import * as path from "path";
import Mocha from "mocha";
import { glob } from "glob";
import * as fs from "fs";

export function run(): Promise<void> {
  // Create the test report directory if it doesn't exist
  const reportDir = path.resolve(__dirname, "../../../test-reports");
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  // Create the mocha test
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
  });

  // Use the reporter from environment variables if specified
  if (process.env.MOCHA_REPORTER) {
    mocha.reporter(
      process.env.MOCHA_REPORTER,
      process.env.MOCHA_REPORTER_OPTIONS
        ? JSON.parse(process.env.MOCHA_REPORTER_OPTIONS)
        : undefined,
    );
  }

  const testsRoot = path.resolve(__dirname, ".");

  return new Promise<void>((resolve, reject) => {
    glob("**/*.test.js", { cwd: testsRoot })
      .then((files: string[]) => {
        console.log("Test files found:", files);

        files.forEach((f: string) => mocha.addFile(path.resolve(testsRoot, f)));

        try {
          mocha.run((failures) => {
            if (failures > 0) {
              reject(new Error(`${failures} tests failed.`));
            } else {
              resolve();
            }
          });
        } catch (err) {
          reject(err);
        }
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
}
