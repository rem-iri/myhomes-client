import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestPortalComponent } from './guest-portal.component';

const routes: Routes = [
  {
    path: '',
    component: GuestPortalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestPortalRoutingModule { }
