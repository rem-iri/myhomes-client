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

  async deleteProperty(id: string) {
    try {
      await this.httpClient.deleteProperty(id);
      this.properties = await this.httpClient.getAllProperties();
    } catch(error) {
      console.log("On Properties Component: error deleteProperty", error);
    }
    
  }

  async updatePropertySold(id: string) {
    try {
      await this.httpClient.updatePropertySold(id);
      this.properties = await this.httpClient.getAllProperties();
    } catch(error) {
      console.log("On Properties Component: error updatePropertySold", error);
    }
    
  }
}
