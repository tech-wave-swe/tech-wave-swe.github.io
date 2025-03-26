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

  public getRequirementsFilters(reqId?: string): Record<string, RequirementFilter> {
    if (reqId === undefined) {
      return this._filters.requirement;
    }

    return {key: this._filters.requirement[reqId]};
  }
}