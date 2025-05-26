import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseUrlService } from 'src/app/service/baseUrl.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './productCategory.component.html',
})
export class ProductCategoryComponent implements OnInit {
  categoryId: any;
  products: any = [];
  category: any = {};
  categoryGrandParent: any;
  categoryParent: any;
  originCategoryId: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private baseUrl: BaseUrlService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    console.log('aaa');
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('ID thay đổi:', id);
      this.categoryId = id;

      // Gọi API theo id hoặc làm gì tùy ý
    });
    this.findAll();
    this.findByCategoryId(this.categoryId);

    this.categoryService
      .findCategoryByCategoryParent(this.categoryId)
      .then((res) => {
        const categories = res.categories;

        // Gán danh sách tạm vào categoryParent
        this.categoryGrandParent = categories;

        console.log(this.categoryGrandParent);

        // Lặp từng category để gọi API lấy ảnh tương ứng
        this.categoryGrandParent.forEach((category) => {
          this.categoryService
            .findImageOfObjId(category.id, 'Category')
            .then((res) => {
              const fullPath =
                this.baseUrl.getBaseUrl() +
                res.image.path +
                res.image.imageName;
              category.imgUrl = fullPath; // Gán vào đối tượng category
            });
        });
      });
  }

  findAll() {
    this.productService.findProductByCategoryId(this.categoryId).then((res) => {
      console.log(res.products);
      this.products = res.products;

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
  }

  findByCategoryId(id: any) {
    this.categoryService.findByCategoryId(id).then((res) => {
      this.category = res.category;
      this.categoryService
        .findByCategoryId(res.category.categoryParentId)
        .then((result) => {
          this.categoryParent = result.category.categoryName;
        });
    });
  }

  gotoHome() {
    window.location.href = 'home';
  }
  gotoProductDetails(id: number) {
    window.location.href = 'product/'+ id;
  }
}
