import {Requirement} from "../Models/Requirement";
import {GlobalStateService, StateKeys} from "./GlobalStateService";

export class RequirementsService {

  private _requirements: Map<string, Requirement> = new Map<string, Requirement>();
  private _globalStateService: GlobalStateService;

  constructor(globalStateService: GlobalStateService) {
    this._globalStateService = globalStateService;

    const res = this.getRequirements();
    res.forEach(requirement => {
      this._requirements.set(requirement.id, requirement);
    });
  }

  public async addRequirement(requirement: Requirement): Promise<void> {
    const reqs: Requirement[] = [];

    this._requirements.set(requirement.id, requirement);
    this._requirements.forEach((requirement: Requirement) => {
      reqs.push(requirement);
    })

    await this.saveRequirement(reqs);
  }

  public async saveRequirement(requirements: Requirement[]): Promise<void> {
    this._requirements.clear();

    requirements.forEach(requirement => {
      this._requirements.set(requirement.id, requirement);
    });

    await this._saveRequirement(requirements);
  }

  private async _saveRequirement(requirements: Requirement[]): Promise<void> {
    await this._globalStateService.updateState(StateKeys.REQUIREMENTS, requirements);
  }

  public getRequirements(): Requirement[] {
    return this._globalStateService.getState(StateKeys.REQUIREMENTS) as Requirement[];
  }

  public async clearRequirements(): Promise<void> {
    await this._globalStateService.clearState(StateKeys.REQUIREMENTS);
  }

  public getById(id: string): Requirement|undefined {
    return this._requirements.get(id);
  }
}
