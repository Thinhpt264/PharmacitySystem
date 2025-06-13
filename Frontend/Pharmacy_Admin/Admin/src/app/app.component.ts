import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showLayout = true;
  title = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Check current route and set layout visibility
    this.checkRoute(this.router.url);

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
}
