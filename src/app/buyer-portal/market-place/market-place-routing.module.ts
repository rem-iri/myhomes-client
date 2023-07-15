import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { MarketPlaceComponent } from './market-place.component';
import { PropertiesDetailComponent } from './properties-detail/properties-detail.component';
import { SellerInformationComponent } from './seller-information/seller-information.component';



const routes: Routes = [

  {

    path: '',

    component: MarketPlaceComponent

  },
  { path: 'properties-details/:id', component: PropertiesDetailComponent },

  { path: 'seller-information/:id', component: SellerInformationComponent },
];
  




@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]

})

export class MarketPlaceRoutingModule { }