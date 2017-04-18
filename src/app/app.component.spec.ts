import { TestBed, async } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SearchPipe } from './pipes/search.pipe';
import { AppSettings } from 'app/app-settings';
import { CategoriesDataService } from 'app/services/categories-data.service';
import { CategoriesLocalStorageService } from 'app/services/categories-local-storage.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CategoryListComponent,
        SearchPipe
      ],
      providers: [
        { provide: Http },
        MockBackend,
        BaseRequestOptions,
        AppSettings,
        CategoriesLocalStorageService,
        CategoriesDataService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
