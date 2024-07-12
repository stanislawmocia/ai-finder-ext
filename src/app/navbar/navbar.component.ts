import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { SelectedTabEnum } from '../selected-tab';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButtonToggleModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() selectedTab: EventEmitter<SelectedTabEnum> = new EventEmitter<SelectedTabEnum>();
  public SelectedTabEnum = SelectedTabEnum;


  public select($event: MatButtonToggleChange) {
    this.selectedTab.emit($event.value);
  }
}
