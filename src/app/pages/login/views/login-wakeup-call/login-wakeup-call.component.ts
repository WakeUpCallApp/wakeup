import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../common/services/login.service';
import { AuthTokenService } from '../../../../common/services/authToken.service';
import { Router } from '@angular/router';
import appConstants from '../../../../common/app-constants';
import constants from '../../config/constants';

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
  isLoggingIn: boolean = false;
  errorMessage: string;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthTokenService) { }

  ngOnInit() {
  }

  loginOauth(provider) {
    window.location.href = '/auth/' + provider;
  };

  login() {
    this.isLoggingIn = true;
    this.loginService.login(this.user).subscribe(
      resp => {
        this.isLoggingIn = false;
        this.authService.setToken(resp.token);
        this.router.navigate(['landing']);
      },
      (error) => {
        this.isLoggingIn = false;
        if (error.status === appConstants.errorCode.Unauthorized) {
          this.errorMessage = constants.wrongCredentials;
        }
        else {
          this.errorMessage = constants.genericError;
        }
      });
  }
}
