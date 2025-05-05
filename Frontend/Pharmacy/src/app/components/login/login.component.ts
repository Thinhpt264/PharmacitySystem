import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  // username: any;
  // password: any;
  account: any = {};
  constructor(private accountService: AccountService, private router: Router) {}
  ngOnInit(): void {}

  checkLogin(evt: any) {
    console.log(this.account.username);
    console.log(this.account.password);
    console.log(this.account);
    evt.preventDefault(); // Ngăn hành vi submit mặc định của form

    try {
      // Gọi hàm findImageOfObjId từ service
      this.accountService.login(this.account).then((response) => {
        console.log(response);
        // Xử lý phản hồi từ backend
        if (response.message === true) {
          console.log('Đăng nhập thành công!', response.account);
          // Xử lý đăng nhập thành công (ví dụ: lưu token, chuyển hướng)
          window.location.href = '/home';
          sessionStorage.setItem('account', JSON.stringify(response.account));
        } else {
          console.error('Đăng nhập thất bại:', response);
          alert('Sai tài khoản hoặc mật khẩu');
        }
      });
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      alert('Lỗi nội bộ server');
    }
  }
  goToRegister() {
    window.location.href = '/register';
  }
  goToHome() {
     window.location.href = '/home';
  }
}