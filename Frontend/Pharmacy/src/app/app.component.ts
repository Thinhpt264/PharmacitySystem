import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from './service/category.service';
import { BaseUrlService } from './service/baseUrl.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  categories: any;
  imageOfObjectId: any;
  listChildrenCategory: any;
  path: string;
  src: string;
  cateId: any;
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private baseUrl: BaseUrlService
  ) {}
  ngOnInit(): void {
    this.findAll();
  }

  // findAll() {
  //   this.categoryService.findAllCategory().then((res) => {
  //     this.categories = res.categories;

  //     // for (let i = 0; i < res.categories.length; i++) {
  //     //   this.cateId = this.categories[i].id;
  //     //   console.log(this.cateId);

  //     // }
  //     //  this.findImageOfObjId(this.cateId);
  //   });
  // }

  findAll() {
    this.categoryService.findAllCategory().then((res) => {
      this.categories = res.categories;

      for (let i = 0; i < this.categories.length; i++) {
        const cateId = this.categories[i].id;
        const tableName = 'Category';
        this.categoryService
          .findImageOfObjId(cateId, tableName)
          .then((imgRes) => {
            const fullPath =
              this.baseUrl.getBaseUrl() +
              imgRes.image.path +
              imgRes.image.imageName;
            this.categories[i].imageUrl = fullPath;
          });
      }
    });
  }

  cachedChildren: { [key: number]: any[] } = {};

  findCategoryByCategoryParent(id: number) {
    // Nếu đã có dữ liệu con rồi thì không gọi lại API nữa
    if (this.cachedChildren[id]) {
      this.listChildrenCategory = this.cachedChildren[id];
      return;
    }

    this.categoryService.findCategoryByCategoryParent(id).then((res) => {
      this.listChildrenCategory = res.categories;

      // Gọi ảnh cho từng danh mục con
      for (let i = 0; i < this.listChildrenCategory.length; i++) {
        const cateId = this.listChildrenCategory[i].id;
        const tableName = 'Category';

        this.categoryService
          .findImageOfObjId(cateId, tableName)
          .then((imgRes) => {
            const fullPath =
              this.baseUrl.getBaseUrl() +
              imgRes.image.path +
              imgRes.image.imageName;
            this.listChildrenCategory[i].imageUrl = fullPath;
          });
      }

      // Cache kết quả lại để lần sau không cần gọi lại
      this.cachedChildren[id] = this.listChildrenCategory;
    });
  }
  goToCategoryById(categoryId: number) {
    console.log(categoryId);
    window.location.href = '/productCategory/' + categoryId;
    // this.router.navigate(['/productCategory', categoryId]);
  }

  goToHome() {
    window.location.href = '/home';
  }

  goToAbout() {
    window.location.href = '/about';
  }
  goToServices() {
    window.location.href = '/service';
  }
  goToNews() {
    window.location.href = '/news';
  }

  goToServiceDetails() {
    window.location.href = '/about';
  }
  goToContact() {
    window.location.href = '/contact';
  }

  goToPortfolio() {
    window.location.href = '/about';
  }

  goToPortfolio2() {
    window.location.href = '/about';
  }

  goToPortfolioDetails() {
    window.location.href = '/about';
  }

  goToTeam() {
    window.location.href = '/about';
  }

  goToTeamDetails() {
    window.location.href = '/about';
  }

  goToFAQ() {
    window.location.href = '/about';
  }

  goToLocations() {
    window.location.href = '/about';
  }
}
