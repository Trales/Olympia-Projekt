import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminView } from './adminView/adminView';

import { AppComponent } from './app.component';
import { ContentView } from './contentView/contentView';
import { CountryView } from './countryView/countryView';
import { FilterView } from './filterView/filterView';
import { LoginView } from './loginView/loginView';

@NgModule({
  declarations: [
    AppComponent,
    ContentView,
    LoginView,
    CountryView,
    FilterView,
    AdminView
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
