import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { menuList as staticMenuList } from '../../data/menus';
import { Menu } from '../../data/menus';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'll-header-seller',
  templateUrl: './header-seller.component.html',
  styleUrls: ['./header-seller.component.scss']
})
export class HeaderSellerComponent implements OnInit {
  @Input() topFixed: boolean;
  @Output() toggleSidenav = new EventEmitter();
  isScrolled: boolean;
  menuList: Menu[] = [];
  isLessThenLargeDevice: boolean;
  constructor(
    private authService: AuthService,
    private route: Router,
    private breakpointObserver: BreakpointObserver
    ) {}

  ngOnInit(): void {
    this.menuList = staticMenuList;
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
  }


  logout() {
    this.authService.logout();
    this.route.navigateByUrl('/login');
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isScrolled = window.pageYOffset > 15;
  }
}
