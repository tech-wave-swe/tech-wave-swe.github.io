import {Requirement} from "../Models/Requirement";
import {CodeReference, ImplementationStatus, TrackingResult, TrackingResultSummary,} from "../Models/TrackingModels";
import {ILanguageModel} from "../Interfaces/ILanguageModel";
import {IVectorDatabase} from "../Interfaces/IVectorDatabase";
import {DocumentServiceFacade} from "../Facades/DocumentServiceFacade";
import * as vscode from "vscode";
import {FilterService} from "./FilterService";
import {Chunk} from "../Models/Chunk";
import {ConfigServiceFacade} from "../Facades/ConfigServiceFacade";
import {TrackingResultService} from "./TrackingResultService";

export class RequirementsTrackerService {
  private _vectorDatabase: IVectorDatabase;
  private _documentServiceFacade: DocumentServiceFacade;
  private _filterService: FilterService;
  private _languageModel: ILanguageModel;
  private _trackingResultService: TrackingResultService;

  constructor(
    vectorDatabase: IVectorDatabase,
    documentServiceFacade: DocumentServiceFacade,
    filterService: FilterService,
    languageModel: ILanguageModel,
    trackingResultService: TrackingResultService,
  ) {
    this._vectorDatabase = vectorDatabase;
    this._documentServiceFacade = documentServiceFacade;
    this._filterService = filterService;
    this._languageModel = languageModel;
    this._trackingResultService = trackingResultService;
  }

  public async analyzeImplementation(
    requirement: Requirement,
    codeReferences: CodeReference[],
  ): Promise<string> {
    console.log("Analyzing Implementations");
    console.log(requirement);
    console.log(codeReferences);

    const initPrompt = ConfigServiceFacade.GetInstance().getPrompt();

    try {
      const prompt = `${initPrompt}

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

      console.log(prompt);

      return await this._languageModel.generate(prompt);
    } catch (error) {
      console.error("Error analyzing implementation:", error);
      throw error;
    }
  }

  private async trackRequirementImplementation(
    requirement: Requirement,
    filePaths?: string[]
  ): Promise<TrackingResult> {
    try {
      // Find related code
      const queryResults = await this.findRelatedCode(requirement, filePaths);

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

  private async _processRequirementFile(requirement: Requirement): Promise<string[]> {
    const codeFiles = await this._findSingleRequirementCodeFiles(requirement.id);

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

  public async findRelatedCode(requirement: Requirement, filePaths?: string[]): Promise<Chunk[]> {
    try {
      const query = requirement.description;

      return await this._vectorDatabase.queryForChunks(query, filePaths);
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

  public async trackAllRequirements(
    requirements: Requirement[],
  ): Promise<TrackingResultSummary> {
    try {
      return await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Analyzing requirements",
          cancellable: true,
        },
        async (progress, token) => {
          const total = requirements.length;
          const batchSize = 20;

          let summary = this._trackingResultService.getTrakingResultSummary();

          if (!summary) {
            summary = {
              totalRequirements: requirements.length,
              confirmedMatches: 0,
              possibleMatches: 0,
              unlikelyMatches: 0,
              requirementDetails: new Map<string, TrackingResult>,
            };
          }

          for (const req of requirements) {
            if (this._filterService.hasRequirementsFilters(req.id)) {
              await this._processRequirementFile(req);
            }
          }

          await this.processWorkspaceFiles();
          const filePaths = await this._findWorkspaceCodeFiles();

          for (
            let i = 0;
            i < requirements.length && !token.isCancellationRequested;
            i += batchSize
          ) {
            const batch = requirements.slice(
              i,
              Math.min(i + batchSize, requirements.length),
            );

            const batchPromises = batch.map(async (requirement) => {
              let result: TrackingResult;

              if (this._filterService.hasRequirementsFilters(requirement.id)) {
                result = await this.trackRequirementImplementation(requirement, await this._findSingleRequirementCodeFiles(requirement.id));
              } else {
                result = await this.trackRequirementImplementation(requirement, filePaths);
              }

              return ({requirement, result});
            });

            const batchResults = await Promise.all(batchPromises);

            for (const { requirement, result } of batchResults) {
              const previousResult = summary.requirementDetails.get(requirement.id);

              if (previousResult) {
                summary.totalRequirements--;

                switch (result.implementationStatus) {
                  case "confirmed-match":
                    summary.confirmedMatches--;
                    break;
                  case "possible-match":
                    summary.possibleMatches--;
                    break;
                  case "unlikely-match":
                    summary.unlikelyMatches--;
                    break;
                }
              }

              summary.totalRequirements++;
              switch (result.implementationStatus) {
                case "confirmed-match":
                  summary.confirmedMatches++;
                  break;
                case "possible-match":
                  summary.possibleMatches++;
                  break;
                case "unlikely-match":
                  summary.unlikelyMatches++;
                  break;
              }

              summary.requirementDetails.set(requirement.id, result);
            }

            // Update progress
            progress.report({
              message: `Analyzed ${i + batch.length}/${total} requirements`,
              increment: (batch.length / total) * 100,
            });
          }

          console.log(summary);

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

  private async _findSingleRequirementCodeFiles(requirementId: string): Promise<string[]> {
    const codeFiles: string[] = [];

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      console.warn("No workspace folders found");
      return [];
    }

    const requirementFilter = this._filterService.getRequirementFilters(requirementId);
    const pathInclude = requirementFilter?.search_path.join(",") || "**/*.*";

    console.log("------------ Path Include 1 ------------\n", pathInclude);

    console.log(
      `Scanning workspace folders: ${workspaceFolders.map((f) => f.name).join(", ")}`,
    );

    for (const folder of workspaceFolders) {
      const files = await vscode.workspace.findFiles(
        new vscode.RelativePattern(folder, pathInclude)
      );

      const folderFiles = files.map((file) => file.fsPath);
      console.log(`Found ${folderFiles.length} files in ${folder.name}:`);
      folderFiles.forEach((f) => console.log(` - ${f}`));

      codeFiles.push(...folderFiles);
    }

    console.log("------------ Path Include 2 ------------\n", codeFiles);

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
