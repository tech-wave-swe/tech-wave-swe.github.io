import {describe, expect} from "@jest/globals";
import {TrackingResultService} from "../../../Services/TrackingResultService";
import {GlobalStateService, StateKeys} from "../../../Services/GlobalStateService";
import {TrackingResult, TrackingResultDetails, TrackingResultSummary} from "../../../Models/TrackingModels";
import {Requirement, RequirementStatus} from "../../../Models/Requirement";

describe("trackingResultService", () => {

  let trackingResultService: TrackingResultService;
  let mockGlobalStateService: GlobalStateService;
  let mockTrackingResultSummary: TrackingResultSummary;
  let mockStoredData: any = {};

  const mockTrackingResultDetails: TrackingResultDetails = {
    totalRequirements: 3,
    confirmedMatches: 0,
    possibleMatches: 2,
    unlikelyMatches: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockTrackingResultSummary = {
      ...mockTrackingResultDetails,
      requirementDetails: new Map<string, TrackingResult>([
        ["req1", {
          requirementId: "req1",
          codeReferences: [
            {
              filePath: "path/to/file1",
              lineNumber: 1,
              snippet: "code snippet 1",
              score: 0.5,
            },
            {
              filePath: "path/to/file2",
              lineNumber: 2,
              snippet: "code snippet 2",
              score: 0.7,
            }
          ],
          implementationStatus: "possible-match",
          score: 0.6,
        }],
        ["req2", {
          requirementId: "req2",
          codeReferences: [
            {
              filePath: "path/to/file3",
              lineNumber: 3,
              snippet: "code snippet 3",
              score: 0.8,
            },
            {
              filePath: "path/to/file4",
              lineNumber: 4,
              snippet: "code snippet 4",
              score: 0.9,
            }
          ],
          implementationStatus: "unlikely-match",
          score: 0.4,
        }],
        ["req3", {
          requirementId: "req3",
          codeReferences: [
            {
              filePath: "path/to/file5",
              lineNumber: 5,
              snippet: "code snippet 5",
              score: 0.2,
            }
          ],
          implementationStatus: "unlikely-match",
          score: 0.3,
        }]
      ])
    };

    mockStoredData = {};

    mockGlobalStateService = {
      getState: jest.fn((key: StateKeys) => mockStoredData[key]),
      updateState: jest.fn((key: StateKeys, value: any) => {
        mockStoredData[key] = value;
        return Promise.resolve();
      }),
      clearState: jest.fn((key: StateKeys) => {
        delete mockStoredData[key];
        return Promise.resolve();
      })
    } as unknown as GlobalStateService;

    trackingResultService = new TrackingResultService(mockGlobalStateService);
  });

  describe("Init", () => {

    it("should initialize with empty state", () => {)

    });

  });

  describe("saveTrackingResult", () => {

    it("should save the tracking result summary", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingResultSummary);

      expect(mockGlobalStateService.updateState).toHaveBeenCalledWith(
        StateKeys.TRACKING_RESULTS,
        expect.objectContaining({
          details: expect.objectContaining({
            totalRequirements: 3,
            confirmedMatches: 0,
            possibleMatches: 2,
            unlikelyMatches: 1
          }),
          results: expect.arrayContaining([
            expect.objectContaining({
              requirementId: "req1"
            }),
            expect.objectContaining({
              requirementId: "req2"
            })
          ])
        })
      );
    });

  });

  describe("getTrackingResult", () => {

    it("should get the tracking result", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingResultSummary);

      const results = trackingResultService.getTrakingResult();
      expect(results).toHaveLength(3);
      expect(results).toEqual(expect.arrayContaining([
        expect.objectContaining({ requirementId: "req1" }),
        expect.objectContaining({ requirementId: "req2" })
      ]));
    });

  });

  describe("getTrackingDetails", () => {

    it("should get the tracking details", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingResultSummary);

      const details = trackingResultService.getTrackingDetails();
      expect(details).toEqual(mockTrackingResultDetails);
    });

    it("should throw an error when tracking details are not set", () => {
      expect(() => trackingResultService.getTrackingDetails()).toThrow("No tracking details found.");
    });

  });

  describe("getTrackingResultSummary", () => {

    it("should get the tracking result summary", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingResultSummary);

      const summary = trackingResultService.getTrakingResultSummary();
      expect(summary).toBeDefined();
      expect(summary?.totalRequirements).toBe(3);
      expect(summary?.confirmedMatches).toBe(0);
      expect(summary?.possibleMatches).toBe(2);
      expect(summary?.unlikelyMatches).toBe(1);

      expect(summary?.requirementDetails).toBeInstanceOf(Map);
      if (summary?.requirementDetails instanceof Map) {
        expect(summary.requirementDetails.size).toBe(3);
        expect(summary.requirementDetails.get("req1")).toEqual(mockTrackingResultSummary.requirementDetails.get("req1"));
        expect(summary.requirementDetails.get("req2")).toEqual(mockTrackingResultSummary.requirementDetails.get("req2"));
      }
    });

  });

  describe("clearRequirements", () => {

    it("should clear the tracking result", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingResultSummary);
      await trackingResultService.clearRequirements();

      expect(mockGlobalStateService.clearState).toHaveBeenCalledWith(StateKeys.TRACKING_RESULTS);

      expect(() => trackingResultService.getTrackingDetails()).toThrow("No tracking details found.");
      expect(trackingResultService.getTrakingResult()).toHaveLength(0);
    });

  });

  describe("removeCodeReference", () => {

    it("should remove a code reference from the tracking result", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingResultSummary);

      await trackingResultService.removeCodeReference("req1", 0);

      const updatedResult = trackingResultService.getById("req1");
      expect(updatedResult?.codeReferences).toHaveLength(1);
    });

    it("should remove the tracking result if all code references are removed", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingResultSummary);

      await trackingResultService.removeCodeReference("req1", 0);
      await trackingResultService.removeCodeReference("req1", 0);

      expect(trackingResultService.getById("req1")).toBeUndefined();

      const details = trackingResultService.getTrackingDetails();
      expect(details.totalRequirements).toBe(2);
      expect(details.possibleMatches).toBe(1);
    });

  });

  describe("confirmRequirement", () => {

    it("should confirm a requirement", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingResultSummary);

      await trackingResultService.confirmResult("req1");

      expect(trackingResultService.getById("req1")).toBeUndefined();

      const details = trackingResultService.getTrackingDetails();
      expect(details.confirmedMatches).toBe(1);
      expect(details.possibleMatches).toBe(1);
    });

    it("should confirm a requirement", async () => {
      await trackingResultService.saveTrackingResult(mockTrackingResultSummary);

      await trackingResultService.confirmResult("req3");

      expect(trackingResultService.getById("req3")).toBeUndefined();

      const details = trackingResultService.getTrackingDetails();
      expect(details.confirmedMatches).toBe(1);
      expect(details.possibleMatches).toBe(2);
      expect(details.unlikelyMatches).toBe(0);
    });

  });

  describe("errors", () => {

    it("should handle errors", () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const summary = trackingResultService.getTrakingResultSummary();
      expect(summary).toBeUndefined();
      expect(console.error).toHaveBeenCalledWith(
        'Error getting tracking result summary:',
        expect.any(Error)
      );
    });
  });

});