/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, jest } from "@jest/globals";
import {
  GlobalStateService,
  StateKeys,
} from "../../../Services/GlobalStateService";
import { RequirementsService } from "../../../Services/RequirementsService";
import { Requirement, RequirementStatus } from "../../../Models/Requirement";

describe("RequirementsService", () => {
  let requirementService: RequirementsService;
  let mockGlobalStateService: jest.Mocked<GlobalStateService>;
  let mockRequirements: Requirement[];

  beforeEach(() => {
    mockRequirements = [
      {
        id: "1",
        name: "Requirement 1",
        description: "Description 1",
        type: "requirement",
        version: "1.0.0",
        status: RequirementStatus.NOT_TRACKED,
      },
      {
        id: "2",
        name: "Requirement 2",
        description: "Description 2",
        type: "requirement",
        version: "1.0.0",
        status: RequirementStatus.NOT_TRACKED,
      },
    ];

    mockGlobalStateService = {
      getState: jest.fn(),
      updateState: jest.fn(),
      clearState: jest.fn(),
    } as unknown as jest.Mocked<GlobalStateService>;

    mockGlobalStateService.getState.mockReturnValue(mockRequirements);

    requirementService = new RequirementsService(mockGlobalStateService);
  });

  describe("constructor", () => {
    it("should initialize requirements from global state", () => {
      expect(requirementService).toBeTruthy();

      const requirements = (requirementService as any)._requirements;
      expect(requirements).toEqual(
        new Map<string, Requirement>([
          ["1", mockRequirements[0]],
          ["2", mockRequirements[1]],
        ]),
      );
    });

    it("should handle empty global state", () => {
      mockGlobalStateService.getState.mockReturnValue([]);

      requirementService = new RequirementsService(mockGlobalStateService);
      expect(requirementService).toBeTruthy();

      const requirements = (requirementService as any)._requirements;
      expect(requirements).toEqual(new Map<string, Requirement>());
    });
  });

  describe("addRequirement", () => {
    it("should add a requirement and update global state", async () => {
      const newRequirement: Requirement = {
        id: "3",
        name: "Requirement 3",
        description: "Description 3",
        type: "requirement",
        version: "1.0.0",
        status: RequirementStatus.NOT_TRACKED,
      };

      await requirementService.addRequirement(newRequirement);

      expect(mockGlobalStateService.updateState).toHaveBeenCalledWith(
        StateKeys.REQUIREMENTS,
        [mockRequirements[0], mockRequirements[1], newRequirement],
      );
    });

    it("should add a requirement list and update global state", async () => {
      const newRequirement: Requirement[] = [
        {
          id: "3",
          name: "Requirement 3",
          description: "Description 3",
          type: "requirement",
          version: "1.0.0",
          status: RequirementStatus.NOT_TRACKED,
        },
        {
          id: "4",
          name: "Requirement 4",
          description: "Description 4",
          type: "requirement",
          version: "1.0.0",
          status: RequirementStatus.NOT_TRACKED,
        },
      ];

      requirementService.addRequirements(newRequirement);

      expect(mockGlobalStateService.updateState).toHaveBeenCalledWith(
        StateKeys.REQUIREMENTS,
        [mockRequirements[0], mockRequirements[1], ...newRequirement],
      );
    });
  });

  describe("saveRequirements", () => {
    it("should update globalstate requirements list", async () => {
      const newRequirementList: Requirement[] = [
        {
          id: "3",
          name: "Requirement 3",
          description: "Description 3",
          type: "requirement",
          version: "1.0.0",
          status: RequirementStatus.NOT_TRACKED,
        },
        {
          id: "4",
          name: "Requirement 4",
          description: "Description 4",
          type: "requirement",
          version: "1.0.0",
          status: RequirementStatus.NOT_TRACKED,
        },
      ];

      await requirementService.saveRequirements(newRequirementList);

      expect(mockGlobalStateService.updateState).toHaveBeenCalledWith(
        StateKeys.REQUIREMENTS,
        [...newRequirementList],
      );

      const requirements = (requirementService as any)._requirements;
      expect(requirements).toEqual(
        new Map<string, Requirement>([
          ["3", newRequirementList[0]],
          ["4", newRequirementList[1]],
        ]),
      );

      expect(mockGlobalStateService.updateState).toHaveBeenCalledWith(
        StateKeys.REQUIREMENTS,
        Array.from(requirements.values()),
      );
    });
  });

  describe("getRequirements", () => {
    it("should retrive requirements list from globalstate", async () => {
      const requirements = requirementService.getRequirements();

      expect(mockGlobalStateService.getState).toBeCalledWith(
        StateKeys.REQUIREMENTS,
      );
      expect(requirements).toEqual(mockRequirements);
    });
  });

  describe("deleteRequirement", () => {
    it("should delete a requirement and update globalstate", async () => {
      await requirementService.deleteRequirement("1");

      const requirements = requirementService.getRequirements();

      expect(mockGlobalStateService.updateState).toBeCalledWith(
        StateKeys.REQUIREMENTS,
        [mockRequirements[1]],
      );
      expect(requirements).toEqual([mockRequirements[1]]);
    });
  });

  describe("clearRequirements", () => {
    it("should clear globalstate requirement list", async () => {
      let requirements = (requirementService as any)._requirements;
      expect(requirements.size).toBe(2);

      await requirementService.clearRequirements();
      requirements = (requirementService as any)._requirements;

      expect(mockGlobalStateService.clearState).toBeCalledWith(
        StateKeys.REQUIREMENTS,
      );
      expect(requirements.size).toBe(0);
    });
  });

  describe("getById", () => {
    it("should retrive requirement from its id", async () => {
      let mockId = "1";
      expect(requirementService.getById(mockId)).toEqual(mockRequirements[0]);

      mockId = "3";
      expect(requirementService.getById(mockId)).toEqual(undefined);
    });
  });

  describe("updateRequirementCodeReference", () => {
    it("should update code reference and status for an existing requirement", async () => {
      const codeReference = {
        filePath: "test.ts",
        lineNumber: 1,
        snippet: "test content",
        score: 1.0,
      };

      await requirementService.updateRequirementCodeReference(
        "1",
        codeReference,
      );

      const updatedRequirement = requirementService.getById("1");
      expect(updatedRequirement?.codeReference).toEqual(codeReference);
      expect(updatedRequirement?.status).toBe(RequirementStatus.TRACKED);
      expect(mockGlobalStateService.updateState).toHaveBeenCalledWith(
        StateKeys.REQUIREMENTS,
        expect.arrayContaining([
          expect.objectContaining({
            id: "1",
            codeReference,
            status: RequirementStatus.TRACKED,
          }),
        ]),
      );
    });

    it("should do nothing for non-existent requirement id", async () => {
      const codeReference = {
        filePath: "test.ts",
        lineNumber: 1,
        snippet: "test content",
        score: 1.0,
      };

      await requirementService.updateRequirementCodeReference(
        "999",
        codeReference,
      );

      expect(requirementService.getById("999")).toBeUndefined();
      expect(mockGlobalStateService.updateState).not.toHaveBeenCalled();
    });
  });

  describe("updateRequirementStatus", () => {
    it("should update status for an existing requirement", async () => {
      mockGlobalStateService.updateState.mockClear();

      await requirementService.updateRequirementStatus(
        "1",
        RequirementStatus.TRACKED,
      );

      const updatedRequirement = requirementService.getById("1");
      expect(updatedRequirement?.status).toBe(RequirementStatus.TRACKED);

      expect(mockGlobalStateService.updateState).toHaveBeenCalledWith(
        StateKeys.REQUIREMENTS,
        expect.arrayContaining([
          expect.objectContaining({
            id: "1",
            status: RequirementStatus.TRACKED,
          }),
        ]),
      );
    });

    it("should do nothing for non-existent requirement id", async () => {
      mockGlobalStateService.updateState.mockClear();

      await requirementService.updateRequirementStatus(
        "999",
        RequirementStatus.TRACKED,
      );

      expect(requirementService.getById("999")).toBeUndefined();

      expect(mockGlobalStateService.updateState).not.toHaveBeenCalled();
    });
  });
});
