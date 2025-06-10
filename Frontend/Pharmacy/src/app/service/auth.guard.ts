import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private messageService: MessageService
  ) {
    
  }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token && token.split('.').length === 3) {
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