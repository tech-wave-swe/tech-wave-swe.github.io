/* eslint-disable @typescript-eslint/no-explicit-any */
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

      // string just the header
      "GUID$Name$Notes$Type$Version",
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
      }).toThrowError("Failed to parse CSV");
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
    it("should return an error if the lines length is less than 2", () => {
      expect(() => {
        parsingService.parseCSV(mockContentCSV[7], mockDelimiter);
      }).toThrowError(
        "Failed to parse CSV: Error: Invalid CSV format: Missing header or data",
      );
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
  });
  describe("_parseReqIFSpecObject", () => {
    let parsingService: ParsingService;

    beforeEach(() => {
      parsingService = new ParsingService();
    });

    it("should handle single SPEC_OBJECT vs array of SPEC_OBJECTS", async () => {
      const singleObjectContent = `
          <REQ_IF>
            <CONTENT>
              <SPEC_OBJECTS>
                <SPEC_OBJECT IDENTIFIER="REQ-1"/>
              </SPEC_OBJECTS>
            </CONTENT>
          </REQ_IF>`;

      const multipleObjectsContent = `
          <REQ_IF>
            <CONTENT>
              <SPEC_OBJECTS>
                <SPEC_OBJECT IDENTIFIER="REQ-1"/>
                <SPEC_OBJECT IDENTIFIER="REQ-2"/>
              </SPEC_OBJECTS>
            </CONTENT>
          </REQ_IF>`;

      const singleResult = await parsingService.parseREQIF(singleObjectContent);
      const multipleResults = await parsingService.parseREQIF(
        multipleObjectsContent,
      );

      expect(singleResult).toHaveLength(1);
      expect(multipleResults).toHaveLength(2);
    });

    it("should handle different attribute name variations in CSV", () => {
      const records = [
        { Name: "test1" },
        { name: "test2" },
        { title: "test3" },
        { Title: "test4" },
        { somethingElse: "test5" },
      ];

      const results = records.map((record) =>
        (parsingService as any)._mapToRequirement(record),
      );

      expect(results[0].name).toBe("test1");
      expect(results[1].name).toBe("test2");
      expect(results[2].name).toBe("test3");
      expect(results[3].name).toBe("test4");
      expect(results[4].name).toBe("");
    });

    it("should handle single vs array of attributes", () => {
      const singleAttribute = {
        ATTRIBUTES: {
          ATTRIBUTE: {
            DEFINITION: { LONG_NAME: "name" },
            VALUE: "TestName",
          },
        },
        $: { IDENTIFIER: "ID1" },
      };

      const multipleAttributes = {
        ATTRIBUTES: {
          ATTRIBUTE: [
            {
              DEFINITION: { LONG_NAME: "name" },
              VALUE: "TestName",
            },
            {
              DEFINITION: { LONG_NAME: "description" },
              VALUE: "TestDesc",
            },
          ],
        },
        $: { IDENTIFIER: "ID2" },
      };

      const resultSingle = (parsingService as any)._parseReqIFSpecObject(
        singleAttribute,
      );
      const resultMultiple = (parsingService as any)._parseReqIFSpecObject(
        multipleAttributes,
      );

      expect(resultSingle.name).toBe("TestName");
      expect(resultMultiple.name).toBe("TestName");
      expect(resultMultiple.description).toBe("TestDesc");
    });

    it("should handle VALUE vs VALUES in attributes", () => {
      const specObjectWithValue = {
        ATTRIBUTES: {
          ATTRIBUTE: {
            DEFINITION: { LONG_NAME: "name" },
            VALUE: "TestName1",
          },
        },
        IDENTIFIER: "ID1",
      };

      const specObjectWithValues = {
        ATTRIBUTES: {
          ATTRIBUTE: {
            DEFINITION: { LONG_NAME: "name" },
            VALUES: "TestName2",
          },
        },
        IDENTIFIER: "ID2",
      };

      const specObjectWithNoValues = {
        ATTRIBUTES: {
          ATTRIBUTE: {
            DEFINITION: { LONG_NAME: "name" },
          },
        },
        IDENTIFIER: "ID3",
      };

      const result1 = (parsingService as any)._parseReqIFSpecObject(
        specObjectWithValue,
      );
      const result2 = (parsingService as any)._parseReqIFSpecObject(
        specObjectWithValues,
      );
      const result3 = (parsingService as any)._parseReqIFSpecObject(
        specObjectWithNoValues,
      );

      expect(result1.name).toBe("TestName1");
      expect(result2.name).toBe("TestName2");
      expect(result3.name).toBe("");
    });

    it("should handle different identifier variations", () => {
      const date = Date.now();
      jest.spyOn(Date, "now").mockReturnValue(date);

      const specObjects = [
        {
          ATTRIBUTES: {},
          IDENTIFIER: "ID1",
        },
        {
          ATTRIBUTES: {},
          $: { IDENTIFIER: "ID2" },
        },
        {
          ATTRIBUTES: {},
        },
      ];

      const results = specObjects.map((obj) =>
        (parsingService as any)._parseReqIFSpecObject(obj),
      );

      expect(results[0].id).toBe("ID1");
      expect(results[1].id).toBe("ID2");
      expect(results[2].id).toBe(`REQ-${date}`);

      jest.restoreAllMocks();
    });
  });
});
