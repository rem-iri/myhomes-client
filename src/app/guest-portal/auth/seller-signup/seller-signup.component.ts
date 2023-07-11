import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { MustMatch } from 'src/app/shared/must-match.validator';

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.scss']
})
export class SellerSignupComponent {
  
  submitted = false;
  constructor(
    private httpClient: HttpClientService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
    ) {}

  firstName = new FormControl("", [Validators.required]);
  lastName = new FormControl("", [Validators.required]);
  email = new FormControl("", [Validators.required, Validators.email]);
  company = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required, Validators.minLength(6)]);
  confirmPassword = new FormControl("", [Validators.required]);
  accountType = new FormControl("seller");
  plan = new FormControl("free");

  sellerRegisterForm: FormGroup = this.formBuilder.group(
    {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      company: this.company,
      password: this.password,
      confirmPassword: this.confirmPassword,
      accountType: this.accountType,
      plan: this.plan,
    },
    {
      validator: MustMatch("password", "confirmPassword"),
    }
  );

  ngOnInit() {
  }

  openSnackBar(message: string, action: string | undefined) {
    this._snackBar.open(message, action, {duration: 6000});
  }

  serverError: string[] = [];
  
  async onSubmit() {
    this.submitted = true;

    console.log(this.sellerRegisterForm)

    // stop here if form is invalid
    if (this.sellerRegisterForm.invalid) {
      return;
    }

    try {
      this.serverError = [];
      await this.httpClient.signup(this.sellerRegisterForm.value);
    } catch(error: any) {
      console.log("RESPONSE ERRORS ", error);
      if(error?.error?.message) {
        this.serverError.push(error?.error?.message);
      }
      return;
    }
    

    console.log(JSON.stringify(this.sellerRegisterForm.value, null, 4));
    this.router.navigateByUrl("/login");
    this.openSnackBar("Successfully created an account. Please Login", undefined);
  }
}

