import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppCofngiration, FinderModel } from '@models/finder.model';
import { LlmStudioModel } from '@models/llm-studio.model';
import { ChatCompletion } from 'openai/resources/index.mjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlmStudioService {
  constructor(private httpClient: HttpClient) {
  }

  public completions(messages: FinderModel[], config: AppCofngiration): Observable<FinderModel> {
    let observer = new Subject<FinderModel>();

    this.httpClient.post((config.configuration as LlmStudioModel).url, {
      ...config.configuration,
      messages: messages
    }).subscribe((response: any) => {
      observer.next(response?.choices[0].message as FinderModel);
    });

    return observer;
  }
}
