import { describe, expect, it, jest } from "@jest/globals";
import { ParsingService } from "../../../Services/ParsingService";
import { RequirementsTrackerService } from "../../../Services/RequirementsTrackerService";
import { RequirementsService } from "../../../Services/RequirementsService";
import { IVectorDatabase } from "../../../Interfaces/IVectorDatabase";
import {
  TrackingResult,
  TrackingResultSummary,
} from "../../../Models/TrackingModels";
import { RequirementsServiceFacade } from "../../../Facades/RequirementsServiceFacade";
import { RequirementStatus } from "../../../Models/Requirement";

describe("RequirementsServiceFacade", () => {
  let parsingService: jest.Mocked<ParsingService>;
  let trackerService: jest.Mocked<RequirementsTrackerService>;
  let requirementsService: jest.Mocked<RequirementsService>;
  let vectorDatabase: jest.Mocked<IVectorDatabase>;
  let requirementServiceFacade: RequirementsServiceFacade;

  const mockRequirements = [
    {
      id: "Req-1",
      name: "Requirement 1",
      description: "Requirement 1",
      type: "Requirement",
      status: RequirementStatus.TRACKED,
      version: "1.0",
    },
    {
      id: "Req-2",
      name: "Requirement 2",
      description: "Requirement 2",
      type: "Requirement",
      status: RequirementStatus.NOT_TRACKED,
      version: "1.0",
    },
    {
      id: "Req-3",
      name: "Requirement 3",
      description: "Requirement 3",
      type: "Requirement",
      status: RequirementStatus.NOT_TRACKED,
      version: "1.0",
    },
  ];

  const mockCodeReferences = [
    {
      filePath: "test.ts",
      lineNumber: 1,
      snippet: "test code",
      score: 0.9,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    parsingService = {
      parseCSV: jest.fn(),
      parseREQIF: jest.fn(),
    } as unknown as jest.Mocked<ParsingService>;

    trackerService = {
      trackRequirementImplementation: jest.fn(),
      findRelatedCode: jest.fn(),
      findUnimplementedRequirements: jest.fn(),
      trackAllRequirements: jest.fn(),
      analyzeImplementation: jest.fn(),
    } as unknown as jest.Mocked<RequirementsTrackerService>;

    requirementsService = {
      addRequirements: jest.fn(),
      saveRequirements: jest.fn(),
      deleteRequirement: jest.fn(),
      getRequirements: jest.fn(),
      clearRequirements: jest.fn(),
      updateRequirementStatus: jest.fn(),
      getById: jest.fn(),
      updateRequirementCodeReference: jest.fn(),
    } as unknown as jest.Mocked<RequirementsService>;

    vectorDatabase = {
      addRequirements: jest.fn(),
    } as unknown as jest.Mocked<IVectorDatabase>;

    parsingService.parseCSV.mockReturnValue(mockRequirements);
    parsingService.parseREQIF.mockResolvedValue(mockRequirements);
    requirementsService.getRequirements.mockReturnValue(mockRequirements);

    requirementServiceFacade = new RequirementsServiceFacade(
      parsingService,
      trackerService,
      requirementsService,
      vectorDatabase,
    );
  });

  describe("constructor", () => {
    it("should initialize with provided services", () => {
      const requirementServiceFacade = new RequirementsServiceFacade(
        parsingService,
        trackerService,
        requirementsService,
        vectorDatabase,
      );

      expect(requirementServiceFacade).toBeTruthy();
    });
  });

  describe("importRequirements", () => {
    let content: string;
    let format: string;
    const options: { delimiter?: string } = {};

    it("should give an error if requirements file is unsupported", async () => {
      const consoleSpy = jest.spyOn(console, "error");
      content =
        "GUID$Name$Notes$Type$Version{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1}$REQ-0$$Requirement$1.0";
      format = "txt";
      options.delimiter = "$";

      await expect(
        requirementServiceFacade.importRequirements(content, format, options),
      ).rejects.toThrow("Unsupported format: txt");
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error importing requirements:",
        expect.any(Error),
      );
    });

    it("should import requirements from a csv requirements file with undefined delimiter", () => {
      content =
        "GUID$Name$Notes$Type$Version{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1}$REQ-0$$Requirement$1.0";
      format = "csv";
      const csvRequirements = requirementServiceFacade.importRequirements(
        content,
        format,
        undefined,
      );

      expect(csvRequirements).toEqual(Promise.resolve(mockRequirements));
    });

    it("should import requirements from a csv requirements file with personalized delimiter", () => {
      content =
        "GUID$Name$Notes$Type$Version{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1}$REQ-0$$Requirement$1.0";
      format = "csv";
      options.delimiter = "$";
      const csvRequirements = requirementServiceFacade.importRequirements(
        content,
        format,
        options,
      );

      expect(csvRequirements).toEqual(Promise.resolve(mockRequirements));
    });

    it("should import requirements from a reqif requirements file", async () => {
      content =
        "GUID$Name$Notes$Type$Version{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1}$REQ-0$$Requirement$1.0";
      format = "reqif";
      options.delimiter = "$";
      const reqifRequirements = requirementServiceFacade.importRequirements(
        content,
        format,
        options,
      );

      expect(reqifRequirements).toEqual(Promise.resolve(mockRequirements));
    });

    it("should give a warn massage if there's no requirements in the file", async () => {
      const consoleSpy = jest.spyOn(console, "warn");

      parsingService.parseREQIF.mockResolvedValueOnce([]);
      await requirementServiceFacade.importRequirements("", "reqif", options);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          `No requirements found in the provided content`,
        ),
      );
    });

    it("should embed requirements in vector database during import", async () => {
      const content = "some content";
      const format = "reqif";
      
      await requirementServiceFacade.importRequirements(content, format);
      
      expect(vectorDatabase.addRequirements).toHaveBeenCalledWith(mockRequirements);
    });

    it("should handle vector database embedding errors gracefully", async () => {
      const consoleSpy = jest.spyOn(console, "error");
      const error = new Error("Embedding failed");
      vectorDatabase.addRequirements.mockRejectedValueOnce(error);

      const content = "some content";
      const format = "reqif";
      
      const result = await requirementServiceFacade.importRequirements(content, format);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error during requirements embedding:",
        error
      );
      expect(result).toEqual(mockRequirements);
    });
  });

  describe("trackRequirements", () => {
    it("should return the tracking result of selected requirements", async () => {
      const mockTrackingResultSummary: TrackingResultSummary = {
        totalRequirements: 1,
        confirmedMatches: 1,
        possibleMatches: 0,
        unlikelyMatches: 0,
        requirementDetails: new Map<string, TrackingResult>(),
      };

      requirementsService.getById.mockReturnValueOnce(mockRequirements[0]);
      trackerService.trackAllRequirements.mockResolvedValueOnce(
        mockTrackingResultSummary,
      );

      await expect(
        requirementServiceFacade.trackRequirements(["Req-1"]),
      ).resolves.toEqual(mockTrackingResultSummary);
    });

    it("should return the tracking result of all requirements", async () => {
      const mockTrackingResultSummary: TrackingResultSummary = {
        totalRequirements: 3,
        confirmedMatches: 1,
        possibleMatches: 0,
        unlikelyMatches: 2,
        requirementDetails: new Map<string, TrackingResult>(),
      };

      trackerService.trackAllRequirements.mockResolvedValueOnce(
        mockTrackingResultSummary,
      );

      await expect(
        requirementServiceFacade.trackRequirements([]),
      ).resolves.toEqual(mockTrackingResultSummary);
    });

    it("should throw an error if there are no requirements found to track", async () => {
      const consoleSpy = jest.spyOn(console, "error");

      await expect(
        requirementServiceFacade.trackRequirements(["Req-4"]),
      ).rejects.toThrow(new Error("No requirements found to track"));
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error tracking requirements:",
        expect.any(Error),
      );
    });
  });

  describe("getRequirement", () => {
    it("should return the requirement searched by its id", () => {
      const mockRequirement = {
        id: "Req-1",
        name: "Requirement 1",
        description: "Requirement 1",
        type: "Requirement",
        status: RequirementStatus.TRACKED,
        version: "1.0",
      };
      requirementsService.getById.mockReturnValueOnce(mockRequirement);

      expect(requirementServiceFacade.getRequirement("Req-1")).toEqual(
        mockRequirement,
      );
    });

    it("should return undefined if a requirement is not imported", () => {
      requirementsService.getById.mockReturnValueOnce(undefined);

      expect(requirementServiceFacade.getRequirement("Req-4")).toEqual(
        undefined,
      );
    });
  });

  describe("getAllRequirements", () => {
    it("should return all the requirements imported", () => {
      expect(requirementServiceFacade.getAllRequirements()).toEqual(
        mockRequirements,
      );
    });
  });

  describe("deleteRequirement", () => {
    it("should delete the specified requirement", async () => {
      await requirementServiceFacade.deleteRequirement("Req-1");

      requirementsService.getRequirements.mockReturnValue([
        mockRequirements[1],
        mockRequirements[2],
        mockRequirements[3],
      ]);

      const result = requirementServiceFacade.getAllRequirements();

      expect(requirementsService.deleteRequirement).toHaveBeenCalledWith(
        "Req-1",
      );
      expect(result).toEqual([
        mockRequirements[1],
        mockRequirements[2],
        mockRequirements[3],
      ]);
    });
  });

  describe("clearRequirements", () => {
    it("should clear the globalstate", async () => {
      await requirementServiceFacade.clearRequirements();

      requirementsService.getRequirements.mockReturnValue([]);

      const result = requirementsService.getRequirements();

      expect(requirementsService.clearRequirements).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe("updateRequirementCodeReference", () => {
    it("should update code reference for a requirement", async () => {
      const reqId = "Req-1";
      const codeReference = mockCodeReferences[0];

      await requirementServiceFacade.updateRequirementCodeReference(reqId, codeReference);

      expect(requirementsService.updateRequirementCodeReference).toHaveBeenCalledWith(
        reqId,
        codeReference
      );
    });
  });

  describe("analyzeImplementation", () => {
    it("should analyze implementation for a requirement", async () => {
      const mockAnalysis = "Implementation analysis result";
      trackerService.analyzeImplementation.mockResolvedValue(mockAnalysis);

      const result = await requirementServiceFacade.analyzeImplementation(
        mockRequirements[0],
        mockCodeReferences
      );

      expect(trackerService.analyzeImplementation).toHaveBeenCalledWith(
        mockRequirements[0],
        mockCodeReferences
      );
      expect(result).toBe(mockAnalysis);
    });

    it("should handle error during implementation analysis", async () => {
      const error = new Error("Analysis error");
      trackerService.analyzeImplementation.mockRejectedValue(error);
      
      await expect(requirementServiceFacade.analyzeImplementation(
        mockRequirements[0],
        mockCodeReferences
      )).rejects.toThrow(error);
    });
  });
});
