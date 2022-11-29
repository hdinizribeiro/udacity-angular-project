import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product-service.service';
import { CartProduct } from 'src/models/CartProduct';
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

  addToCart(cartProduct: CartProduct) {
    this.cartService
      .add({
        productId: cartProduct.productId,
        quantity: cartProduct.quantity,
      })
      .subscribe(() => {
        alert(`${cartProduct.product?.name} added to cart successfully`);
      });
  }
}
