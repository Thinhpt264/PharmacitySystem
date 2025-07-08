import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // hoặc sessionStorage tùy bạn
// Bỏ qua nếu không có token hợp lệ (3 phần, ngăn cách bởi 2 dấu ".")
    const isValidJWT = token && token.trim() !== '' && token.split('.').length === 3;

    // Chỉ gắn Authorization nếu là JWT hợp lệ
    if (isValidJWT) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
        withCredentials: true, // Thêm tùy chọn này nếu cần thiết
      });
      return next.handle(cloned);
    }

    // Ngược lại, gửi request gốc
    return next.handle(req);
  }
}