import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

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

    let user: User = new User();
    user.email = email;
    user.firstName = 'John';
    user.lastName = 'Doe';

    let getTokenResponse = await this.httpClientService.getToken();

    console.log(getTokenResponse);
    

    user.token = getTokenResponse.accessToken ?? "";
  

    this.stateService.setCurrentUser(user);
  }

  logout() {
    this.stateService.removeCurrentUser();
  }
}
