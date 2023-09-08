import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// pages
import {MainModule as MainPageModule} from "./pages/main/main.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // angular modules
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // pages
    MainPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
