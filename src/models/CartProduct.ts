import { Product } from './Product';

export interface CartProduct {
  id?: number;
  productId: number;
  quantity: number;
  product?: Product;
}
