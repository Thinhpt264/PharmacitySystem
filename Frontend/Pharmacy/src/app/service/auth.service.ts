import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly SESSION_KEY = 'account';

  constructor(private router: Router) {}

  // Lưu thông tin người dùng vào session
  login(account: any): void {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(account));
  }

  // Lấy thông tin người dùng từ session
  getAccount(): any {
    const acc = sessionStorage.getItem(this.SESSION_KEY);
    return acc ? JSON.parse(acc) : null;
  }

  // Kiểm tra xem người dùng đã đăng nhập chưa
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.SESSION_KEY);
  }

  // Xoá session (đăng xuất)
  logout(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
    this.router.navigate(['/login']);
  }
}
