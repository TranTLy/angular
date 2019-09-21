import { ShoppingCartService } from './../../services/shopping-cart.service';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('isShowAction') isShowAction = true;
  @Input('cart') cart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.cart) {// cart is not exist
      return 0;
    }
    const item = this.cart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
