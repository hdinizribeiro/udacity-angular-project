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
    total: 0,
  };
  showConfirmation: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.get().subscribe((cart) => {
      this.cartItems = cart;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.checkoutInfo.total = this.cartItems
      .map((c) => (c.product?.price ?? 0) * c.quantity)
      .reduce((prev, curr) => prev + curr);
  }

  checkout() {
    this.cartService.reset().subscribe(() => {
      this.showConfirmation = true;
    });
  }
}
