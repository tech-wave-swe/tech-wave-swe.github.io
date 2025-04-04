import { Requirement } from "../Models/Requirement";
import * as csv from "csv-parse/sync";
import * as xml2js from "xml2js";

export class ParsingService {
  public parseCSV(content: string, delimiter = ","): Requirement[] {
    try {
      console.log(`Starting CSV parsing with delimiter: "${delimiter}"`);
      console.log(`CSV content sample: ${content.substring(0, 100)}...`);

      // Log some details about what we're parsing
      const lineCount = content.split("\n").length;
      console.log(`CSV contains approximately ${lineCount} lines`);

      const records = csv.parse(content, {
        columns: true,
        skip_empty_lines: true,
        delimiter: delimiter,
      });

      console.log(`CSV parsed successfully. Found ${records.length} records`);

      // Log a sample of what we got
      if (records.length > 0) {
        console.log(`Sample record: ${JSON.stringify(records[0])}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requirements = records.map((record: any) =>
        this._mapToRequirement(record),
      );
      console.log(`Converted ${requirements.length} records to requirements`);

      return requirements;
    } catch (error) {
      console.error("Error parsing CSV:", error);
      throw new Error(`Failed to parse CSV: ${error}`);
    }
  }
  public async parseREQIF(content: string): Promise<Requirement[]> {
    try {
      const parser = new xml2js.Parser({ explicitArray: false });
      const result = await parser.parseStringPromise(content);
      const requirements: Requirement[] = [];

      // ReqIF has a complex structure - simplified version here
      if (
        result.REQ_IF &&
        result.REQ_IF.CONTENT &&
        result.REQ_IF.CONTENT.SPEC_OBJECTS
      ) {
        const specObjects = Array.isArray(
          result.REQ_IF.CONTENT.SPEC_OBJECTS.SPEC_OBJECT,
        )
          ? result.REQ_IF.CONTENT.SPEC_OBJECTS.SPEC_OBJECT
          : [result.REQ_IF.CONTENT.SPEC_OBJECTS.SPEC_OBJECT];

        for (const specObject of specObjects) {
          const req = this._parseReqIFSpecObject(specObject);
          requirements.push(req);
        }
      }

      return requirements;
    } catch (error) {
      console.error("Error parsing ReqIF:", error);
      throw new Error(`Failed to parse ReqIF: ${error}`);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _mapToRequirement(record: any): Requirement {
    return {
      id: record.GUID || record.guid || record.id || `REQ-${Date.now()}`,
      name: record.Name || record.name || record.title || record.Title || "",
      description: record.Notes || record.Description || record.text || "",
      type: record.Type || record.type || "unspecified",
      status: record.status || record.Status || "draft",
      version: record.Version || record.version || "1.0",
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _parseReqIFSpecObject(specObject: any): Requirement {
    let id = "";
    let name = "";
    let description = "";
    let type = "unspecified";
    let status = "draft";
    let version = "1.0";

    // Extract ID from attributes if available
    if (specObject.ATTRIBUTES && specObject.ATTRIBUTES.ATTRIBUTE) {
      const attributes = Array.isArray(specObject.ATTRIBUTES.ATTRIBUTE)
        ? specObject.ATTRIBUTES.ATTRIBUTE
        : [specObject.ATTRIBUTES.ATTRIBUTE];

      for (const attr of attributes) {
        if (attr.DEFINITION && attr.DEFINITION.LONG_NAME) {
          const attr_name = attr.DEFINITION.LONG_NAME.toLowerCase();

          if (attr_name.includes("id")) {
            id = attr.VALUE || attr.VALUES || "";
          } else if (
            attr_name.includes("name") ||
            attr_name.includes("title")
          ) {
            name = attr.VALUE || attr.VALUES || "";
          } else if (
            attr_name.includes("description") ||
            attr_name.includes("text")
          ) {
            description = attr.VALUE || attr.VALUES || "";
          } else if (attr_name.includes("type")) {
            type = attr.VALUE || attr.VALUES || "unspecified";
          } else if (attr_name.includes("status")) {
            status = attr.VALUE || attr.VALUES || "draft";
          } else if (attr_name.includes("version")) {
            version = attr.VALUE || attr.VALUES || "1.0";
          }
        }
      }
    }

    // Ensure we have an ID
    if (id == "") {
      id =
        specObject.IDENTIFIER || specObject.$.IDENTIFIER || `REQ-${Date.now()}`;
    }

    return {
      id,
      name,
      description,
      type,
      status,
      version,
    };
  }
}
