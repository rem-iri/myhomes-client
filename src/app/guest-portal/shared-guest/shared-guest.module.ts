import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SidenavComponent } from './sidenav/sidenav.component';
import { GuestPortalRoutingModule } from '../guest-portal-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SampleComponent } from './sample/sample.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    SampleComponent, HeaderComponent
  ],
  imports: [
    CommonModule,
    GuestPortalRoutingModule,
    SharedModule,
  ],
  exports: [
    SampleComponent,
    HeaderComponent
  ]
})
export class SharedGuestModule { }
