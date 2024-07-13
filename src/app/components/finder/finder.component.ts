import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RoleEnum } from '@enums/role.enum';
import { FinderModel } from '@models/finder.model';
import { AiApiService } from '@services/ai-api.service';
import { filter } from 'rxjs';

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
export class FinderComponent implements AfterViewChecked, OnInit, AfterViewInit {
  public messageForm: FormGroup;
  public RoleEnum = RoleEnum;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  public waitingForResponse: boolean = false;

  public get finderMessages(): FinderModel[] {
    return this.aiApiService.finderMessages;
  }

  constructor(private fb: FormBuilder, private aiApiService: AiApiService, private cdr: ChangeDetectorRef) {
    this.messageForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  public ngOnInit(): void {
    document.addEventListener('input', function (event: any) {
      if (event.target?.tagName?.toLowerCase() !== 'textarea') return;
      autoExpand(event.target);
    });

    function autoExpand(textarea: any) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }

    document.querySelectorAll('message__textarea').forEach(autoExpand);
  }

  public ngAfterViewInit(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id!, { action: 'search' }, (response) => {
          if (chrome.runtime.lastError) {
          } else if (response) {
            if (this.finderMessages.length === 0) {
              this.aiApiService.addMessage({ role: RoleEnum.SYSTEM, content: this.aiApiService.promptConfiguration?.replace('${page_content}', response.content) })
            }
          }
        });
      }
    })
  }

  public ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  public reply() {
    this.waitingForResponse = true;
    const messageValue: string = this.messageForm.get('message')?.value;

    if (messageValue.length === 0) return;

    this.aiApiService.addMessage({ role: RoleEnum.USER, content: messageValue });
    this.messageForm?.get('message')?.reset();
    this.aiApiService.completions(this.finderMessages).pipe(filter(response => response !== null)).subscribe((response: FinderModel) => {
      this.aiApiService.addMessage({ content: response.content, role: response.role } as FinderModel);
      this.cdr.detectChanges();
      this.waitingForResponse = false;
    }, (error) => {
      this.aiApiService.addMessage({ content: String(error.error?.message), role: RoleEnum.ASSISTANT } as FinderModel);
      this.cdr.detectChanges();
      this.waitingForResponse = false;
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
