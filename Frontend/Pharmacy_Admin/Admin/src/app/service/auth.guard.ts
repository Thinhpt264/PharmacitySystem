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
  ) {
    
  }

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const role = this.authService.getRole();

    if (isLoggedIn && (role === 'ADMIN' || role === 'EMPLOYEE')) {
      return true;
    }


    this.messageService.add({
        severity: 'error',
        summary: 'Bạn Chưa Đăng Nhập',
        detail: 'Vui Lòng Đăng Nhập để tiếp tục',
      });
      
    return false;
  }
}