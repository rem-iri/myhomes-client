import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerPortalComponent } from './seller-portal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: SellerPortalComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent
          },
          {
            path: 'edit-profile',
            component: EditProfileComponent
          },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerPortalRoutingModule {}
