import { Injectable } from '@angular/core';

@Injectable()
export class BaseUrlService {
  private baseUrl: string = 'http://localhost:8083/';
  private imageUrl: string = 'http://localhost:8083/assets/images/';
  private productUrl: string = 'http://localhost:8083/assets/images/product/';
  private baseUrlPrediction: string = 'http://127.0.0.1:8082/';
  getBaseUrl(): string {
    return this.baseUrl;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  getProductUrl(): string {
    return this.productUrl;
  }
  getBaseUrlPrediction(): string {
    return this.baseUrlPrediction;
  }
}
