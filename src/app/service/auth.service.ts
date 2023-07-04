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

@Injectable({providedIn: "root"})
export class AuthService {

  constructor(
    private stateService: AuthStateService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  isAuthenticated() {
    return this.stateService.hasCurrentUser();
  }

  login(username: string, password: string) {
    this.stateService.removeCurrentUser();

    let user: User = new User();
    user.username = username;
    user.firstName = 'John';
    user.lastName = 'Doe';

    this.stateService.setCurrentUser(user);
  }

  logout() {
    this.stateService.removeCurrentUser();
  }
}
