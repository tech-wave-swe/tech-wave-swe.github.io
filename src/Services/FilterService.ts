import {ConfigServiceFacade} from "../Facades/ConfigServiceFacade";
import {ConfigFilters} from "../Models/Config";
import {FileExtensionFilter, PathFilter, RequirementFilter} from "../Models/Filter";

export class FilterService {
  private _filters: ConfigFilters;

  constructor() {
    this._filters = ConfigServiceFacade.GetInstance().getFilters();
  }

  public getPathFilter(): PathFilter {
    return this._filters.path;
  }

  public getFileExtensionFilter(): FileExtensionFilter {
    return this._filters.file_extension;
  }

  public getRequirementsFilters(): Record<string, RequirementFilter> {
    return this._filters.requirement;
  }

  public getRequirementFilters(requirementId: string): RequirementFilter | undefined {
    return this._filters.requirement[requirementId];
  }

  public hasRequirementsFilters(requirementId: string): boolean {
    return !!(this._filters.requirement[requirementId]);
  }
}