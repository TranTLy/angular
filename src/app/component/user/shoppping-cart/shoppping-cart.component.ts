import { ShoppingCartService } from './../../../services/shopping-cart.service';
import ShoppingCart from 'src/app/models/shopping-cart';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoppping-cart',
  templateUrl: './shoppping-cart.component.html',
  styleUrls: ['./shoppping-cart.component.scss']
})
export class ShopppingCartComponent implements OnInit {
  cart: ShoppingCart;
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart = new ShoppingCart(cart.items);
    });
  }
  deleteAll() {
    this.shoppingCartService.deleteAll();
  }

}
