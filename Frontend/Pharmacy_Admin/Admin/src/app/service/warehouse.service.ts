import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BaseUrlService } from './baseUrl.service';

@Injectable()
export class WareHouseService {
  constructor(
    private httpClient: HttpClient,
    private baseUrl: BaseUrlService
  ) {}

  async findAll(): Promise<any> {
    return await lastValueFrom(
      this.httpClient.get(this.baseUrl.getBaseUrl() + 'api/v1/warehouses')
    );
  }

  async createBatch(importBatchDTO: any): Promise<any> {
  return await lastValueFrom(
    this.httpClient.post(
      this.baseUrl.getBaseUrl() + 'api/v1/warehouses/create',
      importBatchDTO
    )
  );
}



}
