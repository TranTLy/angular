import Product from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../services/category/category.service';
import { ProductService } from './../../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = [];
  filterProducts: Product[] = [];
  categories$;
  category: string;
  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private router: ActivatedRoute) {
    productService.getAll<Product>()
      .pipe(switchMap(products => {
        this.products = products;
        return router.queryParamMap;
      }))
      .subscribe(param => {
        this.category = param.get('category');
        this.filterProducts = this.category ? this.products.filter(item => item.category === this.category) : this.products;
      });
  }
}
