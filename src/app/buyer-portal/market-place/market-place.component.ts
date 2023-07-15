import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/shared/http-client.service';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent implements OnInit {
  constructor(
    private httpClient: HttpClientService,
    private router: Router
    ){}

  async ngOnInit(){
    
    try {
        this.properties = await this.httpClient.getAllProperties();
    } catch(error) {
      console.log("On Properties Component: error ", error);
    } 
  }
  properties: any[] = [];
 
  currentPage = 1;
  pageSize = 9;
  
  get visibleProperties(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.properties.slice(startIndex, endIndex);
  }
  
  loadNextPage(): void {
    this.currentPage++;
  }

  viewPropertyDetails(id: string) {
 
    this.router.navigate(['/buyer/properties-details', id]);
  }
}
