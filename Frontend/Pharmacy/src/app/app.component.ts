import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CategoryService } from './service/category.service';
import { BaseUrlService } from './service/baseUrl.service';
import { filter } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  showLayout = true;
  account: any = {};
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private baseUrl: BaseUrlService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Ẩn layout khi ở trang login hoặc register
        this.showLayout = ![
          '/login',
          '/register',
          '/register-success',
        ].includes(event.urlAfterRedirects);
      });
  }
  ngOnInit(): void {
    this.findAll();
    this.loadSession();
  }

  loadSession() {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        this.account = JSON.parse(atob(token.split('.')[1]));
        this.account.username = this.account.sub
        console.log(this.account)
      } catch {
        this.account = {};
      }
    }
  }

  logout() {
    const confirmed = confirm('Bạn có chắc chắn muốn đăng xuất không?');
    if (confirmed) {
      localStorage.removeItem('token');
      this.account = {};
      this.router.navigate(['/login']);
    }
  }

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

  goToRegisterSucces() {
    window.location.href = '/register-success';
  }

  goToHome() {
    window.location.href = '/home';
  }
  goToProducts() {
    window.location.href = '/product';
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

  goToCart() {
    window.location.href = '/cart';
  }

  goToLocations() {
    window.location.href = '/about';
  }
  goToThank() {
    window.location.href = '/thank-you';
  }
}
