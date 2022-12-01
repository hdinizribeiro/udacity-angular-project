import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product-service.service';
import { CartItem } from 'src/models/CartItem';
import { Product } from 'src/models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService
      .get()
      .subscribe((products) => (this.products = products));
  }

  addToCart(item: CartItem) {
    this.cartService
      .add({
        productId: item.productId,
        quantity: item.quantity,
      })
      .subscribe(() => {
        alert(`${item.product?.name} added to cart successfully`);
      });
  }
}
