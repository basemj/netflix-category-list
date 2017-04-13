import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ResponseOptions,
  Response,
  Http,
  BaseRequestOptions,
  RequestMethod
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { CategoryListComponent } from './category-list.component';
import { Search } from 'app/pipes/search';
import { AppSettings } from 'app/app-settings';
import { CategoriesDataService } from 'app/services/categories-data.service';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryListComponent,
        Search
      ],
      providers: [
        { provide: Http },
        MockBackend,
        BaseRequestOptions,
        AppSettings,
        CategoriesDataService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CategoryListComponent', () => {
    expect(component).toBeTruthy();
  });
});

