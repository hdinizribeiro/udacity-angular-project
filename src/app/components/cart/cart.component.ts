import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartProduct } from 'src/models/CartProduct';
import { CheckoutInfo } from 'src/models/CheckoutInfo';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartProduct[] = [];
  checkoutInfo: CheckoutInfo = {
    address: '',
    creditCard: '',
    fullName: '',
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.get().subscribe((cart) => (this.cartItems = cart));
  }

  total(): number | undefined {
    return this.cartItems
      .map((c) => c.product?.price ?? 0 * c.quantity)
      .reduce((prev, curr) => prev + curr);
  }
}
