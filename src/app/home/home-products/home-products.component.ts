import { Component, OnInit } from '@angular/core';
import { productsDB } from '../../shared/data/products'; 
@Component({
  selector: 'll-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  products:any = [];
  constructor() { 
    this.products = productsDB.Product
  }

  ngOnInit(): void { }

}
