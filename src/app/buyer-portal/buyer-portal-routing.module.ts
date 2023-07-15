import { NgModule } from '@angular/core';
import { RouterModule, Routes,RouterLink } from '@angular/router';
import { SellerComponent } from './seller/seller.component';
import { PropertiesDetailComponent } from './market-place/properties-detail/properties-detail.component';
import { PropertiesComponent } from './home/properties/properties.component';
import { SellerModule } from './seller/seller.module';


const routes: Routes = [
  {
    path: 'marketplace',
    loadChildren: () => import('./market-place/market-place.module').then(m => m.MarketPlaceModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },

  // {
  //   path: 'properties',
  //   component: PropertiesComponent
  // },
  {
    path: 'seller',
    loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule)
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerPortalRoutingModule { }
