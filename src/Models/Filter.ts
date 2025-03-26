export interface Filter {
  type: "requirement" | "path" | "file_extension";
}

export interface PathFilter extends Filter {
  type: "path";
  include: string[];
  exclude: string[];
}

export interface FileExtensionFilter extends Filter {
  type: "file_extension";
  include: string[];
  exclude: string[];
}

export interface RequirementFilter extends Filter {
  type: "requirement";
  search_path: string[]
}