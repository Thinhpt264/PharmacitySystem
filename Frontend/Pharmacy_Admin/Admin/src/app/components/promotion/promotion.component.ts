import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/service/promotion.service';

declare var $: any;

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css'],
})
export class PromotionComponent implements OnInit {
  promotions: any[] = [];
  selectedPromotion: any;
  products: any[] = [];
  newPromotion: any = {
    promotionName: '',
    promotionType: '' as any,
    status: '' as any,
    discountValue: 0,
    isPercentageDiscount: false,
    startDate: '',
    endDate: '',
    quantity: 0,
    couponCode: '',
    currentQuantity: '',
    productId: '',
  };

  constructor(private promotionService: PromotionService) {}

  async ngOnInit() {
    try {
      this.promotions = await this.promotionService.findAll();
      console.log('Promotions:', this.promotions);
      this.products = await this.promotionService.getAllProducts();
    } catch (error) {
      console.error('Lỗi khi lấy danh sách khuyến mãi:', error);
    }
  }
  getProductName(productId: number): string {
    const product = this.products.find((p) => p.id === productId);
    return product ? product.name : 'Không rõ';
  }
  async loadPromotions() {
    this.promotions = await this.promotionService.findAll();
    this.promotionService.cachePromotions(this.promotions);
  }

  async viewPromotion(id: number) {
    this.selectedPromotion = await this.promotionService.findById(id);
  }

  async createPromotion() {
    const mappedPromotion = {
      ...this.newPromotion,
      productId: Number(this.newPromotion.productId),
      status: this.newPromotion.status || 'ACTIVE',
      currentQuantity: 0,
    };

    const result = await this.promotionService.createPromotion(mappedPromotion);
    console.log('Created:', result);
    await this.loadPromotions();

    // Đóng modal
    $('#addPromotionModal').modal('hide');
  }

  async updatePromotion() {
    if (!this.selectedPromotion?.id) return;
    const result = await this.promotionService.updatePromotion(
      this.selectedPromotion.id,
      this.selectedPromotion
    );
    console.log('Updated:', result);
    await this.loadPromotions();
    $('#editPromotionModal').modal('hide');
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
