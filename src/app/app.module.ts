import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FinderComponent } from '@components/finder/finder.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { SettingsComponent } from '@components/settings/settings.component';
import { AppComponent } from './app.component';
import { AutoExpandDirective } from '@directive/auto-expand.directive';
import { OpenAiService } from '@services/open-ai.service';

@NgModule({
    declarations: [AppComponent, AutoExpandDirective],
    imports: [
        NavbarComponent,
        FinderComponent,
        SettingsComponent,
        BrowserModule,
        FormsModule,
        MatCardModule,
        BrowserAnimationsModule
    ],
    bootstrap: [AppComponent],
    providers: [OpenAiService]
})
export class AppModule { }