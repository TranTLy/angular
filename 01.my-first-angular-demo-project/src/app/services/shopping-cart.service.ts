import Product from 'src/app/models/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import ShoppingCart from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  node: string;

  constructor(private db: AngularFireDatabase) {
    this.node = '/shopping-carts';
  }

  private create() {
    return this.db.list(this.node).push({
      dateCreate: new Date().getTime()
    });
  }

  async getCart() {
    const cartId = await this.getOrCreateCart();
    return this.db.object(this.node + '/' + cartId).valueChanges();
  }
  private getItems(cartId: string, productId: string) {
    return this.db.object(this.node + '/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCart(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) { // create new shopping cart id then store to local storage
      const cart = await this.create();
      localStorage.setItem('cartId', cart.key);
      return cart.key;
    }

    return cartId;
  }

  async addToCart(product: Product) {
    this.updateCartQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateCartQuantity(product, -1);
  }

  private async updateCartQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCart();
    const items$ = this.getItems(cartId, product.key);

    items$.snapshotChanges().pipe(take(1)).subscribe(item => {
      const quantity = item.payload.hasChild('quantity') ? item.payload.val()['quantity'] + change : 1;
      items$.update({ product: product, quantity: quantity });
    });
  }

}
