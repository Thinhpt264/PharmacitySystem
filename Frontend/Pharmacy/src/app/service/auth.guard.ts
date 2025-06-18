import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    // Đổi từ localStorage sang sessionStorage
    const token = sessionStorage.getItem('token');

    // Giữ nguyên logic kiểm tra token của bạn
    if (token && token.split('.').length === 3) {
      return true;
    }

    // Giữ nguyên message của bạn
    this.messageService.add({
      severity: 'error',
      summary: 'Bạn Chưa Đăng Nhập',
      detail: 'Vui Lòng Đăng Nhập để tiếp tục',
    });

    // Có thể redirect về login (tùy chọn)
    this.router.navigate(['/login']);  

    return false;
  }
}
