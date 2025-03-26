export interface ILanguageModel {
  /**
   * Generate a response from the language model
   */
  generate(prompt: string, context?: any): Promise<string>;

  /**
   * Generate embeddings for a text input
   */
  generateEmbeddings(text: string): Promise<number[]>;

  /**
   * Refresh the models, typically after configuration changes
   */
  refreshModels(): Promise<void>;
}
