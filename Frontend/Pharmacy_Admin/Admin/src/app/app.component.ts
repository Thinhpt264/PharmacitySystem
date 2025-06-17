import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showLayout = true;
  title = '';
  account: any = {};
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Check current route and set layout visibility
    this.checkRoute(this.router.url);
    this.account = this.authService.getAccount();
    // Listen to route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.checkRoute(event.url);
      });
  }

  private checkRoute(url: string) {
    // Hide layout for authentication pages
    const authRoutes = [
      '/login',
      '/register',
      '/forgot-password',
      '/reset-password',
    ];
    this.showLayout = !authRoutes.some((route) => url.startsWith(route));

    // Log để debug
    console.log('Current URL:', url);
    console.log('Show Layout:', this.showLayout);
  }

  logout() {
    // Handle logout logic here
    localStorage.removeItem('token'); // Remove auth token
    this.router.navigate(['/login']);
  }
  gotoDashboard() {
    window.location.href = 'home'; // Redirect to home
  }
  gotoProducts() {
    window.location.href = 'product'; // Redirect to Google
    this.title = 'Products'; // Set title
  }
  gotoCategories() {
    window.location.href = 'category'; // Redirect to Google
  }
  gotoOrders() {
    window.location.href = 'order'; // Redirect to Google
  }
  gotoOrderDetails() {
    window.location.href = 'order-detail'; // Redirect to Google
  }
  gotoAccounts() {
    window.location.href = 'account'; // Redirect to Google
  }
  gotoLogin() {
    window.location.href = 'login'; // Redirect to Google
  }
  gotoDelivery() {
  window.location.href = 'register'; // Redirect to Google
  }
}
