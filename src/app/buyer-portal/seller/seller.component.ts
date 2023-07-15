import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/shared/http-client.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  sellers: any[] = [];

  constructor(
    private httpClient: HttpClientService,
    private router: Router
    ){}

  async ngOnInit(){
    
    try {
        this.sellers = await this.httpClient.getAllSellers();
    } catch(error) {
      console.log("On Properties Component: error ", error);
    } 
  }
 
}
