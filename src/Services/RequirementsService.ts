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
    this._loadRequirements();
  }

  public async addRequirement(requirement: Requirement): Promise<void> {
    this._requirements.set(requirement.id, requirement);

    await this._saveRequirement();
  }

  public async saveRequirement(requirements: Requirement[]): Promise<void> {
    this._requirements.clear();

    requirements.forEach((requirement) => {
      this._requirements.set(requirement.id, requirement);
    });

    await this._saveRequirement();
  }

  public getRequirements(): Requirement[] {
    return Array.from(this._requirements.values());
  }

  public async clearRequirements(): Promise<void> {
    await this._globalStateService.clearState(StateKeys.REQUIREMENTS);
    this._requirements.clear();
  }

  public getById(id: string): Requirement | undefined {
    return this._requirements.get(id);
  }

  public async deleteRequirement(id: string): Promise<void> {
    this._requirements.delete(id);
    await this._saveRequirement();
  }

  private async _saveRequirement(): Promise<void> {
    await this._globalStateService.updateState(
      StateKeys.REQUIREMENTS,
      Array.from(this._requirements.values()),
    );
  }

  private _loadRequirements(): void {
    const res = this._globalStateService.getState(StateKeys.REQUIREMENTS) as Requirement[];

    res.forEach((requirement) => {
      this._requirements.set(requirement.id, requirement);
    });
  }
}
