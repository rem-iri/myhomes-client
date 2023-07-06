import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts/charts.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RealEstateNewsService } from 'src/app/service/real-estate-news.service';


@NgModule({
  declarations: [ChartsComponent, DashboardComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
  exports: [ChartsComponent, DashboardComponent],

})
export class DashboardModule {}
