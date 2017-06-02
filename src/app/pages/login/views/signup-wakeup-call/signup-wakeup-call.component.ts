import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../common/services/login.service';
import { Router } from '@angular/router';

import appConstants from '../../../../common/app-constants';
import constants from '../../config/constants';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-signup-wakeup-call',
  templateUrl: './signup-wakeup-call.component.html',
  styleUrls: ['./signup-wakeup-call.component.scss']
})
export class SignupWakeupCallComponent implements OnInit {
  public user = {
    name: '',
    email: '',
    password: ''
  };
  errorMessage: string;
  isSigningIn: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  loginOauth(provider) {
    window.location.href = `${environment.serverURL}/auth/${provider}`;
  };

  signUp() {
    this.isSigningIn = true;
    this.loginService.signUp(this.user).subscribe(
      resp => {
        this.isSigningIn = false;
        this.router.navigate([appConstants.routes.QUESTION_SETS]);
      },
      (error) => {
        this.isSigningIn = false;
        if (error.status === appConstants.errorCode.Unauthorized) {
          this.errorMessage = constants.wrongCredentials;
        }
        else if(error.status === appConstants.errorCode.UnprocessableEntity) {
          this.errorMessage = constants.uniqueEmailError;
        }
        else {
          this.errorMessage = constants.genericError;
        }
      });
  }

  valuechange($event) {
    this.errorMessage = undefined;
  }

}
