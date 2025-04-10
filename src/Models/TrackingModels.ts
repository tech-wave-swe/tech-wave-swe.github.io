export interface CodeReference {
  filePath: string;
  lineNumber: number;
  snippet: string;
  score: number;
  revelanceExplanation?: string;
  contextRange?: {
    start: number;
    end: number;
  };
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

export interface TrackingResultDetails {
  totalRequirements: number;
  confirmedMatches: number;
  possibleMatches: number;
  unlikelyMatches: number;
}

export interface TrackingResultSummary extends TrackingResultDetails {
  requirementDetails: Map<string, TrackingResult>;
}
