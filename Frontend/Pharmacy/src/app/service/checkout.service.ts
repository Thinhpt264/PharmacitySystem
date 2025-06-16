import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrlService } from './baseUrl.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private baseApiUrl: string;

  constructor(private http: HttpClient, private baseUrl: BaseUrlService) {
    this.baseApiUrl = this.baseUrl.getBaseUrl();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  async createOrder(orderData: any): Promise<any> {
    const url = `${this.baseApiUrl}api/v1/orders/create`;
    return await lastValueFrom(
      this.http.post(url, orderData, {
        headers: this.getAuthHeaders(),
      })
    );
  }

  async payWithVNPay(orderId: number): Promise<string> {
    const url = `${this.baseApiUrl}api/payment/pay?orderId=${orderId}`;
    return await lastValueFrom(
      this.http.post(url, null, {
        headers: this.getAuthHeaders(),
        responseType: 'text',
      })
    );
  }
  async findByAccountIdAndStatus(accountId: any): Promise<any> {
    const url = `${this.baseApiUrl}api/v1/orders/search?accountId=`;
    return await lastValueFrom(
      this.http.get(url + accountId, {
        headers: this.getAuthHeaders(),
      })
    );
  }

  //status của order
  //0: Đang chờ xác nhận
  //1: Đã xác nhận
  //2: Đang chờ lấy hàng
  //3: Đang giao hàng
  //4: Đã giao hàng
  //5: Đang chờ thanh toán
}
