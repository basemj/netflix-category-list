import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SearchPipe } from 'app/pipes/search.pipe';

import { AppComponent } from 'app/app.component';
import { CategoryListComponent } from 'app/category-list/category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
