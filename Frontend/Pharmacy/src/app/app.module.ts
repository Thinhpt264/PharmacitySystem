import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component/home.component';
import { AboutUsComponent } from './components/aboutUs.component/aboutUs.component';
import { ServiceComponent } from './components/service.component/service.component';
import { NewsComponent } from './components/news.component/news.component';
import { ContactComponent } from './components/contact.component/contact.component';
import { BaseUrlService } from './service/baseUrl.service';
import { CategoryService } from './service/category.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ServiceComponent,
    NewsComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [
    BaseUrlService,
    CategoryService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
