import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealEstateNewsService {
  private newsApiUrl = 'https://api.example.com/news'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getRealEstateNews(): Observable<any> {
    return this.http.get<any>(this.newsApiUrl);
  }
}
