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
import {TrackingResultService} from "../Services/TrackingResultService";

export async function setupTestServices(workspacePath: string) {
  const extension = vscode.extensions.getExtension(
    "tech-wave-swe.requirements-tracker",
  )!;
  await extension.activate();

  // Initialize config
  const fileSystemService = new FileSystemService(
    extension.extensionUri.fsPath,
  );
  const configService = new ConfigService(fileSystemService);
  ConfigServiceFacade.Init(configService);

  // Initialize core services
  const vectorDatabase = new LanceDBAdapter(ConfigServiceFacade.GetInstance(), workspacePath);

  const globalStateService = new GlobalStateService(
    extension.exports.getContext().globalState,
  );
  const requirementsService = new RequirementsService(globalStateService);
  const documentFormatter = new DocumentFormatterService();
  const filterService = new FilterService(ConfigServiceFacade.GetInstance());
  const parsingService = new ParsingService();
  const mockTrackingResultService = new TrackingResultService(globalStateService);

  const documentServiceFacade = new DocumentServiceFacade(
    documentFormatter,
    vectorDatabase,
  );

  const mockLanguageModel: ILanguageModel = {
    generate: async (prompt: string) => `Mock response for: ${prompt}`,
    generateEmbeddings: async (_text: string) => [0.1, 0.2, 0.3],
    refreshModels: async () => {},
    generateStream: async (
      prompt: string,
      _context: string,
      onToken: (token: string) => void,
    ) => {
      onToken(`Mock stream response for: ${prompt}`);
    },
    checkModelAvailability: async () => true,
    pullModel: async (_model: string) => true,
  };

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

  // Initialize chat service
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
  };
}
