import { Router } from '@angular/router';
import { ProductService } from './../../../product.service';
import { CategoryService } from './../../../category.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  categories$;
  constructor(private categoryService: CategoryService, private productService: ProductService, private router: Router) {
    this.categories$ = categoryService.getCategories();
  }

  save(product) {
    // console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }


}
