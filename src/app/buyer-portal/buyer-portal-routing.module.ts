import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerPortalComponent } from './buyer-portal.component';

const routes: Routes = [
  {
    path: '',
    component: BuyerPortalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerPortalRoutingModule { }
