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
import { UpdatePropertyComponent } from './update-property/update-property.component';
import { ViewInquiriesComponent } from './view-inquiries/view-inquiries.component';

import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PropertiesComponent, ProfileComponent, CreatePropertyComponent, UploadImagesComponent, UpdatePropertyComponent, ViewInquiriesComponent],
  imports: [
    CommonModule,
    SharedModule,
    SellerPortalRoutingModule,
    DashboardModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  exports: [PropertiesComponent, ProfileComponent, CreatePropertyComponent, UploadImagesComponent, UpdatePropertyComponent, ViewInquiriesComponent]
})
export class SellerPortalModule {}
