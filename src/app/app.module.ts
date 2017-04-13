import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppSettings } from './app-settings';
import { Search } from './pipes/search';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoriesDataService } from 'app/services/categories-data.service';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    Search
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AppSettings,
    CategoriesDataService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
