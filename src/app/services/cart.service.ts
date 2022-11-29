import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
