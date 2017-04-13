import { TestBed, inject } from '@angular/core/testing';
import { Http, Response } from '@angular/http';

import { CategoriesDataService } from './categories-data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriesDataService, Http]
    });
  });

  it('should ...', inject([CategoriesDataService], (service: CategoriesDataService) => {
    expect(service).toBeTruthy();
  }));
});
