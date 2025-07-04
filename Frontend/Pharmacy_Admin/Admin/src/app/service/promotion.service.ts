import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './baseUrl.service';
import { lastValueFrom } from 'rxjs';
// promotion.model.ts
export enum PromotionType {
  DISCOUNT = 'DISCOUNT',
  FREE_SHIP = 'FREE_SHIP',
}

export enum PromotionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
  UPCOMING = 'UPCOMING',
}

export interface PromotionRequestDTO {
  promotionName: string;
  promotionType: PromotionType;
  status: PromotionStatus;
  discountValue: number;
  isPercentageDiscount: boolean;
  startDate: string;
  endDate: string;
  quantity: number;
  currentQuantity: number;
  productId: number | null;
  couponCode?: string;
}

export interface PromotionResponseDTO extends PromotionRequestDTO {
  id: number;
  productName?: string;
}

@Injectable()
export class PromotionService {
  private promotions: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private baseUrl: BaseUrlService
  ) {}

  async findAll(): Promise<PromotionResponseDTO[]> {
    return await lastValueFrom(
      this.httpClient.get<PromotionResponseDTO[]>(
        this.baseUrl.getBaseUrl() + 'api/v1/promotions'
      )
    );
  }

  async findById(id: number): Promise<PromotionResponseDTO> {
    return await lastValueFrom(
      this.httpClient.get<PromotionResponseDTO>(
        this.baseUrl.getBaseUrl() + 'api/v1/promotions/' + id
      )
    );
  }

  async createPromotion(
    promo: PromotionRequestDTO
  ): Promise<PromotionResponseDTO> {
    return await lastValueFrom(
      this.httpClient.post<PromotionResponseDTO>(
        this.baseUrl.getBaseUrl() + 'api/v1/promotions',
        promo
      )
    );
  }

  async updatePromotion(
    id: number,
    promo: PromotionRequestDTO
  ): Promise<PromotionResponseDTO> {
    return await lastValueFrom(
      this.httpClient.put<PromotionResponseDTO>(
        this.baseUrl.getBaseUrl() + 'api/v1/promotions/' + id,
        promo
      )
    );
  }
  async deletePromotion(id: number): Promise<void> {
    return await lastValueFrom(
      this.httpClient.delete<void>(
        this.baseUrl.getBaseUrl() + 'api/v1/promotions/' + id
      )
    );
  }

  cachePromotions(promotions: any[]): void {
    this.promotions = promotions;
  }

  getCachedPromotions(): any[] {
    return this.promotions;
  }

  async filterPromotions(
    startDate?: string,
    endDate?: string,
    type?: string
  ): Promise<any[]> {
    const allPromotions = await this.findAll();
    this.promotions = allPromotions;

    let filtered = [...allPromotions];

    if (startDate && endDate) {
      filtered = filtered.filter(
        (promo) => promo.startDate >= startDate && promo.endDate <= endDate
      );
    }

    if (type) {
      filtered = filtered.filter((promo) => promo.promotionType === type);
    }

    return filtered;
  }
  async getAllProducts(): Promise<any[]> {
    return await lastValueFrom(
      this.httpClient.get<any[]>(this.baseUrl.getBaseUrl() + 'api/v1/products')
    );
  }
}
