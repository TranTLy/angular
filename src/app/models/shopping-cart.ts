import ShoppingCartItem from './shopping-cart-item';

export default class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(private itemsMap) {
    // tslint:disable-next-line:forin
    for (const productId in itemsMap) {
      const item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({
        ...item, key: productId
      }));
    }
  }

  get getCountItems() {
    let countItemInCart = 0;
    // tslint:disable-next-line:forin
    for (const productId in this.items) {
      countItemInCart += this.items[productId].quantity;
    }
    return countItemInCart;
  }

  get total() {
    let sum = 0;
    for (const item of this.items) {
      sum += item.total;
    }
    return sum;
  }

  getQuantity(product): number {
    if (!this.itemsMap) {
      return 0;
    }
    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }
}
