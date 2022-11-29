import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = {} as Product;
  selectedQty: number = 1;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart() {
    this.cartService
      .add({
        productId: this.product.id,
        quantity: this.selectedQty,
      })
      .subscribe(() => {
        alert(`${this.product.name} added to cart successfully`);
      });
  }
}
