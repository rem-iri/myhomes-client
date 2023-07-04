import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from 'src/app/service/auth.service';
import { AuthGuard } from 'src/app/shared/auth-guard.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { ActivatedRoute } from '@angular/router';


@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [
    AuthRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthStateService,
  ]
})
export class AuthModule { }
