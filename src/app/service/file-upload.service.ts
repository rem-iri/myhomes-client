import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStateService } from '../shared/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = 'http://localhost:5556/api';

  constructor(
    private http: HttpClient,
    private authStateService: AuthStateService
    ) { }

  upload(file: File): Observable<HttpEvent<any>> {

    let authenticationHeaders = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${(this.authStateService.getCurrentUser().token)}`)
    }
    
    const formData: FormData = new FormData();

    formData.append('document', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload/documents`, formData, {
      reportProgress: true,
      responseType: 'json',
      ...authenticationHeaders
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}