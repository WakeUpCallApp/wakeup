import { Component, OnInit } from '@angular/core';
import { LoginApi } from '../../../../common/services/api/login.api';
import { AuthTokenService } from '../../../../common/services/authToken.service';
import { Router } from '@angular/router';
import appConstants from '../../../../common/app-constants';
import constants from '../../config/constants';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-login-wakeup-call',
  templateUrl: './login-wakeup-call.component.html',
  styleUrls: ['./login-wakeup-call.component.scss']
})
export class LoginWakeupCallComponent implements OnInit {
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

  ngOnInit() {
  }

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
