import ShoppingCart from 'src/app/models/shopping-cart';
import { ShoppingCartService } from './../../../services/shopping-cart.service';
import Product from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../services/category/category.service';
import { ProductService } from './../../../services/product/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filterProducts: Product[] = [];
  category: string;
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private router: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart = new ShoppingCart(cart.items);
    });

    this.productService.getAll<Product>()
      .pipe(switchMap(products => {
        this.products = products;
        return this.router.queryParamMap;
      }))
      .subscribe(param => {
        this.category = param.get('category');
        this.filterProducts = this.category ?
          this.products.filter(item => item.category === this.category)
          : this.products;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
