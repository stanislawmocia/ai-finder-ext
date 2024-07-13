import { Component, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LLMEnum } from '@enums/llm.enum';
import { AiApiService } from '@services/ai-api.service';
import { LlmStudioComponent } from "./llm-studio/llm-sudio.component";
import { OllamaComponent } from './ollama/ollama.component';
import { OpenAIComponent } from './open-ai/open-ai.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatButtonModule,
    OllamaComponent,
    LlmStudioComponent,
    OpenAIComponent,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    LlmStudioComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  public LLMEnum = LLMEnum;
  public selectedAiServer: LLMEnum | null = null;

  constructor(private aiApiService: AiApiService) {
    this.aiApiService.getConfiguration();
    this.selectedAiServer = this.aiApiService.usedLLM;
  }

  public setPromptConfiguration(event: any) {
    this.aiApiService.promptConfiguration = event.target.value;
  }

  public get promptConfiguration(): string {
    return this.aiApiService.promptConfiguration;
  }
}
