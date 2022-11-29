import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product-service.service';
import { Product } from 'src/models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = null!;
  selectedQty: number = 1;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  createRange(length: number): number[] {
    return new Array(length).fill(0).map((item, index) => ++index);
  }

  addToCart() {
    this.cartService
      .add({
        productId: this.product.id,
        quantity: this.selectedQty,
      })
      .subscribe();
  }
}
