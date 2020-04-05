import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppSharedModule } from 'projects/app-shared/src/public-api';
import { ApiService } from './services/data.service';
import { CovidComponent } from './covid-19/covid.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        CovidComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        // NgbModule,
        AppSharedModule,
        AppRoutingModule
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }
