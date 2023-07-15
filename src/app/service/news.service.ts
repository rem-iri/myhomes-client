import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  API_KEY = '2107d407cfa6486bbbeb457aead9e835';
  
  constructor(private httpClient: HttpClient) { }
  
  public getNews(): Observable<any> {
    return this.httpClient.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${this.API_KEY}`);
  }
}
