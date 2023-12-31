import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestPortalRoutingModule } from './guest-portal-routing.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { SharedGuestModule } from './shared-guest/shared-guest.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    SharedModule,
    SharedGuestModule
  ]
})
export class GuestPortalModule { }
