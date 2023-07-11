import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { AuthService } from 'src/app/service/auth.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { HttpClientService } from 'src/app/shared/http-client.service';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
  //   {
  //     provide: ActivatedRoute,
  //     useValue: {
  //         snapshot: {
  //             paramMap: {
  //                 get(): string {
  //                     return '123';
  //                 },
  //             },
  //         },
  //     },
  // },
  ]
})
export class LoginComponent implements OnInit {
  private returnUrl: string;
  submitted = false;


  constructor(
    private authService: AuthService,
    private authStateService: AuthStateService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClientService: HttpClientService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    ) 
  {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/seller";
  }

  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [Validators.required]);


  loginForm: FormGroup = this.formBuilder.group(
    {
      email: this.email,
      password: this.password,
    }
  );

  responseError = false;
  
  openSnackBar(message: string, action: string = "Close") {
    this._snackBar.open(message, action, {duration: 6000});
  }

  async login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    console.log("LOGINFORM", this.loginForm.value)

    let loginResult;
    try {
      loginResult = await this.authService.login(this.email.value ?? "", this.password.value ?? "");

      if(!this.authService.isAuthenticated()) {
        throw new Error("Not Authenticated");
      }

      if(this.authStateService.getCurrentUser().accountType == "seller") {
        
        this.router.navigateByUrl("/seller");
      } else {
        this.router.navigateByUrl("/buyer-signup");
      }
    } catch(error) {
      this.responseError = true;
      // console.log("LOGIN COMPONENT", loginResult)
      // console.log("LOGIN COMPONENT", error)
      // this.openSnackBar("Error Check Console")
    }
  }

  ngOnInit(): void {
  }

}
