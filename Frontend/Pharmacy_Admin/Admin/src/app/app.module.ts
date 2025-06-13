import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './components/dashboard/dashboard.component';
import { OrderComponent } from './components/order/order.component';
import { UserComponent } from './components/user/user.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EmplyeeComponent } from './components/employee/employee.component';
import { ProductService } from './service/product.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseUrlService } from './service/baseUrl.service';
import { CategoryService } from './service/category.service';
import { CategoryComponent } from './components/category/category.component';
import { OrderService } from './service/order.service';

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    OrderComponent,
    UserComponent,
    ProductComponent,
    LoginComponent,
    EmplyeeComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
 
  ],
  providers: [
    BaseUrlService,
    ProductService,
    CategoryService,
    OrderService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
