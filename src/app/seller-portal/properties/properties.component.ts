import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/shared/http-client.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit{
  constructor(
    private httpClient: HttpClientService
    ){}

  async ngOnInit(){
    
    try {
        this.properties = await this.httpClient.getAllProperties();
    } catch(error) {
      console.log("On Properties Component: error ", error);
    } 
  }

  properties: any[] = [];
}
