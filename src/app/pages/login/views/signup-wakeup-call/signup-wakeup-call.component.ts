import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginApi } from '@app/common';
import appConstants from '@app/common/app-constants';
import { environment } from '@env/environment';
import constants from '../../config/constants';


@Component({
  selector: 'app-signup-wakeup-call',
  templateUrl: './signup-wakeup-call.component.html',
  styleUrls: ['./signup-wakeup-call.component.scss']
})
export class SignupWakeupCallComponent {
  public user = {
    name: '',
    email: '',
    password: ''
  };
  errorMessage: string;
  isSigningIn = false;

  constructor(private loginApi: LoginApi, private router: Router) { }

  loginOauth(provider) {
    window.location.href = `${environment.serverURL}/auth/${provider}`;
  };

  signUp() {
    this.isSigningIn = true;
    this.loginApi.signUp(this.user).subscribe(
      resp => {
        this.isSigningIn = false;
        this.router.navigate([appConstants.routes.QUESTION_SETS]);
      },
      (error) => {
        this.isSigningIn = false;
        if (error.status === appConstants.errorCode.Unauthorized) {
          this.errorMessage = constants.wrongCredentials;
        } else if (error.status === appConstants.errorCode.UnprocessableEntity) {
          this.errorMessage = constants.uniqueEmailError;
        } else {
          this.errorMessage = constants.genericError;
        }
      });
  }

  valuechange($event) {
    this.errorMessage = undefined;
  }

}
