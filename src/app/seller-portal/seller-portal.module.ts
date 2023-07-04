import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerPortalRoutingModule } from './seller-portal-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertiesComponent } from './properties/properties.component';


@NgModule({
  declarations: [ DashboardComponent, PropertiesComponent],
  imports: [
    CommonModule,
    SharedModule,
    SellerPortalRoutingModule,
  ]
})
export class SellerPortalModule { }
