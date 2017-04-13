import { TestBed, async } from '@angular/core/testing';
import {
  ResponseOptions,
  Response,
  Http,
  BaseRequestOptions,
  RequestMethod
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AppComponent } from './app.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { Search } from './pipes/search';
import { AppSettings } from './app-settings';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CategoryListComponent,
        Search
      ],
      providers: [
        { provide: Http },
        MockBackend,
        BaseRequestOptions,
        AppSettings
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
