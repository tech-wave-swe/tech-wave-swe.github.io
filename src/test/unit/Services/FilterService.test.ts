import { expect, jest } from "@jest/globals";
import { FilterService } from "../../../Services/FilterService";
import { ConfigServiceFacade } from "../../../Facades/ConfigServiceFacade";
import { ConfigFilters } from "../../../Models/Config";

jest.mock("../../../Facades/ConfigServiceFacade");

describe("FilterService", () => {
  let filterService: FilterService;
  let mockConfig: ConfigFilters;
  let mockConfigServiceFacade: jest.Mocked<ConfigServiceFacade>;

  beforeEach(() => {
    mockConfig = {
      path: {
        type: "path",
        include: [],
        exclude: ["**/Projects/**"],
      },
      file_extension: {
        type: "file_extension",
        include: ["md"],
        exclude: [],
      },
      requirement: {
        req1: {
          type: "requirement",
          search_path: ["./ADC/"],
        },
      },
    };

    mockConfigServiceFacade = {
      getFilters: jest.fn(),
    } as unknown as jest.Mocked<ConfigServiceFacade>;

    (mockConfigServiceFacade.getFilters as jest.Mock).mockReturnValue(
      mockConfig,
    );

    filterService = new FilterService(mockConfigServiceFacade);
  });

  it("should retrive filters from config service", () => {
    const filters = (filterService as unknown as { _filters: ConfigFilters })
      ._filters;
    expect(filters).toEqual(mockConfig);
  });

  it("should return path filter", () => {
    const pathFilter = filterService.getPathFilter();
    expect(pathFilter).toEqual(mockConfig.path);
  });

  it("should return file extension filter", () => {
    const fileExtensionFilter = filterService.getFileExtensionFilter();
    expect(fileExtensionFilter).toEqual(mockConfig.file_extension);
  });

  it("should return requirements filters", () => {
    const requirementFilter = filterService.getRequirementsFilters();
    expect(requirementFilter).toEqual(mockConfig.requirement);
  });

  it("should return specific requirement filter by ID", () => {
    const requirementFilter = filterService.getRequirementFilters("req1");

    console.log("Requirement Filter:", requirementFilter);

    expect(requirementFilter).toEqual(mockConfig.requirement.req1);
  });

  it("should return empty object for non-existing requirement filter", () => {
    const requirementFilter =
      filterService.getRequirementFilters("non_existing_id");
    expect(requirementFilter).toEqual(undefined);
  });

  it("should return true when requirement filters exist for given ID", () => {
    const hasFilters = filterService.hasRequirementsFilters("req1");
    expect(hasFilters).toBe(true);
  });

  it("should return false when requirement filters don't exist for given ID", () => {
    const hasFilters = filterService.hasRequirementsFilters("non_existing_id");
    expect(hasFilters).toBe(false);
  });
});
