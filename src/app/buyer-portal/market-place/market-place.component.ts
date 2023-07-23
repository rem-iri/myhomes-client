import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpClientService } from 'src/app/shared/http-client.service';

interface Property {
  id: string;
  user_id: string;
  listingTitle: string;
  propertyType: string;
  description: string;
  furnishing: string;
  saleType: string;
  bath: number;
  bedroom: number;
  price: number;
  area: number;
  houseNumber: string;
  street: string;
  village: string;
  city: string;
  province: string;
  region: string;
  dateCreated: string;
  isSold: string;
  images: Array<{ _id: string, imageUrl: string }>;
  inquiries: Array<any>;
  seller: User;
}
@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent implements OnInit {
  properties: Property[] = [];
  currentPage = 1;
  pageSize = 9;
  searchQuery: string = '';
  searchSaleType: string = '';
  searchPropertyType: string = '';
  searchPriceMin: number | null = null;
  searchPriceMax: number | null = null;
  searchBath: number | null = null;
  searchBedroom: number | null = null;
  copyProperties: Property[] = [];


  constructor(
    private httpClient: HttpClientService,
    private router: Router
    ){}

  async ngOnInit(){
    
    try {
        this.properties = await this.httpClient.getAllProperties();

        this.copyProperties = this.properties;
    } catch(error) {
      console.log("On Properties Component: error ", error);
    } 
  }
  get visibleProperties(): Property[] {
    const filteredProperties = this.properties.filter((property) => {
      let isMatch = true;

      if (this.searchQuery && property.city && property.region && property.listingTitle) {
        const searchQueryLower = this.searchQuery.toUpperCase();
        isMatch =
          property.city.toUpperCase().includes(searchQueryLower) ||
          property.region.toUpperCase().includes(searchQueryLower) ||
          property.listingTitle.toUpperCase().includes(searchQueryLower);
      }

      if (this.searchSaleType && property.saleType) {
        isMatch = isMatch && property.saleType === this.searchSaleType;
      }

      if (this.searchPropertyType && property.propertyType) {
        isMatch = isMatch && property.propertyType === this.searchPropertyType;
      }

      if (this.searchPriceMin !== null && property.price !== null) {
        isMatch = isMatch && property.price >= this.searchPriceMin;
      }

      if (this.searchPriceMax !== null && property.price !== null) {
        isMatch = isMatch && property.price <= this.searchPriceMax;
      }

      if (this.searchBath !== null && property.bath !== null) {
        isMatch = isMatch && property.bath === this.searchBath;
      }

      if (this.searchBedroom !== null && property.bedroom !== null) {
        isMatch = isMatch && property.bedroom === this.searchBedroom;
      }

      return isMatch;
    });

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    return filteredProperties.slice(startIndex, endIndex);
  }

  loadNextPage(): void {
    this.currentPage++;
  }

  viewPropertyDetails(id: string) {
    this.router.navigate(['/buyer/properties-details', id]);
  }

  searchProperties() {
    this.currentPage = 1; // Reset current page when searching

    this.properties = this.copyProperties;

  const filteredProperties = this.properties.filter((property) => {
    let isMatch = true;

    if (this.searchQuery && property.city && property.region && property.listingTitle) {
      const searchQueryLower = this.searchQuery.toUpperCase();
      isMatch =
        property.city.toUpperCase().includes(searchQueryLower) ||
        property.region.toUpperCase().includes(searchQueryLower) ||
        property.listingTitle.toUpperCase().includes(searchQueryLower);
    }

    if (this.searchSaleType && property.saleType) {
      isMatch = isMatch && property.saleType === this.searchSaleType;
    }

    if (this.searchPropertyType && property.propertyType) {
      isMatch = isMatch && property.propertyType === this.searchPropertyType;
    }

    if (this.searchPriceMin !== null && property.price !== null) {
      isMatch = isMatch && property.price >= this.searchPriceMin;
    }

    if (this.searchPriceMax !== null && property.price !== null) {
      isMatch = isMatch && property.price <= this.searchPriceMax;
    }

    if (this.searchBath !== null && property.bath !== null) {
      isMatch = isMatch && property.bath === this.searchBath;
    }

    if (this.searchBedroom !== null && property.bedroom !== null) {
      isMatch = isMatch && property.bedroom === this.searchBedroom;
    }

    return isMatch;
  });

  this.properties = filteredProperties;
}
}
