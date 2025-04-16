import { Ollama, OllamaEmbeddings } from "@langchain/ollama";
import { Ollama as OllamaClient } from "ollama";
import { ConfigServiceFacade } from "../Facades/ConfigServiceFacade";
import { ILanguageModel } from "../Interfaces/ILanguageModel";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

export class LangChainOllamaAdapter implements ILanguageModel {
  private _ollama: Ollama = new Ollama();
  private _embeddings: OllamaEmbeddings = new OllamaEmbeddings();
  private _ollamaClient: OllamaClient = new OllamaClient({ host: "" });
  private _configServiceFacade: ConfigServiceFacade;

  constructor(configServiceFacade: ConfigServiceFacade) {
    this._configServiceFacade = configServiceFacade;

    this._initialize();
  }

  private _initialize(): void {
    const baseUrl = this._configServiceFacade.getEndpoint();
    const model = this._configServiceFacade.getOllamaModel();
    const embeddingModel =
      this._configServiceFacade.getEmbeddingModel();
    const temperature = this._configServiceFacade.getTemperature();
    const bearerToken = this._configServiceFacade.getBearerToken();

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

    this._ollamaClient = new OllamaClient({
      host: baseUrl,
      headers: headers,
    });
  }

  public async checkModelAvailability(model: string): Promise<boolean> {
    try {
      const models = await this._ollamaClient.list();
      console.log("Models:", models);
      return models.models.some((mod) => mod.name === model);
    } catch (error) {
      console.error("Error checking model availability:", error);
      throw new Error(`Failed to check model availability: ${error}`);
    }
  }

  public async pullModel(model: string): Promise<boolean> {
    try {
      const res = await this._ollamaClient.pull({ model: model });
      return res.status === "success";
    } catch (error) {
      console.error("Error pulling model:", error);
      throw new Error(`Failed to pull model: ${error}`);
    }
  }

  public async generate(prompt: string): Promise<string> {
    try {
      return await this._ollama.invoke(prompt);
    } catch (error) {
      console.error("Error generating response with Ollama:", error);
      throw new Error(`Failed to generate response: ${error}`);
    }
  }

  public async generateStream(
    prompt: string,
    context: string,
    onToken: (token: string) => void,
  ): Promise<void> {
    try {
      const questionTemplate = PromptTemplate.fromTemplate(`
        {context}

        Question: {userQuestion}
      `);

      const streamingChain = RunnableSequence.from([
        questionTemplate,
        this._ollama,
        new StringOutputParser(),
      ]);

      const stream = await streamingChain.stream({
        context: context,
        userQuestion: prompt,
      });

      for await (const chunk of stream) {
        onToken(chunk);
      }
    } catch (error) {
      console.error("Error generating streaming response with Ollama:", error);
      throw new Error(`Failed to generate streaming response: ${error}`);
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
