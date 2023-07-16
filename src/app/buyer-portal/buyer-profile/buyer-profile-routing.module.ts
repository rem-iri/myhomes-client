import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerProfileComponent } from './buyer-profile.component';

const routes: Routes = [


  {

    path: '',

    component: BuyerProfileComponent

  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
