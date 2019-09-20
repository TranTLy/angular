import { ProductService } from '../../../services/product/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Product from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filterProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = productService.getAll<Product>().subscribe(products => {
      this.filterProducts = this.products = products;
      // console.log('product list: ' + JSON.stringify(this.products));
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    // console.log('query: ' + query);
    this.filterProducts = query ? this.products.filter(item =>
      item.title.trim().toLowerCase().includes(query.trim().toLowerCase()))
      : this.products;
  }

  ngOnInit() {
  }

}
