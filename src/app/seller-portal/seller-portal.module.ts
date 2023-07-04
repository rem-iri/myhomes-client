import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { SellerPortalRoutingModule } from './seller-portal-routing.module';
import { SellerPortalComponent } from './seller-portal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SharedModule } from "./shared/shared.module";
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    declarations: [
        SellerPortalComponent,
        DashboardComponent,
        EditProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatIconModule,
        SharedModule,
        SellerPortalRoutingModule,
        
    ]
})
export class SellerPortalModule { }
