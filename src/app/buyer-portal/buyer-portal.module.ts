import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerPortalRoutingModule } from './buyer-portal-routing.module';
import { BuyerPortalComponent } from './buyer-portal.component';



@NgModule({
  declarations: [
    BuyerPortalComponent
  ],
  imports: [
    CommonModule,
    BuyerPortalRoutingModule
  ]
})
export class BuyerPortalModule { }
