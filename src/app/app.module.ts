import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './shared/auth-guard.service';
import { AuthStateService } from './shared/auth-state.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule, 
    NgxSkeletonLoaderModule,
  ],
  providers: [AuthService,
    AuthGuard,
    AuthStateService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
