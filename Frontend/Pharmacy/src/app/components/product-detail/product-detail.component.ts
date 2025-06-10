import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BaseUrlService } from 'src/app/service/baseUrl.service';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  id: any;
  product: any = {};
  topProducts: any[] = [];
  cart: any = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private baseUrl: BaseUrlService,
    private cartService: CartService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('ID thay đổi:', id);
      this.id = id;

      // Gọi API theo id hoặc làm gì tùy ý
    });
    this.findById(this.id);
    this.getTopProductByView();
  }
  findById(id: any) {
    this.productService.findById(id).then((res) => {
      this.product = res.data;
      this.productService
        .findImageOfObjId(this.product.id, 'Product')
        .then((res) => {
          const fullPath =
            this.baseUrl.getBaseUrl() + res.image.path + res.image.imageName;
          this.product.imgUrl = fullPath; // Gán vào đối tượng category
        });
      console.log(this.product);
    });
  }
  getTopProductByView() {
    this.productService.getTopProduct().then((res) => {
      this.topProducts = res.data;
      console.log(this.topProducts);
      this.topProducts.forEach((product1) => {
        this.productService
          .findImageOfObjId(product1.id, 'Product')
          .then((res) => {
            const fullPath =
              this.baseUrl.getBaseUrl() + res.image.path + res.image.imageName;
            product1.imgUrl = fullPath;
          });
      });
    });
  }

  addToCart(product: any) {
    try {
      this.productService
        .findImageOfObjId(this.product.id, 'Product')
        .then((res) => {
          const fullPath =
            this.baseUrl.getBaseUrl() + res.image.path + res.image.imageName;
          this.product.imgUrl = fullPath; // Gán vào đối tượng product
          this.cartService.addToCart(this.product); // Cập nhật giỏ hàng với sản phẩm đã có ảnh
        });
      this.cart = this.cartService.getCart(); // Lấy lại giỏ hàng đã cập nhật
      console.log('Giỏ hàng sau khi thêm sản phẩm:', this.cart);
      this.messageService.add({
        severity: 'success',
        summary: 'Đã thêm vào giỏ hàng',
        detail: 'Sản phẩm đã được thêm vào giỏ hàng thành công!',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi khi thêm vào giỏ hàng',
        detail:
          'Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.',
      });
      console.error('Error adding to cart:', error);
    }
  }
}