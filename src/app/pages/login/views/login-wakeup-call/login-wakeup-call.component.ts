import { Component } from '@angular/core';
import { Router } from '@angular/router';

import appConstants from '@app/common/app-constants';

import { LoginApi, AuthTokenService } from '@app/common';
import { environment } from '@env/environment';

import constants from '../../config/constants';


@Component({
  selector: 'app-login-wakeup-call',
  templateUrl: './login-wakeup-call.component.html',
  styleUrls: ['./login-wakeup-call.component.scss']
})
export class LoginWakeupCallComponent {
  public user = {
    email: '',
    password: ''
  };
  isLoggingIn = false;
  errorMessage: string;
  constructor(
    private loginApi: LoginApi,
    private router: Router,
    private authService: AuthTokenService) { }

  loginOauth(provider) {
    window.location.href = `${environment.serverURL}/auth/${provider}`;
  };

  login() {
    this.isLoggingIn = true;
    this.loginApi.login(this.user).subscribe(
      resp => {
        this.isLoggingIn = false;
        this.router.navigate([appConstants.routes.QUESTION_SETS]);
      },
      (error) => {
        this.isLoggingIn = false;
        if (error.status === appConstants.errorCode.Unauthorized) {
          this.errorMessage = constants.wrongCredentials;
        } else {
          this.errorMessage = constants.genericError;
        }
      });
  }
  valuechange($event) {
    this.errorMessage = undefined;
  }
}
