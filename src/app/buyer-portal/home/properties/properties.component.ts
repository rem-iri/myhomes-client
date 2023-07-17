import { Component,OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/shared/http-client.service';



@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
  
})
export class PropertiesComponent implements OnInit {
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() { }

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: './assets/images/explore.jpg',
      title: 'Explore',
      subtitle: 'Exploring a house is like unlocking a world of possibilities and finding a place to call home.'
    };
    this.slides[1] = {
      id: 1,
      src: './assets/images/HOUSE.JPG',
      title: 'Choose',
      subtitle: 'Choosing a house is like finding the perfect puzzle piece that fits effortlessly into the mosaic of our dreams and desires'
    }
    this.slides[2] = {
      id: 2,
      src: './assets/images/homes1.png',
      title: 'My Homes',
      subtitle: 'Finding my home is discovering a sanctuary where my heart finds solace and my dreams take flight..'
    }
  }
  }


  
