import * as path from "path";
import { runTests } from "@vscode/test-electron";

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    const extensionDevelopmentPath = path.resolve(__dirname, "../../");

    // The path to test runner
    const extensionTestsPath = path.resolve(__dirname, "./suite/index");

    // Additional arguments to pass to the test runner
    const launchArgs = [
      "--disable-extensions",
      "--extensionDevelopmentPath=" + extensionDevelopmentPath,
      "--extensionTestsPath=" + extensionTestsPath,
    ];

    // Adding reporter options through environment variables
    process.env.MOCHA_REPORTER = "mochawesome"; // or 'mocha-junit-reporter'
    process.env.MOCHA_REPORTER_OPTIONS = JSON.stringify({
      reportDir: path.join(__dirname, "../../test-reports"),
      reportFilename: "test-results",
    });

    // Run the tests
    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs,
    });
  } catch (err) {
    console.error("Failed to run tests:", err);
    process.exit(1);
  }
}

main();
