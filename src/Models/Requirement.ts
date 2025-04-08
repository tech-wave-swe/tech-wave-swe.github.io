import {CodeReference} from "./TrackingModels";

export interface Requirement {
  id: string;
  name: string;
  description: string;
  type: string;
  version: string;
  status: RequirementStatus;
  score?: string;
  codeReference?: CodeReference;
}

export enum RequirementStatus {
  TRACKED = "Tracked",
  NOT_TRACKED = "Not Tracked",
  PENDING = "Pending",
  UNKNOWN = "Unknown"
}