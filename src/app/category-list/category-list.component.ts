import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

import { AppSettings } from 'app/app-settings';
import { Category } from 'app/models/Category';

import { CategoriesDataService } from 'app/services/categories-data.service';
import { CategoriesLocalStorageService } from 'app/services/categories-local-storage.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [CategoriesDataService, CategoriesLocalStorageService, AppSettings]
})

export class CategoryListComponent implements OnInit {
  noDataErrorMessage: string;
  storageKey: string;
  apiEndpoint: string;
  categories: Observable<Category[]>;

  constructor(
    private categoriesDataService: CategoriesDataService,
    private categoriesLocalStorageService: CategoriesLocalStorageService,
    private _appSettings: AppSettings
  ) {
    this.apiEndpoint = _appSettings.API_ENDPOINT;
    this.storageKey = _appSettings.STORAGE_KEY;
  }

  getCategories() {
    this.categories = this.categoriesLocalStorageService.getData().share();
    this.categories.subscribe(null, () => {
      this.categories = this.categoriesDataService.getCategories(this.apiEndpoint).share();
      this.categories.subscribe(
        results => {
          if ('localStorage' in window && window.localStorage) {
            window.localStorage.clear();
            window.localStorage[this.storageKey + 'TimeStamp'] = +new Date;
            window.localStorage[this.storageKey] = JSON.stringify(results);
          }
        },
        error => {
          this.noDataErrorMessage = 'The API is returning no data';

          return new Error(this.noDataErrorMessage);
        }
      );
    }
    );
  }

  ngOnInit() { this.getCategories(); }
}
