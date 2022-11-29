import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
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

  add(cartProduct: CartProduct): Observable<void> {
    return this.http.post<void>('http://localhost:3000/cart', cartProduct);
  }

  get(): Observable<CartProduct[]> {
    return this.http.get<CartProduct[]>(
      'http://localhost:3000/cart?_expand=product'
    );
  }

  reset(): Observable<Object> {
    // return this.get().pipe(
    //   map((cart) =>
    //     forkJoin(cart.map((item) => this.http.delete(`http://localhost:3000/${item.id}`)))
    //   )
    // );

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
}
