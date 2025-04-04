import { expect } from "@jest/globals";
import { ParsingService } from "../../../Services/ParsingService";
import { Requirement } from "../../../Models/Requirement";

describe("ParsingService", () => {
  let parsingService: ParsingService;
  let mockContentCSV: string[];
  let mockContentREQIF: string[];
  let mockDelimiter: string;

  beforeEach(() => {
    mockContentCSV = [
      // string with all data and different attributes name
      "GUID$Name$Notes$Type$Version\n{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1}$REQ-0$$Requirement$1.0\n{DEA4AB3D-B7F5-4ac6-A522-27D8FD6DA667}$REQ-1$The system shall enable the ADC1 internal voltage regulator before any conversions are performed.$Requirement$1.0",

      // string with missing data
      "GUID$Name$Notes$Type$Version\n{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1}$REQ-0$$$\n{DEA4AB3D-B7F5-4ac6-A522-27D8FD6DA667}$REQ-1$$$",

      // string with missing ID (GUID)
      "Name$Notes$Type$Version\nREQ-0$$Requirement$1.0\nREQ-1$$Requirement$1.0",

      // empty string
      "",

      // invalid string: wrong delimiter (should have mixed delimiters)
      "GUID$Name$Notes$Type$Version\n{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1};REQ-0;Test;Requirement;1.0",

      // invalid string: missing data (column mismatch)
      "GUID$Name$Notes$Type$Version\n{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1}$REQ-0$Requirement",

      // string with all data and predefined delimiter (using comma)
      "GUID,Name,Notes,Type,Version\n{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1},REQ-0,,Requirement,1.0\n{DEA4AB3D-B7F5-4ac6-A522-27D8FD6DA667},REQ-1,The system shall enable the ADC1 internal voltage regulator before any conversions are performed.,Requirement,1.0",
    ];
    mockContentREQIF = [
      //string with all data and different attributes name
      '<REQ_IF xmlns="http://www.omg.org/spec/ReqIF/20110401/reqif.xsd"><CONTENT><SPEC_OBJECTS><SPEC_OBJECT IDENTIFIER="REQ-1"><ATTRIBUTES><ATTRIBUTE><DEFINITION><LONG_NAME>id</LONG_NAME></DEFINITION><VALUE>REQ-1</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>description</LONG_NAME></DEFINITION><VALUE>This is the first requirement</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>type</LONG_NAME></DEFINITION><VALUE>Requirement</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>status</LONG_NAME></DEFINITION><VALUE>draft</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>priority</LONG_NAME></DEFINITION><VALUE>low</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>version</LONG_NAME></DEFINITION><VALUE>2.5</VALUE></ATTRIBUTE></ATTRIBUTES></SPEC_OBJECT><SPEC_OBJECT IDENTIFIER="REQ-2"><ATTRIBUTES><ATTRIBUTE><DEFINITION><LONG_NAME>id</LONG_NAME></DEFINITION><VALUE>REQ-2</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>description</LONG_NAME></DEFINITION><VALUE>This is the second requirement</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>type</LONG_NAME></DEFINITION><VALUE>Requirement</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>status</LONG_NAME></DEFINITION><VALUE>implemented</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>priority</LONG_NAME></DEFINITION><VALUE>high</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>version</LONG_NAME></DEFINITION><VALUE>1.1</VALUE></ATTRIBUTE></ATTRIBUTES></SPEC_OBJECT></SPEC_OBJECTS></CONTENT></REQ_IF>',
      '<REQ_IF xmlns="http://www.omg.org/spec/ReqIF/20110401/reqif.xsd"><CONTENT><SPEC_OBJECTS><SPEC_OBJECT IDENTIFIER="REQ-1"><ATTRIBUTES><ATTRIBUTE><DEFINITION><LONG_NAME>id</LONG_NAME></DEFINITION><VALUE>REQ-1</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>text</LONG_NAME></DEFINITION><VALUE>This is the first requirement</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>type</LONG_NAME></DEFINITION><VALUE>Requirement</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>status</LONG_NAME></DEFINITION><VALUE>draft</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>priority</LONG_NAME></DEFINITION><VALUE>low</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>version</LONG_NAME></DEFINITION><VALUE>2.5</VALUE></ATTRIBUTE></ATTRIBUTES></SPEC_OBJECT><SPEC_OBJECT IDENTIFIER="REQ-2"><ATTRIBUTES><ATTRIBUTE><DEFINITION><LONG_NAME>id</LONG_NAME></DEFINITION><VALUE>REQ-2</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>text</LONG_NAME></DEFINITION><VALUE>This is the second requirement</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>type</LONG_NAME></DEFINITION><VALUE>Requirement</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>status</LONG_NAME></DEFINITION><VALUE>implemented</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>priority</LONG_NAME></DEFINITION><VALUE>high</VALUE></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>version</LONG_NAME></DEFINITION><VALUE>1.1</VALUE></ATTRIBUTE></ATTRIBUTES></SPEC_OBJECT></SPEC_OBJECTS></CONTENT></REQ_IF>',
      '<REQ_IF xmlns="http://www.omg.org/spec/ReqIF/20110401/reqif.xsd"><CONTENT><SPEC_OBJECTS><SPEC_OBJECT IDENTIFIER="REQ-1"><ATTRIBUTES><ATTRIBUTE><DEFINITION><LONG_NAME>id</LONG_NAME></DEFINITION><VALUES>REQ-1</VALUES></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>text</LONG_NAME></DEFINITION><VALUES>This is the first requirement</VALUES></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>type</LONG_NAME></DEFINITION><VALUES>Requirement</VALUES></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>status</LONG_NAME></DEFINITION><VALUES>draft</VALUES></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>priority</LONG_NAME></DEFINITION><VALUES>low</VALUES></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>version</LONG_NAME></DEFINITION><VALUES>2.5</VALUES></ATTRIBUTE></ATTRIBUTES></SPEC_OBJECT><SPEC_OBJECT IDENTIFIER="REQ-2"><ATTRIBUTES><ATTRIBUTE><DEFINITION><LONG_NAME>id</LONG_NAME></DEFINITION><VALUES>REQ-2</VALUES></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>text</LONG_NAME></DEFINITION><VALUES>This is the second requirement</VALUES></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>type</LONG_NAME></DEFINITION><VALUES>Requirement</VALUES></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>status</LONG_NAME></DEFINITION><VALUES>implemented</VALUES></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>priority</LONG_NAME></DEFINITION><VALUES>high</VALUES></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>version</LONG_NAME></DEFINITION><VALUES>1.1</VALUES></ATTRIBUTE></ATTRIBUTES></SPEC_OBJECT></SPEC_OBJECTS></CONTENT></REQ_IF>',
      //string with missing data
      '<REQ_IF xmlns="http://www.omg.org/spec/ReqIF/20110401/reqif.xsd"><CONTENT><SPEC_OBJECTS><SPEC_OBJECT IDENTIFIER="REQ-1"><ATTRIBUTES></ATTRIBUTES></SPEC_OBJECT><SPEC_OBJECT IDENTIFIER="REQ-2"><ATTRIBUTES></ATTRIBUTES></SPEC_OBJECT></SPEC_OBJECTS></CONTENT></REQ_IF>',
      '<REQ_IF xmlns="http://www.omg.org/spec/ReqIF/20110401/reqif.xsd"><CONTENT><SPEC_OBJECTS><SPEC_OBJECT IDENTIFIER="REQ-1"><ATTRIBUTES><ATTRIBUTE><DEFINITION><LONG_NAME>id</LONG_NAME></DEFINITION><VAL>REQ-1</VAL></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>text</LONG_NAME></DEFINITION><VAL>This is the first requirement</VAL></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>type</LONG_NAME></DEFINITION><VAL>Requirement</VAL></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>status</LONG_NAME></DEFINITION><VAL>draft</VAL></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>priority</LONG_NAME></DEFINITION><VAL>low</VAL></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>version</LONG_NAME></DEFINITION><VAL>2.5</VAL></ATTRIBUTE></ATTRIBUTES></SPEC_OBJECT><SPEC_OBJECT IDENTIFIER="REQ-2"><ATTRIBUTES><ATTRIBUTE><DEFINITION><LONG_NAME>id</LONG_NAME></DEFINITION><VAL>REQ-2</VAL></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>text</LONG_NAME></DEFINITION><VAL>This is the second requirement</VAL></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>type</LONG_NAME></DEFINITION><VAL>Requirement</VAL></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>status</LONG_NAME></DEFINITION><VAL>implemented</VAL></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>priority</LONG_NAME></DEFINITION><VAL>high</VAL></ATTRIBUTE><ATTRIBUTE><DEFINITION><LONG_NAME>version</LONG_NAME></DEFINITION><VAL>1.1</VAL></ATTRIBUTE></ATTRIBUTES></SPEC_OBJECT></SPEC_OBJECTS></CONTENT></REQ_IF>', //error (empty string)
      "",
    ];
    mockDelimiter = "$";
    parsingService = new ParsingService();
  });

  describe("parseCSV", () => {
    it("should return a Requirement array from a CSV string [string with all data and different attributes name]", () => {
      const parsedRequirements: Requirement[] = parsingService.parseCSV(
        mockContentCSV[0],
        mockDelimiter,
      );

      expect(parsedRequirements.length).toBe(2);
      expect(parsedRequirements[0]).toMatchObject({
        id: "{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1}",
        name: "REQ-0",
        description: "",
        type: "Requirement",
        version: "1.0",
      });
      expect(parsedRequirements[1]).toMatchObject({
        id: "{DEA4AB3D-B7F5-4ac6-A522-27D8FD6DA667}",
        name: "REQ-1",
        description:
          "The system shall enable the ADC1 internal voltage regulator before any conversions are performed.",
        type: "Requirement",
        version: "1.0",
      });
    });

    it("should return a Requirement array from a CSV string [string with missing data]", () => {
      const parsedRequirements = parsingService.parseCSV(
        mockContentCSV[1],
        mockDelimiter,
      );

      expect(parsedRequirements.length).toBe(2);
      parsedRequirements.forEach((req) => {
        expect(req).toMatchObject({
          type: "unspecified",
          version: "1.0",
          status: "draft",
        });
      });
    });
    it("should return a Requirement array from a CSV string [string with missing ID]", () => {
      const parsedRequirements = parsingService.parseCSV(
        mockContentCSV[2],
        mockDelimiter,
      );

      expect(parsedRequirements.length).toBe(2);
      parsedRequirements.forEach((req) => {
        expect(req.name).toMatch(/^REQ-[0-1]$/);
        expect(req.type).toBe("Requirement");
        expect(req.version).toBe("1.0");
      });
    });

    it("should return empty array for empty string", () => {
      const parsedRequirements = parsingService.parseCSV(
        mockContentCSV[3],
        mockDelimiter,
      );
      expect(parsedRequirements).toEqual([]);
    });
    it("should return an error [invalid string: wrong delimiter]", () => {
      expect(() =>
        parsingService.parseCSV(mockContentCSV[4], mockDelimiter),
      ).toThrowError("Failed to parse CSV");
    });
    it("should return an error [invalid string: missing data]", () => {
      expect(() => {
        parsingService.parseCSV(mockContentCSV[5], mockDelimiter);
      }).toThrow(/Failed to parse CSV/);
    });
    it("should return a Requirement array from a CSV string [string with all data and predefined delimiter]", () => {
      const parsedRequirements = parsingService.parseCSV(mockContentCSV[6]);

      expect(parsedRequirements.length).toBe(2);
      expect(parsedRequirements[0]).toMatchObject({
        id: "{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1}",
        name: "REQ-0",
        description: "",
        type: "Requirement",
        version: "1.0",
      });
      expect(parsedRequirements[1]).toMatchObject({
        id: "{DEA4AB3D-B7F5-4ac6-A522-27D8FD6DA667}",
        name: "REQ-1",
        description:
          "The system shall enable the ADC1 internal voltage regulator before any conversions are performed.",
        type: "Requirement",
        version: "1.0",
      });
    });
  });
  describe("parseREQIF", () => {
    it("should return a Requirement array from a REQIF string [string with all data and different attributes name]", async () => {
      const newRequirementArray: Requirement[] = [
        {
          id: "REQ-1",
          name: "",
          description: "This is the first requirement",
          type: "Requirement",
          version: "2.5",
          status: "draft",
        },
        {
          id: "REQ-2",
          name: "",
          description: "This is the second requirement",
          type: "Requirement",
          version: "1.1",
          status: "implemented",
        },
      ];
      let parsedRequirements: Requirement[];

      for (let i = 0; i < 3; i++) {
        parsedRequirements = await parsingService.parseREQIF(
          mockContentREQIF[i],
        );
        expect(parsedRequirements).toEqual(newRequirementArray);
      }
    });
    it("should return a Requirement array from a REQIF string [string with missing data]", async () => {
      const newRequirementArray: Requirement[] = [
        {
          id: "REQ-1",
          name: "",
          description: "",
          type: "unspecified",
          version: "1.0",
          status: "draft",
        },
        {
          id: "REQ-2",
          name: "",
          description: "",
          type: "unspecified",
          version: "1.0",
          status: "draft",
        },
      ];
      let parsedRequirements: Requirement[];

      for (let i = 3; i < 5; i++) {
        parsedRequirements = await parsingService.parseREQIF(
          mockContentREQIF[i],
        );
        expect(parsedRequirements).toEqual(newRequirementArray);
      }
    });
    it("should return an error [empty string]", async () => {
      await expect(
        parsingService.parseREQIF(mockContentREQIF[5]),
      ).rejects.toThrowError("Failed to parse ReqIF");
    });
    /*it("should return an error [invalid string: wrong delimiter]", () => {
      expect(() => parsingService.parseCSV(mockContentCSV[9], mockDelimiter)).toThrowError("Failed to parse CSV");
    });
    it("should return an error [invalid string: missing data]", () => {
      expect(() => parsingService.parseCSV(mockContentCSV[10], mockDelimiter)).toThrowError("Failed to parse CSV");
    });*/
  });

  /*
  describe("parseREQUIF", () => {

    it("should update globalstate requirements list", async () => {
      const newRequirementList: Requirement[] = [{
        id: "3",
        description: "Description 3",
        type: "requirement",
        metadata: {},
        priority: "high",
        version: "1.0.0",
        status: "implemented"
      },
      {
        id: "4",
        description: "Description 4",
        type: "requirement",
        metadata: {},
        priority: "high",
        version: "1.0.0",
        status: "implemented"
      }];

      await requirementService.saveRequirement(newRequirementList);

      expect(mockGlobalStateService.updateState).toHaveBeenCalledWith(StateKeys.REQUIREMENTS, newRequirementList);

      const requirements = (requirementService as any)._requirements as Map<string, Requirement>;
      expect(requirements).toEqual(new Map<string, Requirement>(
        [
          ["3", newRequirementList[0]],
          ["4", newRequirementList[1]],
        ]
      ));

      expect(mockGlobalStateService.updateState).toHaveBeenCalledWith(
        "requirements",
        Array.from(requirements.values())
      );
    });

  });

  describe("getRequirements", () => {

    it("should retrive requirements list from globalstate", async () => {
      expect(mockGlobalStateService.getState).toBeCalledWith(StateKeys.REQUIREMENTS);
    });

  });

  describe("clearRequirements", () => {

    it("should clear globalstate requirement list", async () => {
      let requirements = (requirementService as any)._requirements as Map<string, Requirement>;
      expect(requirements.size).toBe(2);

      await requirementService.clearRequirements();
      requirements = (requirementService as any)._requirements as Map<string, Requirement>;

      expect(mockGlobalStateService.clearState).toBeCalledWith(StateKeys.REQUIREMENTS);
      expect(requirements.size).toBe(0);
    });

  });

  describe("getById", () => {

    it("should retrive requirement from its id", async () => {
      let mockId = "1";
      expect(requirementService.getById(mockId)).toEqual(mockRequirements[0]);

      mockId = "3";
      expect(requirementService.getById(mockId)).toEqual(undefined);
    });
  });
  */
});
