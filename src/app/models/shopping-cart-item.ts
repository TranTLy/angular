import Product from 'src/app/models/product';

export default class ShoppingCartItem {
  title: string;
  price: number;
  img: string;
  key: string;
  quantity: number;
  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }
  get total() {
    return this.price * this.quantity;
  }
}
