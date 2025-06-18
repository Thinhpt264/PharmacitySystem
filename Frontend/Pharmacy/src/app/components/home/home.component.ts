import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CategoryService } from 'src/app/service/category.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  categories: any;

  constructor(
    private categoryService: CategoryService,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Kiểm tra authentication khi load trang
    this.checkAuthentication();
    this.findAll();
    // sessionStorage.removeItem('token'); // Đổi thành sessionStorage nếu muốn test
  }

  // Kiểm tra người dùng đã đăng nhập chưa
  checkAuthentication(): void {
    if (!this.authService.isLoggedIn()) {
      console.log('❌ Token không tồn tại hoặc đã hết hạn');
      // Có thể redirect về login hoặc cho phép truy cập guest
      // this.router.navigate(['/login']); // Uncomment nếu muốn bắt buộc login
    } else {
      console.log('✅ User đã đăng nhập');
      console.log('Current user:', this.authService.getAccount());
    }
  }

  findAll() {
    this.categoryService.findAllCategory().then((res) => {
      console.log(res.categories);
      this.categories = res.categories;
    });
  }

  // Method logout nếu cần
  logout(): void {
    this.authService.logout();
  }
}
