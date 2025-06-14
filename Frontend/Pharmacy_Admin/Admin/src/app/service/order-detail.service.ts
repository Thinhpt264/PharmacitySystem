import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BaseUrlService } from './baseUrl.service';

@Injectable()
export class OrderDetailService {
  constructor(
    private httpClient: HttpClient,
    private baseUrl: BaseUrlService
  ) {}

  async findByOrderId(id: any): Promise<any> {
    return await lastValueFrom(
      this.httpClient.get(
        this.baseUrl.getBaseUrl() + 'api/v1/orderDetails/findByOrderId/'+ id
      )
    );
  }
  
 
}
