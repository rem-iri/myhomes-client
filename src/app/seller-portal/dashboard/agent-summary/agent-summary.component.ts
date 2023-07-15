import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/shared/http-client.service';

@Component({
  selector: 'app-agent-summary',
  templateUrl: './agent-summary.component.html',
  styleUrls: ['./agent-summary.component.scss'],
  providers: []
})
export class AgentSummaryComponent implements OnInit {
  openListingsContent: string;
  closedDealsContent: string;
  totalInquiriesContent: string;
  subscriptionContent: string;

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit() {
    this.httpClientService.getAllProperties().then(
      (properties) => {
        const openListings = properties.filter((property: any) => !property.sold);
        this.openListingsContent = openListings.length.toString();

        const closedDeals = properties.filter((property: any) => property.sold);
        this.closedDealsContent = closedDeals.length.toString();

        this.totalInquiriesContent = properties.length.toString();
      },
      (error) => {
        console.log('An error occurred while retrieving properties:', error);
      }
    );
  }
}
