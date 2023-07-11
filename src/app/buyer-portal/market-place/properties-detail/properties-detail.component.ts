import { Component,Input } from '@angular/core';
interface Properties{
  title:string;
  mainImage:String;
  description:string;
  price:number;
  location:string;
  sellerImage:String;
  sellerName:String;
  otherImages: string[];

}

@Component({
  selector: 'app-properties-detail',
  templateUrl: './properties-detail.component.html',
  styleUrls: ['./properties-detail.component.scss']
})
export class PropertiesDetailComponent {
  public properties : Properties = 
    {
      title: 'Property 1',
      mainImage: 'assets/images/house 2.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 10.99,
      location: 'New York',
      sellerImage:'assets/images/female.png',
      sellerName:'Miguel Chan',
      otherImages: [
        'assets/images/about.jpg',
        'assets/images/house3.jpeg',
        'assets/images/window2.png',
        'assets/images/about.jpg',
        'assets/images/house3.jpeg',
        'assets/images/window2.png',
        'assets/images/about.jpg',
      ],
     
    }
 constructor(){}

 ngOnInit() {}

 onImageClick(image:string){
  this.properties.mainImage=image;
 }
}

