import assert from "assert";
import * as path from "path";
import * as fs from "fs";
import { LanceDBAdapter } from "../../Adapters/LanceDBAdapter";
import { RequirementsServiceFacade } from "../../Facades/RequirementsServiceFacade";
import { DocumentServiceFacade } from "../../Facades/DocumentServiceFacade";
import { setupTestServices } from "../testSetup";
import { TestWorkspace } from "../testWorkspace";
import { Requirement, RequirementStatus } from "../../Models/Requirement";
import { TrackingResultSummary } from "../../Models/TrackingModels";

suite("Tracker Integration Tests", () => {
  let workspace: TestWorkspace;
  let vectorDatabase: LanceDBAdapter;
  let requirementsServiceFacade: RequirementsServiceFacade;
  let documentServiceFacade: DocumentServiceFacade;
  let importedRequirements: Requirement[];

  suiteSetup(async () => {
    workspace = new TestWorkspace();
    await workspace.setup();

    const services = await setupTestServices(workspace.path);
    vectorDatabase = services.vectorDatabase;
    await vectorDatabase.resetDatabase();

    requirementsServiceFacade = services.requirementsServiceFacade;
    documentServiceFacade = services.documentServiceFacade;
  });

  test("Should import requirements from CSV", async function (this: Mocha.Context) {
    this.timeout(10000);

    const requirementsCSV = `GUID,Name,Description,Type,Version
REQ-001,User Authentication,System must securely authenticate users,Functional,1.0
REQ-002,Login Performance,Login must complete within 2 seconds,Non-Functional,1.0`;

    importedRequirements = await requirementsServiceFacade.importRequirements(
      requirementsCSV,
      "csv",
    );

    assert.strictEqual(importedRequirements.length, 2);
    assert.strictEqual(importedRequirements[0].name, "User Authentication");
    assert.strictEqual(importedRequirements[1].type, "Non-Functional");

    const allRequirements = requirementsServiceFacade.getAllRequirements();
    assert.strictEqual(allRequirements.length, 2);
  });

  test("Should process and index source files", async function (this: Mocha.Context) {
    this.timeout(10000);

    const sourceCode = `
/**
 * User authentication function
 * Validates user credentials against the system database
 */
void authenticateUser(const char* username, const char* password) {
    // Check if username and password are valid
    validateCredentials(username, password);

    // Log the authentication attempt
    logAuthAttempt(username);
}

/**
 * Measures login performance and records timing
 */
void measureLoginPerformance() {
    // Start timer
    startTimer();

    // Perform login
    authenticateUser("testuser", "password");

    // Stop timer and check if under 2 seconds
    float elapsed = stopTimer();
    checkPerformanceRequirement(elapsed, 2.0);
}`;

    const filePath = path.join(workspace.path, "auth.c");
    fs.writeFileSync(filePath, sourceCode);

    await documentServiceFacade.processFiles([filePath]);

    const exists = await vectorDatabase.fileExists(filePath);
    assert.ok(exists, "File should be indexed in vector database");
  });

  test("Should track requirements implementation", async function (this: Mocha.Context) {
    this.timeout(15000);

    const trackingResults = await requirementsServiceFacade.trackRequirements();

    assert.ok(trackingResults);
    assert.ok(trackingResults.totalRequirements > 0);
    assert.ok(trackingResults.requirementDetails.size > 0);

    assert.ok(trackingResults.requirementDetails.has("REQ-001"));
    assert.ok(trackingResults.requirementDetails.has("REQ-002"));

    const updatedReqs = requirementsServiceFacade.getAllRequirements();
    for (const req of updatedReqs) {
      assert.strictEqual(req.status, RequirementStatus.PENDING);
    }
  });

  test("Should update requirement status", async function () {
    await requirementsServiceFacade.updateRequirementStatus(
      "REQ-001",
      RequirementStatus.TRACKED,
    );

    const updatedReq = requirementsServiceFacade.getRequirement("REQ-001");
    assert.ok(updatedReq);
    assert.strictEqual(updatedReq.status, RequirementStatus.TRACKED);
  });

  test("Should retrieve a specific requirement by ID", async function () {
    const requirement = requirementsServiceFacade.getRequirement("REQ-001");

    assert.ok(requirement);
    assert.strictEqual(requirement.id, "REQ-001");
    assert.strictEqual(requirement.name, "User Authentication");
  });

  test("Should perform vector search on code chunks", async function (this: Mocha.Context) {
    this.timeout(10000);

    const searchResults = await vectorDatabase.queryForChunks(
      "user authentication",
      [],
      2,
    );

    assert.ok(searchResults.length > 0);
    assert.ok(
      searchResults[0].content.includes("authenticate") ||
        searchResults[0].lineContent.includes("authenticate"),
    );
  });

  test("Should analyze implementation based on code references", async function (this: Mocha.Context) {
    this.timeout(15000);

    const req = requirementsServiceFacade.getRequirement("REQ-001");
    assert.ok(req);

    const codeChunks = await vectorDatabase.queryForChunks(
      req.description,
      [],
      2,
    );

    const codeReferences = codeChunks.map((chunk) => ({
      filePath: chunk.filePath,
      lineNumber: chunk.lineNumber,
      snippet: chunk.content,
      score: chunk.score || 0,
    }));

    const analysis = await requirementsServiceFacade.analyzeImplementation(
      req,
      codeReferences,
    );

    assert.ok(analysis);
    assert.ok(analysis.length > 0);
    assert.ok(
      analysis.includes("CODE_START") || analysis.includes("ANALYSIS_START"),
    );
  });

  test("Should clear all requirements", async function () {
    await requirementsServiceFacade.clearRequirements();

    const requirements = requirementsServiceFacade.getAllRequirements();
    assert.strictEqual(requirements.length, 0);
  });
});
