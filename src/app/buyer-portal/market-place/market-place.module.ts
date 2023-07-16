import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesCardComponent } from './properties-card/properties-card.component';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PropertiesInformationComponent } from './properties-information/properties-information.component';
import { MarketPlaceComponent } from './market-place.component';
import { MarketPlaceRoutingModule } from './market-place-routing.module';
import { SellerInformationComponent } from './seller-information/seller-information.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { SafeUrlPipe } from './leaflet-map/safe-url.pipe';



@NgModule({
  declarations: [SafeUrlPipe,LeafletMapComponent,PropertiesCardComponent,PropertiesListComponent,MarketPlaceComponent ,PropertiesInformationComponent, SellerInformationComponent],
  imports: [
    CommonModule,
    SharedModule,
    MarketPlaceRoutingModule,
    LeafletModule
  ],
  exports:[SafeUrlPipe,LeafletMapComponent,PropertiesCardComponent,PropertiesListComponent,MarketPlaceComponent ,PropertiesInformationComponent,]
})
export class MarketPlaceModule { }
