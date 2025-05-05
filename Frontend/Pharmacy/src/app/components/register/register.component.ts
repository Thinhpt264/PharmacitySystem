import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  account: any = {
    email: '',
    username: '',
    password: '',
    password_cf: '',
    gender: '-1', // Khởi tạo gender mặc định
  };

  genders: any = [
    { name: 'Nam', value: '1' },
    { name: 'Nữ', value: '0' },
    { name: 'Giới tính', value: '-1' },
  ];

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  checkRegister(evt: any) {
    evt.preventDefault();
    console.log('Account:', this.account);
    console.log('Gender:', this.account.gender);

    try {
      // Gọi hàm findImageOfObjId từ service
      this.accountService.register(this.account).then((response) => {
        console.log(response);
        // Xử lý phản hồi từ backend
        if (response.status === true) {
          console.log('Đăng Kí tài khoản thành công!', response.account);
          // Xử lý đăng nhập thành công (ví dụ: lưu token, chuyển hướng)
          window.location.href = '/register-success';
          sessionStorage.setItem('account', JSON.stringify(response.account));
        } else {
          console.error('Đăng kí thất bại:', response);
          alert('');
        }
      });
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      alert('Lỗi nội bộ server');
    }
  }

  goToHome() {
    window.location.href = '/home';
  }
}
