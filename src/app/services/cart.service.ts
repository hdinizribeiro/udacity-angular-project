import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatAll, forkJoin, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from 'src/models/CartProduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {  
  private endpoint = `${environment.apiUrl}/cart`;
  constructor(private http: HttpClient) {}

  add(cartProduct: CartItem): Observable<Object> {
    return this.http
      .get<CartItem[]>(
        `${this.endpoint}?productId=${cartProduct.productId}&_page=1&_limit=1`
      )
      .pipe(
        map((cartItems) => {
          if (cartItems.length > 0) {
            const item = cartItems[0];
            item.quantity += cartProduct.quantity;
            return this.http.patch(`${this.endpoint}/${item.id}`, {
              quantity: item.quantity,
            });
          } else {
            return this.http.post(this.endpoint, cartProduct);
          }
        }),
        concatAll()
      );
  }

  get(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.endpoint}?_expand=product`);
  }

  reset(): Observable<Object> {
    return this.get().pipe(
      map((cart) =>
        forkJoin(
          cart.map((item) => this.http.delete(`${this.endpoint}/${item.id}`))
        )
      ),
      concatAll()
    );
  }

  changeQuantity(cartItemId: number, newQuantity: number) {
    return this.http.patch(`${this.endpoint}/${cartItemId}`, {
      quantity: newQuantity,
    });
  }

  remove(cartItemId: number): Observable<Object> {
    return this.http.delete(`${this.endpoint}/${cartItemId}`)
  }
}
