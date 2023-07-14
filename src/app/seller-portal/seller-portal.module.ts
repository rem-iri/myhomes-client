import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerPortalRoutingModule } from './seller-portal-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PropertiesComponent } from './properties/properties.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PropertiesComponent, ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    SellerPortalRoutingModule,
    DashboardModule,
    MatSnackBarModule,
    ReactiveFormsModule
    
  ]
})
export class SellerPortalModule {}
