import * as path from "path";
import * as fs from "fs";
import { runTests } from "@vscode/test-electron";
import * as os from "os";

/**
 * A single-instance test runner that forcefully ensures only one VS Code instance
 * is running during tests by killing any existing instances before starting.
 */
async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    const extensionDevelopmentPath = path.resolve(__dirname, "../../");

    // Prepare a custom test loader that loads all tests at once
    const tempLoaderDir = path.resolve(__dirname, "../temp-loader");
    fs.mkdirSync(tempLoaderDir, { recursive: true });

    // Find all integration test files
    const integrationTestsDir = path.resolve(
      extensionDevelopmentPath,
      "out/test/integration",
    );
    const testFiles = fs
      .readdirSync(integrationTestsDir)
      .filter((file) => file.endsWith(".test.js"))
      .map((file) => path.resolve(integrationTestsDir, file));

    console.log("📝 Will run these test files:", testFiles);

    process.env.MOCHA_REPORTER = "mochawesome";
    process.env.MOCHA_REPORTER_OPTIONS = JSON.stringify({
      reportDir: path.join(__dirname, "../../test-reports"),
      reportFilename: "test-results",
    });

    // Create loader file
    const loaderContent = `
const Mocha = require('mocha');
const path = require('path');

// Hard-coded list of absolute paths to test files
const testFiles = ${JSON.stringify(testFiles)};

exports.run = function() {
  // Create the mocha test instance
  const mocha = new Mocha({
    ui: 'tdd',
    color: true,
    timeout: 60000
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
  console.log('🚀 Starting tests in a SINGLE VS Code instance');

  // Add all test files to the same Mocha instance
  testFiles.forEach(file => {
    console.log(\`  Adding test file: \${file}\`);
    mocha.addFile(file);
  });

  return new Promise((resolve, reject) => {
    try {
      // Run all tests in a single Mocha instance
      mocha.run(failures => {
        if (failures > 0) {
          console.error(\`❌ \${failures} tests failed\`);
          reject(new Error(\`\${failures} tests failed\`));
        } else {
          console.log('✅ All tests passed successfully!');
          resolve();
        }
      });
    } catch (err) {
      console.error('❌ Error running tests:', err);
      reject(err);
    }
  });
};`;

    const loaderPath = path.join(tempLoaderDir, "index.js");
    fs.writeFileSync(loaderPath, loaderContent);
    console.log("✅ Created test loader at:", loaderPath);

    // Create a unique user data directory for this test run
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    const userDataDir = path.resolve(
      extensionDevelopmentPath,
      `.vscode-test/user-data-${timestamp}-${randomString}`,
    );
    fs.mkdirSync(userDataDir, { recursive: true });

    // The path to the extension test runner script
    const extensionTestsPath = path.resolve(__dirname, "../temp-loader");

    // Extra launch arguments to VS Code with unique data directories
    const launchArgs = [
      "--no-sandbox",
      "--disable-updates",
      "--disable-extensions",
      "--skip-welcome",
      "--skip-release-notes",
      "--disable-workspace-trust",
      `--user-data-dir=${userDataDir}`,
      `--extensions-dir=${path.resolve(extensionDevelopmentPath, `.vscode-test/extensions-${timestamp}`)}`,
      // Use an empty workspace to avoid loading any projects
      path.resolve(os.tmpdir(), `empty-workspace-${timestamp}.code-workspace`),
    ];

    console.log("🚀 Launching single VS Code instance with all tests...");
    console.log(
      "🔧 VS Code path:",
      path.resolve(
        extensionDevelopmentPath,
        ".vscode-test/vscode-linux-x64-1.96.0/code",
      ),
    );
    console.log("🔧 Arguments:", launchArgs.join(" "));

    // Create empty workspace file
    const emptyWorkspace = path.resolve(
      os.tmpdir(),
      `empty-workspace-${timestamp}.code-workspace`,
    );
    fs.writeFileSync(emptyWorkspace, JSON.stringify({ folders: [] }));

    // Download VS Code, unzip it and run the integration test
    await runTests({
      version: "1.96.0",
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs,
    });

    console.log("✅ Test run complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to run tests:", err);
    process.exit(1);
  }
}

main();
