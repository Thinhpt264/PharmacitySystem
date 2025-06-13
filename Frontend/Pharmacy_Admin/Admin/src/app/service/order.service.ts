import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BaseUrlService } from './baseUrl.service';

@Injectable()
export class OrderService {
  constructor(
    private httpClient: HttpClient,
    private baseUrl: BaseUrlService
  ) {}

  async findAll(): Promise<any> {
    return await lastValueFrom(
      this.httpClient.get(
        this.baseUrl.getBaseUrl() + 'api/v1/orders/findAll'
      )
    );
  }
  
  async acceptOrder(id: number): Promise<any> {
    return await lastValueFrom(
      this.httpClient.get(
        this.baseUrl.getBaseUrl() + 'api/v1/orders/accept/' + id
      )
    );
  }
}
