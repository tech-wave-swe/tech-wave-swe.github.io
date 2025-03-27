import * as vscode from "vscode";
import * as path from "path";
import {ConfigServiceFacade} from "./Facades/ConfigServiceFacade";
import {ChatWebviewProvider} from "./Providers/ChatWebviewProvider";
import {TrackerWebviewProvider} from "./Providers/TrackerWebviewProvider";
import {InferenceService} from "./Services/InferenceService";
import {LangChainOllamaAdapter} from "./Adapters/LangChainOllamaAdapter";
import {LangChainLanceDBAdapter} from "./Adapters/LangChainLanceDBAdapter";
import {DocumentFormatterService} from "./Services/DocumentFormatterService";
import {DocumentEmbeddingService} from "./Services/DocumentEmbeddingService";
import {DocumentServiceFacade} from "./Facades/DocumentServiceFacade";
import {ParsingService} from "./Services/ParsingService";
import {RequirementsTrackerService} from "./Services/RequirementsTrackerService";
import {RequirementsServiceFacade} from "./Facades/RequirementsServiceFacade";
import FileSystemService from "./Services/FileSystemService";
import ConfigService from "./Services/ConfigService";
import {ChatService} from "./Services/ChatService";
import {GlobalStateService} from "./Services/GlobalStateService";
import {RequirementsService} from "./Services/RequirementsService";
import {FilterService} from "./Services/FilterService";

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

  const lanceDBAdapter = new LangChainLanceDBAdapter(context.globalStorageUri.fsPath);
  const languageModel = new LangChainOllamaAdapter();

  const inferenceService = new InferenceService(languageModel, lanceDBAdapter);

  const chatWebviewProvider = new ChatWebviewProvider(
    chatService,
    inferenceService,
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
  const requirementsService = new RequirementsService(new GlobalStateService(context.globalState));

  const lanceDBAdapter = new LangChainLanceDBAdapter(context.globalStorageUri.fsPath);
  const embeddingService = new DocumentEmbeddingService(lanceDBAdapter);

  const documentServiceFacade = new DocumentServiceFacade(new DocumentFormatterService(), embeddingService);
  const trackerService = new RequirementsTrackerService(lanceDBAdapter,documentServiceFacade, new FilterService());

  const requirementsServiceFacade = new RequirementsServiceFacade(parsingService, trackerService, embeddingService, requirementsService);

  const trackerWebviewProvider = new TrackerWebviewProvider(
    context,
    requirementsServiceFacade
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
  const lanceDBAdapter = new LangChainLanceDBAdapter(context.globalStorageUri.fsPath);

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
  const vectorDatabase = new LangChainLanceDBAdapter(context.globalStorageUri.fsPath);

  const globalStateService = new GlobalStateService(context.globalState);
  const chatService = new ChatService(globalStateService);

  const documentFormatterService = new DocumentFormatterService();
  const documentEmbeddingService = new DocumentEmbeddingService(vectorDatabase);
  const documentServiceFacade = new DocumentServiceFacade(documentFormatterService, documentEmbeddingService);

  // Index current file
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "requirementsTracker.indexCurrentFile",
      async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          vscode.window.showWarningMessage("No active editor to index");
          return;
        }

        try {
          const document = editor.document;
          await documentServiceFacade.processDocument(
            document.getText(),
            document.fileName,
          );
          vscode.window.showInformationMessage(
            `Successfully indexed ${path.basename(document.fileName)}`,
          );
        } catch (error) {
          vscode.window.showErrorMessage(`Failed to index file: ${error}`);
        }
      },
    ),
  );

  // Index workspace
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "requirementsTracker.indexWorkspace",
      async () => {
        try {
          vscode.window.withProgress(
            {
              location: vscode.ProgressLocation.Notification,
              title: "Indexing workspace files",
              cancellable: true,
            },
            async () => {
              try {
                await documentServiceFacade.processWorkspaceFiles();
                vscode.window.showInformationMessage(
                  "Successfully indexed workspace files",
                );
              } catch (error) {
                vscode.window.showErrorMessage(
                  `Failed to index workspace: ${error}`,
                );
              }
            },
          );
        } catch (error) {
          vscode.window.showErrorMessage(
            `Failed to start indexing: ${error}`,
          );
        }
      },
    ),
  );

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
  context.subscriptions.push(
    vscode.commands.registerCommand("reqTracker.resetDatabase", async () => {
      const answer = await vscode.window.showWarningMessage(
        "This will delete all indexed data. Are you sure?",
        {modal: true},
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
          vscode.window.showErrorMessage(
            `Failed to reset database: ${error}`,
          );
        }
      }
    }),
  );
}
function _startupCheck(context: vscode.ExtensionContext) {
  const languageModel = new LangChainOllamaAdapter();
  const lanceDBAdapter = new LangChainLanceDBAdapter(context.globalStorageUri.fsPath);
  const inferenceService = new InferenceService(languageModel, lanceDBAdapter);

  inferenceService.checkSystemRequirements().catch((error) => {
    vscode.window.showErrorMessage(`System check failed: ${error.message}`);
  });
}

export function deactivate() {
  console.log("Requirements Tracker extension deactivated");
}
