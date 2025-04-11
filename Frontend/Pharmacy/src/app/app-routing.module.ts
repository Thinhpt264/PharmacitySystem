import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home.component/home.component';
import { AboutUsComponent } from './components/aboutUs.component/aboutUs.component';
import { ServiceComponent } from './components/service.component/service.component';
import { NewsComponent } from './components/news.component/news.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
