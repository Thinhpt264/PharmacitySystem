import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/service/promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
})
export class PromotionComponent implements OnInit {
  promotions: any[] = [];
  selectedPromotion: any;
  newPromotion: any = {
    title: '',
    description: '',
    type: '',
    startDate: '',
    endDate: ''
  };

  constructor(private promotionService: PromotionService) {}

  async ngOnInit() {
    await this.loadPromotions();
  }

  async loadPromotions() {
    this.promotions = await this.promotionService.findAll();
    this.promotionService.cachePromotions(this.promotions);
  }

  async viewPromotion(id: number) {
    this.selectedPromotion = await this.promotionService.findById(id);
  }

  async createPromotion() {
    const result = await this.promotionService.createPromotion(this.newPromotion);
    console.log('Created:', result);
    await this.loadPromotions();
  }

  async updatePromotion() {
    if (!this.selectedPromotion?.id) return;
    const result = await this.promotionService.updatePromotion(
      this.selectedPromotion.id,
      this.selectedPromotion
    );
    console.log('Updated:', result);
    await this.loadPromotions();
  }

  async deletePromotion(id: number) {
    await this.promotionService.deletePromotion(id);
    await this.loadPromotions();
  }

  async filterPromotions() {
    const filtered = await this.promotionService.filterPromotions(
      '2024-01-01',
      '2025-12-31',
      'SALE'
    );
    this.promotions = filtered;
  }

  loadCachedPromotions() {
    this.promotions = this.promotionService.getCachedPromotions();
  }
}
