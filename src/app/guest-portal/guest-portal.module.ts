import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestPortalRoutingModule } from './guest-portal-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgParticlesModule } from 'ng-particles';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [LoginComponent, SignupComponent, HomeComponent],
  imports: [
    CommonModule,
    GuestPortalRoutingModule,
    SharedModule,
    NgParticlesModule
  ]
})
export class GuestPortalModule { }
