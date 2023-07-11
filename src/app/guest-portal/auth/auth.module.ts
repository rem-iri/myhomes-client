import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from 'src/app/service/auth.service';
import { AuthGuard } from 'src/app/shared/auth-guard.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { ActivatedRoute } from '@angular/router';
import { SellerSignupComponent } from './seller-signup/seller-signup.component';
import { BuyerSignupComponent } from './buyer-signup/buyer-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [LoginComponent, SellerSignupComponent, BuyerSignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
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
