export interface ILanguageModel {
  checkModelAvailability(model: string): Promise<boolean>;
  pullModel(model: string): Promise<boolean>;

  /**
   * Generate a response from the language model
   */
  generate(prompt: string): Promise<string>;

  /**
   * Generate a streaming response from the language model
   */
  generateStream(
    prompt: string,
    context: string,
    onToken: (token: string) => void,
  ): Promise<void>;

  /**
   * Generate embeddings for a text input
   */
  generateEmbeddings(text: string): Promise<number[]>;

  /**
   * Refresh the models, typically after configuration changes
   */
  refreshModels(): Promise<void>;
}
