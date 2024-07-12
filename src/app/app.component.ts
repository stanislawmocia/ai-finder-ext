import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BrowserModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title: string = 'ai-finder-ext';

  public searchQuery: string = '';
  public searchResults: string = '';
  resultCount: number = 0;

  search() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id!, { action: 'search', query: this.searchQuery }, (response: any) => {
          if (response) {
            this.resultCount = response.count;
          }
        });
      }
    });
  }
}
