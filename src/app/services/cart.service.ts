import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  concatAll,
  forkJoin,
  map,
  merge,
  mergeAll,
  mergeMap,
  Observable,
} from 'rxjs';
import { CartProduct } from 'src/models/CartProduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  add(cartProduct: CartProduct): Observable<Object> {
    const endpoint = 'http://localhost:3000/cart';
    return this.http
      .get<CartProduct[]>(
        `http://localhost:3000/cart?productId=${cartProduct.productId}&_page=1&_limit=1`
      )
      .pipe(
        map((cartItems) => {
          if (cartItems.length > 0) {
            const item = cartItems[0];
            item.quantity += cartProduct.quantity;
            return this.http.patch(`${endpoint}/${item.id}`, { quantity: item.quantity });
          } else {
            return this.http.post(endpoint, cartProduct);
          }
        }),
        concatAll()
      );
  }

  get(): Observable<CartProduct[]> {
    return this.http.get<CartProduct[]>(
      'http://localhost:3000/cart?_expand=product'
    );
  }

  reset(): Observable<Object> {
    return this.get().pipe(
      map((cart) =>
        forkJoin(
          cart.map((item) =>
            this.http.delete(`http://localhost:3000/cart/${item.id}`)
          )
        )
      ),
      concatAll()
    );
  }

  changeQuantity(cartItemId: number, newQuantity: number) {
    return this.http.patch(`http://localhost:3000/cart/${cartItemId}`, {
      quantity: newQuantity,
    });
  }
}
