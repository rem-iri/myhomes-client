import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/components/layouts/base-layout/base-layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./guest-portal/guest-portal.module').then(m => m.GuestPortalModule)
  },
  {
    path: 'buyer',
    loadChildren: () => import('./buyer-portal/buyer-portal.module').then(m => m.BuyerPortalModule)
    // AUTHGUARD HERE
  },
  {
    path: 'seller',
    loadChildren: () => import('./seller-portal/seller-portal.module').then(m => m.SellerPortalModule)
    // AUTHGUARD HERE
  },
  {
    path: 'home',
    loadChildren: () => import('./seller-portal/seller-portal.module').then(m => m.SellerPortalModule)
    // AUTHGUARD HERE
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
