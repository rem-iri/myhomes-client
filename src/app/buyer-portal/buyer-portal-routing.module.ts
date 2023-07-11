import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { SellerComponent } from './seller/seller.component';
import { PropertiesDetailComponent } from './market-place/properties-detail/properties-detail.component';


const routes: Routes = [
  
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'marketplace',
    component: MarketPlaceComponent
  },
  {
    path: 'propertydetails',
    component: PropertiesDetailComponent
  },
  {
    path: 'seller',
    component: SellerComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerPortalRoutingModule { }
