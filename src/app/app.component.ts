import { Component } from '@angular/core';
import { SelectedTabEnum } from '@enums/selected-tab.enum';
import { AiApiService } from '@services/ai-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  public selectedTab: SelectedTabEnum = SelectedTabEnum.SEARCH;
  public SelectedTabEnum = SelectedTabEnum;

  constructor(private aiApiService: AiApiService) {
    this.aiApiService.getConfiguration();
  }
}
