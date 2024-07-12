import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AI Finder Extension';
  searchQuery: string = '';
  searchResults: string = '';
  pageData: string = '';
  
  search() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id!, { action: 'search', query: this.searchQuery }, (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          } else if (response) {
            this.searchResults = `Znaleziono ${response.count} wyników dla "${this.searchQuery}"`;
          }
        });
      }
    });
  }
  
  getPageData() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id!, { action: 'getData' }, (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          } else if (response) {
            this.pageData = response.data;
          }
          console.log(response);
        });
      }
    });
  }  
}
