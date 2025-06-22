import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { OrderComponent } from './components/order/order.component';
import { AuthGuard } from './service/auth.guard';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ProductRemainComponent } from './components/product-remain/product-remain.component';
import { DrugPredictionComponent } from './components/drug-prediction/drug-prediction.component';
import { PromotionComponent } from './components/promotion/promotion.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: DashBoardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'category',
    canActivate: [AuthGuard],
    component: CategoryComponent,
  },
  {
    path: 'product',
    canActivate: [AuthGuard],
    component: ProductComponent,
  },
  {
    path: 'product-remain',
    canActivate: [AuthGuard],
    component: ProductRemainComponent,
  },
  {
    path: 'order',
    canActivate: [AuthGuard],
    component: OrderComponent,
  },

  {
    path: 'order-detail',
    canActivate: [AuthGuard],
    component: OrderDetailComponent,
  },
  {
    path: 'drug-prediction',
    canActivate: [AuthGuard],
    component : DrugPredictionComponent
  },
  {
    path: 'promotion',
    canActivate: [AuthGuard],
    component: PromotionComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
