import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePropertiesComponent } from './home-properties/home-properties.component';
import { PropertiesComponent } from './properties/properties.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [HomePropertiesComponent,
    PropertiesComponent,],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[HomePropertiesComponent,
    PropertiesComponent]
})
export class HomeModule { }
