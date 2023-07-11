import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SellerSignupComponent } from './seller-signup/seller-signup.component';
import { BuyerSignupComponent } from './buyer-signup/buyer-signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'seller-signup',
    component: SellerSignupComponent
  },
  {
    path: 'buyer-signup',
    component: BuyerSignupComponent
  },
  // {
  //   path: 'buyer-signup',
  //   component: SignupComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
