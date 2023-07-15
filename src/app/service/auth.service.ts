import { Router } from "@angular/router";
import { EventEmitter, Injectable, Output } from "@angular/core";

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";

import { AuthStateService } from '../shared/auth-state.service';
import { User } from '../model/user';
import { AppModule } from "../app.module";
import { HttpClientService } from "../shared/http-client.service";
import { JwtService } from "./jwt.service";
import { SellerUser } from "../model/seller-user";

@Injectable({providedIn: "root"})
export class AuthService {

  constructor(
    private stateService: AuthStateService,
    private router: Router,
    private httpClient: HttpClient,
    private httpClientService: HttpClientService,
    private jwtService: JwtService
  ) {}


  isAuthenticated() {
    return this.stateService.hasCurrentUser() && !this.jwtService.isExpired(this.stateService.getCurrentUser().token);
  }

  async login(email: string, password: string) {
    this.stateService.removeCurrentUser();

    let authenticatedUser;
    try {
      authenticatedUser = await this.httpClientService.login(email, password);
    
      console.log(authenticatedUser);

      // PUT NULL/EMPTY GUARD HERE FOR AUTHENTICATEDUSER
      
      if(authenticatedUser?.accountType == "seller") {
        let user: SellerUser = new SellerUser();
        
        user.token = authenticatedUser.accessToken ?? "";
        user.id = authenticatedUser.id ?? "";
        user.email = authenticatedUser.email ?? "";
        user.firstName = authenticatedUser.firstName ?? "";
        user.lastName = authenticatedUser.lastName ?? "";
        user.accountType = authenticatedUser.accountType ?? "";
        user.company = authenticatedUser.company ?? "";
        user.plan = authenticatedUser.plan ?? "";
      
        this.stateService.setCurrentUser(user);
      } else {
        let user: User = new User();
      
        user.token = authenticatedUser.accessToken ?? "";
        user.id = authenticatedUser.id ?? "";
        user.email = authenticatedUser.email ?? "";
        user.firstName = authenticatedUser.accessToken ?? "";
        user.lastName = authenticatedUser.accessToken ?? "";
        user.accountType = authenticatedUser.accountType ?? "";
        
        this.stateService.setCurrentUser(user);
      }
    } catch(error) {
      return error;
    }
    
    return;

  }

  logout() {
    this.stateService.removeCurrentUser();
  }
}
