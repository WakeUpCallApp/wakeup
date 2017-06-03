import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthTokenService } from './authToken.service';
import { User, Token } from '../models/User.model';

@Injectable()
export class LoginService {
  private currentUser;
  private identityUrl = '/api/users/me';
  constructor(private http: Http, private authService: AuthTokenService) {
  }

  getCurrentUser():User{
        return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser !== undefined && this.authService.isLoggedIn();
  }

  signUp(userObject: User): Observable<User> {
    return this.http.post('/api/users', userObject)
      .map((response: Response) => {
        this.currentUser = response.json();
        this.authService.setToken(this.currentUser.token);
        return this.currentUser;
      })
      .catch(this.handleError);
  }

  login(userObject: User): Observable<Token> {
    return this.http.post('/auth/local', userObject)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  checkAuthenticationStatus() {
    return this.http.get(this.identityUrl)
      .map((response: any) => {
        return response._body ? response.json() : {};
      })
      .do(currentUser => {
        if (!!currentUser.name) {
          this.currentUser = currentUser;
        }
      })
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
  logout() {
    this.authService.removeStoredToken();
    this.currentUser = undefined;
  }
}
