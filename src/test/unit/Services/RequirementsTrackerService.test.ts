import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { RequirementsTrackerService } from "../../../Services/RequirementsTrackerService";
import { IVectorDatabase } from "../../../Interfaces/IVectorDatabase";
import { DocumentServiceFacade } from "../../../Facades/DocumentServiceFacade";
import { FilterService } from "../../../Services/FilterService";
import { Requirement } from "../../../Models/Requirement";
import { Chunk } from "../../../Models/Chunk";
import * as vscode from "../Mock/vscode";
import { CodeReference } from "../../../Models/TrackingModels";

describe("RequirementsTrackerService", () => {
  let vectorDatabase: jest.Mocked<IVectorDatabase>;
  let documentServiceFacade: jest.Mocked<DocumentServiceFacade>;
  let filterService: jest.Mocked<FilterService>;
  let service: RequirementsTrackerService;

  beforeEach(() => {
    jest.clearAllMocks();

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
      getPathFilter: jest.fn(),
      getFileExtensionFilter: jest.fn(),
      getRequirementsFilters: jest.fn(),
    } as unknown as jest.Mocked<FilterService>;

    service = new RequirementsTrackerService(
      vectorDatabase,
      documentServiceFacade,
      filterService,
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
      };

      const mockChunks: Chunk[] = [
        {
          content: "Test code",
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
      );
    });

    it("should handle errors in finding related code", async () => {
      const requirement: Requirement = {
        id: "REQ-001",
        name: "Test Requirement",
        description: "Test description",
        type: "functional",
        version: "1.0",
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
        },
        {
          id: "REQ-002",
          name: "Test Requirement 2",
          description: "Test description 2",
          type: "functional",
          version: "1.0",
        },
      ];

      const mockChunks: Chunk[] = [
        {
          content: "Test code",
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
        },
        {
          id: "REQ-002",
          name: "Test Requirement 2",
          description: "Test description 2",
          type: "functional",
          version: "1.0",
        },
      ];

      const mockChunks: Chunk[] = [
        {
          content: "Test code",
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
        },
        {
          id: "REQ-002",
          name: "Test Requirement 2",
          description: "Test description 2",
          type: "functional",
          version: "1.0",
        },
      ];

      const mockChunks: Chunk[] = [
        {
          content: "Test code",
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
  // describe("findUnimplementedRequirements", () => {
  //   it("should identify unimplemented requirements", async () => {
  //     const requirements: Requirement[] = [
  //       {
  //         id: "REQ-001",
  //         name: "Test Requirement 1",
  //         description: "Test description 1",
  //         type: "functional",
  //         version: "1.0",
  //       },
  //       {
  //         id: "REQ-002",
  //         name: "Test Requirement 2",
  //         description: "Test description 2",
  //         type: "functional",
  //         version: "1.0",
  //       },
  //     ];

  //     // Mock first requirement as implemented, second as unimplemented
  //     vectorDatabase.queryForChunks
  //       .mockResolvedValueOnce([
  //         {
  //           content: "Test code",
  //           filePath: "/test/file.c",
  //           fileType: "c",
  //           lineNumber: 1,
  //           score: 0.9,
  //         },
  //       ])
  //       .mockResolvedValueOnce([]);

  //     const unimplementedReqs =
  //       await service.findUnimplementedRequirements(requirements);

  //     expect(unimplementedReqs).toHaveLength(1);
  //     expect(unimplementedReqs[0].id).toBe("REQ-002");
  //   });
  // });

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
          filePath: "/test/file1.c",
          fileType: "c",
          lineNumber: 1,
          score: undefined,
        },
        {
          content: "Test code 2",
          filePath: "/test/file2.c",
          fileType: "c",
          lineNumber: 1,
          score: 0.9,
        },
      ];

      const codeReferences = service["_convertToCodeReferences"](chunks);
      expect(codeReferences).toHaveLength(2);
    });
  });
});
