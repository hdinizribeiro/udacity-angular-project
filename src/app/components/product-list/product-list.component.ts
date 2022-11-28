import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service.service';
import { Product } from 'src/models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .get()
      .subscribe((products) => (this.products = products));
  }
}
