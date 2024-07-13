import { Component } from '@angular/core';
import { LLMEnum } from '@enums/llm.enum';
import { SettingsAbstractComponent } from '../settings.abstract.component';

@Component({
  selector: 'app-ollama',
  standalone: true,
  imports: [
  ],
  templateUrl: './ollama.component.html',
  styleUrl: './ollama.component.scss'
})
export class OllamaComponent extends SettingsAbstractComponent  {
  public override llmModelName: LLMEnum = LLMEnum.OLLAMA;

  public save(): void {
  }
}
