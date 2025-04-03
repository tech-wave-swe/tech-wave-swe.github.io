import { Requirement } from "../Models/Requirement";
import { GlobalStateService, StateKeys } from "./GlobalStateService";

export class RequirementsService {
  private _requirements: Map<string, Requirement> = new Map<
    string,
    Requirement
  >();
  private _globalStateService: GlobalStateService;

  constructor(globalStateService: GlobalStateService) {
    this._globalStateService = globalStateService;

    const res = this.getRequirements();
    res.forEach((requirement) => {
      this._requirements.set(requirement.id, requirement);
    });
  }

  public addRequirements(requirement: Requirement[]): void {
    requirement.forEach((req) => {
      this._requirements.set(req.id, req);
    });
  }

  public async saveRequirements(): Promise<void> {
    const reqs: Requirement[] = [];
    this._requirements.forEach((requirement: Requirement) => {
      reqs.push(requirement);
    });

    await this._globalStateService.updateState(StateKeys.REQUIREMENTS, reqs);
  }

  // ToDo(MonettiLuca): Use cache layer instead of global state
  public getRequirements(): Requirement[] {
    return this._globalStateService.getState(
      StateKeys.REQUIREMENTS,
    ) as Requirement[];
  }

  public async clearRequirements(): Promise<void> {
    await this._globalStateService.clearState(StateKeys.REQUIREMENTS);
    this._requirements.clear();
  }

  public getById(id: string): Requirement | undefined {
    return this._requirements.get(id);
  }
}
