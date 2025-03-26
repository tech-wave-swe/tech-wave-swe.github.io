import { Requirement } from "../Models/Requirement";
import {
  TrackingResult,
  CodeReference,
  TrackingResultSummary,
} from "../Models/TrackingModels";
import { IVectorDatabase } from "../Interfaces/IVectorDatabase";
import { DocumentServiceFacade } from "../Facades/DocumentServiceFacade";
import { QueryResult } from "../Models/QueryResult";
import * as vscode from "vscode";
import {FilterService} from "./FilterService";

export class RequirementsTrackerService {
  private _vectorDatabase: IVectorDatabase;
  private _documentServiceFacade: DocumentServiceFacade;
  private _filterService: FilterService;

  constructor(
    vectorDatabase: IVectorDatabase,
    documentServiceFacade: DocumentServiceFacade,
    filterService: FilterService,
  ) {
    this._vectorDatabase = vectorDatabase;
    this._documentServiceFacade = documentServiceFacade;
    this._filterService = filterService;
  }

  public async trackRequirementImplementation(
    requirement: Requirement,
    codeFiles: string[],
  ): Promise<TrackingResult> {
    try {
      // Process and embed code files if they're not already indexed
      try {
        await this._documentServiceFacade.processFiles(codeFiles);
      } catch {
        console.warn(`Some files could not be processed:`);
        // Continue with the tracking using whatever was successfully indexed
      }

      // Search for code that might implement the requirement
      const queryResults = await this.findRelatedCode(requirement);

      // Convert query results to code references
      const codeReferences = this._convertToCodeReferences(queryResults);

      // Determine implementation status
      const implementationStatus =
        this._determineImplementationStatus(codeReferences);

      // Calculate score based on number and quality of matches
      const score = this._calculateImplementationScore(codeReferences);

      return {
        requirementId: requirement.id,
        codeReferences,
        implementationStatus,
        score,
      };
    } catch (error) {
      console.error(`Error tracking requirement implementation: ${error}`);
      // Return partial result in case of failure
      return {
        requirementId: requirement.id,
        codeReferences: [],
        implementationStatus: "not-implemented",
        score: 0,
      };
    }
  }

  public async findRelatedCode(
    requirement: Requirement,
  ): Promise<QueryResult[]> {
    try {
      // Use the requirement description as the query
      const query = requirement.description;
      console.log(`Finding code related to requirement ${requirement.id}`);
      console.log(`Query: ${query.substring(0, 100)}...`);

      // Query the documents collection for relevant code
      const results = await this._vectorDatabase.query(
        query,
        this._vectorDatabase.DOCUMENTS_COLLECTION,
        10, // Get more results for better coverage
      );

      console.log(`Found ${results.length} potential code matches`);

      // Filter out results that are themselves requirements
      const codeResults = results.filter(
        (result) =>
          !result.metadata.isRequirement && !result.metadata.requirementId,
      );

      console.log(
        `After filtering out requirements, ${codeResults.length} code matches remain`,
      );

      return codeResults;
    } catch (error) {
      console.error(`Error finding related code: ${error}`);
      throw error;
    }
  }

  private _convertToCodeReferences(
    queryResults: QueryResult[],
  ): CodeReference[] {
    console.log(
      `Converting ${queryResults.length} query results to code references`,
    );

    return queryResults.map((result, index) => {
      // Extract file path from metadata
      const filePath =
        result.metadata.filePath ||
        (result.metadata.file ? result.metadata.file : "unknown");

      console.log(`Processing result ${index + 1}: File ${filePath}`);

      // Determine line numbers
      let lineStart: number;
      if (typeof result.metadata.line === "number") {
        lineStart = result.metadata.line;
        console.log(`Using line from metadata: ${lineStart}`);
      } else if (typeof result.metadata.lineStart === "number") {
        lineStart = result.metadata.lineStart;
        console.log(`Using lineStart from metadata: ${lineStart}`);
      } else if (typeof result.metadata.chunkIndex === "number") {
        // When no specific line number is available, try to estimate from chunk index
        const chunk = result.metadata.chunkIndex;
        // Estimate more conservatively - don't multiply by an arbitrary number
        lineStart = chunk > 0 ? chunk + 1 : 1;
        console.log(`Estimated line from chunkIndex: ${lineStart}`);
      } else {
        lineStart = 1; // Default to first line if no info available
        console.log(`No line information available, defaulting to line 1`);
      }

      const lineCount = this._countLines(result.text);
      const lineEnd = lineStart + lineCount - 1;
      console.log(`Line count: ${lineCount}, lineEnd: ${lineEnd}`);

      // Add a relevance explanation
      const relevanceExplanation = `This code matches the requirement with a similarity score of ${Math.round(result.score * 100)}%`;

      return {
        filePath,
        lineStart,
        lineEnd,
        snippet: result.text,
        score: result.score,
        relevanceExplanation, // Add this to explain the relevance
      };
    });
  }

  public async findUnimplementedRequirements(
    requirements: Requirement[],
  ): Promise<Requirement[]> {
    const unimplemented: Requirement[] = [];

    for (const requirement of requirements) {
      const relatedCode = await this.findRelatedCode(requirement);

      // If we don't find any related code, consider it unimplemented
      if (
        relatedCode.length === 0 ||
        this._calculateAverageScore(relatedCode) < 0.3
      ) {
        unimplemented.push(requirement);
      }
    }

    return unimplemented;
  }

  public async trackAllRequirements(
    requirements: Requirement[],
  ): Promise<TrackingResultSummary> {
    console.log(`Starting tracking for ${requirements.length} requirements`);
    const results = new Map<string, TrackingResult>();
    let implemented = 0;
    let partiallyImplemented = 0;
    let unimplemented = 0;

    // Todo(MonettiLuca): Servizio del modello dice all'interfaccia di fare qualcosa. Spostare nel controller.
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Tracking requirements implementation",
        cancellable: false,
      },
      async (progress) => {
        const total = requirements.length;

        for (let i = 0; i < total; i++) {
          const requirement = requirements[i];
          progress.report({
            message: `Processing requirement ${i + 1}/${total}`,
            increment: (1 / total) * 100,
          });

          console.log(
            `Tracking implementation for requirement ${requirement.id}`,
          );

          // Find all workspace code files
          const codeFiles = await this._findWorkspaceCodeFiles();
          console.log(`Found ${codeFiles.length} code files in workspace`);

          // Track implementation
          const result = await this.trackRequirementImplementation(
            requirement,
            codeFiles,
          );
          results.set(requirement.id, result);

          // Count by status
          switch (result.implementationStatus) {
            case "implemented":
              implemented++;
              break;
            case "partially-implemented":
              partiallyImplemented++;
              break;
            case "not-implemented":
              unimplemented++;
              break;
          }

          console.log(
            `Requirement ${requirement.id} status: ${result.implementationStatus}, score: ${result.score}`,
          );
        }
      },
    );

    console.log(
      `Tracking complete. Implemented: ${implemented}, Partially: ${partiallyImplemented}, Unimplemented: ${unimplemented}`,
    );

    return {
      totalRequirements: requirements.length,
      implementedRequirements: implemented,
      partiallyImplementedRequirements: partiallyImplemented,
      unimplementedRequirements: unimplemented,
      requirementDetails: results,
    };
  }

  private _estimateLineNumber(chunkIndex: number, text: string): number {
    // Use chunk index if available, otherwise default to line 1
    return (chunkIndex || 0) * 20 + 1;
  }

  private _determineImplementationStatus(
    codeReferences: CodeReference[],
  ): "implemented" | "partially-implemented" | "not-implemented" {
    if (codeReferences.length === 0) {
      return "not-implemented";
    }

    // Calculate average score
    const avgScore = this._calculateAverageScore(codeReferences);

    if (avgScore > 0.7 && codeReferences.length >= 3) {
      return "implemented";
    } else if (avgScore > 0.4) {
      return "partially-implemented";
    } else {
      return "not-implemented";
    }
  }

  private _calculateImplementationScore(
    codeReferences: CodeReference[],
  ): number {
    if (codeReferences.length === 0) {
      return 0;
    }

    return this._calculateAverageScore(codeReferences);
  }

  private _calculateAverageScore(items: { score: number }[]): number {
    if (items.length === 0) {
      return 0;
    }

    const sum = items.reduce((total, item) => total + item.score, 0);
    return sum / items.length;
  }

  private _countLines(text: string): number {
    return (text.match(/\n/g) || []).length + 1;
  }

  private _getFilters(): {include: string, exclude: string} {
    const extensionFileFilters = this._filterService.getFileExtensionFilter();
    const pathFilters = this._filterService.getPathFilter();

    const includePath = pathFilters.include.join(",");
    const excludePath = pathFilters.exclude.join(",");

    let pathInclude = "";

    if (includePath == "") {
      if (extensionFileFilters.include.length == 0) {
        pathInclude = "**/*.*";
      } else {
        pathInclude = `**/*.{${extensionFileFilters.include.join(",")}}`;
      }
    } else {
      pathInclude = `{${includePath}`;

      if (extensionFileFilters.include.length == 0) {
        pathInclude += "}";
      } else {
        pathInclude += `,${extensionFileFilters.include.map((ext) => "**/*." + ext).join(",")}}`;
      }
    }

    let pathExclude = "";

    if (excludePath == "") {
      if (extensionFileFilters.exclude.length != 0) {
        pathExclude = `**/*.{${extensionFileFilters.exclude.join(",")}}`;
      }
    } else {
      pathExclude = `{${excludePath}`;

      if (extensionFileFilters.exclude.length == 0) {
        pathExclude += "}";
      } else {
        pathExclude += `,${extensionFileFilters.exclude.map((ext) => "**/*." + ext).join(",")}}`;
      }
    }

    return {include: pathInclude, exclude: pathExclude};
  }

  private async _findWorkspaceCodeFiles(): Promise<string[]> {
    const codeFiles: string[] = [];

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      return [];
    }

    const {include: pathInclude, exclude: pathExclude} = this._getFilters();

    for (const folder of workspaceFolders) {
      const files = await vscode.workspace.findFiles(
        new vscode.RelativePattern(folder, pathInclude),
        new vscode.RelativePattern(folder, pathExclude),
      );

      codeFiles.push(...files.map((file) => file.fsPath));
    }

    return codeFiles;
  }
}
