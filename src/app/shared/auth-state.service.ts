import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { User } from "../model/user";
import { SellerUser } from "../model/seller-user";

@Injectable()
export class AuthStateService {
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  public setCurrentUser(user: User | SellerUser): void {
    this.storage.set("CURRENT_USER", JSON.stringify(user));
  }

  // -- Use hasCurrentUser() or AuthService::isAuthenticated() first before using getCurrentUser()
  public getCurrentUser(): User | SellerUser{
    return JSON.parse(this.storage.get("CURRENT_USER"));
  }

  public hasCurrentUser() {
    if (this.storage.get("CURRENT_USER")) {
      return true;
    }
    return false;
  }

  public removeCurrentUser() {
    this.storage.remove("CURRENT_USER");
  }
}
