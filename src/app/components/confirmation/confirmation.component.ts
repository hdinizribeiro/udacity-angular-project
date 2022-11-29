import { Component, Input, OnInit } from '@angular/core';
import { CheckoutInfo } from 'src/models/CheckoutInfo';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  @Input() checkoutInfo?: CheckoutInfo;

  constructor() {}

  ngOnInit(): void {}
}
