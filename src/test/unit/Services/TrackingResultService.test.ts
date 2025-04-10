import {
  GlobalStateService,
  StateKeys,
} from "../../../Services/GlobalStateService";
import { TrackingResultService } from "../../../Services/TrackingResultService";
import {
  TrackingResult,
  TrackingResultSummary,
} from "../../../Models/TrackingModels";

describe("TrackingResultService", () => {
  let globalStateService: jest.Mocked<GlobalStateService>;
  let trackingResultService: TrackingResultService;

  beforeEach(() => {
    globalStateService = {
      updateState: jest.fn().mockResolvedValue(undefined),
      getState: jest.fn().mockReturnValue(undefined),
      clearState: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<GlobalStateService>;

    trackingResultService = new TrackingResultService(globalStateService);
  });

  const mockTrackingResult: TrackingResult = {
    requirementId: "REQ-001",
    codeReferences: [
      {
        snippet: "console.log('Hello World');",
        filePath: "test/file.ts",
        lineNumber: 10,
        score: 0.8,
        contextRange: {
          start: 0,
          end: 1,
        },
      },
    ],
    implementationStatus: "possible-match",
    score: 0.75,
  };

  const mockUnlikelyResult: TrackingResult = {
    ...mockTrackingResult,
    requirementId: "REQ-002",
    implementationStatus: "unlikely-match",
  };

  const mockTrackingSummary: TrackingResultSummary = {
    totalRequirements: 1,
    confirmedMatches: 0,
    possibleMatches: 1,
    unlikelyMatches: 0,
    requirementDetails: new Map([
      [mockTrackingResult.requirementId, mockTrackingResult],
    ]),
  };

  describe("saveTrackingResult", () => {
    it("should save tracking result summary correctly", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingSummary);

      expect(globalStateService.updateState).toHaveBeenCalledWith(
        StateKeys.TRACKING_RESULTS,
        expect.objectContaining({
          details: {
            totalRequirements: 1,
            confirmedMatches: 0,
            possibleMatches: 1,
            unlikelyMatches: 0,
          },
          results: expect.arrayContaining([mockTrackingResult]),
        }),
      );
    });

    it("should handle empty requirement details", async () => {
      const emptySummary = {
        ...mockTrackingSummary,
        requirementDetails: new Map(),
      };
      await trackingResultService.saveTrackingResult(emptySummary);

      expect(globalStateService.updateState).toHaveBeenCalledWith(
        StateKeys.TRACKING_RESULTS,
        expect.objectContaining({
          details: expect.any(Object),
          results: [],
        }),
      );

      const results = trackingResultService.getTrakingResult();
      expect(results).toEqual([]);
    });
    
    it("should update existing tracking details when saving new summary", async () => {
      // First save to establish initial details
      await trackingResultService.saveTrackingResult(mockTrackingSummary);
      
      // Create a new summary with different values
      const updatedSummary = {
        totalRequirements: 2,
        confirmedMatches: 1,
        possibleMatches: 0,
        unlikelyMatches: 1,
        requirementDetails: new Map([
          [mockUnlikelyResult.requirementId, mockUnlikelyResult]
        ]),
      };
      
      await trackingResultService.saveTrackingResult(updatedSummary);
      
      expect(globalStateService.updateState).toHaveBeenLastCalledWith(
        StateKeys.TRACKING_RESULTS,
        expect.objectContaining({
          details: {
            totalRequirements: 2,
            confirmedMatches: 1,
            possibleMatches: 0,
            unlikelyMatches: 1,
          },
          results: expect.arrayContaining([mockUnlikelyResult]),
        }),
      );
      
      const details = trackingResultService.getTrackingDetails();
      expect(details).toEqual({
        totalRequirements: 2,
        confirmedMatches: 1,
        possibleMatches: 0,
        unlikelyMatches: 1,
      });
    });
  });

  describe("getTrakingResult", () => {
    it("should return empty array when no results exist", () => {
      const results = trackingResultService.getTrakingResult();
      expect(results).toEqual([]);
    });

    it("should return array of tracking results when they exist", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingSummary);
      const results = trackingResultService.getTrakingResult();
      expect(results).toEqual([mockTrackingResult]);
    });
  });

  describe("getTrackingDetails", () => {
    it("should throw error when no details exist", () => {
      expect(() => trackingResultService.getTrackingDetails()).toThrow(
        "No tracking details found.",
      );
    });

    it("should return tracking details when they exist", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingSummary);
      const details = trackingResultService.getTrackingDetails();
      expect(details).toEqual({
        totalRequirements: 1,
        confirmedMatches: 0,
        possibleMatches: 1,
        unlikelyMatches: 0,
      });
    });

    it("should handle undefined stored state", () => {
      globalStateService.getState.mockReturnValue(undefined);
      expect(() => trackingResultService.getTrackingDetails()).toThrow(
        "No tracking details found.",
      );
    });
  });

  describe("clearRequirements", () => {
    it("should clear all tracking results", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingSummary);
      await trackingResultService.clearRequirements();

      expect(globalStateService.clearState).toHaveBeenCalledWith(
        StateKeys.TRACKING_RESULTS,
      );
      expect(trackingResultService.getTrakingResult()).toEqual([]);
      expect(() => trackingResultService.getTrackingDetails()).toThrow();
    });
  });

  describe("removeCodeReference", () => {
    it("should remove code reference and update counts for possible match", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingSummary);
      await trackingResultService.removeCodeReference(
        mockTrackingResult.requirementId,
        0,
      );

      const details = trackingResultService.getTrackingDetails();
      expect(details.totalRequirements).toBe(0);
      expect(details.possibleMatches).toBe(0);
      expect(
        trackingResultService.getById(mockTrackingResult.requirementId),
      ).toBeUndefined();
    });

    it("should remove code reference and update counts for unlikely match", async () => {
      const unlikelySummary = {
        ...mockTrackingSummary,
        unlikelyMatches: 1,
        possibleMatches: 0,
        requirementDetails: new Map([
          [mockUnlikelyResult.requirementId, mockUnlikelyResult],
        ]),
      };

      await trackingResultService.saveTrackingResult(unlikelySummary);
      await trackingResultService.removeCodeReference(
        mockUnlikelyResult.requirementId,
        0,
      );

      const details = trackingResultService.getTrackingDetails();
      expect(details.totalRequirements).toBe(0);
      expect(details.unlikelyMatches).toBe(0);
    });

    it("should handle multiple code references", async () => {
      const multiRefResult = {
        ...mockTrackingResult,
        codeReferences: [
          mockTrackingResult.codeReferences[0],
          {
            snippet: "Another reference",
            filePath: "test/other.ts",
            lineNumber: 20,
            score: 0.9,
            contextRange: { start: 0, end: 1 },
          },
        ],
      };

      const multiRefSummary = {
        ...mockTrackingSummary,
        requirementDetails: new Map([
          [multiRefResult.requirementId, multiRefResult],
        ]),
      };

      await trackingResultService.saveTrackingResult(multiRefSummary);
      await trackingResultService.removeCodeReference(
        multiRefResult.requirementId,
        0,
      );

      const result = trackingResultService.getById(
        multiRefResult.requirementId,
      );
      expect(result?.codeReferences?.length).toBe(1);
      expect(result?.codeReferences[0].filePath).toBe("test/other.ts");
    });

    it("should throw error when no details exist", async () => {
      await expect(
        trackingResultService.removeCodeReference("invalid-id", 0),
      ).rejects.toThrow("No details found.");
    });
  });

  describe("confirmResult", () => {
    it("should update counts when confirming a possible match", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingSummary);
      await trackingResultService.confirmResult(
        mockTrackingResult.requirementId,
      );

      const details = trackingResultService.getTrackingDetails();
      expect(details.confirmedMatches).toBe(1);
      expect(details.possibleMatches).toBe(0);
      expect(
        trackingResultService.getById(mockTrackingResult.requirementId),
      ).toBeUndefined();
    });

    it("should throw error when no details exist", async () => {
      await expect(
        trackingResultService.confirmResult("invalid-id"),
      ).rejects.toThrow("No details found.");
    });

    it("should handle confirming an unlikely match", async () => {
      const unlikelySummary = {
        ...mockTrackingSummary,
        unlikelyMatches: 1,
        possibleMatches: 0,
        requirementDetails: new Map([
          [mockUnlikelyResult.requirementId, mockUnlikelyResult],
        ]),
      };

      await trackingResultService.saveTrackingResult(unlikelySummary);
      await trackingResultService.confirmResult(
        mockUnlikelyResult.requirementId,
      );

      const details = trackingResultService.getTrackingDetails();
      expect(details.confirmedMatches).toBe(1);
      expect(details.unlikelyMatches).toBe(0);
    });
  });

  describe("getById", () => {
    it("should return undefined for non-existent id", () => {
      expect(trackingResultService.getById("non-existent")).toBeUndefined();
    });

    it("should return tracking result for existing id", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingSummary);
      const result = trackingResultService.getById(
        mockTrackingResult.requirementId,
      );
      expect(result).toEqual(mockTrackingResult);
    });
  });

  describe("getTrakingResultSummary", () => {
    it("should return undefined when error occurs", () => {
      const result = trackingResultService.getTrakingResultSummary();
      expect(result).toBeUndefined();
    });

    it("should return tracking result summary when data exists", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingSummary);
      const summary = trackingResultService.getTrakingResultSummary();
      expect(summary).toEqual({
        totalRequirements: 1,
        confirmedMatches: 0,
        possibleMatches: 1,
        unlikelyMatches: 0,
        requirementDetails: expect.any(Map),
      });
    });

    it("should handle missing stored state", () => {
      globalStateService.getState.mockReturnValue(undefined);
      const summary = trackingResultService.getTrakingResultSummary();
      expect(summary).toBeUndefined();
    });
  });

  describe("state loading and error handling", () => {
    it("should handle loading valid stored state", () => {
      const storedState = {
        details: {
          totalRequirements: 1,
          confirmedMatches: 0,
          possibleMatches: 1,
          unlikelyMatches: 0,
        },
        results: [mockTrackingResult],
      };

      globalStateService.getState.mockReturnValue(storedState);
      const newService = new TrackingResultService(globalStateService);

      expect(newService.getTrakingResultSummary()).toBeDefined();
      expect(newService.getTrackingDetails()).toEqual(storedState.details);
    });
    
    it("should throw error when trying to save with undefined details", async () => {
      // Create a new service
      const service = new TrackingResultService(globalStateService);
      
      // Force details to be undefined using Object.defineProperty
      Object.defineProperty(service, '_details', {
        value: undefined,
        writable: true,
      });
      
      // Attempt to save should trigger _DStoGS() error
      await expect(async () => {
        // Access private method _saveTrackingResult indirectly through a spied public method
        await service['_saveTrackingResult']();
      }).rejects.toThrow("No tracking details found.");
    });

    it("should handle invalid stored state format", () => {
      globalStateService.getState.mockReturnValue({ invalid: true });
      const newService = new TrackingResultService(globalStateService);
      expect(() => newService.getTrackingDetails()).toThrow(
        "No tracking details found.",
      );
    });

    it("should handle stored state with results", () => {
      const storedState = {
        details: mockTrackingSummary,
        results: [mockTrackingResult],
      };

      globalStateService.getState.mockReturnValue(storedState);
      const service = new TrackingResultService(globalStateService);

      const result = service.getById(mockTrackingResult.requirementId);
      expect(result).toEqual(mockTrackingResult);
    });

    it("should handle missing results in stored state", () => {
      globalStateService.getState.mockReturnValue({
        details: mockTrackingSummary,
        results: undefined,
      });
      const results = trackingResultService.getTrakingResult();
      expect(results).toEqual([]);
    });

    it("should handle missing stored state", () => {
      globalStateService.getState.mockReturnValue(undefined);
      const newService = new TrackingResultService(globalStateService);
      expect(() => newService.getTrackingDetails()).toThrow(
        "No tracking details found.",
      );
    });

    it("should handle partial stored state", () => {
      const partialState = {
        details: {
          totalRequirements: 1,
          confirmedMatches: 0,
          possibleMatches: 1,
          unlikelyMatches: 0,
        },
      };

      globalStateService.getState.mockReturnValue(partialState);
      const newService = new TrackingResultService(globalStateService);

      const results = newService.getTrakingResult();
      expect(results).toEqual([]);
    });

    it("should load and store requirements from state", () => {
      const storedState = {
        details: {
          totalRequirements: 1,
          confirmedMatches: 0,
          possibleMatches: 1,
          unlikelyMatches: 0,
        },
        results: [mockTrackingResult],
      };

      globalStateService.getState.mockReturnValue(storedState);
      const newService = new TrackingResultService(globalStateService);

      const result = newService.getById(mockTrackingResult.requirementId);
      expect(result).toEqual(mockTrackingResult);
    });
  });
  describe("state update handling", () => {
    it("should update existing details when saving new tracking result", async () => {
      // First save to create initial details
      await trackingResultService.saveTrackingResult(mockTrackingSummary);

      // Clear existing results before saving new ones
      await trackingResultService.clearRequirements();

      // New summary with different values
      const updatedSummary: TrackingResultSummary = {
        totalRequirements: 2,
        confirmedMatches: 1,
        possibleMatches: 0,
        unlikelyMatches: 1,
        requirementDetails: new Map([
          [mockUnlikelyResult.requirementId, mockUnlikelyResult],
        ]),
      };

      // Save updated summary
      await trackingResultService.saveTrackingResult(updatedSummary);

      // Verify details were updated
      const details = trackingResultService.getTrackingDetails();
      expect(details).toEqual({
        totalRequirements: 2,
        confirmedMatches: 1,
        possibleMatches: 0,
        unlikelyMatches: 1,
      });

      // Verify state was saved correctly
      expect(globalStateService.updateState).toHaveBeenLastCalledWith(
        StateKeys.TRACKING_RESULTS,
        {
          details: {
            totalRequirements: 2,
            confirmedMatches: 1,
            possibleMatches: 0,
            unlikelyMatches: 1,
          },
          results: [mockUnlikelyResult],
        },
      );
    });
  });
});
