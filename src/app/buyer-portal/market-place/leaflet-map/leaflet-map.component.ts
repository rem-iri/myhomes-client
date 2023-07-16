import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Property {
  houseNumber: string;
  street: string;
  village: string;
  city: string;
  province: string;
  region: string;
}


@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent {
  public property: Property = {
    houseNumber: '',
    street: '',
    village: '',
    city: '',
    province: '',
    region: '',
  };
  
  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClientService,
    private router: Router,
    private sanitizer: DomSanitizer
    
  ) {}

  getIframeSrc(property: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${property?.houseNumber} ${property?.street} ${property?.village} ${property?.city} ${property?.region} ${property?.provice} Philippines&t=&z=16&ie=UTF8&iwloc=&output=embed`);
  }
}
