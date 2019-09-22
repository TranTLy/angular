import ShoppingCart from 'src/app/models/shopping-cart';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product;
  @Input('cart') cart: ShoppingCart;
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    // console.log("quantity, product item is:" + JSON.stringify(this.cart));
  }


  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }

  // getQuantity() {
  //   if (!this.cart) {// cart is not exist
  //     return 0;
  //   }
  //   const item = this.cart.items[this.product.key];
  //   return item ? item.quantity : 0;
  // }
}
