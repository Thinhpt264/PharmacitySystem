import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { ProductComponent } from './components/product/product.component';
import { ProductCategoryComponent } from './components/productCategory/productCategory.component';
import { AboutUsComponent } from './components/aboutUs/aboutUs.component';
import { ServiceComponent } from './components/service/service.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterSuccessComponent } from './components/register-success/register-success';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'productCategory/:id',
    component: ProductCategoryComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'service',
    component: ServiceComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'register-success',
    component: RegisterSuccessComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: 'home', // fallback nếu sai route
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
