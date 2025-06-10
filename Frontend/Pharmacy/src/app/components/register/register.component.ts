import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { ValidationService } from 'src/app/service/validation.service';

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
    gender: '1',
  };

  errors: any = {
    email: '',
    username: '',
    password: '',
    password_cf: '',
    gender: '',
  };

  genders = [
    { name: 'Nam', value: '1' },
    { name: 'Nữ', value: '0' },
  ];
  show: boolean = false;
  constructor(
    private accountService: AccountService,
    private router: Router,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {}

  // Gọi hàm kiểm tra realtime theo từng field
  onInputChange(field: string): void {
    switch (field) {
      case 'email':
        this.errors.email =
          this.validationService.validateEmail(this.account.email) || '';
        break;
      case 'username':
        this.errors.username =
          this.validationService.validateUsername(this.account.username) || '';
        break;
      case 'password':
        this.errors.password =
          this.validationService.validatePassword(this.account.password) || '';
        // kiểm tra luôn mật khẩu xác nhận nếu mật khẩu thay đổi
        this.errors.password_cf =
          this.validationService.validateConfirmPassword(
            this.account.password,
            this.account.password_cf
          ) || '';
        break;
      case 'password_cf':
        this.errors.password_cf =
          this.validationService.validateConfirmPassword(
            this.account.password,
            this.account.password_cf
          ) || '';
        break;
      case 'gender':
        this.errors.gender =
          this.validationService.validateGender(this.account.gender) || '';
        break;
    }
  }

  // Khi người dùng nhấn submit
  checkRegister(evt: Event) {
    evt.preventDefault();

    // Gọi lại validate cho tất cả trường
    this.onInputChange('email');
    this.onInputChange('username');
    this.onInputChange('password');
    this.onInputChange('password_cf');
    this.onInputChange('gender');

    const hasError = Object.values(this.errors).some((err) => err !== '');

    if (hasError) {
      console.warn('Form còn lỗi:', this.errors);
      return;
    }

    // Nếu không có lỗi, gửi dữ liệu đến backend
    this.accountService
      .register(this.account)
      .then((response) => {
        if (response.message === true) {
          console.log('Đăng kí tài khoản thành công:', response.account);
          window.location.href = '/register-success';
          localStorage.setItem('token', response.token);
          sessionStorage.setItem('account', JSON.stringify(response.account));
        } else {
          console.error('Đăng kí thất bại:', response);
          alert('Đăng kí thất bại. Vui lòng thử lại.');
        }
      })
      .catch((error) => {
        console.error('Lỗi trong quá trình đăng kí:', error);
        alert('Lỗi nội bộ server');
      });
  }

  goToHome() {
    window.location.href = '/home';
  }

  goToLogin() {
    window.location.href = '/login';
  }

  showPassword() {
    this.show = !this.show;
  }
}
