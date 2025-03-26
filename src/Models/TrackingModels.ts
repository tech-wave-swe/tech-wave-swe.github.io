export interface CodeReference {
  filePath: string;
  lineStart: number;
  lineEnd: number;
  snippet: string;
  score: number;
  relevanceExplanation?: string; // Add this field
}

export interface TrackingResult {
  requirementId: string;
  codeReferences: CodeReference[];
  implementationStatus:
    | "implemented"
    | "partially-implemented"
    | "not-implemented";
  score: number;
}

export interface TrackingResultSummary {
  totalRequirements: number;
  implementedRequirements: number;
  partiallyImplementedRequirements: number;
  unimplementedRequirements: number;
  requirementDetails: Map<string, TrackingResult>;
}
