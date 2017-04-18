import { Provider } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { CategoryListComponent } from 'app/category-list/category-list.component';
import { CategoriesDataService } from 'app/services/categories-data.service';
import { CategoriesLocalStorageService } from 'app/services/categories-local-storage.service';
import { AppSettings } from 'app/app-settings';
import { Category } from 'app/models/Category';

let apiResponseFail: Boolean;
let localStorageResponseFail: Boolean;
const mockJson = [{url: 'url 1', name: 'name 1'}, {url: 'url 2', name: 'name 2'}, {url: 'url 3', name: 'name 3'}];

class MockCategoriesDataService extends CategoriesDataService {
  constructor() {
    super(null);
  }

  getCategories() {
    if (apiResponseFail) {
      return Observable.throw('Could not find the correct categories list on API');
    }
    const mockJsonApi = mockJson;
    mockJsonApi[0].name = 'Result from API';
    return Observable.of(mockJsonApi);
  }
}

class MockCategoriesLocalStorageService extends CategoriesLocalStorageService {
  constructor(appSettings: AppSettings) {
    super(appSettings);
  }

  getData() {
    if (localStorageResponseFail) {
      return Observable.throw('Could not find the correct categories list on localStorage');
    }
    const mockJsonLs = mockJson;
    mockJsonLs[0].name = 'Result from localStorage';
    return Observable.of(mockJsonLs);
  }
}

describe('CategoryListComponent', () => {
  let categoriesDataService: CategoriesDataService,
    categoriesLocalStorageService: CategoriesLocalStorageService,
    categoryListComponent: CategoryListComponent,
    appSettings: AppSettings,
    categories: Observable<Category[]>;

  beforeEach(() => {
    categoriesDataService = new MockCategoriesDataService();
    appSettings = new AppSettings();
    categoriesLocalStorageService = new MockCategoriesLocalStorageService(appSettings);
    categoryListComponent = new CategoryListComponent(categoriesDataService, categoriesLocalStorageService, appSettings);
  });

  it('should create CategoryListComponent', () => {
    expect(categoryListComponent).toBeTruthy();
  });

  it('shows a list of categories', () => {
    categoryListComponent.ngOnInit();
    categoryListComponent.categories.subscribe(res => { this.categories = res; });

    expect(categoryListComponent.categories).toBeDefined();
    expect(this.categories.length).toBe(3);
  });

  it('shows a list of categories from localStorage', () => {
    categoryListComponent.ngOnInit();
    categoryListComponent.categories.subscribe(res => { this.categories = res; });

    expect(categoryListComponent.categories).toBeDefined();
    expect(this.categories[0].name).toBe('Result from localStorage');
  });

  it('shows a list of categories from API if localStorage fails', () => {
    localStorageResponseFail = true;
    categoryListComponent.ngOnInit();
    categoryListComponent.categories.subscribe(res => { this.categories = res; });

    expect(categoryListComponent.categories).toBeDefined();
    expect(this.categories[0].name).toBe('Result from API');
    localStorageResponseFail = false;
  });

  it('shows an error message if API fails', () => {
    localStorageResponseFail = true;
    apiResponseFail = true;
    categoryListComponent.ngOnInit();

    expect(categoryListComponent.noDataErrorMessage).toBe('The API is returning no data');
    localStorageResponseFail = false;
    apiResponseFail = false;
  });

  it('throws an error if localStorage and API fail', () => {
    localStorageResponseFail = true;
    apiResponseFail = true;
    categoryListComponent.ngOnInit();

    expect(categoryListComponent.getCategories).toThrowError();
    localStorageResponseFail = false;
    apiResponseFail = false;
  });
});
