import { FormattedDocument } from "../Models/FormattedDocument";
import { Document } from "@langchain/core/documents";
import * as vscode from "vscode";
import { IVectorDatabase } from "../Interfaces/IVectorDatabase";

export class DocumentEmbeddingService {
  private vectorDatabase: IVectorDatabase;

  constructor(vectorDatabase: IVectorDatabase) {
    this.vectorDatabase = vectorDatabase;
  }

  public async embedDocument(document: FormattedDocument): Promise<void> {
    const collectionName = this.vectorDatabase.DOCUMENTS_COLLECTION;

    // Create LangChain documents for each chunk
    const documents: Document[] = [];

    // Process each chunk with additional size checking
    for (let i = 0; i < document.chunks.length; i++) {
      const chunk = document.chunks[i];

      // Skip if chunk is too small or too large
      if (chunk.trim().length < 10) {
        continue;
      }

      if (chunk.length > 8000) {
        console.warn(
          `Chunk ${i} in ${document.metadata.filePath || "unknown"} is too large (${chunk.length} chars), skipping`,
        );
        continue;
      }

      documents.push(
        new Document({
          pageContent: chunk,
          metadata: {
            ...document.metadata,
            chunkIndex: i,
            isChunk: true,
            language: document.language,
          },
        }),
      );
    }

    // Also add the original content if it's not too large
    if (
      document.originalContent.length > 0 &&
      document.originalContent.length <= 4000
    ) {
      documents.push(
        new Document({
          pageContent: document.originalContent,
          metadata: {
            ...document.metadata,
            isOriginal: true,
            language: document.language,
          },
        }),
      );
    }

    // Add all documents in one batch
    if (documents.length > 0) {
      await this.vectorDatabase.addDocuments(documents, collectionName);
    }
  }

  public async embedMultipleDocuments(
    documents: FormattedDocument[],
  ): Promise<void> {
    const total = documents.length;
    let processed = 0;
    let failed = 0;

    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Embedding documents",
        cancellable: true,
      },
      async (progress, token) => {
        // Process in smaller batches for better responsiveness
        const batchSize = 5;

        for (
          let i = 0;
          i < total && !token.isCancellationRequested;
          i += batchSize
        ) {
          const batch = documents.slice(i, Math.min(i + batchSize, total));

          for (const doc of batch) {
            if (token.isCancellationRequested) break;

            try {
              await this.embedDocument(doc);
              processed++;
            } catch (error) {
              failed++;
              console.error(
                `Failed to embed document: ${doc.metadata.filePath || "unknown"}`,
                error,
              );
            }

            // Update progress after each document (more responsive)
            progress.report({
              message: `Processed ${processed}/${total} documents${failed > 0 ? ` (${failed} failed)` : ""}`,
              increment: (1 / total) * 100,
            });
          }
        }

        if (token.isCancellationRequested) {
          vscode.window.showInformationMessage(
            "Document embedding was cancelled",
          );
        } else if (failed > 0) {
          vscode.window.showWarningMessage(
            `Completed embedding with ${failed} failures out of ${total} documents`,
          );
        } else {
          vscode.window.showInformationMessage(
            "Successfully embedded all documents",
          );
        }
      },
    );
  }

  public async embedRequirements(
    documents: FormattedDocument[],
  ): Promise<void> {
    try {
      const collectionName = this.vectorDatabase.REQUIREMENTS_COLLECTION;

      // Create LangChain documents for each requirement
      const langChainDocs: Document[] = [];

      for (const doc of documents) {
        // For requirements, we just want a single document with the full text
        langChainDocs.push(
          new Document({
            pageContent: doc.originalContent,
            metadata: {
              ...doc.metadata,
              isRequirement: true, // Explicitly mark as a requirement
            },
          }),
        );
      }

      // Add all documents to the requirements collection
      if (langChainDocs.length > 0) {
        console.log(
          `Adding ${langChainDocs.length} requirements to LanceDB collection: ${collectionName}`,
        );
        await this.vectorDatabase.addDocuments(langChainDocs, collectionName);
      }
    } catch (error) {
      console.error("Error embedding requirements:", error);
      throw error;
    }
  }
}
