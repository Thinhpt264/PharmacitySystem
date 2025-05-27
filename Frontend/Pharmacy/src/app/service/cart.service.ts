import { HttpClient } from "@angular/common/http";
import { Injectable, INJECTOR } from "@angular/core";
import { BaseUrlService } from "./baseUrl.service";
import { lastValueFrom } from "rxjs";

@Injectable()
export class CartService {
  constructor(
    private httpClient: HttpClient,
    private baseUrl: BaseUrlService
  ) {}

  getCart() {
    const cart = sessionStorage.getItem('cart');
    if (cart != null) {
      try {
        var cartObj = JSON.parse(cart);
        return cartObj;
      } catch (e) {
        console.error('Dữ liệu trong cart lỗi :', e);
        return [];
      }
    } else {
      return [];
    }
  }

  addToCart(product: any) {
    var cart = this.getCart();
    var existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.totalPrice =
        existingProduct.quantity * existingProduct.price; // Tính totalPrice
    } else {
      product.quantity = 1; // Đảm bảo quantity được khởi tạo
      product.totalPrice = product.quantity * product.price; // Tính totalPrice cho sản phẩm mới
      cart.push(product);
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
}