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
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseUrlService } from './service/baseUrl.service';
import { CategoryService } from './service/category.service';
import { CategoryComponent } from './components/category/category.component';
import { OrderService } from './service/order.service';
import { AccountService } from './service/account.service';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth.guard';
import { AuthInterceptor } from './service/auth.interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'primeng/tooltip';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderDetailService } from './service/order-detail.service';
import { ProductRemainComponent } from './components/product-remain/product-remain.component';

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    OrderComponent,
    UserComponent,
    ProductComponent,
    LoginComponent,
    EmplyeeComponent,
    CategoryComponent,
    OrderDetailComponent,
    ProductRemainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    TooltipModule,
  ],
  providers: [
    BaseUrlService,
    ProductService,
    CategoryService,
    OrderService,
    AccountService,
    AuthService,
    AuthGuard,
    MessageService,
    AuthInterceptor,
    OrderDetailService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
