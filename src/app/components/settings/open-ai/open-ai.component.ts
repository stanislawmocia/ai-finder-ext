import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OpenAIModelEnum } from '@enums/openai.enum';
import { OpenAiService } from '@services/open-ai.service';

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
export class OpenAIComponent implements OnDestroy, OnInit {
  @Input() public clickSave: EventEmitter<void> = new EventEmitter<void>();

  public form: FormGroup;
  public OpenAIModelEnumKeys: string[] = Object.keys(OpenAIModelEnum);
  public OpenAIModelEnum: typeof OpenAIModelEnum = OpenAIModelEnum;

  constructor(private openAiService: OpenAiService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      apiKey: ['', Validators.required],
      model: this.openAiService.configuration?.model,
      temperature: this.openAiService.configuration?.temperature,
      max_tokens: this.openAiService.configuration?.max_tokens,
      top_p: this.openAiService.configuration?.top_p,
      frequency_penalty: this.openAiService.configuration?.frequency_penalty,
      presence_penalty: this.openAiService.configuration?.presence_penalty
    });
  }

  public ngOnInit(): void {
    this.clickSave.subscribe(() => {
      this.openAiService.configuration = this.form.getRawValue();
      this.form.getRawValue().apiKey = String(this.openAiService.configuration.apiKey);
      delete this.openAiService.configuration.apiKey;
    });
  }

  public ngOnDestroy(): void {
    this.clickSave.unsubscribe();
  }
}
