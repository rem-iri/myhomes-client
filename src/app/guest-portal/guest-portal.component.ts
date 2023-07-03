// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-guest-portal',
//   templateUrl: './guest-portal.component.html',
//   styleUrls: ['./guest-portal.component.scss']
// })
// export class GuestPortalComponent {

// }


import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-guest-portal',
  templateUrl: './guest-portal.component.html',
  styleUrls: ['./guest-portal.component.scss']
})
export class GuestPortalComponent implements OnInit, OnDestroy {
  isAlive: boolean = true;
  @ViewChild('sidenav') sidenav: { toggle: () => void; opened: boolean; };
  isSidenavExpand = false;
  isLessThenLargeDevice = true;
  
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 1199px)']).pipe(takeWhile(() => this.isAlive)).subscribe(({matches}) => {
      this.isLessThenLargeDevice = matches;
      if (!matches) {
        this.isSidenavExpand = false;
      }
    });
  }

  ngOnInit(): void {}
  
  ngOnDestroy(): void{
    this.isAlive = false
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
  }
}