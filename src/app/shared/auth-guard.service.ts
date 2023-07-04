import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";

import { AuthService } from "../service/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, // dependency injection
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
}
