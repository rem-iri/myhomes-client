import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerPortalComponent } from './seller-portal.component';

const routes: Routes = [
  {
    path: '',
    component: SellerPortalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerPortalRoutingModule { }
