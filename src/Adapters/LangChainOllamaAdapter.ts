import { Ollama, OllamaEmbeddings } from "@langchain/ollama";
import { ConfigServiceFacade } from "../Facades/ConfigServiceFacade";
import { ILanguageModel } from "../Interfaces/ILanguageModel";

export class LangChainOllamaAdapter implements ILanguageModel {
  private _ollama: Ollama = new Ollama();
  private _embeddings: OllamaEmbeddings = new OllamaEmbeddings();

  constructor() {
    this._initialize();
  }

  private _initialize(): void {
    const baseUrl = ConfigServiceFacade.GetInstance().getEndpoint();
    const model = ConfigServiceFacade.GetInstance().getOllamaModel();
    const embeddingModel =
      ConfigServiceFacade.GetInstance().getEmbeddingModel();
    const temperature = ConfigServiceFacade.GetInstance().getTemperature();
    const bearerToken = ConfigServiceFacade.GetInstance().getBearerToken();

    const headers = bearerToken
      ? new Headers({ Authorization: `Bearer ${bearerToken}` })
      : undefined;

    console.log(`headers: ${headers}`);
    console.log(`bearer token:  ${bearerToken}`);

    this._ollama = new Ollama({
      baseUrl: baseUrl,
      model: model,
      temperature: temperature,
      headers: headers,
    });

    this._embeddings = new OllamaEmbeddings({
      baseUrl: baseUrl,
      model: embeddingModel,
      headers: headers,
    });
  }

  public async generate(prompt: string): Promise<string> {
    try {
      return await this._ollama.invoke(prompt);
    } catch (error) {
      console.error("Error generating response with Ollama:", error);
      throw new Error(`Failed to generate response: ${error}`);
    }
  }

  public async generateEmbeddings(text: string): Promise<number[]> {
    try {
      return await this._embeddings.embedQuery(text);
    } catch (error) {
      console.error("Error generating embeddings with Ollama:", error);
      throw new Error(`Failed to generate embeddings: ${error}`);
    }
  }

  public getEmbeddings(): OllamaEmbeddings {
    return this._embeddings;
  }

  public async refreshModels() {
    this._initialize();
  }
}
