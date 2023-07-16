import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileUpdatedSource = new Subject<any>();
  private profilePictureUpdatedSource = new Subject<string>();
  profileUpdated$ = this.profileUpdatedSource.asObservable();
  profilePictureUpdated$ = this.profilePictureUpdatedSource.asObservable();

  updateProfile(profileData: any): void {
    this.profileUpdatedSource.next(profileData);
  }

  updateProfilePicture(profilePicture: string): void {
    this.profilePictureUpdatedSource.next(profilePicture);
  }
}
