import { Subscription } from 'rxjs';
import ShoppingCart from 'src/app/models/shopping-cart';
import { AuthService } from './../../../services/auth-service/auth.service';
import { OrderService } from './../../../services/order.service';
import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart: ShoppingCart;
  userId;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private shippingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService) {
  }

  async ngOnInit() {
    this.cartSubscription = (await this.shippingCartService.getCart()).subscribe(cart => {
      this.cart = new ShoppingCart(cart.items);
      console.log("cart in checkout", this.cart);
    });

    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    console.log("user checkout", this.userId);

  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  placeOrder() {
    const order = this.createOrder();
    this.orderService.placeOrder(order);
  }

  createOrder() {
    return {
      datePlaced: new Date().getTime(),
      userId: this.userId,
      shipping: this.shipping,
      items: this.cart.items.map(item => {
        return {
          products: {
            title: item.title,
            price: item.price,
            img: item.img
          },
          quantity: item.quantity,
          total: item.total
        }
      })
    }
  }

}
