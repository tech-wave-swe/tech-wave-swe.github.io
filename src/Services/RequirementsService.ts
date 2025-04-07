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

    await this._saveRequirements();
  }

  public async addRequirements(requirements: Requirement[]): Promise<void> {
    requirements.forEach((requirement) => {
      this._requirements.set(requirement.id, requirement);
    });

    await this._saveRequirements();
  }

  // <<<<<<< Updated upstream
  public async saveRequirements(requirements: Requirement[]): Promise<void> {
    this._requirements.clear();
    // =======
    //   public addRequirements(requirement: Requirement[]): void {
    //     requirement.forEach((req) => {
    //       console.log(`Adding ${req.id} with value ${req}`);

    //       this._requirements.set(req.id, req);
    //     });
    //     console.log(`Added ${requirement.length} requirements`);
    //   }
    // >>>>>>> Stashed changes

    requirements.forEach((requirement) => {
      this._requirements.set(requirement.id, requirement);
    });
    // console.log(`Saving ${reqs.length} requirements`);
    console.log(`Map contains ${this._requirements.size} requirements`);

    await this._saveRequirements();
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
    await this._saveRequirements();
  }

  private async _saveRequirements(): Promise<void> {
    await this._globalStateService.updateState(
      StateKeys.REQUIREMENTS,
      Array.from(this._requirements.values()),
    );
  }

  private _loadRequirements(): void {
    const res = this._globalStateService.getState(
      StateKeys.REQUIREMENTS,
    ) as Requirement[];

    res.forEach((requirement) => {
      this._requirements.set(requirement.id, requirement);
    });
  }
}
