import { ParsingService } from "../Services/ParsingService";
import { RequirementsTrackerService } from "../Services/RequirementsTrackerService";
import { DocumentEmbeddingService } from "../Services/DocumentEmbeddingService";
import { Requirement } from "../Models/Requirement";
import { TrackingResultSummary } from "../Models/TrackingModels";
import { FormattedDocument } from "../Models/FormattedDocument";
import {RequirementsService} from "../Services/RequirementsService";

export class RequirementsServiceFacade {
  private _parsingService: ParsingService;
  private _trackerService: RequirementsTrackerService;
  private _embeddingService: DocumentEmbeddingService;
  private _requirementsService: RequirementsService;

  constructor(
    parsingService: ParsingService,
    trackerService: RequirementsTrackerService,
    embeddingService: DocumentEmbeddingService,
    requirementService: RequirementsService
  ) {
    this._parsingService = parsingService;
    this._trackerService = trackerService;
    this._embeddingService = embeddingService;
    this._requirementsService = requirementService;
  }

  public async importRequirements(
    content: string,
    format: string,
    options: { delimiter?: string } = {},
  ): Promise<Requirement[]> {
    try {
      console.log(
        `Starting requirements import. Format: ${format}, Content length: ${content.length} chars`,
      );
      let requirements: Requirement[];

      // Parse according to format
      switch (format.toLowerCase()) {
        case "csv":
          console.log(
            `Parsing CSV with delimiter: ${options.delimiter || ","}`,
          );
          requirements = this._parsingService.parseCSV(
            content,
            options.delimiter,
          );
          console.log(
            `CSV parsing complete. Found ${requirements.length} requirements`,
          );
          break;

        case "reqif":
          console.log(`Parsing ReqIF file`);
          requirements = await this._parsingService.parseREQIF(content);
          console.log(
            `ReqIF parsing complete. Found ${requirements.length} requirements`,
          );
          break;

        default:
          console.error(`Unsupported format: ${format}`);
          throw new Error(`Unsupported format: ${format}`);
      }

      // Log what we've found
      if (requirements.length > 0) {
        console.log(
          `Parsed ${requirements.length} requirements. First requirement ID: ${requirements[0].id}`,
        );
      } else {
        console.warn(`No requirements found in the provided content`);
        return [];
      }

      // Store the requirements
      console.log(`Storing ${requirements.length} requirements in memory`);
      for (const req of requirements) {
        await this._requirementsService.addRequirement(req);
      }

      // Embed the requirements
      console.log(
        `Starting embedding process for ${requirements.length} requirements`,
      );
      try {
        await this._embedRequirements(requirements);
        console.log(`Requirements embedding complete`);
      } catch (embeddingError) {
        console.error(`Error during requirements embedding:`, embeddingError);
        // Continue even if embedding fails - we still have the requirements in memory
      }

      console.log(
        `Requirements import complete. Total requirements: ${requirements.length}`,
      );
      return requirements;
    } catch (error) {
      console.error(`Error importing requirements:`, error);
      throw error;
    }
  }

  public async trackRequirements(
    requirementIds?: string[],
  ): Promise<TrackingResultSummary> {
    try {
      // Determine which requirements to track
      let reqs: Requirement[];

      if (requirementIds && requirementIds.length > 0) {
        reqs = requirementIds
          .map((id) => this._requirementsService.getById(id))
          .filter((req):req is Requirement => req !== undefined);
      } else {
        reqs = Array.from(this._requirementsService.getRequirements().values());
      }

      console.log(reqs, requirementIds);

      if (reqs.length === 0) {
        throw new Error("No requirements found to track");
      }

      // Track the requirements
      return await this._trackerService.trackAllRequirements(reqs);
    } catch (error) {
      console.error(`Error tracking requirements:`, error);
      throw error;
    }
  }

  public async getUnimplementedRequirements(): Promise<Requirement[]> {
    try {
      const reqs = Array.from(this._requirementsService.getRequirements().values());
      return await this._trackerService.findUnimplementedRequirements(reqs);
    } catch (error) {
      console.error(`Error finding unimplemented requirements:`, error);
      throw error;
    }
  }

  public getRequirement(id: string): Requirement | undefined {
    return this._requirementsService.getById(id);
  }

  public getAllRequirements(): Requirement[] {
    return Array.from(this._requirementsService.getRequirements().values());
  }

  public async clearRequirements(): Promise<void> {
    try {
      await this._requirementsService.clearRequirements();
    } catch (error) {
      console.error(`Error clearing requirements:`, error);
      throw error;
    }
  }

  private async _embedRequirements(requirements: Requirement[]): Promise<void> {
    try {
      console.log(
        `Starting to embed ${requirements.length} requirements in LanceDB`,
      );
      const documents: FormattedDocument[] = [];

      // Create a formatted document for each requirement
      for (const req of requirements) {
        const formatted: FormattedDocument = {
          originalContent: req.description,
          chunks: [req.description],
          language: "text",
          metadata: {
            requirementId: req.id,
            requirementType: req.type,
            requirementPriority: req.priority,
            requirementStatus: req.status,
            requirementVersion: req.version,
            isRequirement: true, // Add this flag to identify as a requirement
            createdAt: Date.now(),
            chunkSize: req.description.length,
            chunkOverlap: 0,
            totalChunks: 1,
            ...req.metadata,
          },
        };

        documents.push(formatted);
      }

      // Embed the documents
      console.log(
        `Embedding ${documents.length} requirement documents in LanceDB`,
      );
      await this._embeddingService.embedRequirements(documents);
      console.log(`Successfully embedded requirements in LanceDB`);
    } catch (error) {
      console.error(`Error embedding requirements:`, error);
      throw error;
    }
  }
}
