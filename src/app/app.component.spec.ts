import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SearchBoxComponent } from './search-box/search-box.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CategoryListComponent,
        SearchBoxComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
