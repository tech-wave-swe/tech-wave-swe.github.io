// import * as vscode from "vscode";
// import assert from "assert";
// import * as path from "path";
// import * as fs from "fs";
// import { LanceDBAdapter } from "../../Adapters/LanceDBAdapter";
// import { RequirementsServiceFacade } from "../../Facades/RequirementsServiceFacade";
// import { DocumentServiceFacade } from "../../Facades/DocumentServiceFacade";
// import { ParsingService } from "../../Services/ParsingService";
// import { RequirementsTrackerService } from "../../Services/RequirementsTrackerService";
// import { RequirementsService } from "../../Services/RequirementsService";
// import { GlobalStateService } from "../../Services/GlobalStateService";
// import { DocumentFormatterService } from "../../Services/DocumentFormatterService";
// import { FilterService } from "../../Services/FilterService";
// import FileSystemService from "../../Services/FileSystemService";
// import ConfigService from "../../Services/ConfigService";
// import { ConfigServiceFacade } from "../../Facades/ConfigServiceFacade";

// suite("Requirements Integration Test Suite", () => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   let extension: vscode.Extension<any>;
//   let workspacePath: string;
//   let disposables: vscode.Disposable[] = [];

//   // Core services
//   let vectorDatabase: LanceDBAdapter;
//   let requirementsServiceFacade: RequirementsServiceFacade;
//   let documentServiceFacade: DocumentServiceFacade;

//   suiteSetup(async () => {
//     try {
//       // Create test workspace folder
//       workspacePath = path.join(__dirname, "../../../test-tmp");
//       if (!fs.existsSync(workspacePath)) {
//         fs.mkdirSync(workspacePath, { recursive: true });
//       }

//       console.log("Test workspace created at:", workspacePath);

//       // Add workspace folder to VS Code
//       vscode.workspace.updateWorkspaceFolders(0, 0, {
//         uri: vscode.Uri.file(workspacePath),
//         name: "Test Workspace",
//       });

//       // Get and activate the extension
//       extension = vscode.extensions.getExtension(
//         "tech-wave-swe.requirements-tracker",
//       )!;
//       assert.ok(extension, "Extension not found");
//       await extension.activate();
//       assert.ok(extension.isActive, "Extension failed to activate");
//       const fileSystemService = new FileSystemService(
//         extension.extensionUri.fsPath,
//       );
//       const configService = new ConfigService(fileSystemService);

//       ConfigServiceFacade.Init(configService);

//       // Initialize core services
//       vectorDatabase = new LanceDBAdapter(workspacePath);

//       const globalStateService = new GlobalStateService(
//         extension.exports.getContext().globalState,
//       );
//       const requirementsService = new RequirementsService(globalStateService);
//       const documentFormatter = new DocumentFormatterService();
//       const filterService = new FilterService();
//       const parsingService = new ParsingService();

//       documentServiceFacade = new DocumentServiceFacade(
//         documentFormatter,
//         vectorDatabase,
//       );

//       const trackerService = new RequirementsTrackerService(
//         vectorDatabase,
//         documentServiceFacade,
//         filterService,
//       );

//       requirementsServiceFacade = new RequirementsServiceFacade(
//         parsingService,
//         trackerService,
//         requirementsService,
//         vectorDatabase,
//       );
//     } catch (err) {
//       console.error("Suite setup failed:", err);
//       throw err;
//     }
//   });

//   test("Complete Requirements Workflow Integration", async function () {
//     this.timeout(30000); // Increased timeout for integration test

//     try {
//       // 1. Set up test files
//       console.log("Setting up test files...");
//       const sourcePath = path.join(workspacePath, "src");
//       fs.mkdirSync(sourcePath, { recursive: true });

//       console.log("Source path created at:", sourcePath);

//       // Create test source files
//       const sourceFiles = {
//         login: `
//           // User authentication module
//           void authenticateUser(const char* username, const char* password) {
//               // Validate credentials
//               if (validateCredentials(username, password)) {
//                   updateLoginStatus(true);
//               }
//           }

//           // Performance monitoring
//           void monitorLoginPerformance() {
//               startTimer();
//               // Login operations
//               stopTimer();
//           }
//         `,
//         validation: `
//           bool validateCredentials(const char* username, const char* password) {
//               // Secure credential validation
//               return checkDatabase(username, password);
//           }
//         `,
//       };

//       // Write source files
//       Object.entries(sourceFiles).forEach(([name, content]) => {
//         fs.writeFileSync(path.join(sourcePath, `${name}.c`), content);
//       });

//       // Create test requirements file
//       const requirementsCSV = `GUID,Name,Description,Type,Version
// REQ-001,User Authentication,System must securely authenticate users,Functional,1.0
// REQ-002,Login Performance,Login must complete within 2 seconds,Non-Functional,1.0
// REQ-003,Password Storage,Passwords must be stored securely,Security,1.0
// `;
//       fs.writeFileSync(
//         path.join(workspacePath, "requirements.csv"),
//         requirementsCSV,
//       );

//       // 2. Import Requirements
//       console.log("Importing requirements...");
//       const requirements = await requirementsServiceFacade.importRequirements(
//         requirementsCSV,
//         "csv",
//       );
//       assert.strictEqual(
//         requirements.length,
//         3,
//         "Should import 3 requirements",
//       );

//       // 3. Process Source Files
//       console.log("Processing source files...");
//       await documentServiceFacade.processFiles([
//         path.join(sourcePath, "login.c"),
//         path.join(sourcePath, "validation.c"),
//       ]);
//       // assert.ok(files.length > 0, "Should process source files");

//       // 4. Track Requirements Implementation
//       console.log("Tracking requirements...");
//       const trackingResults =
//         await requirementsServiceFacade.trackRequirements();

//       console.log("Tracking results:", trackingResults);
//       // Verify tracking results
//       assert.ok(trackingResults, "Should have tracking results");
//       assert.strictEqual(
//         trackingResults.totalRequirements,
//         3,
//         "Should track all requirements",
//       );

//       // Verify implementation status distribution
//       const { confirmedMatches, possibleMatches, unlikelyMatches } =
//         trackingResults;
//       assert.ok(
//         confirmedMatches + possibleMatches + unlikelyMatches === 3,
//         "All requirements should be categorized",
//       );

//       // 5. Find Unimplemented Requirements
//       console.log("Finding unimplemented requirements...");
//       const unimplemented =
//         await requirementsServiceFacade.getUnimplementedRequirements();
//       assert.ok(
//         Array.isArray(unimplemented),
//         "Should return array of unimplemented requirements",
//       );

//       // 6. Vector Search Testing
//       console.log("Testing vector search...");
//       const searchResults = await vectorDatabase.queryForChunks(
//         "user authentication process",
//         2,
//       );
//       assert.ok(searchResults.length > 0, "Should find relevant code chunks");
//       assert.ok(
//         searchResults.some((chunk) =>
//           chunk.content.includes("authenticateUser"),
//         ),
//         "Should find authentication related code",
//       );

//       // Log final summary
//       console.log("Integration test complete");
//       console.log("Tracking Summary:", {
//         total: trackingResults.totalRequirements,
//         confirmed: trackingResults.confirmedMatches,
//         possible: trackingResults.possibleMatches,
//         unlikely: trackingResults.unlikelyMatches,
//         unimplemented: unimplemented.length,
//       });
//     } catch (error) {
//       console.error("Integration test failed:", error);
//       throw error;
//     }
//   });

//   suiteTeardown(() => {
//     try {
//       //Clean up test files
//       if (fs.existsSync(workspacePath)) {
//         fs.rmSync(workspacePath, { recursive: true, force: true });
//       }
//       // Dispose of all test disposables
//       disposables.forEach((d) => d.dispose());
//       disposables = [];
//     } catch (err) {
//       console.error("Suite teardown failed:", err);
//     }
//   });
// });
// import * as vscode from "vscode";
import assert from "assert";
import * as path from "path";
import * as fs from "fs";
import { LanceDBAdapter } from "../../Adapters/LanceDBAdapter";
import { RequirementsServiceFacade } from "../../Facades/RequirementsServiceFacade";
import { DocumentServiceFacade } from "../../Facades/DocumentServiceFacade";
import { setupTestServices } from "../testSetup";
import { TestWorkspace } from "../testWorkspace";

suite("Requirements Integration Tests", () => {
  let workspace: TestWorkspace;
  let vectorDatabase: LanceDBAdapter;
  let requirementsServiceFacade: RequirementsServiceFacade;
  let documentServiceFacade: DocumentServiceFacade;

  suiteSetup(async () => {
    workspace = new TestWorkspace();
    await workspace.setup();

    const services = await setupTestServices(workspace.path);
    vectorDatabase = services.vectorDatabase;
    await vectorDatabase.resetDatabase();

    requirementsServiceFacade = services.requirementsServiceFacade;
    documentServiceFacade = services.documentServiceFacade;
  });

  test("Should import requirements from CSV", async () => {
    const requirementsCSV = `GUID,Name,Description,Type,Version
REQ-001,User Authentication,System must securely authenticate users,Functional,1.0
REQ-002,Login Performance,Login must complete within 2 seconds,Non-Functional,1.0`;

    const requirements = await requirementsServiceFacade.importRequirements(
      requirementsCSV,
      "csv",
    );

    assert.strictEqual(requirements.length, 2);
    assert.strictEqual(requirements[0].name, "User Authentication");
    assert.strictEqual(requirements[1].type, "Non-Functional");
  });

  test("Should process and index source files", async () => {
    const sourceCode = `
    void authenticateUser(const char* username, const char* password) {
        validateCredentials(username, password);
    }`;

    const filePath = path.join(workspace.path, "test.c");
    fs.writeFileSync(filePath, sourceCode);

    await documentServiceFacade.processFiles([filePath]);

    const exists = await vectorDatabase.fileExists(filePath);
    assert.ok(exists, "File should be indexed in vector database");
  });

  test("Should track requirements implementation", async () => {
    const trackingResults = await requirementsServiceFacade.trackRequirements();

    assert.ok(trackingResults);
    assert.strictEqual(trackingResults.totalRequirements, 2);
    assert.ok(trackingResults.requirementDetails.size > 0);
  });

  // test("Should find unimplemented requirements", async () => {
  //   const unimplemented =
  //     await requirementsServiceFacade.getUnimplementedRequirements();

  //   assert.ok(Array.isArray(unimplemented));
  //   assert.ok(unimplemented.length <= 2);
  // });

  test("Should perform vector search on code chunks", async () => {
    const searchResults = await vectorDatabase.queryForChunks(
      "user authentication",
      2,
    );

    assert.ok(searchResults.length > 0);
    assert.ok(searchResults[0].content.includes("authenticate"));
  });
});
