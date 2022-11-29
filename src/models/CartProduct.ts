import { Product } from './Product';

export interface CartItem {
  id?: number;
  productId: number;
  quantity: number;
  product?: Product;
}
