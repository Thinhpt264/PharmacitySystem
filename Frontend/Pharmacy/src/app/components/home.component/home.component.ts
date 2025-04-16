import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',

})
export class HomeComponent implements OnInit {

  categories: any;
  constructor(
    private categoryService : CategoryService
  ){}
    ngOnInit(): void {
      this.findAll();
  }
  
  findAll() {
    this.categoryService.findAllCategory().then(
      res => {
        console.log(res.categories);
        this.categories = res.categories;
      }
    );
  }
  
}