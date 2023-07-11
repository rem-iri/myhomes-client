import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/components/layouts/base-layout/base-layout.component';
import { GuestLayoutComponent } from './shared/components/layouts/guest-layout/guest-layout.component';
import { SellerLayoutComponent } from './shared/components/layouts/seller-layout/seller-layout.component';
import { AuthGuard } from './shared/auth-guard.service';
import { BuyerLayoutComponent } from './shared/components/layouts/buyer-layout/buyer-layout.component';

const routes: Routes = [
  // {
  //   path: "auth",
  //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  // },

  {
    path: "",
    // component: GuestLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./guest-portal/guest-portal.module').then(m => m.GuestPortalModule)
      },
    ]
  },
  {
    path: "",
    component: BuyerLayoutComponent,
    children: [
      {
        path: 'buyer',
        loadChildren: () => import('./buyer-portal/buyer-portal.module').then(m => m.BuyerPortalModule)
      },
    ]
  },

  {
    path: "",
    component: SellerLayoutComponent,
    children: [
      {
        path: 'seller',
        loadChildren: () => import('./seller-portal/seller-portal.module').then(m => m.SellerPortalModule),
        // AUTHGUARD HERE
        
      }
    ],
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
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
