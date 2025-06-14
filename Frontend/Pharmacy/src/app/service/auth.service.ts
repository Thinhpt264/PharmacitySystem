import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly SESSION_KEY = 'token';

  constructor(private router: Router) {}

  // Lưu thông tin người dùng vào session
  login(token: any): void {
    localStorage.setItem(this.SESSION_KEY, token);
  }

  // Lấy thông tin người dùng từ session
  getAccount(): any {
     const token = this.getToken();
      console.log(token);
    if (!token) return null;
    
    try {
      console.log(jwtDecode(token));
      return jwtDecode(token);
    } catch {
      return null;
    }
  }
  getUsername(): string | null {
    return this.getAccount()?.username || null;
  }

    getToken(): string | null {
    return localStorage.getItem(this.SESSION_KEY);
  }

  // Kiểm tra xem người dùng đã đăng nhập chưa
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded?.exp > now;
    } catch {
      return false;
    }
  }

  // Xoá session (đăng xuất)
  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
    this.router.navigate(['/login']);
  }
}
