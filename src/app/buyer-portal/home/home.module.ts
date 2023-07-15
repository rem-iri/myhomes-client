import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePropertiesComponent } from './home-properties/home-properties.component';
import { PropertiesComponent } from './properties/properties.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule,RouterLink } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';





@NgModule({
  declarations: [HomePropertiesComponent,HomeComponent,
    PropertiesComponent,],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HomeRoutingModule
  ],
  exports:[HomePropertiesComponent,HomeComponent,
    PropertiesComponent]
})
export class HomeModule { }
