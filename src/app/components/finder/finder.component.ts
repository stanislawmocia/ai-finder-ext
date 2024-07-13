import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RoleEnum } from '@enums/role.enum';
import { FinderModel } from '@models/finder.model';
import { AiApiService } from '@services/ai-api.service';
import { OpenAiService } from '@services/open-ai.service';

@Component({
  selector: 'app-finder',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './finder.component.html',
  styleUrl: './finder.component.scss'
})
export class FinderComponent implements AfterViewChecked, OnInit {
  public messageForm: FormGroup;
  public RoleEnum = RoleEnum;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  public get finderMessages(): FinderModel[] {
    return this.aiApiService.finderMessages;
  }

  constructor(private fb: FormBuilder, private aiApiService: AiApiService, private openAiService: OpenAiService, private cdr: ChangeDetectorRef) {
    this.messageForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  public ngOnInit(): void {
    document.addEventListener('input', function (event: any) {
      if (event.target.tagName.toLowerCase() !== 'textarea') return;
      autoExpand(event.target);
    });

    function autoExpand(textarea: any) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }

    document.querySelectorAll('message__textarea').forEach(autoExpand);
  }

  public ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  public clearMessages(): void {
    this.aiApiService.clearMessages();
  }

  public reply() {
    const messageValue: string = this.messageForm.get('message')?.value;

    if (messageValue.length === 0) return;


    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id!, { action: 'search', query: messageValue }, (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          } else if (response) {
            console.log('Response:', response);

            this.aiApiService.addMessage({ role: RoleEnum.USER, content: this.aiApiService.promptConfiguration.replace('${message}', messageValue).replace('${page_content}', response.content) });
            this.messageForm.reset();

            this.openAiService.completions(this.finderMessages).subscribe((response) => {
              this.aiApiService.addMessage({ content: response.content?.replaceAll('\\n', '</br>'), role: response.role } as FinderModel);
              this.cdr.detectChanges();
            });
          }
        });
      }
    });
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }
}
