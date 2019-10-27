import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from 'src/layout/main-nav/main-nav.component';
import { MaterialModule } from 'src/modules/material/material.module';
import { HomeModule } from 'src/modules/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { MainDashComponent } from 'src/layout/main-dash/main-dash.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MainDashComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
