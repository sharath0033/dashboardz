import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { KtdGridModule } from '@saras-analytics/angular-grid-layout';
import { NgApexchartsModule } from 'ng-apexcharts';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WidgetPopupComponent } from './widget-popup/widget-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WidgetPopupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    KtdGridModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
