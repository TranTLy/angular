import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import UserModel from 'src/app/models/user.model';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  appUser: UserModel;
  cart;
  countItemInCart: number;
  subscription: Subscription;

  constructor(private authService: AuthService,
    private router: Router,
    private shoppingCartService: ShoppingCartService) {
    authService.appUser$.subscribe(user => this.appUser = user);
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart = cart;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
