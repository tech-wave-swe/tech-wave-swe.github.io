import * as vscode from "vscode";
import { LanceDBAdapter } from "../Adapters/LanceDBAdapter";
import { RequirementsServiceFacade } from "../Facades/RequirementsServiceFacade";
import { DocumentServiceFacade } from "../Facades/DocumentServiceFacade";
import { ParsingService } from "../Services/ParsingService";
import { RequirementsTrackerService } from "../Services/RequirementsTrackerService";
import { RequirementsService } from "../Services/RequirementsService";
import { GlobalStateService } from "../Services/GlobalStateService";
import { DocumentFormatterService } from "../Services/DocumentFormatterService";
import { FilterService } from "../Services/FilterService";
import FileSystemService from "../Services/FileSystemService";
import ConfigService from "../Services/ConfigService";
import { ConfigServiceFacade } from "../Facades/ConfigServiceFacade";
import { ChatService } from "../Services/ChatService";
import { InferenceService } from "../Services/InferenceService";
import { ILanguageModel } from "../Interfaces/ILanguageModel";
import { TrackingResultService } from "../Services/TrackingResultService";
import * as sinon from "sinon";

class MockLanguageModel implements ILanguageModel {
  constructor() {}

  public async checkModelAvailability(): Promise<boolean> {
    return true;
  }

  public async pullModel(): Promise<boolean> {
    return true;
  }

  public async generate(prompt: string): Promise<string> {
    return `Mock response for: ${prompt}`;
  }

  public async generateStream(
    prompt: string,
    _context: string,
    onToken: (token: string) => void,
  ): Promise<void> {
    onToken(`Mock stream response for: ${prompt}`);
    return Promise.resolve();
  }

  public async generateEmbeddings(_text: string): Promise<number[]> {
    return [0.1, 0.2, 0.3];
  }

  public async refreshModels(): Promise<void> {
    return Promise.resolve();
  }
}

export async function setupTestServices(workspacePath: string) {
  const extension = vscode.extensions.getExtension(
    "tech-wave-swe.requirements-tracker",
  )!;

  const fileSystemService = new FileSystemService(workspacePath);
  fileSystemService.setRootFolder(workspacePath);

  const configService = new ConfigService(fileSystemService);
  ConfigServiceFacade.Init(configService);

  sinon.stub(configService, "GetConfig").callsFake(() => ({
    endpoint: "http://localhost:11434",
    bearerToken: "",
    model: "qwen2.5-coder:7b",
    embeddingModel: "nomic-embed-text:latest",
    temperature: 0.7,
    maxResults: 5,
    promptRequirementAnalysis:
      "Analyze if this code implements the requirement. Be specific and concise.",
    filters: {
      path: { type: "path", include: [], exclude: [] },
      file_extension: { type: "file_extension", include: [], exclude: [] },
      requirement: {},
    },
  }));

  const mockLanguageModel = new MockLanguageModel();

  await extension.activate();

  const globalStateService = new GlobalStateService(
    extension.exports.getContext().globalState,
  );

  const mockTrackingResultService = new TrackingResultService(
    globalStateService,
  );

  const vectorDatabase = LanceDBAdapter.Init(ConfigServiceFacade.GetInstance(), mockLanguageModel, workspacePath);

  const requirementsService = new RequirementsService(globalStateService);
  const documentFormatter = new DocumentFormatterService();
  const filterService = new FilterService(ConfigServiceFacade.GetInstance());
  const parsingService = new ParsingService();

  const documentServiceFacade = new DocumentServiceFacade(
    documentFormatter,
    vectorDatabase,
  );

  const trackerService = new RequirementsTrackerService(
    vectorDatabase,
    documentServiceFacade,
    filterService,
    mockLanguageModel,
    mockTrackingResultService,
    ConfigServiceFacade.GetInstance(),
  );

  const requirementsServiceFacade = new RequirementsServiceFacade(
    parsingService,
    trackerService,
    requirementsService,
    vectorDatabase,
  );

  const chatService = new ChatService(globalStateService);

  const inferenceService = new InferenceService(
    mockLanguageModel,
    vectorDatabase,
  );

  return {
    vectorDatabase,
    requirementsServiceFacade,
    documentServiceFacade,
    chatService,
    inferenceService,
    fileSystemService,
  };
}
