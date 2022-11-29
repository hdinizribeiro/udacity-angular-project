import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProduct } from 'src/models/CartProduct';
import { Product } from 'src/models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartProducts: Product[] = [];

  constructor(private http: HttpClient) {}

  get(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  getById(id: number) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }
}
