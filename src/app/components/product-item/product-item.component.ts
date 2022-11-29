import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProduct } from 'src/models/CartProduct';
import { Product } from 'src/models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = {} as Product;
  @Output() addToCart: EventEmitter<CartProduct> = new EventEmitter();
  selectedQty: number = 1;

  constructor() {}

  ngOnInit(): void {}
}
