import * as vscode from "vscode";
import { ConfigServiceFacade } from "./Facades/ConfigServiceFacade";
import { ChatWebviewProvider } from "./Providers/ChatWebviewProvider";
import { TrackerWebviewProvider } from "./Providers/TrackerWebviewProvider";
import { InferenceService } from "./Services/InferenceService";
import { LangChainOllamaAdapter } from "./Adapters/LangChainOllamaAdapter";
import { LanceDBAdapter } from "./Adapters/LanceDBAdapter";
import { DocumentFormatterService } from "./Services/DocumentFormatterService";
import { DocumentServiceFacade } from "./Facades/DocumentServiceFacade";
import { ParsingService } from "./Services/ParsingService";
import { RequirementsTrackerService } from "./Services/RequirementsTrackerService";
import { RequirementsServiceFacade } from "./Facades/RequirementsServiceFacade";
import FileSystemService from "./Services/FileSystemService";
import ConfigService from "./Services/ConfigService";
import { ChatService } from "./Services/ChatService";
import { GlobalStateService } from "./Services/GlobalStateService";
import { RequirementsService } from "./Services/RequirementsService";
import { FilterService } from "./Services/FilterService";
import { ChatWebView } from "./WebViews/ChatWebView";
import { TrackerWebView } from "./WebViews/TrackerWebView";
import { CommandRegistry } from "./Commands/CommandsRegistry";
import { ClearChatHistoryCommand } from "./Commands/ClearChatHistoryCommand";
import { ResetDatabaseCommand } from "./Commands/ResetDatabaseCommand";
import { InterrogateSelectionCommand } from "./Commands/InterrogateSelectionCommand";
import { OpenSettingsCommand } from "./Commands/OpenSettingsCommand";
import { OpenSidebarCommand } from "./Commands/OpenSidebarCommand";
import { InterrogateDocumentCommand } from "./Commands/InterrogateDocumentCommand";
import { TrackingResultService } from "./Services/TrackingResultService";
import { ClearRequirementsHistoryCommand } from "./Commands/ClearRequirementsHistoryCommand";
import path from "path";

export function activate(context: vscode.ExtensionContext) {
  try {
    // Initialize Services
    _initializeConfigService();
    _initializeLangChainOllamaAdapter();
    _initializeLanceDB(context);

    // Initialize View Providers
    _initializeChatViewProvider(context);
    _initializeTrackerViewProvider(context);

    // Initialize Commands
    _initializeCommands(context);

    // Handle Events
    _handleEvents(context);

    // Check system requirements on startup
    _startupCheck();

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

function _initializeConfigService() {
  let workspaceFolder = "";

  if (vscode.workspace.workspaceFolders) {
    workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
  }

  const fileSystemService = new FileSystemService(workspaceFolder);
  const configService = new ConfigService(fileSystemService);

  ConfigServiceFacade.Init(configService);
}

function _initializeLanceDB(context: vscode.ExtensionContext) {
  let lancedbPath = context.globalStorageUri.fsPath;
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

  if (workspaceFolder) {
    lancedbPath = path.join(lancedbPath, workspaceFolder.name);
  }

  LanceDBAdapter.Init(ConfigServiceFacade.GetInstance(), LangChainOllamaAdapter.GetInstance(), lancedbPath);
}

function _initializeLangChainOllamaAdapter() {
  LangChainOllamaAdapter.Init(ConfigServiceFacade.GetInstance());
}

function _initializeChatViewProvider(
  context: vscode.ExtensionContext,
) {
  const globalStateService = new GlobalStateService(context.workspaceState);
  const chatService = new ChatService(globalStateService);

  const inferenceService = new InferenceService(LangChainOllamaAdapter.GetInstance(), LanceDBAdapter.GetInstance());

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

function _initializeTrackerViewProvider(
  context: vscode.ExtensionContext,
) {
  const globalStateService = new GlobalStateService(context.workspaceState);
  const parsingService = new ParsingService();
  const requirementsService = new RequirementsService(
    globalStateService,
  );

  const documentServiceFacade = new DocumentServiceFacade(
    new DocumentFormatterService(),
    LanceDBAdapter.GetInstance(),
  );

  const trackingResultService = new TrackingResultService(globalStateService);

  const trackerService = new RequirementsTrackerService(
    LanceDBAdapter.GetInstance(),
    documentServiceFacade,
    new FilterService(ConfigServiceFacade.GetInstance()),
    LangChainOllamaAdapter.GetInstance(),
    trackingResultService,
    ConfigServiceFacade.GetInstance()
  );

  const requirementsServiceFacade = new RequirementsServiceFacade(
    parsingService,
    trackerService,
    requirementsService,
    LanceDBAdapter.GetInstance(),
  );

  const trackerWebviewProvider = new TrackerWebviewProvider(
    requirementsServiceFacade,
    new TrackerWebView(
      context.extensionUri,
      new FileSystemService(context.extensionUri.fsPath),
    ),
    trackingResultService,
    context.extensionUri,
  );

  // Register webview provider
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "requirementsTracker.trackerView",
      trackerWebviewProvider,
    ),
  );

  // Handle events
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection((event) => {
      trackerWebviewProvider.onChangeTextEditorSelection(event);
    }),
  );

  // Handle Folder opening
  context.subscriptions.push(
    vscode.workspace.onDidChangeWorkspaceFolders((event) => {
      ConfigServiceFacade.GetInstance().setWorkspaceFolder(event.added);
    }),
  );
}

function _handleEvents(
  context: vscode.ExtensionContext,
) {
  // Handle configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(async (event) => {
      if (event.affectsConfiguration("requirementsTracker")) {
        const configServiceFacade = ConfigServiceFacade.GetInstance();
        ConfigServiceFacade.GetInstance().sync();

        const model = configServiceFacade.getOllamaModel();
        const embeddingModel = configServiceFacade.getEmbeddingModel();

        console.log("Model:", model);
        console.log("Embedding Model:", embeddingModel);

        for (const mod of [model, embeddingModel]) {
          console.log("Checking model availability:", mod);
          const res = await LangChainOllamaAdapter.GetInstance().checkModelAvailability(mod);

          console.log("Model availability:", res);

          if (!res) {
            const userChoice = await vscode.window.showQuickPick(
              ["Yes", "No"],
              {
                title:
                  "Model " +
                  mod +
                  " not found, do you want to try pulling the model?",
              },
            );
            if (userChoice === "Yes") {
              try {
                vscode.window.showInformationMessage(
                  "Pulling model " + mod + " ...",
                );
                const res = await LangChainOllamaAdapter.GetInstance().pullModel(mod);
                if (res) {
                  vscode.window.showInformationMessage(
                    "Model pulled successfully.",
                  );
                }
              } catch (error) {
                vscode.window.showErrorMessage(
                  "Failed to pull model: " + error,
                );
                return;
              }
            } else {
              vscode.window.showErrorMessage(
                "Cannot proceed without model, please select an available model.",
              );

              return;
            }
          }
        }

        await LangChainOllamaAdapter.GetInstance().refreshModels();

        vscode.window.showInformationMessage(
          "Requirements Tracker configuration updated",
        );
      }
    }),
  );
}

function _initializeCommands(
  context: vscode.ExtensionContext,
) {
  const globalStateService = new GlobalStateService(context.workspaceState);
  const chatService = new ChatService(globalStateService);
  const requirementsService = new RequirementsService(
    new GlobalStateService(context.workspaceState),
  );
  const inferenceService = new InferenceService(LangChainOllamaAdapter.GetInstance(), LanceDBAdapter.GetInstance());
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
  const resetDatabase = new ResetDatabaseCommand(LanceDBAdapter.GetInstance());
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

function _startupCheck() {
  const inferenceService = new InferenceService(LangChainOllamaAdapter.GetInstance(), LanceDBAdapter.GetInstance());

  inferenceService.checkSystemRequirements().catch((error) => {
    vscode.window.showErrorMessage(`System check failed: ${error.message}`);
  });
}

export function deactivate() {
  console.log("Requirements Tracker extension deactivated");
}
