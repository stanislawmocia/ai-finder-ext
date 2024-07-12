import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { FinderComponent } from './finder/finder.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { AutoExpandDirective } from './auto-expand.directive';

@NgModule({
    declarations: [AppComponent, AutoExpandDirective],
    imports: [RouterOutlet,
        BrowserModule,
        FormsModule,
        MatCardModule,
        NavbarComponent,
        FinderComponent,
        SettingsComponent,
        BrowserAnimationsModule
    ],
    bootstrap: [AppComponent],
    providers: [
    ]
})
export class AppModule { }