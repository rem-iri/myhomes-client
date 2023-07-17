import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from 'src/app/service/profile.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { HttpClientService } from 'src/app/shared/http-client.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Output() profileUpdated = new EventEmitter<any>();

  company = new FormControl("", [Validators.required]);;
  email = new FormControl("", [Validators.required]);;
  firstName = new FormControl("", [Validators.required]);;
  lastName = new FormControl("", [Validators.required]);;
  about = new FormControl("", [Validators.required]);;
  profilePicture: string | ArrayBuffer | null;
  userId: string;
  updatingProfile: boolean;
  isEditing: boolean = false;

  profileForm: FormGroup = this.formBuilder.group({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    company: this.company,
    about: this.about,
  });

  constructor(
    private authStateService: AuthStateService,
    private httpClientService: HttpClientService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {
    this.userId = this.authStateService.getCurrentUser()?.id;
    this.updatingProfile = false;
  }

  ngOnInit(): void {
    this.getSellerProfile();
    this.getProfilePicture();
    this.email.disable();
    this.company.disable();
    this.firstName.disable();
    this.lastName.disable();
    this.about.disable();
  }

  getSellerProfile(): void {
    this.httpClientService
      .getSellerProfile(this.userId)
      .then((res: {
        company: string;
        email: string;
        firstName: string;
        lastName: string;
        about: string;
        profilePicture: string | ArrayBuffer | null;
      }) => {
        this.company.setValue(res.company);
        this.email.setValue(res.email);
        this.firstName.setValue(res.firstName);
        this.lastName.setValue(res.lastName);
        this.about.setValue(res.about);
        // this.profilePicture = res.profilePicture;
      })
      .catch((error: any) => {
        console.error('Error retrieving seller profile:', error);
      });
  }

  getProfilePicture(): void {
    this.httpClientService
      .getProfilePicture(this.userId)
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
    this.isEditing ? this.company.enable() : this.company.disable();
    this.isEditing ? this.firstName.enable() : this.firstName.disable();
    this.isEditing ? this.lastName.enable() : this.lastName.disable();
    this.isEditing ? this.about.enable() : this.about.disable();
  }

  updateProfile(): void {
    this.updatingProfile = true;
    const updatedUser = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      company: this.company.value,
      about: this.about.value,
    };

    this.httpClientService
      .updateSellerProfile(this.userId, updatedUser)
      .then((res: any) => {
        console.log('Profile updated successfully:', res);
        this.openSnackBar('Profile updated successfully!', 3000);
        this.isEditing = false;
        this.profileUpdated.emit(updatedUser);
        this.profileService.updateProfile(updatedUser); 
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
      .updateSellerProfilePicture(this.userId, file)
      .then((res: any) => {
        console.log('Profile picture updated successfully:', res);
        this.openSnackBar('Profile picture updated successfully!', 3000);
        // this.profileService.updateProfilePicture(res.profilePicture);
        this.profileService.updateProfilePicture(`http://localhost:5556/api/auth/seller-profile/${this.userId}/profile-picture?${Math.random()}`);

      })
      .catch((error: any) => {
        console.error('Error updating profile picture:', error);
      });
  }
}

