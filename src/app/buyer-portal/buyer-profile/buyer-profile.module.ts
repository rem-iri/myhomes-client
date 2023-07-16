import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './buyer-profile-routing.module';
import { BuyerProfileComponent } from './buyer-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [BuyerProfileComponent],
  imports: [
    SharedModule,
    CommonModule,
    SellerRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class SellerModule { }
