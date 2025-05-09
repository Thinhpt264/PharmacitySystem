import { Injectable } from "@angular/core";


@Injectable()
export class ValidationService {
  // Kiểm tra email có đúng định dạng không
  validateEmail(email: string): string | null {
    if (!email) return 'Email không được bỏ trống';
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email) ? null : 'Email không đúng định dạng';
  }

  validateUsername(username: string): string | null {
    if (!username) return 'Tên đăng nhập không được bỏ trống';
    if (username.length < 6) return 'Tên đăng nhập phải từ 6 ký tự';
    return null;
  }

  validatePassword(password: string): string | null {
    if (!password) return 'Mật khẩu không được bỏ trống';
    if (password.length < 6) return 'Mật khẩu phải từ 6 ký tự';
    if (!/[0-9]/.test(password)) return 'Mật khẩu phải chứa ít nhất một số';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt';
    return null;
  }

  validateConfirmPassword(password: string, confirm: string): string | null {
    if (!confirm) return 'Xác nhận mật khẩu không được bỏ trống';
    return password === confirm ? null : 'Mật khẩu xác nhận không khớp';
  }

  validateGender(gender: string): string | null {
    return gender ? null : 'Vui lòng chọn giới tính';
  }
}