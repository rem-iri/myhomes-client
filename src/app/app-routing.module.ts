import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/components/layouts/base-layout/base-layout.component';
import { GuestPortalComponent } from './guest-portal/guest-portal.component';
import { SellerPortalComponent } from './seller-portal/seller-portal.component';
import { BuyerPortalComponent } from './buyer-portal/buyer-portal.component';

const routes: Routes = [
  {
    path: "",
    component: GuestPortalComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./guest-portal/guest-portal.module').then(m => m.GuestPortalModule)
      },
    ]
  },


  {
    path: "",
    component: SellerPortalComponent,
    children: [
      {
        path: 'seller',
        loadChildren: () => import('./seller-portal/seller-portal.module').then(m => m.SellerPortalModule)
        // AUTHGUARD HERE
      }
    ]
  },


  {
    path: "",
    component: BuyerPortalComponent,
    children: [
      {
        path: 'buyer',
        loadChildren: () => import('./buyer-portal/buyer-portal.module').then(m => m.BuyerPortalModule)
        // AUTHGUARD HERE
      },
    ]
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
