import { TestBed, inject } from '@angular/core/testing';
import { Http, Response } from '@angular/http';

import { CategoriesDataService } from 'app/services/categories-data.service';
import { AppSettings } from 'app/app-settings';

describe('DataService', () => {
  let categoriesDataService: CategoriesDataService,
    appSettings: AppSettings,
    http: Http;

  beforeEach(() => {
    appSettings = new AppSettings();
    categoriesDataService = new CategoriesDataService(http);

    TestBed.configureTestingModule({
      providers: [CategoriesDataService, AppSettings]
    });
  });

  it('should initiate', () => {
    expect(categoriesDataService).toBeTruthy();
  });
});
