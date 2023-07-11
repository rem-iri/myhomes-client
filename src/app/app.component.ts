import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStateService } from './shared/auth-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular is Awesome';

  constructor(
    private authService: AuthService,
    private stateService: AuthStateService,
    private route: ActivatedRoute,
    private router: Router) 
  {
    if(authService.isAuthenticated()) {
        let accountType = stateService.getCurrentUser().accountType

        console.log("REDIRECTING TO: " + accountType)

        if(accountType == "seller") {
          this.router.navigateByUrl("/seller");
        } else {
          this.router.navigateByUrl("/buyer-signup");
        }
    }
  }
}
