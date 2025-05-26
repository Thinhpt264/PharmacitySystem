import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrlService } from 'src/app/service/baseUrl.service';
import { BrandService } from 'src/app/service/brand.service';
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
  listBrand: any = {};
  listProd: any[] = [];
  categoryParent: any[] = [];
  selectedBrandIds: number[] = []
  imageUrl: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private baseUrl: BaseUrlService,
    private currencyPipe: CurrencyPipe,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {
    this.displayMinPrice = this.formatPrice(this.priceRange[0]);
    this.displayMaxPrice = this.formatPrice(this.priceRange[1]);
  }

  ngOnInit(): void {
    this.findAll();
    this.findAllBrand();
  }

  findAll() {
    this.productService.findAll().then((res) => {
      console.log(res);
      this.products = res;
      this.listProd = res;

      // Nếu bạn muốn load hình ảnh của từng product
      this.findImageForObj();
    });

    this.findCategory();
  }

  findAllBrand() {
    this.brandService.findAll().then((res) => {
      console.log(res);
      this.listBrand = res;
    });
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
  async onSliderChange(range: number[]) {
    this.priceRange = range;
    this.updateDisplayPrices();
    await this.applyFilters();
    
  }
   async onBrandChange(brandId: number, event: Event) {
  const input = event.target as HTMLInputElement;
  const checked = input.checked;

  if (checked) {
    this.selectedBrandIds.push(brandId);
  } else {
    this.selectedBrandIds = this.selectedBrandIds.filter(id => id !== brandId);
  }

  this.applyFilters();
}
  async applyFilters() {
    this.listProd = await this.productService.filterProducts(
      this.priceRange[0],
      this.priceRange[1],
      this.selectedBrandIds
    );
    this.products = this.listProd;
    this.findImageForObj();
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
    console.log(minPrice);
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

  gotoProductDetails(id: number) {
    window.location.href = 'product/' + id;
  }
  findImageForObj() {
    this.products.forEach((product, index) => {
    if (!product || !product.id) return;

    const tableName = 'Product';
    this.productService.findImageOfObjId(product.id, tableName)
      .then((imgRes) => {
        if (!this.products[index]) return; // Kiểm tra lại trước khi gán
        const fullPath =
          this.baseUrl.getBaseUrl() +
          imgRes.image.path +
          imgRes.image.imageName;
        this.products[index].imageUrl = fullPath;
      })
      .catch(err => {
        console.error('Image fetch error for product', product.id, err);
      });
  });
  }
}