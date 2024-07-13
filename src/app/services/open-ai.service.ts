import { Injectable } from '@angular/core';
import { OpenAIModelEnum } from '@enums/openai.enum';
import { FinderModel } from '@models/finder.model';
import { OpenAIModel } from '@models/openAI.model';
import OpenAI from "openai";
import { AiApiService } from './ai-api.service';
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {
  private _configuration: OpenAIModel = {
    model: OpenAIModelEnum.GPT35_TURBO,
    messages: [],
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  };
  private openai!: OpenAI;

  constructor(private aiApiService: AiApiService) {
    chrome.storage?.local.get(['config'], (result: any)  => {
      console.log('Retrieved configuration:', result);
      if (result['config']) {
        this._configuration = result['config'] as OpenAIModel;
        this.openai = new OpenAI({ apiKey: this._configuration?.apiKey, dangerouslyAllowBrowser: true });
      } else {
        console.error('API key is not set');
      }
    });
  }

  public set configuration(config: OpenAIModel) {
    chrome.storage?.local.set({ config: config }, function () {
      console.log('Saved configuration');
    });
    this.openai = new OpenAI({ apiKey: config.apiKey, dangerouslyAllowBrowser: true });
    this._configuration = config;
  }

  public get configuration(): OpenAIModel {
    return this._configuration;
  }

  public parseMessages(messages: FinderModel[]): ChatCompletionMessageParam[] {
    return messages.map((message: FinderModel) => {
      return {
        role: message.role,
        content: message.content
      } as ChatCompletionMessageParam;
    });
  }

  public parseCompletion(response: ChatCompletion): FinderModel {
    return { ...response.choices[0].message };
  }

  public completions(messages: FinderModel[]): Observable<FinderModel> {
    return new Observable((observer) => {
      this.openai.chat.completions.create({
        ...this._configuration,
        messages: this.parseMessages(messages)
      }).then((response) => {
        observer.next(this.parseCompletion(response));
        observer.complete();
        console.log(response);
      }).catch((error) => {
        observer.error(error);
        console.error(error);
      });
    });
  }
}
