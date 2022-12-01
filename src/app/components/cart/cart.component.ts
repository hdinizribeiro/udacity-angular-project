import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/models/CartItem';
import { CheckoutInfo } from 'src/models/CheckoutInfo';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  noNumericCharInCreditCard: boolean = false;
  
  @ViewChild('amountField') amountField: NgModel = {} as NgModel;
  cartItems: CartItem[] = [];
  checkoutInfo: CheckoutInfo = {
    address: '',
    creditCard: '',
    fullName: '',
    total: 0,
  };
  showConfirmation: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  calculateTotal(): void {
    if (this.cartItems.length > 0) {
      this.checkoutInfo.total = this.cartItems
        .map((c) => (c.product?.price ?? 0) * c.quantity)
        .reduce((prev, curr) => prev + curr);
    }
  }

  checkout() {
    this.cartService.reset().subscribe(() => {
      this.showConfirmation = true;
    });
  }

  changeQuantity(value: number, cartItem: CartItem) {
    this.cartService
      .changeQuantity(cartItem.id ?? 0, cartItem.quantity)
      .subscribe({
        next: () => {
          this.calculateTotal();
        },
        error: (e: HttpErrorResponse) => {
          if (e.status == 404) {
            alert('This product was removed from cart');
            this.loadCartItems();
          }
        },
      });
  }

  remove(item: CartItem) {
    const successFeedback = () => {
      alert(`${item.product?.name} removed from cart successfully`);
      this.loadCartItems();
    };
    this.cartService.remove(item.id ?? 0).subscribe({
      next: () => {
        successFeedback();
      },
      error: (e: HttpErrorResponse) => {
        if (e.status == 404) {
          successFeedback();
          return;
        }
      },
    });
  }

  validateAndSetAmountField(value: number, item: CartItem) {
    debugger;
    if (this.amountField.pristine) {
      return;
    }

    if (this.amountField.valid) {
      item.quantity = value;
    } else {
      this.amountField.reset(item.quantity);
    }
  }

  validateOnlyNumbers($event: string) {
    const regex = /^[0-9]*$/;
    if (!regex.test($event)) {
      this.noNumericCharInCreditCard = true;
    } else {
      this.noNumericCharInCreditCard = false;
    }
  }

  private loadCartItems() {
    this.cartService.get().subscribe((cart) => {
      this.cartItems = cart;
      this.calculateTotal();
    });
  }
}
