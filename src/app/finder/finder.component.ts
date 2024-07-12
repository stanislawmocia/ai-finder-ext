import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-finder',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './finder.component.html',
  styleUrl: './finder.component.scss'
})
export class FinderComponent implements OnInit {
  public ngOnInit(): void {
    document.addEventListener('input', function (event: any) {
      if (event.target.tagName.toLowerCase() !== 'textarea') return;
      autoExpand(event.target);
    });

    function autoExpand(textarea:any) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';    }

    document.querySelectorAll('message__textarea').forEach(autoExpand);
  }
}
