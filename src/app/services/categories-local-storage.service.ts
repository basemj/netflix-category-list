import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { Category } from 'app/models/Category';
import { AppSettings } from 'app/app-settings';

@Injectable()
export class CategoriesLocalStorageService {
  now: number;
  timePassed: number;
  storedTimestamp: string;
  storedCategories: Category[];
  savedDate: any;
  storageKey: string;
  storageTimeout: number;

  constructor(private _appSettings: AppSettings) {
    this.storageKey = _appSettings.STORAGE_KEY;
    this.storageTimeout = _appSettings.STORAGE_TIMEOUT;
  }

  getData() {
    if (this.dataIsStored() && this.dataIsValid() && this.dataIsFresh()) {
      return Observable.create(observer => {
        observer.next(<Category[]>JSON.parse(window.localStorage[this.storageKey]));
        observer.complete();
      });
    }
    return Observable.throw('Could not find the correct categories list on localStorage');
  }

  private dataIsStored() {
    return ('localStorage' in window && window.localStorage);
  }

  private dataIsValid() {
    this.storedCategories = JSON.parse(window.localStorage.getItem(this.storageKey));
    this.storedTimestamp = window.localStorage.getItem(this.storageKey + 'TimeStamp');
    return this.storedCategories && this.storedCategories.length > 0 && this.storedCategories[0].url.length > 0 && this.storedCategories[0].name.length > 0;
  }

  private dataIsFresh() {
    this.now = +new Date();

    if (this.storedTimestamp && this.storedTimestamp.length > 0) {
      this.savedDate = new Date(parseInt(this.storedTimestamp, 10));
      this.timePassed = this.now - this.savedDate;

      return this.timePassed < this.storageTimeout;
    }
  }
}
