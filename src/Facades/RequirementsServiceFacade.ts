import { ParsingService } from "../Services/ParsingService";
import { RequirementsTrackerService } from "../Services/RequirementsTrackerService";
import { Requirement } from "../Models/Requirement";
import { TrackingResultSummary } from "../Models/TrackingModels";
import { RequirementsService } from "../Services/RequirementsService";
import { IVectorDatabase } from "../Interfaces/IVectorDatabase";

export class RequirementsServiceFacade {
  private _parsingService: ParsingService;
  private _trackerService: RequirementsTrackerService;
  private _requirementsService: RequirementsService;
  private _vectorDatabase: IVectorDatabase;

  constructor(
    parsingService: ParsingService,
    trackerService: RequirementsTrackerService,
    requirementService: RequirementsService,
    vectorDatabase: IVectorDatabase,
  ) {
    this._parsingService = parsingService;
    this._trackerService = trackerService;
    this._requirementsService = requirementService;
    this._vectorDatabase = vectorDatabase;
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
      await this._requirementsService.addRequirements(requirements);

      // Embed the requirements
      console.log(
        `Starting embedding process for ${requirements.length} requirements`,
      );
      try {
        await this._vectorDatabase.addRequirements(requirements);
      } catch (embeddingError) {
        console.error(`Error during requirements embedding:`, embeddingError);
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
          .filter((req): req is Requirement => req !== undefined);
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
      const reqs = Array.from(
        this._requirementsService.getRequirements().values(),
      );
      return await this._trackerService.findUnimplementedRequirements(reqs);
    } catch (error) {
      console.error(`Error finding unimplemented requirements:`, error);
      throw error;
    }
  }

  public getRequirement(id: string): Requirement | undefined {
    return this._requirementsService.getById(id);
  }

  public async deleteRequirement(id: string): Promise<void> {
    return await this._requirementsService.deleteRequirement(id);
  }

  public getAllRequirements(): Requirement[] {
    return this._requirementsService.getRequirements();
  }

  public async clearRequirements(): Promise<void> {
    return await this._requirementsService.clearRequirements();
  }
}
