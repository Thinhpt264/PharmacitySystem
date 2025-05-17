import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrlService } from 'src/app/service/baseUrl.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  categoryId: any;
  products: any[] = [];
  value: number[] = [0, 1000000];

  minPrice: number = 0;
  maxPrice: number = 2000000;
  priceRange: number[] = [this.minPrice, this.maxPrice];
  displayMaxPrice: any;
  displayMinPrice: any;

  categoryParent: any[] = [];
  imageUrl: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private baseUrl: BaseUrlService,
    private currencyPipe: CurrencyPipe,
    private categoryService: CategoryService
  ) {
    this.displayMinPrice = this.formatPrice(this.priceRange[0]);
    this.displayMaxPrice = this.formatPrice(this.priceRange[1]);
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.productService.findAll().then((res) => {
      console.log(res);
      this.products = res;

      // Nếu bạn muốn load hình ảnh của từng product
      for (let i = 0; i < this.products.length; i++) {
        const productId = this.products[i].id;
        const tableName = 'Product';
        this.productService
          .findImageOfObjId(productId, tableName)
          .then((imgRes) => {
            const fullPath =
              this.baseUrl.getBaseUrl() +
              imgRes.image.path +
              imgRes.image.imageName;
            this.products[i].imageUrl = fullPath;
          });
      }
    });

    this.findCategory();
  }

  findCategory() {
    this.categoryService.findCategoryByCategoryParent(1).then((res) => {
      const categories = res.categories;

      // Gán danh sách tạm vào categoryParent
      this.categoryParent = categories;

      // Lặp từng category để gọi API lấy ảnh tương ứng
      this.categoryParent.forEach((category) => {
        this.categoryService
          .findImageOfObjId(category.id, 'Category')
          .then((res) => {
            const fullPath =
              this.baseUrl.getBaseUrl() + res.image.path + res.image.imageName;
            category.imgUrl = fullPath; // Gán vào đối tượng category
          });
      });
    });
  }

  // Hàm định dạng giá trị bằng CurrencyPipe
  // private formatPrice(value: number | null): string {
  //   if (value === null || isNaN(value)) return '';
  //   return this.currencyPipe
  //     .transform(value, 'VND', 'symbol', '1.0-0')!
  //     .replace('₫', '')
  //     .trim();
  // }

  // Format number to string with thousand separators using CurrencyPipe
  private formatPrice(value: number): string {
    return (
      this.currencyPipe
        .transform(value, 'VND', 'symbol', '1.0-0')
        ?.replace('₫', '')
        ?.trim() || '0'
    );
  }

  // Parse string to number, removing non-numeric characters
  private parsePrice(value: string): number {
    return parseInt(value.replace(/[^0-9]/g, '')) || 0;
  }

  // Update display prices when slider changes
  onSliderChange(range: number[]) {
    this.priceRange = range;
    this.updateDisplayPrices();
  }

  // Update slider and display when min price input changes
  onMinPriceChange(value: string) {
    let minPrice = this.parsePrice(value);
    let maxPrice = this.priceRange[1];

    // Ensure minPrice <= maxPrice
    if (minPrice > maxPrice) {
      minPrice = maxPrice;
    }

    this.priceRange = [minPrice, maxPrice];
    this.updateDisplayPrices();
  }

  // Update slider and display when max price input changes
  onMaxPriceChange(value: string) {
    let maxPrice = this.parsePrice(value);
    let minPrice = this.priceRange[0];

    // Cap maxPrice at 2,000,000
    if (maxPrice > 2000000) {
      maxPrice = 2000000;
    }

    // Ensure maxPrice >= minPrice
    if (maxPrice < minPrice) {
      maxPrice = minPrice;
    }

    this.priceRange = [minPrice, maxPrice];
    this.updateDisplayPrices();
  }

  // Update input display values
  private updateDisplayPrices() {
    this.displayMinPrice = this.formatPrice(this.priceRange[0]);
    this.displayMaxPrice = this.formatPrice(this.priceRange[1]);
  }
}