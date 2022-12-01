import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from 'src/models/CartItem';
import { Product } from 'src/models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private endpoint = `${environment.apiUrl}/products`;
  cartProducts: Product[] = [];

  constructor(private http: HttpClient) {}

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.endpoint);
  }

  getById(id: number) {
    return this.http.get<Product>(`${this.endpoint}/${id}`);
  }
}
