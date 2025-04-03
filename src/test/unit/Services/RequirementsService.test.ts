import { expect, jest } from "@jest/globals";
import {
  GlobalStateService,
  StateKeys,
} from "../../../Services/GlobalStateService";
import { RequirementsService } from "../../../Services/RequirementsService";
import { Requirement } from "../../../Models/Requirement";

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
      },
      {
        id: "2",
        name: "Requirement 2",
        description: "Description 2",
        type: "requirement",
        version: "1.0.0",
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
      // Check id the constructor initializes the requirements from the global state
      expect(requirementService).toBeTruthy();

      const requirements = (requirementService as any)._requirements as Map<
        string,
        Requirement
      >;
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

      const requirements = (requirementService as any)._requirements as Map<
        string,
        Requirement
      >;
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
      };

      requirementService.addRequirements([newRequirement]);
      await requirementService.saveRequirements();

      expect(mockGlobalStateService.updateState).toHaveBeenCalledWith(
        StateKeys.REQUIREMENTS,
        [mockRequirements[0], mockRequirements[1], newRequirement],
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
        },
        {
          id: "4",
          name: "Requirement 4",
          description: "Description 4",
          type: "requirement",
          version: "1.0.0",
        },
      ];

      requirementService.addRequirements(newRequirementList);
      await requirementService.saveRequirements();

      expect(mockGlobalStateService.updateState).toHaveBeenCalledWith(
        StateKeys.REQUIREMENTS,
        [...mockRequirements, ...newRequirementList],
      );

      const requirements = (requirementService as any)._requirements as Map<
        string,
        Requirement
      >;
      expect(requirements).toEqual(
        new Map<string, Requirement>([
          ["1", mockRequirements[0]],
          ["2", mockRequirements[1]],
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
      expect(mockGlobalStateService.getState).toBeCalledWith(
        StateKeys.REQUIREMENTS,
      );
    });
  });

  describe("clearRequirements", () => {
    it("should clear globalstate requirement list", async () => {
      let requirements = (requirementService as any)._requirements as Map<
        string,
        Requirement
      >;
      expect(requirements.size).toBe(2);

      await requirementService.clearRequirements();
      requirements = (requirementService as any)._requirements as Map<
        string,
        Requirement
      >;

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
});
