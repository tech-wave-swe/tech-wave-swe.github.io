import { Requirement } from "../Models/Requirement";
import * as csv from "csv-parse/sync";
import * as xml2js from "xml2js";

export class ParsingService {
  public parseCSV(content: string, delimiter: string = ","): Requirement[] {
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

  public parseGenericRequirement(content: string): Requirement {
    // Simple implementation for text-based requirements
    return {
      id: `REQ-${Date.now()}`,
      description: content,
      type: "functional",
      priority: "medium",
      status: "draft",
      version: "1.0",
      metadata: {
        createdAt: new Date().toISOString(),
        source: "manual",
      },
    };
  }

  private _mapToRequirement(record: any): Requirement {
    // Map CSV fields to Requirement object
    // These fields may vary based on the CSV structure
    return {
      id: record.id || record.ID || record.reqId || `REQ-${Date.now()}`,
      description:
        record.description || record.Description || record.text || "",
      type: record.type || record.Type || "unspecified",
      priority: record.priority || record.Priority || "medium",
      status: record.status || record.Status || "draft",
      version: record.version || record.Version || "1.0",
      metadata: {
        createdAt: new Date().toISOString(),
        source: "csv",
        rawData: record,
      },
    };
  }

  private _parseReqIFSpecObject(specObject: any): Requirement {
    let id = "";
    let description = "";
    let type = "unspecified";
    let priority = "medium";
    let status = "draft";
    let version = "1.0";

    // Extract ID from attributes if available
    if (specObject.ATTRIBUTES && specObject.ATTRIBUTES.ATTRIBUTE) {
      const attributes = Array.isArray(specObject.ATTRIBUTES.ATTRIBUTE)
        ? specObject.ATTRIBUTES.ATTRIBUTE
        : [specObject.ATTRIBUTES.ATTRIBUTE];

      for (const attr of attributes) {
        if (attr.DEFINITION && attr.DEFINITION.LONG_NAME) {
          const name = attr.DEFINITION.LONG_NAME.toLowerCase();

          if (name.includes("id")) {
            id = attr.VALUE || attr.VALUES || "";
          } else if (name.includes("description") || name.includes("text")) {
            description = attr.VALUE || attr.VALUES || "";
          } else if (name.includes("type")) {
            type = attr.VALUE || attr.VALUES || "unspecified";
          } else if (name.includes("priority")) {
            priority = attr.VALUE || attr.VALUES || "medium";
          } else if (name.includes("status")) {
            status = attr.VALUE || attr.VALUES || "draft";
          } else if (name.includes("version")) {
            version = attr.VALUE || attr.VALUES || "1.0";
          }
        }
      }
    }

    // Ensure we have an ID
    if (!id) {
      id =
        specObject.IDENTIFIER || specObject.$.IDENTIFIER || `REQ-${Date.now()}`;
    }

    return {
      id,
      description,
      type,
      priority,
      status,
      version,
      metadata: {
        createdAt: new Date().toISOString(),
        source: "reqif",
        rawData: specObject,
      },
    };
  }
}
