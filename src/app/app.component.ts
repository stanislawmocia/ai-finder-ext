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
}
