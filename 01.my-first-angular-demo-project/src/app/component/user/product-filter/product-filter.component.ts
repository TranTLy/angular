import { CategoryService } from './../../../services/category/category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  @Input('category') category: string;
  categories$;
  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();

  }

}
