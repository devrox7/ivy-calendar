import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from 'src/layout/main-nav/main-nav.component';
import { MaterialModule } from 'src/modules/material/material.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainDashComponent } from 'src/layout/main-dash/main-dash.component';
import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { DashboardModule } from 'src/modules/dashboard/dashboard.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BasicAuthInterceptor } from 'src/helpers/basic-auth-.interceptor';
import { ErrorInterceptor } from 'src/helpers/error.interceptor';
import { fakeBackendProvider } from 'src/helpers/fake-backend';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MainDashComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthenticationModule,
    PerfectScrollbarModule,
    DashboardModule,
    MatSidenavModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    
  },
  { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  // provider used to create fake backend
  fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[PerfectScrollbarModule]
})
export class AppModule { }
