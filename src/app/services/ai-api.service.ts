import { Injectable } from '@angular/core';
import { FinderModel } from '@models/finder.model';

@Injectable({
  providedIn: 'root'
})
export class AiApiService {
  public finderMessages: FinderModel[] = [];
  public promptConfiguration: string = 'User message: ###${message}###\nPage content: ###${page_content}###';
  
  public addMessage(message: FinderModel) {
    this.finderMessages.push(message);
  }

  public clearMessages() {
    this.finderMessages = [];
  }
}
