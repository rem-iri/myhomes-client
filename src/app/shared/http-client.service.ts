import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { AuthStateService } from "./auth-state.service";

@Injectable({ providedIn: "root" })
export class HttpClientService {
  private readonly API_HOST = environment.API_HOST;
  private readonly COURSES_ENDPOINT: string = `${this.API_HOST}/photos`;

  constructor(private http: HttpClient, private authStateService: AuthStateService) {}

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
  
  login(email: string, password: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http
        .post<any[]>(`http://localhost:5556/api/auth/signin`, {
          "email": email,
          "password": password
          // "email": "user3@gmail.com",
          // "password": "password"
        })
        .toPromise()
        .then(
          (res) => {
            console.log("HttpClientService login() success: ", res);
            resolve(res);
          },
          (msg) => {
            console.log("Caught in HttpClientService login() error: ", msg);
            reject(msg);
          }
        );
    });

    return promise;
  }

  signup(userInfo: any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http
        .post<any[]>(`http://localhost:5556/api/auth/signup`, {
          // "email": email,
          // "password": password
          ...userInfo
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

  getSellerProfile(id: string): Promise<any> {
    const url = `http://localhost:5556/api/auth/seller-profile/${id}`;
    let promise = new Promise((resolve, reject) => {
      this.http
        .get<any>(url)
        .toPromise()
        .then(
          (res) => {
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
    });
  
    return promise;
  }
  
  updateSellerProfile(id: string, updatedUser: any): Promise<any> {
    const url = `http://localhost:5556/api/auth/seller-profile/${id}`;
    let promise = new Promise((resolve, reject) => {
      this.http
        .put<any>(url, updatedUser)
        .toPromise()
        .then(
          (res) => {
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
    });
  
    return promise;
  }
  getProfilePicture(id: string): Promise<any> {
    const url = `http://localhost:5556/api/auth/seller-profile/${id}/profile-picture`;
  
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(url, { responseType: 'arraybuffer' })
        .toPromise()
        .then(
          (res: ArrayBuffer | undefined) => {
            if (res) {
              const base64 = btoa(
                Array.from(new Uint8Array(res))
                  .map((byte) => String.fromCharCode(byte))
                  .join('')
              );
              const imageUrl = `data:image/jpeg;base64,${base64}`;
              resolve(imageUrl);
            } else {
              reject("Profile picture not found.");
            }
          },
          (error) => {
            reject(error);
          }
        );
    });
  
    return promise;
  }
  
  updateSellerProfilePicture(id: string, file: File): Promise<any> {
    const url = `http://localhost:5556/api/auth/seller-profile/${id}/profile-picture`;

    const formData = new FormData();
    formData.append("file", file);

    let promise = new Promise((resolve, reject) => {
      this.http
        .put<any>(url, formData)
        .toPromise()
        .then(
          (res) => {
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
    });

    return promise;
  }

  getAllProperties(): Promise<any> {
    if(!this.authStateService.hasCurrentUser()) {
      throw new Error("No user");
    }
    
    let authenticationHeaders = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${(this.authStateService.getCurrentUser().token)}`)
        .set('Content-Type', 'application/json')
    }

    let promise = new Promise((resolve, reject) => {
      this.http
        .get<any[]>(`http://localhost:5556/api/properties`, authenticationHeaders)
        .toPromise()
        .then(
          (res) => {
            console.log("getAllProperties success: ", res);
            resolve(res);
          },
          (msg) => {
            console.log("Caught in getAllProperties error: ", msg);
            reject(msg);
          }
        );
    });

    return promise;
  }
  
  
  
}
