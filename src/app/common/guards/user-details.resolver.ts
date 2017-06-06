import { Injectable } from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthTokenService, LoginService } from '../services';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserDetailResolver implements Resolve<User> {
  constructor(private authTokenService: AuthTokenService,
    private loginService: LoginService,
    private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (!this.loginService.getCurrentUser() && this.authTokenService.isLoggedIn()) {
      return this.loginService.getUserDetails();
    }
    else if (!this.loginService.getCurrentUser()) {
      this.router.navigate(['/landing']);
      return null;
    }
  }
}