import ShoppingCart from 'src/app/models/shopping-cart';
import { ShoppingCartService } from './../../services/shopping-cart.service';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('cart') cart: ShoppingCart;
  @Input('isShowAction') isShowAction = true;

  constructor(private shoppingCartService: ShoppingCartService) {
    // console.log("card product get quantity: " + this.cart.getQuantity(this.product));
    // console.log("card product get quantity: " + this.cart);
  }
  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }
}
