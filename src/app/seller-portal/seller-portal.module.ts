import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerPortalRoutingModule } from './seller-portal-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PropertiesComponent } from './properties/properties.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { CreatePropertyComponent } from './create-property/create-property.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';

@NgModule({
  declarations: [PropertiesComponent, ProfileComponent, CreatePropertyComponent, UploadImagesComponent],
  imports: [
    CommonModule,
    SharedModule,
    SellerPortalRoutingModule,
    DashboardModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  exports: [PropertiesComponent, ProfileComponent, CreatePropertyComponent, UploadImagesComponent]
})
export class SellerPortalModule {}
