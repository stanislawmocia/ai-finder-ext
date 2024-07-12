import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

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

}
