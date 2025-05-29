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

  removeCart(productId: any) {
    var cart = this.getCart();
    cart = cart.filter((product) => product.id != productId);
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  updateQuantity(product: any, status: boolean) {
    var cart = this.getCart();
    var existingProduct = cart.find((item) => item.id === product.id);
    if (status) {
      existingProduct.quantity += 1;
    } else {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      }
    }
    existingProduct.totalPrice =
      existingProduct.quantity * existingProduct.price; // Cập nhật totalPrice
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  saveCart(cart: any) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
}