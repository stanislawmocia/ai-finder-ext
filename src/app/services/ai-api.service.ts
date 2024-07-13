import { Injectable } from '@angular/core';
import { LLMEnum } from '@enums/llm.enum';
import { OpenAIModelEnum } from '@enums/openai.enum';
import { AppCofngiration, FinderModel } from '@models/finder.model';
import { OllamaModel } from '@models/ollama.model';
import { OpenAIModel } from '@models/openAI.model';
import { Observable, of } from 'rxjs';
import { OpenAiService } from './open-ai.service';
import { LlmStudioService } from './llm-studio.service';

@Injectable({
  providedIn: 'root'
})
export class AiApiService {
  public finderMessages: FinderModel[] = [];
  private _appConfiguration: AppCofngiration = {
    useLLM: LLMEnum.OPEN_AI,
    apiKey: '',
    configuration: {
      model: OpenAIModelEnum.GPT35_TURBO,
      messages: [],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    },
    systemPrompt: 'Respond for user message using only and exclusively the below posted page content:\nPage content: ###${page_content}###'
  };

  constructor(private openAiService: OpenAiService, private llmStudioService: LlmStudioService) {
  }

  public get promptConfiguration(): string {
    return this._appConfiguration.systemPrompt;
  }

  public set promptConfiguration(promptConfiguration: string) {
    this._appConfiguration.systemPrompt = promptConfiguration;
  }

  public get configuration(): OpenAIModel | OllamaModel {
    return this._appConfiguration.configuration;
  }

  public set configuration(config: OpenAIModel | OllamaModel) {
    this._appConfiguration.configuration = config;
  }

  public set apiKey(apiKey: string) {
    this._appConfiguration.apiKey = apiKey;
  }

  public get usedLLM(): LLMEnum {
    return this._appConfiguration.useLLM;
  }

  public set usedLLM(useLLM: LLMEnum) {
    this._appConfiguration.useLLM = useLLM;
  }

  public setLlmConfiguration(useLLM: LLMEnum, configuration: OpenAIModel | OllamaModel) {
    this._appConfiguration.configuration = configuration;
    this._appConfiguration.useLLM = useLLM;
  }

  public addMessage(message: FinderModel) {
    this.finderMessages.push(message);
  }

  public clearMessages() {
    this.finderMessages = [];
  }

  public saveConfiguration() {
    chrome.runtime?.sendMessage({ action: 'saveConfig', config: this._appConfiguration });
  }

  public getConfiguration() {
    chrome.runtime?.sendMessage({ action: 'getConfig' }, (response) => {
      if (response.config) {
        this._appConfiguration = response.config;
      }
    });
  }

  public completions(finderMessages: FinderModel[]): Observable<FinderModel | null> {
    switch (this._appConfiguration.useLLM) {
      case LLMEnum.OPEN_AI:
        return this.openAiService.completions(finderMessages, this._appConfiguration);
      case LLMEnum.LLM_STUDIO:
        return this.llmStudioService.completions(finderMessages, this._appConfiguration);
    }
    return of(null);
  }
}
