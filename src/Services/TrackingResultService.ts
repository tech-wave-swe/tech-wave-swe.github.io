import {GlobalStateService, StateKeys} from "./GlobalStateService";
import {TrackingResult, TrackingResultDetails, TrackingResultSummary} from "../Models/TrackingModels";

interface CustomGSData {details: TrackingResultDetails, results: TrackingResult[]}

export class TrackingResultService {
  private _details: TrackingResultDetails|undefined;
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
  }

  public getById(id: string): TrackingResult | undefined {
    return this._results.get(id);
  }

  public async confirmResult(id: string) {
    if (this._details == undefined) {
      throw new Error("No details found.");
    }

    const res = this._results.get(id);

    if (res) {
      this._details.confirmedMatches++;

      if(res.implementationStatus == "unlikely-match") {
        this._details.unlikelyMatches--;
      } else {
        this._details.possibleMatches--;
      }

      this._results.delete(id);
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
    if (!this._details) {
      this._details = {
        totalRequirements: trs.totalRequirements,
        confirmedMatches: trs.confirmedMatches,
        possibleMatches: trs.possibleMatches,
        unlikelyMatches: trs.unlikelyMatches,
      };
    } else {
      this._details.totalRequirements = trs.totalRequirements;
      this._details.confirmedMatches = trs.confirmedMatches;
      this._details.possibleMatches = trs.possibleMatches;
      this._details.unlikelyMatches = trs.unlikelyMatches;
    }

    console.log(trs.requirementDetails);

    if (trs.requirementDetails) {
      (trs.requirementDetails as Map<string, TrackingResult>).forEach((requirementDetail) => {
        this._results.set(requirementDetail.requirementId, requirementDetail);
      });
    }
  }

  private _DStoTRS(): TrackingResultSummary {
    if (!this._details) {
      throw new Error("No tracking details found.");
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

    if (res && res.details && res.results) {
      this._details = res.details;
      this._results.clear();

      res.results.forEach((result: TrackingResult) => {
        this._results.set(result.requirementId, result);
      })
    }
  }
}
