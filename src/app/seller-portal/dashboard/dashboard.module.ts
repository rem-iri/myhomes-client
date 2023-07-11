import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts/charts.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgentSummaryComponent } from './agent-summary/agent-summary.component';
import { RealEstateNewsComponent } from './real-estate-news/real-estate-news.component';



@NgModule({
  declarations: [ChartsComponent, DashboardComponent, AgentSummaryComponent, RealEstateNewsComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
  exports: [ChartsComponent, DashboardComponent],

})
export class DashboardModule {}
