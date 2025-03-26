import * as assert from "assert";
import { ParsingService } from "../../Services/ParsingService";
import { Requirement } from "../../Models/Requirement";

describe("ParsingService Tests", () => {
  let parsingService: ParsingService;

  beforeEach(() => {
    parsingService = new ParsingService();
  });

  describe("CSV Parsing", () => {
    it("should parse valid CSV with default delimiter", () => {
      const csv = `id,description,type,priority
REQ-001,User login,functional,high
REQ-002,Password reset,functional,medium`;

      const requirements = parsingService.parseCSV(csv);

      assert.strictEqual(requirements.length, 2);
      assert.strictEqual(requirements[0].id, "REQ-001");
      assert.strictEqual(requirements[0].description, "User login");
      assert.strictEqual(requirements[1].priority, "medium");
    });

    it("should parse CSV with custom delimiter", () => {
      const csv = `id$description$type$priority
REQ-001$User login$functional$high`;

      const requirements = parsingService.parseCSV(csv, "$");

      assert.strictEqual(requirements.length, 1);
      assert.strictEqual(requirements[0].id, "REQ-001");
    });

    it("should handle missing fields in CSV", () => {
      const csv = `id,description
REQ-001,User login`;

      const requirements = parsingService.parseCSV(csv);

      assert.strictEqual(requirements[0].type, "unspecified");
      assert.strictEqual(requirements[0].priority, "medium");
    });
  });

  describe("Generic Requirement Parsing", () => {
    it("should create a generic requirement from text", () => {
      const text = "The system shall support user authentication";

      const requirement = parsingService.parseGenericRequirement(text);

      assert.ok(requirement.id.startsWith("REQ-"), "Should generate an ID");
      assert.strictEqual(requirement.description, text);
      assert.strictEqual(requirement.type, "functional");
    });
  });
});
