// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-guest-layout',
//   templateUrl: './guest-layout.component.html',
//   styleUrls: ['./guest-layout.component.scss']
// })
// export class GuestLayoutComponent {

// }


import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'll-base-layout-guest',
  templateUrl: './guest-layout.component.html',
  styleUrls: ['./guest-layout.component.scss']
})
export class GuestLayoutComponent implements OnInit, OnDestroy {
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
