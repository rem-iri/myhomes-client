import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { MustMatch } from 'src/app/shared/must-match.validator';

@Component({
  selector: 'app-buyer-signup',
  templateUrl: './buyer-signup.component.html',
  styleUrls: ['./buyer-signup.component.scss']
})
export class BuyerSignupComponent {
  submitted = false;
  constructor(
    private httpClient: HttpClientService,
    private formBuilder: FormBuilder
    ) {}

  firstName = new FormControl("", [Validators.required]);
  lastName = new FormControl("", [Validators.required]);
  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [Validators.required, Validators.minLength(6)]);
  confirmPassword = new FormControl("", [Validators.required]);
  accountType = new FormControl("buyer");

  buyerRegisterForm: FormGroup = this.formBuilder.group(
    {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      accountType: this.accountType,
    },
    {
      validator: MustMatch("password", "confirmPassword"),
    }
  );

  ngOnInit() {
    // this.registerForm = this.formBuilder.group(
    //   {
    //     firstName: this.firstName,
    //     lastName: this.lastName,
    //     email: this.email,
    //     company: this.company,
    //     password: this.password,
    //     confirmPassword: this.confirmPassword,
    //   },
    //   {
    //     validator: MustMatch("password", "confirmPassword"),
    //   }
    // );
  }

  
  onSubmit() {
    this.submitted = true;

    console.log(this.buyerRegisterForm)

    // stop here if form is invalid
    if (this.buyerRegisterForm.invalid) {
      return;
    }

    this.httpClient.signup(this.buyerRegisterForm.value);

    // display form values on success
    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.buyerRegisterForm.value, null, 4)
    );
  }
}
