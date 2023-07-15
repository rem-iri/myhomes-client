import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpClientService } from 'src/app/shared/http-client.service';

@Component({
  selector: 'app-seller-information',
  templateUrl: './seller-information.component.html',
  styleUrls: ['./seller-information.component.scss']
})
export class SellerInformationComponent implements OnInit {

  seller: User;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClientService
  ) {}
  ngOnInit() {
    const sellerId = this.route.snapshot.paramMap.get('id');
    if (sellerId) {
      this.httpClient.getUserById(sellerId)
        .then((seller) => {
          console.log("SELLER", seller);
          this.seller = seller;
        })
        .catch((error) => {
          console.error('Failed to fetch seller information', error);
        });
    }
  }
}
