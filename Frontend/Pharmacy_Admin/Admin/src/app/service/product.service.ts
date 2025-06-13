import { HttpClient } from '@angular/common/http';
import { Injectable, INJECTOR } from '@angular/core';
import { BaseUrlService } from './baseUrl.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  private products: any[] = []; // Lưu trữ toàn bộ danh sách sản phẩm
  private brands: any[] = []; // Lưu trữ danh sách thương hiệu
  constructor(
    private httpClient: HttpClient,
    private baseUrl: BaseUrlService
  ) {}

  async findImageOfObjId(id: number, tableName: String): Promise<any> {
    return await lastValueFrom(
      this.httpClient.get(
        this.baseUrl.getBaseUrl() +
          'api/v1/image/findImageByObject?objectId=' +
          id +
          '&tableName=' +
          tableName
      )
    );
  }

  async findProductByCategoryId(id: number): Promise<any> {
    return await lastValueFrom(
      this.httpClient.get(
        this.baseUrl.getBaseUrl() + 'api/v1/products/by-category/' + id
      )
    );
  }

  async findAll(): Promise<any> {
    return await lastValueFrom(
      this.httpClient.get(this.baseUrl.getBaseUrl() + 'api/v1/products')
    );
  }
  async findById(id: number): Promise<any> {
    return await lastValueFrom(
      this.httpClient.get(this.baseUrl.getBaseUrl() + 'api/v1/products/' + id)
    );
  }
  async getTopProduct(): Promise<any> {
    return await lastValueFrom(
      this.httpClient.get(
        this.baseUrl.getBaseUrl() + 'api/v1/products/getListTop'
      )
    );
  }
  // Lọc sản phẩm theo giá và thương hiệu
  // Hàm lọc sản phẩm theo giá và thương hiệu
  async filterProducts(
    minPrice: number,
    maxPrice: number,
    brandIds: number[] = []
  ): Promise<any[]> {
    const allProducts = await this.findAll(); // Lấy danh sách từ API
    this.products = allProducts;

    let filteredProducts = [...allProducts];

    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    if (brandIds.length > 0) {
      filteredProducts = filteredProducts.filter((p) =>
        brandIds.includes(p.brandId)
      );
    }

    return filteredProducts;
  }

  // Lấy danh sách sản phẩm đã lưu
  getCachedProducts(): any[] {
    return this.products;
  }
}
