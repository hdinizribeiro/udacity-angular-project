import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product-service.service';
import { Product } from 'src/models/Product';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  product: Product = {} as Product;
  selectedQty: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    this.productService.getById(productId).subscribe((product) => {
      this.product = product;
    });
  }

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
