import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import UserModel from 'src/app/models/user.model';
import ShoppingCart from 'src/app/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
  appUser: UserModel;
  cart: ShoppingCart;
  countItemInCart: number = 0;

  constructor(private authService: AuthService,
    private router: Router,
    private shoppingCartService: ShoppingCartService) {
    authService.appUser$.subscribe(user => this.appUser = user);
  }

  async ngOnInit() {
    (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart = new ShoppingCart(cart.items);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
