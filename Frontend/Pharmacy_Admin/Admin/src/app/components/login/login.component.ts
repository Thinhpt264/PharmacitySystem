import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;
  account: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  checkLogin() {
    const formValue = this.loginForm.value;
    const loginData = {
      username: formValue.username,
      password: formValue.password,
    };

    console.log('Login data:', loginData);

    this.accountService
      .login(loginData)
      .then((response) => {
        this.isLoading = false;
        console.log('Response:', response); // ← Debug để xem response

        // Kiểm tra nhiều trường hợp
        if (response && response.status === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Đăng nhập thành công!',
          });

          localStorage.setItem('token', response.token);

          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        } else {
          // Sai tài khoản/mật khẩu - response trả về nhưng status = false
          this.messageService.add({
            severity: 'error',
            summary: 'Đăng nhập thất bại',
            detail: response?.message || 'Sai tài khoản hoặc mật khẩu!',
          });
        }
      })
      .catch((error) => {
        this.isLoading = false;
        console.error('Login error:', error); // ← Debug để xem lỗi

        // Kiểm tra loại lỗi
        if (error.status === 401 || error.status === 403) {
          // Lỗi authentication
          this.messageService.add({
            severity: 'error',
            summary: 'Đăng nhập thất bại',
            detail: 'Sai tài khoản hoặc mật khẩu!',
          });
        } else {
          // Lỗi hệ thống khác
          this.messageService.add({
            severity: 'warn',
            summary: 'Lỗi hệ thống',
            detail: 'Không thể đăng nhập. Vui lòng thử lại.',
          });
        }
      });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Lấy giá trị từ form
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      // Gán vào account object nếu cần
      this.account.username = username;
      this.account.password = password;

      this.isLoading = true;
      this.checkLogin();
    }
  }
}
