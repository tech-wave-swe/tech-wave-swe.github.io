import {GlobalStateService, StateKeys} from "./GlobalStateService";
import {TrackingResult, TrackingResultDetails, TrackingResultSummary} from "../Models/TrackingModels";

interface CustomGSData {
  details: TrackingResultDetails,
  results: TrackingResult[]
}

export class TrackingResultService {
  private _details: TrackingResultDetails | undefined;
  private _results: Map<string, TrackingResult> = new Map<
    string,
    TrackingResult
  >();
  private _globalStateService: GlobalStateService;

  constructor(globalStateService: GlobalStateService) {
    this._globalStateService = globalStateService;

    this._loadTrackingResult();
  }

  public async saveTrackingResult(trs: TrackingResultSummary): Promise<void> {
    this._TRStoDS(trs);

    await this._saveTrackingResult();
  }

  public async deleteRequirement(requirementId: string): Promise<void> {
    if (this._details != undefined) {
      await this._deleteRequirement(requirementId);
    }
  }

  public getTrakingResult(): TrackingResult[] {
    return Array.from(this._results.values());
  }

  public getTrackingDetails(): TrackingResultDetails {
    if (this._details == undefined) {
      throw new Error("No tracking details found.");
    }

    return this._details;
  }

  public getTrakingResultSummary(): TrackingResultSummary | undefined {
    try {
      return this._DStoTRS();
    } catch (error) {
      console.error("Error getting tracking result summary:", error);

      return undefined;
    }
  }

  public async clearRequirements(): Promise<void> {
    await this._globalStateService.clearState(StateKeys.TRACKING_RESULTS);
    this._results.clear();
    this._details = undefined;

    console.log(this._globalStateService.getState(StateKeys.TRACKING_RESULTS));
    console.log(this._results.size, this._details);
  }

  public async removeCodeReference(id: string, codeReferenceId: number): Promise<void> {
    if (this._details == undefined) {
      throw new Error("No details found.");
    }

    const res = this._results.get(id);

    if (res) {
      res.codeReferences.splice(codeReferenceId, 1);

      if (res.codeReferences.length == 0) {
        await this._deleteRequirement(id);
      } else {
        this._results.set(id, res);
      }

      await this._saveTrackingResult();
    }
  }

  public getById(id: string): TrackingResult | undefined {
    return this._results.get(id);
  }

  public async confirmResult(id: string) {
    if (this._details == undefined) {
      throw new Error("No details found.");
    }

    // Increment confirmed matches before deleting the requirement
    this._details.confirmedMatches++;
    
    await this._deleteRequirement(id);
  }

  private async _deleteRequirement(requirementId: string): Promise<void> {
    if (this._details != undefined) {
      const res = this._results.get(requirementId);

      if (res != undefined) {
        if (res.implementationStatus == "unlikely-match") {
          this._details.unlikelyMatches--;
        } else {
          this._details.possibleMatches--;
        }

        this._details.totalRequirements--;

        this._results.delete(requirementId);
      }

      await this._saveTrackingResult();
    }
  }

  private async _saveTrackingResult(): Promise<void> {
    await this._globalStateService.updateState(
      StateKeys.TRACKING_RESULTS,
      this._DStoGS(),
    );
  }

  private _loadTrackingResult(): void {
    this._GStoDS();
  }

  private _TRStoDS(trs: TrackingResultSummary): void {
    this._details = {
      totalRequirements: trs.totalRequirements,
      confirmedMatches: trs.confirmedMatches,
      possibleMatches: trs.possibleMatches,
      unlikelyMatches: trs.unlikelyMatches,
    };

    if (trs.requirementDetails) {
      (trs.requirementDetails as Map<string, TrackingResult>).forEach((requirementDetail) => {
        this._results.set(requirementDetail.requirementId, requirementDetail);
      });
    }
  }

  private _DStoTRS(): TrackingResultSummary | undefined {
    if (!this._details) {
      return undefined;
    }

    return {
      totalRequirements: this._details.totalRequirements,
      confirmedMatches: this._details.confirmedMatches,
      possibleMatches: this._details.possibleMatches,
      unlikelyMatches: this._details.unlikelyMatches,
      requirementDetails: this._results,
    };
  }

  private _DStoGS(): CustomGSData {
    if (!this._details) {
      throw new Error("No tracking details found.");
    }

    return {
      details: this._details,
      results: Array.from(this._results.values()),
    };
  }

  private _GStoDS(): void {
    const res = this._globalStateService.getState(
      StateKeys.TRACKING_RESULTS,
    ) as CustomGSData;

    console.log(res);

    if (res && res.details && res.results) {
      this._details = res.details;
      this._results.clear();

      res.results.forEach((result: TrackingResult) => {
        this._results.set(result.requirementId, result);
      });
    }
  }
}
