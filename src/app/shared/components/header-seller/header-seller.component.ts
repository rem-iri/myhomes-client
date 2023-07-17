import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { menuList as staticMenuList } from '../../data/menus';
import { Menu } from '../../data/menus';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from '../../http-client.service';
import { AuthStateService } from '../../auth-state.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'll-header-seller',
  templateUrl: './header-seller.component.html',
  styleUrls: ['./header-seller.component.scss']
})
export class HeaderSellerComponent implements OnInit, OnChanges {
  @Input() topFixed: boolean;
  @Output() toggleSidenav = new EventEmitter();
  userName: string = '';
  profilePicture: string | null;
  isScrolled: boolean;
  menuList: Menu[] = [];
  isLessThanLargeDevice: boolean;
  userId: string;

  constructor(
    private authService: AuthService,
    private authStateService: AuthStateService,
    private httpClientService: HttpClientService,
    private route: Router,
    private breakpointObserver: BreakpointObserver,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.menuList = staticMenuList;
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThanLargeDevice = matches;
    });
    this.userId = this.authStateService.getCurrentUser()?.id;
    this.updateUserName();
    this.getProfilePicture();


    this.profileService.profileUpdated$.subscribe(updatedUser => {
      this.userName = `${updatedUser.firstName} ${updatedUser.lastName}`;
    });
    
    this.profileService.profilePictureUpdated$.subscribe(updatedProfilePicture => {
      this.profilePicture = updatedProfilePicture; 
    });
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userName'] && !changes['userName'].firstChange) {
      this.updateUserName();
    }
  }

  updateUserName(): void {
    this.httpClientService.getSellerProfile(this.userId).then(res => {
      this.userName = `${res.firstName} ${res.lastName}`;
    }).catch(error => {
      console.error('Error fetching seller profile:', error);
    });
  }

  getProfilePicture(): void {
    this.httpClientService.getProfilePicture(this.userId).then(pictureUrl => {
      this.profilePicture = pictureUrl;
    }).catch(error => {
      console.error('Error fetching profile picture:', error);
    });
  }

  logout() {
    this.authService.logout();
    this.route.navigateByUrl('/login');
  }

  redirectToProfile() {
    this.route.navigateByUrl('/seller/profile');
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isScrolled = window.pageYOffset > 15;
  }
}
