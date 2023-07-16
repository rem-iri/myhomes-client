import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthStateService } from 'src/app/shared/auth-state.service';

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
  latitude: number;
  longitude: number;
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
  public searchQuery: string = '';
  public inquiryFormVisible: boolean = false;
  public inquiry: { buyer_id: string, phoneNumber: string; email: string; message: string } = {
    buyer_id: '',
    phoneNumber: '',
    email: '',
    message: ''
  };

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClientService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private authStateService: AuthStateService
  ) {}

 
  ngOnInit() {
    const propertiesId = this.route.snapshot.paramMap.get('id');
    console.log("PROPERTY TO FETCH: ", propertiesId)
    if (propertiesId) {
      this.httpClient.getPropertyById(propertiesId)
        .then((properties) => {
          this.properties = properties;
          if (this.properties.images.length > 0) {
            this.setCurrentImage(0); // Set the initial current image to index 0
          }
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

  viewSellerInformation(user_id: string) {
    this.router.navigate(['/buyer/seller-information', user_id]);
  }
  toggleInquiryForm() {
    this.inquiryFormVisible = !this.inquiryFormVisible;
  }

  submitInquiry() {
    
    this.inquiry.buyer_id =  this.authStateService.getCurrentUser()?.id,
    console.log('Inquiry:', this.inquiry);
    this.httpClient.updatePropertyAddInquiry(this.properties.id, this.inquiry);
    
    this.inquiryFormVisible = false;
  }
  getIframeSrc(property: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${property?.houseNumber} ${property?.street} ${property?.village} ${property?.city} ${property?.region} ${property?.provice} Philippines&t=&z=16&ie=UTF8&iwloc=&output=embed`);
  }
}
