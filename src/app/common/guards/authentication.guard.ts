import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthTokenService } from '../services/authToken.service';
import appConstants from '../app-constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private _router:Router, private authService: AuthTokenService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.isLoggedIn()) {
            this._router.navigate([appConstants.routes.LOGIN]);
            return false;
        } else {
            return true;
        }
    }
}