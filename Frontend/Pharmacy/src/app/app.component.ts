import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }
  goToServices() {
    this.router.navigate(['/services']);
  }

  goToServiceDetails() {
    this.router.navigate(['/service-details']);
  }

  goToPortfolio() {
    this.router.navigate(['/portfolio']);
  }

  goToPortfolio2() {
    this.router.navigate(['/portfolio-2']);
  }

  goToPortfolioDetails() {
    this.router.navigate(['/portfolio-details']);
  }

  goToTeam() {
    this.router.navigate(['/team']);
  }

  goToTeamDetails() {
    this.router.navigate(['/team-details']);
  }

  goToFAQ() {
    this.router.navigate(['/faq']);
  }

  goToLocations() {
    this.router.navigate(['/locations']);
  }
}
