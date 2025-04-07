import * as vscode from "vscode";
import {ConfigServiceFacade} from "./Facades/ConfigServiceFacade";
import {ChatWebviewProvider} from "./Providers/ChatWebviewProvider";
import {TrackerWebviewProvider} from "./Providers/TrackerWebviewProvider";
import {InferenceService} from "./Services/InferenceService";
import {LangChainOllamaAdapter} from "./Adapters/LangChainOllamaAdapter";
import {LanceDBAdapter} from "./Adapters/LanceDBAdapter";
import {DocumentFormatterService} from "./Services/DocumentFormatterService";
import {DocumentServiceFacade} from "./Facades/DocumentServiceFacade";
import {ParsingService} from "./Services/ParsingService";
import {RequirementsTrackerService} from "./Services/RequirementsTrackerService";
import {RequirementsServiceFacade} from "./Facades/RequirementsServiceFacade";
import FileSystemService from "./Services/FileSystemService";
import ConfigService from "./Services/ConfigService";
import {ChatService} from "./Services/ChatService";
import {GlobalStateService, StateKeys} from "./Services/GlobalStateService";
import {RequirementsService} from "./Services/RequirementsService";
import {FilterService} from "./Services/FilterService";
import {ChatWebView} from "./WebViews/ChatWebView";
import {TrackerWebView} from "./WebViews/TrackerWebView";
import {CommandRegistry} from "./Commands/CommandsRegistry";
import {ClearChatHistoryCommand} from "./Commands/ClearChatHistoryCommand";
import {ResetDatabaseCommand} from "./Commands/ResetDatabaseCommand";
import {InterrogateSelectionCommand} from "./Commands/InterrogateSelectionCommand";
import {OpenSettingsCommand} from "./Commands/OpenSettingsCommand";
import {OpenSidebarCommand} from "./Commands/OpenSidebarCommand";
import {InterrogateDocumentCommand} from "./Commands/InterrogateDocumentCommand";
import {TrackingResultService} from "./Services/TrackingResultService";
import {ClearRequirementsHistoryCommand} from "./Commands/ClearRequirementsHistoryCommand";

export function activate(context: vscode.ExtensionContext) {
  try {
    // Initialize Services
    _initializeConfigService(context);

    // Initialize View Providers
    _initializeChatViewProvider(context);
    _initializeTrackerViewProvider(context);

    // Initialize Commands
    _initializeCommands(context);

    // Handle Events
    _handleEvents(context);

    // Check system requirements on startup
    _startupCheck(context);

    console.log("Requirements Tracker extension is now active");
  } catch (error) {
    vscode.window.showErrorMessage(
      `Failed to activate Requirements Tracker: ${error}`,
    );
    console.error("Activation error:", error);
  }

  // Expose extension API
  const api = {
    getContext: () => context,
  };
  return api;
}

function _initializeConfigService(context: vscode.ExtensionContext) {
  const fileSystemService = new FileSystemService(context.extensionUri.fsPath);
  const configService = new ConfigService(fileSystemService);

  ConfigServiceFacade.Init(configService);
}

function _initializeChatViewProvider(context: vscode.ExtensionContext) {
  const globalStateService = new GlobalStateService(context.globalState);
  const chatService = new ChatService(globalStateService);

  const lanceDBAdapter = new LanceDBAdapter(context.globalStorageUri.fsPath);
  const languageModel = new LangChainOllamaAdapter();

  const inferenceService = new InferenceService(languageModel, lanceDBAdapter);

  const chatWebviewProvider = new ChatWebviewProvider(
    chatService,
    inferenceService,
    new ChatWebView(
      context.extensionUri,
      new FileSystemService(context.extensionUri.fsPath),
    ),
    context.extensionUri,
  );

  // Register webview provider
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "requirementsTracker.chatView",
      chatWebviewProvider,
    ),
  );
}

function _initializeTrackerViewProvider(context: vscode.ExtensionContext) {
  const parsingService = new ParsingService();
  const requirementsService = new RequirementsService(
    new GlobalStateService(context.globalState),
  );

  const lanceDBAdapter = new LanceDBAdapter(context.globalStorageUri.fsPath);

  const documentServiceFacade = new DocumentServiceFacade(
    new DocumentFormatterService(),
    lanceDBAdapter,
  );
  const trackerService = new RequirementsTrackerService(
    lanceDBAdapter,
    documentServiceFacade,
    new FilterService(),
  );

  const requirementsServiceFacade = new RequirementsServiceFacade(
    parsingService,
    trackerService,
    requirementsService,
    lanceDBAdapter,
  );

  const trackerWebviewProvider = new TrackerWebviewProvider(
    requirementsServiceFacade,
    new TrackerWebView(
      context.extensionUri,
      new FileSystemService(context.extensionUri.fsPath),
    ),
    new TrackingResultService(new GlobalStateService(context.globalState),),
    context.extensionUri,
  );

  // Register webview provider
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "requirementsTracker.trackerView",
      trackerWebviewProvider,
    ),
  );
}

function _handleEvents(context: vscode.ExtensionContext) {
  const ollamaAdapter = new LangChainOllamaAdapter();
  const lanceDBAdapter = new LanceDBAdapter(context.globalStorageUri.fsPath);

  // Handle configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(async (event) => {
      if (event.affectsConfiguration("reqTracker")) {
        await ollamaAdapter.refreshModels();
        await lanceDBAdapter.refreshEmbeddings();
        vscode.window.showInformationMessage(
          "Requirements Tracker configuration updated",
        );
      }
    }),
  );
}

function _initializeCommands(context: vscode.ExtensionContext) {
  const vectorDatabase = new LanceDBAdapter(context.globalStorageUri.fsPath);

  const globalStateService = new GlobalStateService(context.globalState);
  const chatService = new ChatService(globalStateService);
  const requirementsService = new RequirementsService(
    new GlobalStateService(context.globalState),
  );
  const inferenceService = new InferenceService(
    new LangChainOllamaAdapter(),
    vectorDatabase,
  );
  const fileSystemService = new FileSystemService(context.extensionUri.fsPath);
  const chatWebView = new ChatWebView(context.extensionUri, fileSystemService);

  const chatWebviewProvider = new ChatWebviewProvider(
    chatService,
    inferenceService,
    chatWebView,
    context.extensionUri,
  );
  // Commands
  const clearChatHistory = new ClearChatHistoryCommand(chatService);
  const clearRequirementsHistory = new ClearRequirementsHistoryCommand(
    requirementsService,
  );
  const resetDatabase = new ResetDatabaseCommand(vectorDatabase);
  const interrogateSelection = new InterrogateSelectionCommand(
    chatWebviewProvider,
    requirementsService,
  );
  const interrogateDocument = new InterrogateDocumentCommand(
    chatWebviewProvider,
    requirementsService,
  );
  const openSettings = new OpenSettingsCommand();
  const openSidebar = new OpenSidebarCommand();

  const commandRegistry = new CommandRegistry(context);
  commandRegistry.registerCommands([
    clearChatHistory,
    clearRequirementsHistory,
    resetDatabase,
    interrogateSelection,
    interrogateDocument,
    openSettings,
    openSidebar,
  ]);
}

function _startupCheck(context: vscode.ExtensionContext) {
  const languageModel = new LangChainOllamaAdapter();
  const lanceDBAdapter = new LanceDBAdapter(context.globalStorageUri.fsPath);
  const inferenceService = new InferenceService(languageModel, lanceDBAdapter);

  inferenceService.checkSystemRequirements().catch((error) => {
    vscode.window.showErrorMessage(`System check failed: ${error.message}`);
  });
}

export function deactivate() {
  console.log("Requirements Tracker extension deactivated");
}
