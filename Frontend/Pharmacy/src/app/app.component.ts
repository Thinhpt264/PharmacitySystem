import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from './service/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  categories: any;
  childrenCategory: any;
  listChildrenCategory: any;
  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.categoryService.findAllCategory().then((res) => {
      console.log(res.categories);
      this.categories = res.categories;
    });
  }
  findCategoryByCategoryParent(id: number) {
    this.categoryService.findCategoryByCategoryParent(id).then(
      res => {
        console.log(res.categories);
        this.listChildrenCategory = res.categories;;
      }
    );
  }

  goToHome() {
    window.location.href = '/home';
  }

  goToAbout() {
    window.location.href = '/about';
  }
  goToServices() {
    window.location.href = '/service';
  }
  goToNews() {
    window.location.href = '/news';
  }

  goToServiceDetails() {
    window.location.href = '/about';
  }
  goToContact() {
    window.location.href = '/contact';
  }

  goToPortfolio() {
    window.location.href = '/about';
  }

  goToPortfolio2() {
    window.location.href = '/about';
  }

  goToPortfolioDetails() {
    window.location.href = '/about';
  }

  goToTeam() {
    window.location.href = '/about';
  }

  goToTeamDetails() {
    window.location.href = '/about';
  }

  goToFAQ() {
    window.location.href = '/about';
  }

  goToLocations() {
    window.location.href = '/about';
  }
}
