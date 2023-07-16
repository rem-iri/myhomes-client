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
  getBuyerProfile(id: string): Promise<any> {
    const url = `http://localhost:5556/api/auth/buyer-profile/${id}`;
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
  updateBuyerProfile(id: string, updatedUser: any): Promise<any> {
    const url = `http://localhost:5556/api/auth/buyer-profile/${id}`;
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
  getBuyerProfilePicture(id: string): Promise<any> {
    const url = `http://localhost:5556/api/auth/buyer-profile/${id}/profile-picture`;
  
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
  updateBuyerProfilePicture(id: string, file: File): Promise<any> {
    const url = `http://localhost:5556/api/auth/buyer-profile/${id}/profile-picture`;

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

  getAllProperties(userId: string | null = null): Promise<any> {
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
        .get<any[]>(`http://localhost:5556/api/properties?${userId ? "userId=" + userId : ""}`, authenticationHeaders)
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

  

  getPropertyById(id: string): Promise<any> {
    if (!this.authStateService.hasCurrentUser()) {
      throw new Error("No user");
    }

    const authenticationHeaders = {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.authStateService.getCurrentUser().token}`)
        .set("Content-Type", "application/json"),
    };


    return this.http
      .get<any>(`http://localhost:5556/api/properties/${id}`, authenticationHeaders)
      .toPromise()
      .then(
        (res) => {
          console.log("getPropertyById success: ", res);
          return res;
        },
        (error) => {
          console.log("Caught in getPropertyById error: ", error);
          throw error;
        }
      );
  }


  getUserById(userId: string): Promise<any> {
    if (!this.authStateService.hasCurrentUser()) {
      throw new Error("No user");
    }

    const authenticationHeaders = {
      headers: new HttpHeaders()
        .set(
          "Authorization",
          `Bearer ${this.authStateService.getCurrentUser().token}`
        )
        .set("Content-Type", "application/json"),
    };

    return this.http
      .get<any>(
        `http://localhost:5556/api/auth/users/${userId}`,
        authenticationHeaders
      )
      .toPromise()
      .then(
        (res) => {
          console.log("getUserById success: ", res);
          return res;
        },
        (error) => {
          console.log("Caught in getUserById error: ", error);
          throw error;
        }
      );
  }
  getAllSellers(): Promise<any> {
    if (!this.authStateService.hasCurrentUser()) {
      throw new Error("No user");
    }
    
    let authenticationHeaders = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${(this.authStateService.getCurrentUser().token)}`)
        .set('Content-Type', 'application/json')
    }
  
    let promise = new Promise((resolve, reject) => {
      this.http
        .get<any[]>(`http://localhost:5556/api/auth/users/sellers`, authenticationHeaders)
        .toPromise()
        .then(
          (res) => {
            console.log("getAllSellers success: ", res);
            resolve(res);
          },
          (msg) => {
            console.log("Caught in getAllSellers error: ", msg);
            reject(msg);
          }
        );
    });
  
    return promise;
  }

  createProperty(property: any): Promise<any> {
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
        .post<any[]>(`http://localhost:5556/api/properties`, 
        property,
        authenticationHeaders,
        )
        .toPromise()
        .then(
          (res) => {
            console.log("createProperty success: ", res);
            resolve(res);
          },
          (msg) => {
            console.log("Caught in createProperty error: ", msg);
            reject(msg);
          }
        );
    });

    return promise;
  }

  updateProperty(id: string, property: any): Promise<any> {
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
        .put<any[]>(`http://localhost:5556/api/properties/${id}`, 
        property,
        authenticationHeaders,
        )
        .toPromise()
        .then(
          (res) => {
            console.log("updateProperty success: ", res);
            resolve(res);
          },
          (msg) => {
            console.log("Caught in updateProperty error: ", msg);
            reject(msg);
          }
        );
    });

    return promise;
  }

  deleteProperty(id: string): Promise<any> {
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
        .delete<any[]>(`http://localhost:5556/api/properties/${id}`, 
        authenticationHeaders,
        )
        .toPromise()
        .then(
          (res) => {
            console.log("deleteProperty success: ", res);
            resolve(res);
          },
          (msg) => {
            console.log("Caught in deleteProperty error: ", msg);
            reject(msg);
          }
        );
    });

    return promise;
  }

  updatePropertySold(id: string): Promise<any> {
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
        .put<any[]>(`http://localhost:5556/api/properties/updateSold/${id}`,
        null,
        authenticationHeaders,
        )
        .toPromise()
        .then(
          (res) => {
            console.log("deleteProperty success: ", res);
            resolve(res);
          },
          (msg) => {
            console.log("Caught in deleteProperty error: ", msg);
            reject(msg);
          }
        );
    });

    return promise;
  }
  updatePropertyAddInquiry(id: string, inquiry: any): Promise<any> {
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
        .put<any[]>(`http://localhost:5556/api/properties/${id}/inquiry`,
        inquiry,
        authenticationHeaders,
        )
        .toPromise()
        .then(
          (res) => {
            console.log("deleteProperty success: ", res);
            resolve(res);
          },
          (msg) => {
            console.log("Caught in d  eleteProperty error: ", msg);
            reject(msg);
          }
          );
        });

    return promise;
  }
}

      