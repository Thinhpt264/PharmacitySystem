import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BaseUrlService } from './service/baseUrl.service';
import { CategoryService } from './service/category.service';
import { HttpClientModule } from '@angular/common/http';

import { ProductService } from './service/product.service';

import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/aboutUs/aboutUs.component';
import { ServiceComponent } from './components/service/service.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductCategoryComponent } from './components/productCategory/productCategory.component';
import { ProductComponent } from './components/product/product.component';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountService } from './service/account.service';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RegisterSuccessComponent } from './components/register-success/register-success';
import { VerifyComponent } from './components/verify/verify.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from './service/auth.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ValidationService } from './service/validation.service';
import { ProductCategoryParentComponent } from './components/productCategoryParent/productCategoryParent.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ServiceComponent,
    NewsComponent,
    ContactComponent,
    ProductCategoryComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    RegisterSuccessComponent,
    VerifyComponent,
    ProductCategoryParentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    SliderModule,
    CommonModule,
    DropdownModule,
    BrowserAnimationsModule,
    OverlayPanelModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    BaseUrlService,
    CategoryService,
    ProductService,
    CurrencyPipe,
    AccountService,
    MessageService,
    AuthService,
    ConfirmationService,
    ValidationService,
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
