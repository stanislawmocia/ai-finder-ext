import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FinderComponent } from '@components/finder/finder.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { SettingsComponent } from '@components/settings/settings.component';
import { AutoExpandDirective } from '@directive/auto-expand.directive';
import { AiApiService } from '@services/ai-api.service';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent, AutoExpandDirective],
    imports: [
        HttpClientModule,
        NavbarComponent,
        FinderComponent,
        SettingsComponent,
        BrowserModule,
        FormsModule,
        MatCardModule,
        BrowserAnimationsModule
    ],
    bootstrap: [AppComponent],
    providers: [AiApiService]
})
export class AppModule { }