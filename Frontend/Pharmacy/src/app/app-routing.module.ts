import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home.component/home.component';
import { AboutUsComponent } from './components/aboutUs.component/aboutUs.component';
import { ServiceComponent } from './components/service.component/service.component';
import { NewsComponent } from './components/news.component/news.component';
import { ContactComponent } from './components/contact.component/contact.component';
import { ProductCategoryComponent } from './components/productCategory.component/productCategory.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
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
