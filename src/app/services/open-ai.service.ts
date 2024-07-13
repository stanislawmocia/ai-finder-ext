import { Injectable } from '@angular/core';
import { RoleEnum } from '@enums/role.enum';
import { AppCofngiration, FinderModel } from '@models/finder.model';
import OpenAI from "openai";
import { ChatCompletion, ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {
  constructor() {
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

  public completions(messages: FinderModel[], config: AppCofngiration): Observable<FinderModel> {
    let observer = new Subject<FinderModel>();
    let openai = new OpenAI({ apiKey: config.apiKey, dangerouslyAllowBrowser: true });

    openai.chat.completions.create({
      ...config.configuration as ChatCompletionCreateParamsNonStreaming,
      messages: this.parseMessages(messages)
    }).then((response) => {
      observer.next(this.parseCompletion(response));
      observer.complete();
    }).catch((error) => {
      observer.error({ content: error.error?.message, role: RoleEnum.ASSISTANT } as FinderModel);
      console.error(error);
    });

    return observer;
  }
}
