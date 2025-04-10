import { Requirement } from "../Models/Requirement";
import {
  TrackingResult,
  CodeReference,
  TrackingResultSummary,
  ImplementationStatus,
} from "../Models/TrackingModels";
import { ILanguageModel } from "../Interfaces/ILanguageModel";
import { IVectorDatabase } from "../Interfaces/IVectorDatabase";
import { DocumentServiceFacade } from "../Facades/DocumentServiceFacade";
import * as vscode from "vscode";
import { FilterService } from "./FilterService";
import { Chunk } from "../Models/Chunk";

export class RequirementsTrackerService {
  private _vectorDatabase: IVectorDatabase;
  private _documentServiceFacade: DocumentServiceFacade;
  private _filterService: FilterService;
  private _languageModel: ILanguageModel;

  constructor(
    vectorDatabase: IVectorDatabase,
    documentServiceFacade: DocumentServiceFacade,
    filterService: FilterService,
    languageModel: ILanguageModel,
  ) {
    this._vectorDatabase = vectorDatabase;
    this._documentServiceFacade = documentServiceFacade;
    this._filterService = filterService;
    this._languageModel = languageModel;
  }

  public async analyzeImplementation(
    requirement: Requirement,
    codeReferences: CodeReference[],
  ): Promise<string> {
    console.log("Analyzing Implementations");
    console.log(requirement);
    console.log(codeReferences);

    try {
      const prompt = `Analyze if this code implements the requirement. Be specific and concise.

  Requirement:
  ${requirement.description}

  Implementations:
  ${codeReferences
    .map(
      (ref, idx) => `
Implementation #${idx + 1}:
File: ${ref.filePath}:${ref.lineNumber}
Code:
${ref.snippet}`,
    )
    .join("\n")}

  Respond in this exact format, using the markers exactly as shown:
  [CODE_START]
  <paste the most relevant code implementation here>
  [CODE_END]
  [INDEX_START]
  <write the implementation number (1-${codeReferences.length}) that best matches>
  [INDEX_END]
  [ANALYSIS_START]
  <write your analysis here>
  [ANALYSIS_END]`;

      return await this._languageModel.generate(prompt);
    } catch (error) {
      console.error("Error analyzing implementation:", error);
      throw error;
    }
  }

  private async trackRequirementImplementation(
    requirement: Requirement,
  ): Promise<TrackingResult> {
    try {
      // Find related code
      const queryResults = await this.findRelatedCode(requirement);

      // Convert results to references
      const codeReferences = this._convertToCodeReferences(queryResults);

      // Determine implementation status and score
      const implementationStatus =
        this._determineImplementationStatus(codeReferences);
      const score = this._calculateImplementationScore(codeReferences);

      return {
        requirementId: requirement.id,
        codeReferences,
        implementationStatus,
        score,
      };
    } catch (error) {
      console.error(`Error analyzing requirement ${requirement.id}:`, error);
      throw error;
    }
  }

  public async processWorkspaceFiles(): Promise<string[]> {
    const codeFiles = await this._findWorkspaceCodeFiles();

    if (codeFiles.length > 0) {
      try {
        await this._documentServiceFacade.processFiles(codeFiles);
      } catch (error) {
        console.error("Error processing workspace files:", error);
        throw error;
      }
    }

    return codeFiles;
  }

  public async findRelatedCode(requirement: Requirement): Promise<Chunk[]> {
    try {
      const query = requirement.description;

      const results = await this._vectorDatabase.queryForChunks(query);

      return results;
    } catch (error) {
      console.error(`Error finding related code: ${error}`);
      throw error;
    }
  }

  private _convertToCodeReferences(chunks: Chunk[]): CodeReference[] {
    return chunks
      .map((chunk) => {
        return {
          snippet: chunk.content,
          lineContent: chunk.lineContent,
          filePath: chunk.filePath,
          lineNumber: chunk.lineNumber,
          score: chunk.score ?? 0,
          relevanceExplanation: `Match score: ${Math.round((chunk.score || 0) * 100)}%`,
          contextRange: {
            start: chunk.lineNumber - 3 > 0 ? chunk.lineNumber - 3 : 0,
            end: chunk.lineNumber + 3,
          },
        };
      })
      .sort((a, b) => b.score - a.score); // Sort by score in descending order
  }
  public async findUnimplementedRequirements(
    requirements: Requirement[],
  ): Promise<Requirement[]> {
    const unimplemented: Requirement[] = [];

    console.log(requirements);

    return unimplemented;
  }

  public async trackAllRequirements(
    requirements: Requirement[],
  ): Promise<TrackingResultSummary> {
    const results = new Map<string, TrackingResult>();
    let confirmed = 0;
    let possible = 0;
    let unlikely = 0;

    try {
      return await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Analyzing requirements",
          cancellable: true,
        },
        async (progress, token) => {
          await this.processWorkspaceFiles();

          const total = requirements.length;
          const batchSize = 20;

          for (
            let i = 0;
            i < requirements.length && !token.isCancellationRequested;
            i += batchSize
          ) {
            const batch = requirements.slice(
              i,
              Math.min(i + batchSize, requirements.length),
            );

            const batchPromises = batch.map((requirement) =>
              this.trackRequirementImplementation(requirement).then(
                (result) => ({ requirement, result }),
              ),
            );

            const batchResults = await Promise.all(batchPromises);

            for (const { requirement, result } of batchResults) {
              results.set(requirement.id, result);
              switch (result.implementationStatus) {
                case "confirmed-match":
                  confirmed++;
                  break;
                case "possible-match":
                  possible++;
                  break;
                case "unlikely-match":
                  unlikely++;
                  break;
              }
            }

            // Update progress
            progress.report({
              message: `Analyzed ${i + batch.length}/${total} requirements`,
              increment: (batch.length / total) * 100,
            });
          }

          const summary = {
            totalRequirements: requirements.length,
            confirmedMatches: confirmed,
            possibleMatches: possible,
            unlikelyMatches: unlikely,
            requirementDetails: results,
          };

          return summary;
        },
      );
    } catch (error) {
      console.error("Error during requirement tracking:", error);
      throw error;
    }
  }

  private _determineImplementationStatus(
    codeReferences: CodeReference[],
  ): ImplementationStatus {
    if (codeReferences.length === 0) {
      return "unlikely-match";
    }

    // Calculate weighted average score
    const totalScore = codeReferences.reduce((sum, ref) => sum + ref.score, 0);
    const avgScore = totalScore / codeReferences.length;

    if (avgScore >= 0.85) {
      return "confirmed-match";
    } else if (avgScore >= 0.5) {
      return "possible-match";
    }

    return "unlikely-match";
  }

  private _calculateImplementationScore(
    codeReferences: CodeReference[],
  ): number {
    if (codeReferences.length === 0) {
      return 0;
    }

    return this._calculateAverageScore(codeReferences);
  }

  private _calculateAverageScore(items: { score?: number }[]): number {
    if (items.length === 0) {
      return 0;
    }

    const sum = items.reduce((total, item) => total + (item.score || 0), 0);
    return sum / items.length;
  }

  private async _findWorkspaceCodeFiles(): Promise<string[]> {
    const codeFiles: string[] = [];

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      console.warn("No workspace folders found");
      return [];
    }

    const { include: pathInclude, exclude: pathExclude } = this._getFilters();

    console.log(
      `Scanning workspace folders: ${workspaceFolders.map((f) => f.name).join(", ")}`,
    );

    for (const folder of workspaceFolders) {
      console.log(`Scanning folder: ${folder.name}`);
      console.log(`Using file pattern: ${pathInclude}`);
      console.log(`Excluding files: ${pathExclude}`);
      const files = await vscode.workspace.findFiles(
        new vscode.RelativePattern(folder, pathInclude),
        new vscode.RelativePattern(folder, pathExclude),
      );

      const folderFiles = files.map((file) => file.fsPath);
      console.log(`Found ${folderFiles.length} files in ${folder.name}:`);
      folderFiles.forEach((f) => console.log(` - ${f}`));

      codeFiles.push(...folderFiles);
    }

    console.log(`Total files found: ${codeFiles.length}`);
    return codeFiles;
  }

  private _getFilters(): { include: string; exclude: string } {
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

    return { include: pathInclude, exclude: pathExclude };
  }
}
