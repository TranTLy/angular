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
  id;
  constructor(private categoryService: CategoryService, private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();
    this.id = route.snapshot.paramMap.get('id');
    // console.log('this.id: ' + this.id);
    if (this.id) {
      productService.get(this.id).pipe(take(1)).subscribe(product => {
        console.log('product: ' + JSON.stringify(product));
        this.product = product;
      });
    }
  }

  save() {
    if (this.id) {
      this.productService.update(this.id, this.product);
    } else {
      this.productService.create(this.product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (this.id && confirm("Do you want to delete this product?")) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }


}
