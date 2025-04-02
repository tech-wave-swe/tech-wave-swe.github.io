import { describe, expect, it, jest } from "@jest/globals";
import { ParsingService } from "../../../Services/ParsingService";
import { RequirementsTrackerService } from "../../../Services/RequirementsTrackerService";
import { DocumentEmbeddingService } from "../../../Services/DocumentEmbeddingService";
import { RequirementsService } from "../../../Services/RequirementsService";
import { TrackingResult, TrackingResultSummary } from "../../../Models/TrackingModels";
import { RequirementsServiceFacade } from "../../../Facades/RequirementsServiceFacade";

describe("RequirementsServiceFacade", () => {
    let parsingService: jest.Mocked<ParsingService>;
    let trackerService: jest.Mocked<RequirementsTrackerService>;
    let embeddingService: jest.Mocked<DocumentEmbeddingService>;
    let requirementsService: jest.Mocked<RequirementsService>;
    let requirementServiceFacade: RequirementsServiceFacade;
    const mockRequirements = [{
        id: "Req-1",
        description: "Requirement 1",
        type: "Requirement",
        priority: "medium",
        status: "implemented",
        version: "1.0",
        metadata: "",
    },
    {
        id: "Req-2",
        description: "Requirement 2",
        type: "Requirement",
        priority: "medium",
        status: "unimplemented",
        version: "1.0",
        metadata: "",
    },
    {
        id: "Req-3",
        description: "Requirement 3",
        type: "Requirement",
        priority: "medium",
        status: "unimplemented",
        version: "1.0",
        metadata: "",
    }];
    const unimplementedRequirements = [{
        id: "Req-2",
        description: "Requirement 2",
        type: "Requirement",
        priority: "medium",
        status: "unimplemented",
        version: "1.0",
        metadata: "",
    },
    {
        id: "Req-3",
        description: "Requirement 3",
        type: "Requirement",
        priority: "medium",
        status: "unimplemented",
        version: "1.0",
        metadata: "",
    }];

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
        } as unknown as jest.Mocked<RequirementsTrackerService>;

        embeddingService = {
            embedDocument: jest.fn(),
            embedMultipleDocuments: jest.fn(),
            embedRequirements: jest.fn(),
        } as unknown as jest.Mocked<DocumentEmbeddingService>;

        requirementsService = {
            addRequirement: jest.fn(),
            saveRequirement: jest.fn(),
            getRequirements: jest.fn(),
            clearRequirements: jest.fn(),
            getById: jest.fn(),
        } as unknown as jest.Mocked<RequirementsService>;

        parsingService.parseCSV.mockReturnValue(mockRequirements);
        parsingService.parseREQIF.mockResolvedValue(mockRequirements);
        requirementsService.getRequirements.mockReturnValue(mockRequirements);
        trackerService.findUnimplementedRequirements.mockResolvedValue(unimplementedRequirements);

        requirementServiceFacade = new RequirementsServiceFacade(parsingService, trackerService, embeddingService, requirementsService)
    });

    describe("constructor", () => {
        it("should initialize with provided services", () => {
            const requirementServiceFacade = new RequirementsServiceFacade(parsingService, trackerService, embeddingService, requirementsService);

            expect(requirementServiceFacade).toBeTruthy();
        });
    });

    describe("importRequirements", () => {
        let content: string;
        let format: string;
        let options: { delimiter?: string } = {};

        it("should give an error if requirements file is unsupported", async () => {
            const consoleSpy = jest.spyOn(console, "error");
            content = "GUID$Name$Notes$Type$Version{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1}$REQ-0$$Requirement$1.0";
            format = "txt";
            options.delimiter = "$";

            await expect(requirementServiceFacade.importRequirements(content, format, options)).rejects.toThrow('Unsupported format: txt');
            expect(consoleSpy).toHaveBeenCalledWith(
                "Error importing requirements:",
                expect.any(Error),
            );
        });

        it("should import requirements from a csv requirements file with undefined delimiter", () => {
            content = "GUID$Name$Notes$Type$Version{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1}$REQ-0$$Requirement$1.0";
            format = "csv";
            const csvRequirements = requirementServiceFacade.importRequirements(content, format, undefined);

            expect(csvRequirements).toEqual(Promise.resolve(mockRequirements));
        });

        it("should import requirements from a csv requirements file with personalized delimiter", () => {
            content = "GUID$Name$Notes$Type$Version{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1}$REQ-0$$Requirement$1.0";
            format = "csv";
            options.delimiter = "$";
            const csvRequirements = requirementServiceFacade.importRequirements(content, format, options);

            expect(csvRequirements).toEqual(Promise.resolve(mockRequirements));
        });

        it("should import requirements from a reqif requirements file", async () => {
            content = "GUID$Name$Notes$Type$Version{31A38164-4AD9-4ec4-BF4F-7877AB2FC7B1}$REQ-0$$Requirement$1.0";
            format = "reqif";
            options.delimiter = "$";
            const reqifRequirements = requirementServiceFacade.importRequirements(content, format, options);

            expect(reqifRequirements).toEqual(Promise.resolve(mockRequirements));
        });

        it("should give a warn massage if there's no requirements in the file", async () => {
            const consoleSpy = jest.spyOn(console, "warn");

            parsingService.parseREQIF.mockResolvedValueOnce([]);
            await requirementServiceFacade.importRequirements("", "reqif", options);

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(`No requirements found in the provided content`),
            );
        });

        it("should give an error message if the embedding fails", async () => {
            const consoleSpy = jest.spyOn(global.console, "error");

            embeddingService.embedRequirements.mockImplementationOnce(() => {throw new Error("Test error")});
            await requirementServiceFacade.importRequirements("","reqif",options);

            expect(consoleSpy).toHaveBeenCalledWith(
                "Error embedding requirements:", expect.any(Error)
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                "Error during requirements embedding:", expect.any(Error)
            );           
        });

    });

    describe("trackRequirements", () => {
        it("should return the tracking result of selected requirements", async () => {
            let mockTrackingResultSummary: TrackingResultSummary;
            mockTrackingResultSummary = {
                totalRequirements: 1,
                implementedRequirements: 1,
                partiallyImplementedRequirements: 0,
                unimplementedRequirements: 0,
                requirementDetails: new Map<string, TrackingResult>(),
            };

            requirementsService.getById.mockReturnValueOnce(mockRequirements[0]);
            trackerService.trackAllRequirements.mockResolvedValueOnce(mockTrackingResultSummary);

            await expect(requirementServiceFacade.trackRequirements(["Req-1"])).resolves.toEqual(mockTrackingResultSummary);
        });

        it("should return the tracking result of all requirements", async () => {
            let mockTrackingResultSummary: TrackingResultSummary;
            mockTrackingResultSummary = {
                totalRequirements: 3,
                implementedRequirements: 1,
                partiallyImplementedRequirements: 0,
                unimplementedRequirements: 2,
                requirementDetails: new Map<string, TrackingResult>(),
            };

            trackerService.trackAllRequirements.mockResolvedValueOnce(mockTrackingResultSummary);

            await expect(requirementServiceFacade.trackRequirements([])).resolves.toEqual(mockTrackingResultSummary);
        });

        it("should throw an error if there are no requirements found to track", async () => {
            const consoleSpy = jest.spyOn(console, "error");

            await expect(requirementServiceFacade.trackRequirements(["Req-4"])).rejects.toThrow(new Error("No requirements found to track"));
            expect(consoleSpy).toHaveBeenCalledWith(
                "Error tracking requirements:",
                expect.any(Error),
            );
        });
    });

    describe("getUnimplementedRequirements", () => {
        it("should return the unimplemented requirements", async () => {
            await expect(requirementServiceFacade.getUnimplementedRequirements()).resolves.toEqual(unimplementedRequirements);
        });

        it("should return an error if unimplemented requirements are not found", async () => {
            const consoleSpy = jest.spyOn(console, "error");
            trackerService.findUnimplementedRequirements.mockImplementationOnce(() => {throw new Error("Test error");});

            await expect(requirementServiceFacade.getUnimplementedRequirements()).rejects.toThrow();
            expect(consoleSpy).toHaveBeenCalledWith(
                "Error finding unimplemented requirements:",
                expect.any(Error),
            );
        });
    });

    describe("getRequirement", () => {
        it("should return the requirement searched by its id", () => {
            const mockRequirement = {
                id: "Req-1",
                description: "Requirement 1",
                type: "Requirement",
                priority: "medium",
                status: "implemented",
                version: "1.0",
                metadata: "",
            };
            requirementsService.getById.mockReturnValueOnce(mockRequirement);

            expect(requirementServiceFacade.getRequirement("Req-1")).toEqual(mockRequirement);
        });

        it("should return undefined if a requirement is not imported", () => {
            requirementsService.getById.mockReturnValueOnce(undefined);

            expect(requirementServiceFacade.getRequirement("Req-4")).toEqual(undefined);
        });
    });

    describe("getAllRequirements", () => {
        it("should return all the requirements imported", () => {
            expect(requirementServiceFacade.getAllRequirements()).toEqual(mockRequirements);
        });
    });
});