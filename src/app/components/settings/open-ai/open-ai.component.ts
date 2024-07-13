import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LLMEnum } from '@enums/llm.enum';
import { OpenAIModel } from '@models/openAI.model';
import { AiApiService } from '@services/ai-api.service';
import { SettingsAbstractComponent } from '../settings.abstract.component';

@Component({
  selector: 'app-open-ai',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './open-ai.component.html',
  styleUrl: './open-ai.component.scss'
})
export class OpenAIComponent extends SettingsAbstractComponent {
  public llmModelName: LLMEnum = LLMEnum.OPEN_AI;
  public form: FormGroup;

  constructor(private aiApiService: AiApiService, private formBuilder: FormBuilder) {
    super();
    this.form = this.formBuilder.group({
      apiKey: this.aiApiService.usedLLM === LLMEnum.LLM_STUDIO ? this.aiApiService?.apiKey : '',
      model: this.aiApiService.usedLLM === LLMEnum.LLM_STUDIO ? this.configuration?.model : '',
      temperature: this.aiApiService.usedLLM === LLMEnum.LLM_STUDIO ? this.configuration?.temperature : 0.7,
      max_tokens: this.aiApiService.usedLLM === LLMEnum.LLM_STUDIO ? this.configuration?.max_tokens : 1000,
      top_p: this.aiApiService.usedLLM === LLMEnum.LLM_STUDIO ? this.configuration?.top_p : 1,
      frequency_penalty: this.aiApiService.usedLLM === LLMEnum.LLM_STUDIO ? this.configuration?.frequency_penalty : 0,
      presence_penalty: this.aiApiService.usedLLM === LLMEnum.LLM_STUDIO ? this.configuration?.presence_penalty : 0
    });
  }

  public get configuration(): OpenAIModel {
    return this.aiApiService.configuration as OpenAIModel;
  }

  public get apiKey(): OpenAIModel {
    return this.aiApiService.configuration as OpenAIModel;
  }

  public save(): void {
    this.aiApiService.usedLLM = LLMEnum.OPEN_AI;
    let config = this.form.getRawValue();
    this.aiApiService.apiKey = '' + config.apiKey;
    delete config.apiKey;
    this.aiApiService.configuration = config;
    this.aiApiService.saveConfiguration();
  }
}
