import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RequirementsTrackerService } from "../../../Services/RequirementsTrackerService";
import { IVectorDatabase } from "../../../Interfaces/IVectorDatabase";
import { DocumentServiceFacade } from "../../../Facades/DocumentServiceFacade";
import { FilterService } from "../../../Services/FilterService";
import { Requirement, RequirementStatus } from "../../../Models/Requirement";
import { Chunk } from "../../../Models/Chunk";
import { ConfigServiceFacade } from "../../../Facades/ConfigServiceFacade";
import * as vscode from "../Mock/vscode";
import {CodeReference, TrackingResultSummary} from "../../../Models/TrackingModels";
import { FileExtensionFilter, PathFilter } from "../../../Models/Filter";
import { ILanguageModel } from "../../../Interfaces/ILanguageModel";
import {TrackingResultService} from "../../../Services/TrackingResultService";

describe("RequirementsTrackerService", () => {
  let vectorDatabase: jest.Mocked<IVectorDatabase>;
  let documentServiceFacade: jest.Mocked<DocumentServiceFacade>;
  let filterService: jest.Mocked<FilterService>;
  let service: RequirementsTrackerService;
  let mockPathFilter: PathFilter;
  let mockExtensionFilter: FileExtensionFilter;
  let mockTrackingResultService: TrackingResultService;
  let mockRequirements: Requirement[];
  let mockTrackingResultSummary: TrackingResultSummary;
  let mockConfigServiceFacade: jest.Mocked<ConfigServiceFacade>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock ConfigServiceFacade
    mockConfigServiceFacade = {
      getPrompt: jest.fn().mockReturnValue("Test prompt"),
    } as unknown as jest.Mocked<ConfigServiceFacade>;

    mockPathFilter = {
      include: ["/test/uno", "test/due"],
      exclude: ["/test/tre", "test/quattro"],
    } as unknown as PathFilter;

    mockRequirements = [
      {
        id: "1",
        name: "Requirement 1",
        description: "Description 1",
        type: "requirement",
        version: "1.0.0",
        status: RequirementStatus.TRACKED,
      },
      {
        id: "2",
        name: "Requirement 2",
        description: "Description 2",
        type: "requirement",
        version: "1.0.0",
        status: RequirementStatus.TRACKED,
      },
    ];

    mockTrackingResultSummary = {
      totalRequirements: 2,
      confirmedMatches: 0,
      possibleMatches: 0,
      unlikelyMatches: 0,
      requirementDetails: new Map<string, Requirement>([
        ["REQ-001", mockRequirements[0]],
        ["REQ-002", mockRequirements[1]],
      ]),
    } as unknown as jest.Mocked<TrackingResultSummary>;

    mockTrackingResultService = {
      getTrakingResultSummary: jest.fn(() => mockTrackingResultSummary),
      getRequirementDetails: jest.fn(),
      saveTrackingResult: jest.fn(),
      confirmResult: jest.fn(),
      removeCodeReference: jest.fn(),
    } as unknown as jest.Mocked<TrackingResultService>;

    mockExtensionFilter = {
      include: ["c", "cpp"],
      exclude: ["txt", "md"],
    } as unknown as FileExtensionFilter;

    vectorDatabase = {
      queryForChunks: jest.fn(),
      addChunks: jest.fn(),
      addFiles: jest.fn(),
      addRequirements: jest.fn(),
      fileExists: jest.fn(),
      queryForFiles: jest.fn(),
      queryForRequirements: jest.fn(),
      resetDatabase: jest.fn(),
      refreshEmbeddings: jest.fn(),
    } as jest.Mocked<IVectorDatabase>;

    documentServiceFacade = {
      processFiles: jest.fn(),
    } as unknown as jest.Mocked<DocumentServiceFacade>;

    filterService = {
      getPathFilter: jest.fn(() => mockPathFilter),
      getFileExtensionFilter: jest.fn(() => mockExtensionFilter),
      hasRequirementsFilters: jest.fn(() => false),
      getRequirementsFilters: jest.fn(),
    } as unknown as jest.Mocked<FilterService>;

    const mockLanguageModel: ILanguageModel = {
      generate: async (prompt: string) => `Mock response for: ${prompt}`,
      generateEmbeddings: async (_text: string) => [0.1, 0.2, 0.3],
      refreshModels: async () => {},
      generateStream: async (
        prompt: string,
        context: string,
        onToken: (token: string) => void,
      ): Promise<void> => {
        onToken("Mock stream response");
        return Promise.resolve();
      },
      checkModelAvailability: async () => true,
      pullModel: async (_model: string) => true,
    };

    service = new RequirementsTrackerService(
      vectorDatabase,
      documentServiceFacade,
      filterService,
      mockLanguageModel,
      mockTrackingResultService,
      mockConfigServiceFacade
    );
  });

  describe("trackRequirementImplementation", () => {
    it("should handle error during requirement tracking", async () => {
      const requirement: Requirement = {
        id: "REQ-001",
        name: "Test Requirement",
        description: "Test description",
        type: "functional",
        version: "1.0",
        status: RequirementStatus.NOT_TRACKED,
      };

      vectorDatabase.queryForChunks.mockRejectedValue(
        new Error("Database error"),
      );

      await expect(
        service["trackRequirementImplementation"](requirement),
      ).rejects.toThrow("Database error");
    });
  });

  describe("processWorkspaceFiles", () => {
    it("should handle error during file processing", async () => {
      const mockFiles = [
        { fsPath: "/test/file1.c" },
        { fsPath: "/test/file2.c" },
      ];
      (vscode.workspace.findFiles as jest.Mock).mockReturnValue(mockFiles);
      documentServiceFacade.processFiles.mockRejectedValue(
        new Error("Processing error"),
      );

      await expect(service.processWorkspaceFiles()).rejects.toThrow(
        "Processing error",
      );
    });
  });

  describe("findRelatedCode", () => {
    it("should return related code chunks for a requirement", async () => {
      const requirement: Requirement = {
        id: "REQ-001",
        name: "Test Requirement",
        description: "Test description",
        type: "functional",
        version: "1.0",
        status: RequirementStatus.NOT_TRACKED,
      };

      const mockChunks: Chunk[] = [
        {
          content: "Test code",
          lineContent: "Test line content",
          filePath: "/test/file.c",
          fileType: "c",
          lineNumber: 1,
          score: 0.8,
        },
      ];

      vectorDatabase.queryForChunks.mockResolvedValue(mockChunks);

      const result = await service.findRelatedCode(requirement);

      expect(result).toEqual(mockChunks);
      expect(vectorDatabase.queryForChunks).toHaveBeenCalledWith(
        requirement.description,
        undefined
      );
    });

    it("should handle errors in finding related code", async () => {
      const requirement: Requirement = {
        id: "REQ-001",
        name: "Test Requirement",
        description: "Test description",
        type: "functional",
        version: "1.0",
        status: RequirementStatus.NOT_TRACKED,
      };

      vectorDatabase.queryForChunks.mockRejectedValue(new Error("Test error"));

      await expect(service.findRelatedCode(requirement)).rejects.toThrow(
        "Test error",
      );
    });
  });

  describe("_determineImplementationStatus", () => {
    it("should return unlikely-match for empty references", () => {
      const status = service["_determineImplementationStatus"]([]);
      expect(status).toBe("unlikely-match");
    });

    it("should return confirmed-match for high scores", () => {
      const references = [
        { score: 0.9, snippet: "code", filePath: "test.c", lineNumber: 1 },
        { score: 0.8, snippet: "code", filePath: "test.c", lineNumber: 2 },
      ];
      const status = service["_determineImplementationStatus"](references);
      expect(status).toBe("confirmed-match");
    });

    it("should return possible-match for medium scores", () => {
      const references = [
        { score: 0.6, snippet: "code", filePath: "test.c", lineNumber: 1 },
        { score: 0.5, snippet: "code", filePath: "test.c", lineNumber: 2 },
      ];
      const status = service["_determineImplementationStatus"](references);
      expect(status).toBe("possible-match");
    });

    it("should return unlikely-match for low scores", () => {
      const references = [
        { score: 0.3, snippet: "code", filePath: "test.c", lineNumber: 1 },
        { score: 0.2, snippet: "code", filePath: "test.c", lineNumber: 2 },
      ];
      const status = service["_determineImplementationStatus"](references);
      expect(status).toBe("unlikely-match");
    });
  });

  describe("trackAllRequirements", () => {
    it("should handle processing error during tracking", async () => {
      const requirements = [
        {
          id: "REQ-001",
          name: "Test Requirement",
          description: "Test description",
          type: "functional",
          version: "1.0",
          status: RequirementStatus.NOT_TRACKED,
        },
      ];

      documentServiceFacade.processFiles.mockRejectedValue(
        new Error("Processing error"),
      );

      await expect(service.trackAllRequirements(requirements)).rejects.toThrow(
        "Processing error",
      );
    });

    it("should track requirements and return summary", async () => {
      const requirements: Requirement[] = [
        {
          id: "REQ-001",
          name: "Test Requirement 1",
          description: "Test description 1",
          type: "functional",
          version: "1.0",
          status: RequirementStatus.NOT_TRACKED,
        },
        {
          id: "REQ-002",
          name: "Test Requirement 2",
          description: "Test description 2",
          type: "functional",
          version: "1.0",
          status: RequirementStatus.NOT_TRACKED,
        },
      ];

      const mockChunks: Chunk[] = [
        {
          content: "Test code",
          lineContent: "Test line content",
          filePath: "/test/file.c",
          fileType: "c",
          lineNumber: 1,
          score: 0.9,
        },
      ];

      vectorDatabase.queryForChunks.mockResolvedValue(mockChunks);
      (vscode.workspace.findFiles as jest.Mock).mockReturnValue([
        { fsPath: "/test/file1.c" },
        { fsPath: "/test/file2.c" },
      ]);

      const result = await service.trackAllRequirements(requirements);

      expect(result).toMatchObject({
        totalRequirements: 2,
        confirmedMatches: expect.any(Number),
        possibleMatches: expect.any(Number),
        unlikelyMatches: expect.any(Number),
        requirementDetails: expect.any(Map),
      });

      expect(documentServiceFacade.processFiles).toHaveBeenCalled();
    });

    it("should cover possible-match", async () => {
      const requirements: Requirement[] = [
        {
          id: "REQ-001",
          name: "Test Requirement 1",
          description: "Test description 1",
          type: "functional",
          version: "1.0",
          status: RequirementStatus.NOT_TRACKED,
        },
        {
          id: "REQ-002",
          name: "Test Requirement 2",
          description: "Test description 2",
          type: "functional",
          version: "1.0",
          status: RequirementStatus.NOT_TRACKED,
        },
      ];

      const mockChunks: Chunk[] = [
        {
          content: "Test code",
          lineContent: "Test line content",
          filePath: "/test/file.c",
          fileType: "c",
          lineNumber: 1,
          score: 0.5,
        },
      ];

      vectorDatabase.queryForChunks.mockResolvedValue(mockChunks);
      (vscode.workspace.findFiles as jest.Mock).mockReturnValue([
        { fsPath: "/test/file1.c" },
        { fsPath: "/test/file2.c" },
      ]);

      const result = await service.trackAllRequirements(requirements);

      expect(result).toMatchObject({
        totalRequirements: 2,
        confirmedMatches: expect.any(Number),
        possibleMatches: expect.any(Number),
        unlikelyMatches: expect.any(Number),
        requirementDetails: expect.any(Map),
      });

      expect(documentServiceFacade.processFiles).toHaveBeenCalled();
    });

    it("should cover unlikely-match", async () => {
      const requirements: Requirement[] = [
        {
          id: "REQ-001",
          name: "Test Requirement 1",
          description: "Test description 1",
          type: "functional",
          version: "1.0",
          status: RequirementStatus.NOT_TRACKED,
        },
        {
          id: "REQ-002",
          name: "Test Requirement 2",
          description: "Test description 2",
          type: "functional",
          version: "1.0",
          status: RequirementStatus.NOT_TRACKED,
        },
      ];

      const mockChunks: Chunk[] = [
        {
          content: "Test code",
          lineContent: "Test line content",
          filePath: "/test/file.c",
          fileType: "c",
          lineNumber: 1,
          score: 0.3,
        },
      ];

      vectorDatabase.queryForChunks.mockResolvedValue(mockChunks);
      (vscode.workspace.findFiles as jest.Mock).mockReturnValue([
        { fsPath: "/test/file1.c" },
        { fsPath: "/test/file2.c" },
      ]);

      const result = await service.trackAllRequirements(requirements);

      expect(result).toMatchObject({
        totalRequirements: 2,
        confirmedMatches: expect.any(Number),
        possibleMatches: expect.any(Number),
        unlikelyMatches: expect.any(Number),
        requirementDetails: expect.any(Map),
      });

      expect(documentServiceFacade.processFiles).toHaveBeenCalled();
    });
  });

  describe("processWorkspaceFiles", () => {
    it("should process all workspace files", async () => {
      const mockFiles = [
        { fsPath: "/test/file1.c" },
        { fsPath: "/test/file2.c" },
      ];
      (vscode.workspace.findFiles as jest.Mock).mockReturnValue(mockFiles);

      const result = await service.processWorkspaceFiles();

      expect(result).toHaveLength(2);
      expect(result).toEqual(mockFiles.map((f) => f.fsPath));
      expect(documentServiceFacade.processFiles).toHaveBeenCalledWith(
        mockFiles.map((f) => f.fsPath),
      );
    });

    it("should handle workspace without folders", async () => {
      // Mock workspace without folders
      vscode.workspace.workspaceFolders = [];

      await expect(service.processWorkspaceFiles()).resolves.toEqual([]);
    });
  });

  describe("_findWorkspaceCodeFiles", () => {
    it("should warn if no workspace folders are found", async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vscode.workspace.workspaceFolders = null as any;

      const result = await service["_findWorkspaceCodeFiles"]();
      expect(result).toEqual([]);
    });
  });

  describe("_getFilters", () => {
    it("should ", () => {
      mockPathFilter.include = ["/"];
      mockExtensionFilter.include = [];
      mockPathFilter.exclude = ["/"];
      mockExtensionFilter.exclude = [];

      const result = service["_getFilters"]();
      expect(result.include).toBe("{/}");
      expect(result.exclude).toBe("{/}");
    });

    it("should return correct filters with both path and extension includes", () => {
      mockPathFilter.include = ["/test/uno", "test/due"];
      mockExtensionFilter.include = ["c", "cpp"];
      mockPathFilter.exclude = [];
      mockExtensionFilter.exclude = [];

      const result = service["_getFilters"]();
      expect(result.include).toBe("{/test/uno,test/due,**/*.c,**/*.cpp}");
      expect(result.exclude).toBe("");
    });

    it("should return correct filters with only extension includes", () => {
      mockPathFilter.include = [];
      mockExtensionFilter.include = ["c", "cpp"];
      mockPathFilter.exclude = [];
      mockExtensionFilter.exclude = [];

      const result = service["_getFilters"]();
      expect(result.include).toBe("**/*.{c,cpp}");
      expect(result.exclude).toBe("");
    });

    it("should return correct filters with no includes", () => {
      mockPathFilter.include = [];
      mockExtensionFilter.include = [];
      mockPathFilter.exclude = [];
      mockExtensionFilter.exclude = [];

      const result = service["_getFilters"]();
      expect(result.include).toBe("**/*.*");
      expect(result.exclude).toBe("");
    });

    it("should handle path and extension excludes correctly", () => {
      mockPathFilter.include = [];
      mockExtensionFilter.include = [];
      mockPathFilter.exclude = ["/test/tre", "test/quattro"];
      mockExtensionFilter.exclude = ["txt", "md"];

      const result = service["_getFilters"]();
      expect(result.include).toBe("**/*.*");
      expect(result.exclude).toBe("{/test/tre,test/quattro,**/*.txt,**/*.md}");
    });

    it("should handle only extension excludes", () => {
      mockPathFilter.include = [];
      mockExtensionFilter.include = [];
      mockPathFilter.exclude = [];
      mockExtensionFilter.exclude = ["txt", "md"];

      const result = service["_getFilters"]();
      expect(result.include).toBe("**/*.*");
      expect(result.exclude).toBe("**/*.{txt,md}");
    });
  });

  describe("_calculateImplementationScore", () => {
    it("should calculate the implementation score", () => {
      const references: CodeReference[] = [];
      const implementationScore =
        service["_calculateImplementationScore"](references);
      expect(implementationScore).toBe(0);
    });

    it("should return 0 for empty references", () => {
      const averageScore = service["_calculateAverageScore"]([]);
      expect(averageScore).toBe(0);
    });
  });

  describe("_calculateAverageScore", () => {
    it("should sum zero if score is undefined", () => {
      const array: { score?: number }[] = [{ score: undefined }];
      const implementationScore = service["_calculateAverageScore"](array);
      expect(implementationScore).toBe(0);
    });
  });

  describe("_convertToCodeReferences", () => {
    it("should sort in reverse", async () => {
      const chunks: Chunk[] = [
        {
          content: "Test code 1",
          lineContent: "Test line content",
          filePath: "/test/file1.c",
          fileType: "c",
          lineNumber: 1,
          score: undefined,
        },
        {
          content: "Test code 2",
          lineContent: "Test line content",
          filePath: "/test/file2.c",
          fileType: "c",
          lineNumber: 1,
          score: 0.9,
        },
      ];

      const codeReferences = service["_convertToCodeReferences"](chunks);
      expect(codeReferences).toHaveLength(2);
    });

    it("should handle line number calculation for context range", () => {
      const chunks: Chunk[] = [
        {
          content: "Test code 1",
          lineContent: "Test line content",
          filePath: "/test/file1.c",
          fileType: "c",
          lineNumber: 2,
          score: 0.8,
        },
        {
          content: "Test code 2",
          lineContent: "Test line content",
          filePath: "/test/file2.c",
          fileType: "c",
          lineNumber: 5,
          score: 0.9,
        },
      ];

      const codeReferences = service["_convertToCodeReferences"](chunks);
      expect(codeReferences[0]?.contextRange?.start).toBe(2); // 5 - 3
      expect(codeReferences[1]?.contextRange?.start).toBe(0); // 2 - 3 < 0, so 0
      expect(codeReferences[0]?.contextRange?.end).toBe(8); // 5 + 3
      expect(codeReferences[1]?.contextRange?.end).toBe(5); // 2 + 3
    });
  });

  describe("analyzeImplementation", () => {
    it("should analyze implementation successfully", async () => {
      const requirement: Requirement = {
        id: "REQ-001",
        name: "Test Requirement",
        description: "Test description",
        type: "functional",
        version: "1.0",
        status: RequirementStatus.NOT_TRACKED,
      };

      const codeReferences: CodeReference[] = [
        {
          snippet: "Test code snippet",
          filePath: "/test/file.c",
          lineNumber: 1,
          score: 0.9,
          relevanceExplanation: "Match score: 90%",
          contextRange: {
            start: 0,
            end: 4,
          },
        },
      ];

      const mockResponse = "Mock analysis response";
      const mockLanguageModel = {
        ...service["_languageModel"],
        generate: jest
          .fn<(prompt: string) => Promise<string>>()
          .mockResolvedValue(mockResponse),
      };

      // Replace the language model with our mock
      Object.defineProperty(service, "_languageModel", {
        value: mockLanguageModel,
      });

      const result = await service.analyzeImplementation(
        requirement,
        codeReferences,
      );

      expect(result).toBe(mockResponse);
      expect(mockLanguageModel.generate).toHaveBeenCalled();
      expect(mockLanguageModel.generate.mock.calls[0][0]).toContain(
        "Requirement:",
      );
      expect(mockLanguageModel.generate.mock.calls[0][0]).toContain(
        "Implementation #1:",
      );
    });

    it("should handle errors when analyzing implementation", async () => {
      const requirement: Requirement = {
        id: "REQ-001",
        name: "Test Requirement",
        description: "Test description",
        type: "functional",
        version: "1.0",
        status: RequirementStatus.NOT_TRACKED,
      };

      const codeReferences: CodeReference[] = [
        {
          snippet: "Test code snippet",
          filePath: "/test/file.c",
          lineNumber: 1,
          score: 0.9,
          relevanceExplanation: "Match score: 90%",
          contextRange: {
            start: 0,
            end: 4,
          },
        },
      ];

      const mockLanguageModel = {
        ...service["_languageModel"],
        generate: jest
          .fn<(prompt: string) => Promise<string>>()
          .mockRejectedValue(new Error("Language model error")),
      };

      // Replace the language model with our mock
      Object.defineProperty(service, "_languageModel", {
        value: mockLanguageModel,
      });

      try {
        await service.analyzeImplementation(requirement, codeReferences);
        fail("Expected promise to be rejected");
      } catch (error: unknown) {
        if (error instanceof Error) {
          expect(error.message).toBe("Language model error");
        }
      }
    });
  });
});
