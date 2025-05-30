import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  showPassword() {
    this.show = !this.show;
  }

  checkLogin(evt: any) {
    evt.preventDefault();

    this.accountService.login(this.account).then(
      (response) => {
        if (response.message === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Đăng nhập thành công! Chuyển về trang chủ',
          });

          localStorage.setItem('token', response.token);
          sessionStorage.setItem('account', JSON.stringify(response.account));
          // this.account = response.account
          setTimeout(() => {
            window.location.href = '/home';
          }, 1500);
        } else if (response.message === false) {
          this.messageService.add({
            severity: 'eror',
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
