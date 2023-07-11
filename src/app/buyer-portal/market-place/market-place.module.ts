import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesCardComponent } from './properties-card/properties-card.component';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PropertiesInformationComponent } from './properties-information/properties-information.component';



@NgModule({
  declarations: [PropertiesCardComponent,PropertiesListComponent, PropertiesInformationComponent,PropertiesInformationComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[PropertiesCardComponent,PropertiesListComponent,PropertiesInformationComponent]
})
export class MarketPlaceModule { }
