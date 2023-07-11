import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { BuyerPortalRoutingModule } from './buyer-portal-routing.module';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { HomeModule } from './home/home.module';
import { MarketPlaceModule } from './market-place/market-place.module';
import { PropertiesDetailComponent } from './market-place/properties-detail/properties-detail.component';





@NgModule({
  declarations: [HomeComponent, MarketPlaceComponent,PropertiesDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BuyerPortalRoutingModule,
    HomeModule,
    MarketPlaceModule
  ]
})
export class BuyerPortalModule { }
