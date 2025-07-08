import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BaseUrlService } from './service/baseUrl.service';
import { CategoryService } from './service/category.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { BrandService } from './service/brand.service';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './service/cart.service';
import { CustomCurrencyPipe } from './custom-currency.pipe';
import { DialogModule } from 'primeng/dialog';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './service/auth.interceptor';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { OrderComponent } from './components/order/order.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { DeliveryInforService } from './service/delivery-info.service';
import { ChatService } from './service/chat.service';
// Thêm imports cho ngx-translate
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from './service/language.service';
import { CommentService } from './service/comment.service';
import { ChatComponent } from './components/chat/chat.component';
import { ButtonModule } from 'primeng/button';

// Factory function cho TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    ProductDetailComponent,
    CartComponent,
    CustomCurrencyPipe,
    CheckoutComponent,
    ThankYouComponent,
    OrderComponent,
    UserInfoComponent,
    ChatComponent
   
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
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    // Thêm TranslateModule với cấu hình
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'vi',
    }),
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
    BrandService,
    CartService,
    DeliveryInforService,
    LanguageService,
    CommentService,
    ChatService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
