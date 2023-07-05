import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class HttpClientService {
  private readonly API_HOST = environment.API_HOST;
  private readonly COURSES_ENDPOINT: string = `${this.API_HOST}/photos`;

  constructor(private http: HttpClient) {}

  getCourses(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http
        .get<any[]>(this.COURSES_ENDPOINT)
        .toPromise()
        .then(
          (res) => {
            resolve(res);
          },
          (msg) => {
            reject(msg);
          }
        );
    });

    return promise;
  }
  
  getToken(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http
        .post<any[]>(`http://localhost:5556/access-token`, null, {
          headers: {
            "x-client-id": "user10",
            "x-secret-key": "secret10"
          }
        })
        .toPromise()
        .then(
          (res) => {
            console.log("getToken success: ", res);
            resolve(res);
          },
          (msg) => {
            console.log("Caught in getToken error: ", msg);
            reject(msg);
          }
        );
    });

    return promise;
  }
}
