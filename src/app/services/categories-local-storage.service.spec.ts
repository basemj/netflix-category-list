import { TestBed, inject } from '@angular/core/testing';

import { CategoriesLocalStorageService } from 'app/services/categories-local-storage.service';
import { AppSettings } from 'app/app-settings';

const mockJson = [{ url: 'url 1', name: 'name 1' }, { url: 'url 2', name: 'name 2' }, { url: 'url 3', name: 'name 3' }];

describe('CategoriesLocalStorageService', () => {
  let categoriesLocalStorageService: CategoriesLocalStorageService,
    appSettings: AppSettings;

  beforeEach(() => {
    appSettings = new AppSettings();
    categoriesLocalStorageService = new CategoriesLocalStorageService(appSettings);

    TestBed.configureTestingModule({
      providers: [CategoriesLocalStorageService, AppSettings]
    });
  });

  it('should initiate', () => {
    expect(categoriesLocalStorageService).toBeTruthy();
  });

  it('should throw error if localStorage is empty', () => {
    window.localStorage.clear();
    categoriesLocalStorageService.getData().subscribe(
      null,
      err => { expect(err).toBe('Could not find the correct categories list on localStorage'); }
    );
  });

  it('should throw error if localStorage is invalid', () => {
    window.localStorage.clear();
    window.localStorage[appSettings.STORAGE_KEY + 'TimeStamp'] = +new Date;
    window.localStorage[appSettings.STORAGE_KEY] = '[]';
    categoriesLocalStorageService.getData().subscribe(
      null,
      err => { expect(err).toBe('Could not find the correct categories list on localStorage'); }
    );
  });

  it('should throw error if localStorage is out of date', () => {
    window.localStorage.clear();
    const date = new Date;
    date.setDate(date.getDate() - 1);
    window.localStorage[appSettings.STORAGE_KEY + 'TimeStamp'] = +date;
    window.localStorage[appSettings.STORAGE_KEY] = JSON.stringify(mockJson);
    categoriesLocalStorageService.getData().subscribe(
      null,
      err => { expect(err).toBe('Could not find the correct categories list on localStorage'); }
    );
  });

  it('should get data from localStorage', () => {
    window.localStorage.clear();
    window.localStorage[appSettings.STORAGE_KEY + 'TimeStamp'] = +new Date;
    window.localStorage[appSettings.STORAGE_KEY] = JSON.stringify(mockJson);
    categoriesLocalStorageService.getData().subscribe(
      res => {
        expect(res).toBeDefined();
        expect(res.length).toBe(3);
      },
      null
    );
  });
});
