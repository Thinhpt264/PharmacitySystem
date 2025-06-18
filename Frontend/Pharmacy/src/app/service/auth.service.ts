import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly SESSION_KEY = 'token';

  constructor(private router: Router) {}

  // Lưu thông tin người dùng vào sessionStorage (THAY ĐỔI Ở ĐÂY)
  login(token: any): void {
    sessionStorage.setItem(this.SESSION_KEY, token); // sessionStorage thay vì localStorage
  }

  // Lấy thông tin người dùng từ sessionStorage (THAY ĐỔI Ở ĐÂY)
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
    const account = this.getAccount();
    return account ? account.sub : null;
  }

  getEmail(): string | null {
    const account = this.getAccount();
    return account ? account.email : null; // Sửa từ getEmail thành email
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.SESSION_KEY); // sessionStorage thay vì localStorage
  }

  getPhone() {
    const account = this.getAccount();
    return account ? account.phone : null;
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

  // Xoá session (đăng xuất) (THAY ĐỔI Ở ĐÂY)
  logout(): void {
    sessionStorage.removeItem(this.SESSION_KEY); // sessionStorage thay vì localStorage
    this.router.navigate(['/login']);
  }

  getId() {
    const account = this.getAccount();
    return account ? account.id : null;
  }
}
