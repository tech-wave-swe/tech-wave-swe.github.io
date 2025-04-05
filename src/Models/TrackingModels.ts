export interface CodeReference {
  filePath: string;
  lineNumber: number;
  snippet: string;
  score: number;
  relevanceExplanation?: string;
}

export type ImplementationStatus =
  | "confirmed-match"
  | "possible-match"
  | "unlikely-match";

export interface TrackingResult {
  requirementId: string;
  codeReferences: CodeReference[];
  implementationStatus: ImplementationStatus;
  score: number;
}

export interface TrackingResultSummary {
  totalRequirements: number;
  confirmedMatches: number;
  possibleMatches: number;
  unlikelyMatches: number;
  requirementDetails: Map<string, TrackingResult>;
}
