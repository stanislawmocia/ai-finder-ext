import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { SettingsAbstractComponent } from '../settings.abstract.component';
import { LLMEnum } from '@enums/llm.enum';

@Component({
  selector: 'app-ollama',
  standalone: true,
  imports: [
  ],
  templateUrl: './ollama.component.html',
  styleUrl: './ollama.component.scss'
})
export class OllamaComponent extends SettingsAbstractComponent implements OnInit {
  public override llmModelName: LLMEnum = LLMEnum.OLLAMA;
  @Input() public override clickSave: EventEmitter<void> = new EventEmitter<void>();

  public ngOnInit(): void {
    this.clickSave.subscribe(() => {
    });
  }
}
