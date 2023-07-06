import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  companyName: string;
  email: string;
  firstName: string;
  lastName: string;
  about: string;
  profilePictureUrl: string | ArrayBuffer | null;

  constructor() {
    this.companyName = '';
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.about = '';
    this.profilePictureUrl = null;
  }
  openProfilePictureInput() {
    document.getElementById('profile-picture-input')?.click();
  }
  
  onProfilePictureChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePictureUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
