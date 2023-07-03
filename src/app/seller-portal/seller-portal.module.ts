import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerPortalRoutingModule } from './seller-portal-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SellerPortalComponent } from './seller-portal.component';


@NgModule({
  declarations: [SellerPortalComponent],
  imports: [
    CommonModule,
    SharedModule,
    SellerPortalRoutingModule,
  ]
})
export class SellerPortalModule { }
