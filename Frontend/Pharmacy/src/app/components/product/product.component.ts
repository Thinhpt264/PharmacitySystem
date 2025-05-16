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
  maxPrice: number = 1800000;
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
  ) {}

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
        this.categoryService.findImageOfObjId(category.id, 'Category').then(
          (res) => {
            const fullPath =
              this.baseUrl.getBaseUrl() + res.image.path + res.image.imageName;
            category.imgUrl = fullPath; // Gán vào đối tượng category
           
          });
      });
    });
  }

  // Hàm định dạng giá trị bằng CurrencyPipe
  private formatPrice(value: number | null): string {
    if (value === null || isNaN(value)) return '';
    return this.currencyPipe
      .transform(value, 'VND', 'symbol', '1.0-0')!
      .replace('₫', '')
      .trim();
  }

  // Hàm xử lý khi minPrice thay đổi
  onMinPriceChange(value: string): void {
    // Loại bỏ ký tự không phải số
    const rawValue = value.replace(/[^0-9]/g, '');
    let newMinPrice = rawValue ? parseInt(rawValue, 10) : null;

    if (newMinPrice !== null && newMinPrice < 0) {
      newMinPrice = 0; // Không cho phép giá trị âm
    }
    // Ràng buộc: minPrice <= maxPrice
    if (
      newMinPrice !== null &&
      this.maxPrice !== null &&
      newMinPrice > this.maxPrice
    ) {
      newMinPrice = this.maxPrice;
    }

    this.minPrice = newMinPrice;
    this.displayMinPrice = this.formatPrice(this.minPrice);

    // Cập nhật priceRange cho slider
    this.priceRange = [
      this.minPrice !== null ? this.minPrice : 0,
      this.maxPrice !== null ? this.maxPrice : 1800000,
    ];
  }

  // Hàm xử lý khi maxPrice thay đổi
  onMaxPriceChange(value: string): void {
    // Loại bỏ ký tự không phải số
    const rawValue = value.replace(/[^0-9]/g, '');
    let newMaxPrice = rawValue ? parseInt(rawValue, 10) : null;

    // Ràng buộc: maxPrice <= 1000000 và maxPrice >= minPrice
    if (newMaxPrice !== null && newMaxPrice > 1800000) {
      newMaxPrice = 1800000;
    }
    if (
      newMaxPrice !== null &&
      this.minPrice !== null &&
      newMaxPrice < this.minPrice
    ) {
      newMaxPrice = this.minPrice;
    }

    this.maxPrice = newMaxPrice;
    this.displayMaxPrice = this.formatPrice(this.maxPrice);

    // Cập nhật priceRange cho slider
    this.priceRange = [
      this.minPrice !== null ? this.minPrice : 0,
      this.maxPrice !== null ? this.maxPrice : 1800000,
    ];
  }

  // Hàm xử lý khi slider thay đổi
  onSliderChange(): void {
    // Cập nhật minPrice và maxPrice từ priceRange
    this.minPrice = this.priceRange[0];
    this.maxPrice = this.priceRange[1];

    // Cập nhật giá trị hiển thị cho input
    this.displayMinPrice = this.formatPrice(this.minPrice);
    this.displayMaxPrice = this.formatPrice(this.maxPrice);
  }
}