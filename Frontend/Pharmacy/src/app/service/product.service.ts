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
          'image/findImageByObject?objectId=' +
          id +
          '&tableName=' +
          tableName
      )
    );
  }

  async findProductByCategoryId(id: number): Promise<any> {
    return await lastValueFrom(
      this.httpClient.get(
        this.baseUrl.getBaseUrl() + 'api/products/by-category/' + id
      )
    );
  }

  async findAll(): Promise<any> {
    return await lastValueFrom(
      this.httpClient.get(this.baseUrl.getBaseUrl() + 'api/products')
    );
  }
  async findById(id: number): Promise<any> {
    return await lastValueFrom(
      this.httpClient.get(this.baseUrl.getBaseUrl() + 'api/products/' + id)
    );
  }
  async getTopProduct(): Promise<any> {
    return await lastValueFrom(
      this.httpClient.get(this.baseUrl.getBaseUrl() + 'api/products/getListTop')
    );
  }
  // Lọc sản phẩm theo giá và thương hiệu
  // Hàm lọc sản phẩm theo giá và thương hiệu
    filterProducts(minPrice: number, maxPrice: number): any[] {
        this.findAll().then(
            res => {
                res = this.products;
           }
       );
    let filteredProducts = [...this.products]; // Sao chép danh sách sản phẩm gốc

    // Lọc theo giá
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    // Lọc theo thương hiệu (nếu có chọn thương hiệu)
    // if (brandIds && brandIds.length > 0) {
    //   filteredProducts = filteredProducts.filter((product) =>
    //     brandIds.includes(product.brandId)
    //   );
    // }

    return filteredProducts;
  }

  // Lấy danh sách sản phẩm đã lưu
  getCachedProducts(): any[] {
    return this.products;
  }
}
