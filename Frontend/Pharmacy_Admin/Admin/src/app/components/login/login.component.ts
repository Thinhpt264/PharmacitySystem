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
    private accountService : AccountService,
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
    this.accountService.login(this.account).then(
      (response) => {
        if (response.message === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Đăng nhập thành công! Chuyển về trang chủ',
          });

          localStorage.setItem('token', response.token);
          // sessionStorage.setItem('account', JSON.stringify(response.account));
          // this.account = response.account
          setTimeout(() => {
            window.location.href = '/home';
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

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        console.log('Login data:', this.loginForm.value);
        this.isLoading = false;
        // Handle login logic here
        // this.router.navigate(['/dashboard']);
      }, 2000);
      this.checkLogin();
    }
  }
}
