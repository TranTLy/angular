import Product from 'src/app/models/product';

export default interface ShoppingCartItem {
  product: Product;
  quantity: number;
}
