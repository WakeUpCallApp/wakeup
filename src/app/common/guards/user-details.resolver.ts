import { Injectable } from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthTokenService, LoginService } from '../services';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';

import AppConstants from '../app-constants';


@Injectable()
export class UserDetailResolver implements Resolve<User> {
  constructor(private authTokenService: AuthTokenService,
    private loginService: LoginService,
    private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (!this.loginService.getCurrentUser() && this.authTokenService.isLoggedIn()) {
      return this.loginService.getUserDetails()
        .catch(error => {
          this.router.navigate([AppConstants.routes.LANDING]);
          return Observable.of(error);
        });
    } else if (!this.loginService.getCurrentUser()) {
      this.router.navigate([AppConstants.routes.LANDING]);
      return null;
    }
  }
}
