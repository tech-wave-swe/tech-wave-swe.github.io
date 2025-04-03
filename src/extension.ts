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

export function activate(context: vscode.ExtensionContext) {
  try {
    process.env.RUST_LOG = "error";
    process.env.RUST_BACKTRACE = "0";

    console.log(
      `Set RUST_LOG environment variable to: ${process.env.RUST_LOG}`,
    );
    console.log(
      `Set RUST_BACKTRACE environment variable to: ${process.env.RUST_BACKTRACE}`,
    );

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
    new ChatWebView(context.extensionUri),
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
    new TrackerWebView(context.extensionUri),
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
  const requirementsService = new RequirementsService(globalStateService);

  // Clear chat history
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "requirementsTracker.clearChatHistory",
      async () => {
        await chatService.clearMessages();
        vscode.window.showInformationMessage("Chat history cleared");
      },
    ),
  );

  // Clear Requirements history
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "requirementsTracker.clearRequirementsHistory",
      async () => {
        await requirementsService.clearRequirements();
        vscode.window.showInformationMessage("Requirements history cleared");
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("reqTracker.resetDatabase", async () => {
      const answer = await vscode.window.showWarningMessage(
        "This will delete all indexed data. Are you sure?",
        { modal: true },
        "Yes",
        "No",
      );
      if (answer === "Yes") {
        try {
          await vectorDatabase.resetDatabase();
          vscode.window.showInformationMessage(
            "Database has been reset successfully",
          );
        } catch (error) {
          vscode.window.showErrorMessage(`Failed to reset database: ${error}`);
        }
      }
    }),
  );
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
