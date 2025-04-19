import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseUrlService } from "src/app/service/baseUrl.service";
import { ProductService } from "src/app/service/product.service";

@Component({
    selector: 'app-root',
    templateUrl: './productCategory.component.html'
})

export class productCategoryComponent implements OnInit {
    categoryId: number;
    products : any;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private baseUrl: BaseUrlService
      ) {}

    ngOnInit(): void {
        this.categoryId = +this.route.snapshot.paramMap.get('id')!;
        this.findAll();
    }
    findAll() {
        this.productService.findProductByCategoryId(this.categoryId).then((res) => {
            this.products = res.products
            console.log(this.products)

            for (let i = 0; i < this.products.length; i++) {
                const productId = this.products[i].id;
                const tableName = "Product"
                this.productService.findImageOfObjId(productId, tableName).then((imgRes) => {
                  const fullPath =
                    this.baseUrl.getBaseUrl() +
                    imgRes.image.path +
                    imgRes.image.imageName;
                  this.products[i].imageUrl = fullPath;
                  console.log(fullPath)
                });
              }
        }) 

        
    }
}