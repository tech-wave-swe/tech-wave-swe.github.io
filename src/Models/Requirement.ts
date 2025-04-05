export interface Requirement {
  id: string;
  name: string;
  description: string;
  type: string;
  version: string;
  status?: string;
  score?: string;
}
