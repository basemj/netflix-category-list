import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

import { CategoriesDataService } from 'app/services/categories-data.service';
import { Category } from 'app/providers/Category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [CategoriesDataService]
})

export class CategoryListComponent implements OnInit {
  categories: Observable<Category[]>;

  constructor(private categoriesDataService: CategoriesDataService) { }

  getCategories() {
      this.categories = this.categoriesDataService.getCategories().share();
      this.categories.subscribe(
        () => console.log('loaded'),
        () => console.log('error')
      );
  }

  ngOnInit() { this.getCategories(); }
}
