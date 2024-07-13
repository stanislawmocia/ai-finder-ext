import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LLMEnum } from '@enums/llm.enum';
import { LlmStudioModel } from '@models/llm-studio.model';
import { AiApiService } from '@services/ai-api.service';
import { SettingsAbstractComponent } from '../settings.abstract.component';

@Component({
  selector: 'app-llm-sudio',
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
  templateUrl: './llm-sudio.component.html',
  styleUrl: './llm-sudio.component.scss'
})
export class LlmStudioComponent extends SettingsAbstractComponent implements OnInit {
  public llmModelName: LLMEnum = LLMEnum.LLM_STUDIO;
  @Input() public override clickSave: EventEmitter<void> = new EventEmitter<void>();
  public form: FormGroup;

  constructor(private aiService: AiApiService, private formBuilder: FormBuilder) {
    super();
    this.form = this.formBuilder.group({
      url: this.aiService.usedLLM === LLMEnum.LLM_STUDIO ? this.configuration?.url : '',
      model: this.aiService.usedLLM === LLMEnum.LLM_STUDIO ? this.configuration?.model : '',
      temperature: this.aiService.usedLLM === LLMEnum.LLM_STUDIO ? this.configuration?.temperature : 0.7,
      max_tokens: this.aiService.usedLLM === LLMEnum.LLM_STUDIO ? this.configuration?.max_tokens : 1000,
    });
  }

  public get configuration(): LlmStudioModel {
    return this.aiService.configuration as LlmStudioModel;
  }

  public ngOnInit(): void {
    this.clickSave.subscribe(() => {
      let config: Omit<LlmStudioModel, 'url'> = this.form.getRawValue();
      this.aiService.configuration = config;
    });
  }
}
