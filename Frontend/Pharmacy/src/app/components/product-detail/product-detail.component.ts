import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseUrlService } from 'src/app/service/baseUrl.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './product-detail.component.html',

})

export class ProductDetailComponent implements OnInit {
    id: any;
    product: any = {};
    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private baseUrl: BaseUrlService,
        private categoryService: CategoryService
      ) {}
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('ID thay đổi:', id);
      this.id = id;

      // Gọi API theo id hoặc làm gì tùy ý
    });
      this.findById(this.id);
    }
    findById(id: any) {
    this.productService.findById(id).then((res) => {
      this.product = res.data;
      console.log(this.product)
    });
  }
  
}