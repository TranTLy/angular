import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { CategoryService } from '../../../services/category/category.service';
import { Component } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  categories$;
  product = {};
  constructor(private categoryService: CategoryService, private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();
    const id = route.snapshot.paramMap.get('id');
    console.log('id: ' + id);
    if (id) {
      productService.get(id).pipe(take(1)).subscribe(product => {
        console.log('product: ' + JSON.stringify(product));
        this.product = product;
      });
    }
  }

  save(product) {
    // console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }


}
