import { GroupPaymentsPaiChartComponent } from './charges/MyGroupPayments/group-payments-pai-chart/group-payments-pai-chart.component';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { ChargesComponent } from './charges/charges.component';
import { PaymentsComponent } from './payments/payments.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './home/login/login.component';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { MyFuturePaymentsComponent } from './charges/my-future-payments/my-future-payments.component';
import { GroupPaymentsComponent } from './charges/MyGroupPayments/group-payments/group-payments.component';
import { ChartsModule } from 'ng2-charts';
import { MyAllGroupChargesComponent } from './charges/my-all-group-charges/my-all-group-charges.component';
import { AddPaymentComponent } from './charges/add-payment/add-payment.component';
import { AddSinglePaymentComponent } from './charges/add-payment/add-single-payment/add-single-payment.component';
import { WhatIPaidComponent } from './payments/what-ipaid/what-ipaid.component';
import { GroupPaymentsPaidTableComponent } from './payments/GroupPaidPayments/group-payments-paid-table/group-payments-paid-table.component';
import { GroupPaymentsPaidChartPaiComponent } from './payments/GroupPaidPayments/group-payments-paid-chart-pai/group-payments-paid-chart-pai.component';
import { MyAllGroupPaymentsComponent } from './payments/my-all-group-payments/my-all-group-payments.component';

import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    ChargesComponent,
    PaymentsComponent,
    MeetingsComponent,
    UserComponent,
    LoginComponent,
    MyFuturePaymentsComponent,
    GroupPaymentsComponent,
    GroupPaymentsPaiChartComponent,
    MyAllGroupChargesComponent,
    AddPaymentComponent,
    AddSinglePaymentComponent,
    WhatIPaidComponent,
    GroupPaymentsPaidTableComponent,
    GroupPaymentsPaidChartPaiComponent,
    MyAllGroupPaymentsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MDBBootstrapModule.forRoot(),
    AnimateOnScrollModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
