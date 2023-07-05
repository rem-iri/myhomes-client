import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { AuthService } from 'src/app/service/auth.service';
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

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClientService: HttpClientService
    ) 
  {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/seller";
  }


  async login() {
    await this.authService.login("jdoe", "pass123");
    
    this.router.navigateByUrl(this.returnUrl);  
  }

  ngOnInit(): void {
  }

}
