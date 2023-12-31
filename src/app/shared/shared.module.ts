import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeatureComponent } from './components/feature/feature.component';
import { MatCardModule } from '@angular/material/card';
import { BaseLayoutComponent } from './components/layouts/base-layout/base-layout.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { GuestLayoutComponent } from './components/layouts/guest-layout/guest-layout.component';
import { HeaderGuestComponent } from './components/header-guest/header-guest.component';
import { SellerLayoutComponent } from './components/layouts/seller-layout/seller-layout.component';
import { HeaderSellerComponent } from './components/header-seller/header-seller.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { BuyerLayoutComponent } from './components/layouts/buyer-layout/buyer-layout.component';
import { BuyerHeaderComponent } from './components/buyer-header/buyer-header.component';
import { CarouselModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';



const commonModules = [
  HttpClientModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatListModule,
  FormsModule, 
  MatFormFieldModule, 
  MatInputModule,
  MatTooltipModule,
  MatListModule,
  MatCardModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatDialogModule,
  CarouselModule,
  IconModule
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, FeatureComponent, BaseLayoutComponent, LoaderComponent, SidenavComponent, GuestLayoutComponent, HeaderGuestComponent, SellerLayoutComponent, HeaderSellerComponent, BuyerLayoutComponent, BuyerHeaderComponent],
  imports: [CommonModule, RouterModule,...commonModules],
  exports: [HeaderComponent, FooterComponent, BaseLayoutComponent, FeatureComponent, LoaderComponent, SidenavComponent, GuestLayoutComponent, HeaderGuestComponent, SellerLayoutComponent, HeaderSellerComponent, BuyerHeaderComponent, BuyerLayoutComponent, ...commonModules],
 
})
export class SharedModule {}
