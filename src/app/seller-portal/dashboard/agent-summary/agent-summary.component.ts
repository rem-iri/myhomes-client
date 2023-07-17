import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { HttpClientService } from 'src/app/shared/http-client.service';

@Component({
  selector: 'app-agent-summary',
  templateUrl: './agent-summary.component.html',
  styleUrls: ['./agent-summary.component.scss'],
})
export class AgentSummaryComponent implements OnInit {
  openListingsContent: string;
  closedDealsContent: string;
  totalInquiriesContent: string;
  subscriptionContent: string;

  constructor(
    private httpClientService: HttpClientService,
    private authStateService: AuthStateService
  ) {}

  ngOnInit() {
    this.getProperties();
  }

  async getProperties() {
    try {
      const userId = this.authStateService.getCurrentUser()?.id;
      this.properties = await this.httpClientService.getAllProperties(userId);
      const openListings = this.properties.filter((property: any) => !property.sold);
      this.openListingsContent = openListings.length.toString();

      const closedDeals = this.properties.filter((property: any) => property.sold);
      this.closedDealsContent = closedDeals.length.toString();

      let totalInquiries = 0;
      this.properties.forEach((property: any) => {
        if (property.inquiries) {
          totalInquiries += property.inquiries.length;
        }
      });
      this.totalInquiriesContent = totalInquiries.toString();
    } catch (error) {
      console.log('An error occurred while retrieving properties:', error);
    }
  }

  properties: any[] = [];

  async updatePropertySold(id: string) {
    try {
      await this.httpClientService.updatePropertySold(id);
      await this.getProperties();
    } catch (error) {
      console.log("On Properties Component: error updatePropertySold", error);
    }
  }
}
