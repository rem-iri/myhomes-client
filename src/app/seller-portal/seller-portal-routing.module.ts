import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { PropertiesComponent } from './properties/properties.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatePropertyComponent } from './create-property/create-property.component';
import { UpdatePropertyComponent } from './update-property/update-property.component';
import { ViewInquiriesComponent } from './view-inquiries/view-inquiries.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'properties',
    component: PropertiesComponent
  },
  {
    path: 'create-property',
    component: CreatePropertyComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'update-property/:id',
    component: UpdatePropertyComponent
  },
  {
    path: 'view-inquiries/:id',
    component: ViewInquiriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerPortalRoutingModule { }
