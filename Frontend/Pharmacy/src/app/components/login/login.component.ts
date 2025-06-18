import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit {
  account: any = {};
  show: boolean = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService // Sử dụng AuthService để quản lý đăng nhập
  ) {}

  ngOnInit(): void {}

  showPassword() {
    this.show = !this.show;
  }

  checkLogin(evt: any) {
    evt.preventDefault();

    this.accountService.login(this.account).then(
      (response) => {
        console.log('✅ RESPONSE:', response);
        if (response.status === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công', 
            detail: 'Đăng nhập thành công! Chuyển về trang chủ',
          });
        
          // Sử dụng AuthService thay vì trực tiếp sessionStorage
          this.authService.login(response.token);
          // sessionStorage.setItem('token', response.token); // Lưu token vào sessionStorage
          setTimeout(() => {
            window.location.href = '/home';
            // this.router.navigate(['/home']);
          }, 1500);
        
        } else if (response.message === false) {
          this.messageService.add({
            severity: 'error',
            summary: 'Thất bại',
            detail: 'Sai tài khoản hoặc mật khẩu!',
          });
        }
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Lỗi hệ thống',
          detail: 'Không thể đăng nhập. Vui lòng thử lại.',
        });
      });
  }

  goToRegister() {
    window.location.href = '/register';
  }

  goToHome() {
    window.location.href = '/home';
  }
}
