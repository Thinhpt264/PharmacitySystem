import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './cart.component.html',
  styleUrls : ['./cart.component.css']

})
export class CartComponent implements OnInit {

  cart: any = {};
  total: any;
  constructor(
    private cartService : CartService
  ){}
    ngOnInit(): void {
     
      this.cartService.getCart();
      this.cart = this.cartService.getCart();
      console.log(this.cart);
     
      console.log('object');
    }
  
}