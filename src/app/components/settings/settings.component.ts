import { Component, EventEmitter } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AiServerEnum } from '@enums/ai-server.enum';
import { AnthropicComponent } from "./anthropic/anthropic.component";
import { OllamaComponent } from './ollama/ollama.component';
import { OpenAIComponent } from './open-ai/open-ai.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AiApiService } from '@services/ai-api.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatButtonModule,
    AnthropicComponent,
    OllamaComponent,
    OpenAIComponent,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  public AiServerEnum = AiServerEnum;
  public selectedAiServer: AiServerEnum = AiServerEnum.OLLAMA;
  public clickSave: EventEmitter<void> = new EventEmitter<void>();
  public promptConfiguration: string;
  
  constructor(private aiApiService: AiApiService) {
    this.promptConfiguration = aiApiService.promptConfiguration;
  }
  
  public save() {
    this.aiApiService.promptConfiguration = this.promptConfiguration;
    this.clickSave.emit();
  }

  public setPromptConfiguration(event: any) {
    this.promptConfiguration = event.target.value;
  }
}
