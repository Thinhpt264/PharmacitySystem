import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: DashBoardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
