import { Component } from '@angular/core';
import { SelectedTabEnum } from './selected-tab';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public selectedTab: SelectedTabEnum = SelectedTabEnum.SEARCH;
  public SelectedTabEnum = SelectedTabEnum;
}
