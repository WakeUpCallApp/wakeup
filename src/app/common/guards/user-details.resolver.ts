import { Injectable } from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthTokenService, LoginApi } from '../services';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';

import AppConstants from '../app-constants';


@Injectable()
export class UserDetailResolver implements Resolve<User> {
  constructor(private authTokenService: AuthTokenService,
    private loginApi: LoginApi,
    private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (!this.loginApi.getCurrentUser() && this.authTokenService.isLoggedIn()) {
      return this.loginApi.getUserDetails()
        .catch(error => {
          this.router.navigate([AppConstants.routes.LANDING]);
          return Observable.of(error);
        });
    } else if (!this.loginApi.getCurrentUser()) {
      this.router.navigate([AppConstants.routes.LANDING]);
      return null;
    }
  }
}
