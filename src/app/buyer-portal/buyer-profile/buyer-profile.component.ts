import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { HttpClientService } from 'src/app/shared/http-client.service';

@Component({
  selector: 'app-seller',
  templateUrl: './buyer-profile.component.html',
  styleUrls: ['./buyer-profile.component.scss']
})
export class BuyerProfileComponent implements OnInit {
  email = new FormControl("", [Validators.required]);
  firstName = new FormControl("", [Validators.required]);
  lastName = new FormControl("", [Validators.required]);
  about = new FormControl("", [Validators.required]);
  profilePicture: string | ArrayBuffer | null;
  userId: string;
  updatingProfile: boolean;
  isEditing: boolean = false;

  profileForm: FormGroup = this.formBuilder.group({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    about: this.about,
  });

  constructor(
    private authStateService: AuthStateService,
    private httpClientService: HttpClientService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.userId = this.authStateService.getCurrentUser()?.id;
    this.updatingProfile = false;
  }

  ngOnInit(): void {
    this.getBuyerProfile();
    this.getProfilePicture();
    this.email.disable();
    this.firstName.disable();
    this.lastName.disable();
    this.about.disable();
  }

  getBuyerProfile(): void {
    this.httpClientService
      .getBuyerProfile(this.userId)
      .then((res: any) => {
        const { email, firstName, lastName, about, profilePicture } = res;
        this.email.setValue(email);
        this.firstName.setValue(firstName);
        this.lastName.setValue(lastName);
        this.about.setValue(about);
        this.profilePicture = profilePicture;
      })
      .catch((error: any) => {
        console.error('Error retrieving buyer profile:', error);
      });
  }

  getProfilePicture(): void {
    this.httpClientService
      .getBuyerProfilePicture(this.userId)
      .then((profilePicture: string) => {
        this.profilePicture = profilePicture;
      })
      .catch((error: any) => {
        console.error('Error retrieving profile picture:', error);
      });
  }

  openSnackBar(message: string, duration: number): void {
    this._snackBar.open(message, undefined, {
      duration: duration,
    });
  }

  startEditing(): void {
    this.isEditing = !this.isEditing;
    this.isEditing ? this.firstName.enable() : this.firstName.disable();
    this.isEditing ? this.lastName.enable() : this.lastName.disable();
    this.isEditing ? this.about.enable() : this.about.disable();
  }

  updateProfile(): void {
    this.updatingProfile = true;
    const updatedUser = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      about: this.about.value,
    };

    this.httpClientService
      .updateBuyerProfile(this.userId, updatedUser)
      .then((res: any) => {
        console.log('Profile updated successfully:', res);
        this.openSnackBar('Profile updated successfully!', 3000);
        this.isEditing = false;
      })
      .catch((error: any) => {
        console.error('Error updating profile:', error);
      })
      .finally(() => {
        this.updatingProfile = false;
      });
  }

  openProfilePictureInput(): void {
    document.getElementById('profile-picture-input')?.click();
  }

  onProfilePictureChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicture = reader.result;
        this.updateProfilePicture(file);
      };
      reader.readAsDataURL(file);
    }
  }

  updateCharacterCount(): void {
    let count: number = this.about?.value?.length ?? 0;
    const remainingCharacters = 300 - count;
    const characterCountElement = document.getElementById('character-count');
    if (characterCountElement) {
      characterCountElement.textContent = String(remainingCharacters);
    }
  }

  updateProfilePicture(file: File): void {
    this.httpClientService
      .updateBuyerProfilePicture(this.userId, file)
      .then((res: any) => {
        console.log('Profile picture updated successfully:', res);
        this.openSnackBar('Profile picture updated successfully!', 3000);
      })
      .catch((error: any) => {
        console.error('Error updating profile picture:', error);
      });
  }
}
