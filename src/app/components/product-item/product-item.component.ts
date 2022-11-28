import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = null!;
  constructor() {}

  ngOnInit(): void {}

  createRange(length: number): number[] {
    return new Array(length).fill(0).map((item, index) => ++index);
  }
}
