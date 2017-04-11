import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SearchBoxComponent } from './search-box/search-box.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
