import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-properties-detail',
  templateUrl: './properties-detail.component.html',
  styleUrls: ['./properties-detail.component.scss']
})
export class PropertiesDetailComponent implements OnInit {
  public properties: Property;
  public currentImage: string;
  private currentImageIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClientService,
    private router: Router
    
  ) {}

  ngOnInit() {
    const propertiesId = this.route.snapshot.paramMap.get('id');
    console.log("PROPERTY TO FETCH: ", propertiesId)
    if (propertiesId) {
      this.httpClient.getPropertyById(propertiesId)
        .then((properties) => {
          this.properties = properties;
        })
        .catch((error) => {
          console.error('Failed to fetch property details', error);
        });
    }
  }
  navigateImages(direction: string) {
    if (direction === 'prev') {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.properties.images.length) % this.properties.images.length;
    } else if (direction === 'next') {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.properties.images.length;
    }
    this.currentImage = this.properties.images[this.currentImageIndex]?.imageUrl;
  }

  setCurrentImage(index: number) {
    this.currentImageIndex = index;
    this.currentImage = this.properties.images[this.currentImageIndex]?.imageUrl;
  }
  // fetchSellerDetails(userId: string) {
  //   this.httpClient.getUserById(userId)
  //     .then((seller) => {
  //       this.properties.seller = seller; // Assign the seller details to the seller property
  //     })
  //     .catch((error) => {
  //       console.error('Failed to fetch seller details', error);
  //     });
  // }
  viewSellerInformation(user_id: string) {
    this.router.navigate(['/buyer/seller-information', user_id]);
  }
}
