import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthTokenService } from '../authToken.service';
import { User, Token } from '../../models/user.model';

@Injectable()
export class LoginApi {
  private currentUser;
  private identityUrl = '/api/users/me';
  constructor(
    private http: HttpClient,
    private authService: AuthTokenService) { }

  getCurrentUser(): User {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser !== undefined;
  }

  signUp(userObject: User): Observable<User> {
    return this.http
      .post('/api/users', userObject)
      .do((response: any) => {
        this.authService.setToken(response.token);
        this.currentUser = this.authService.getUserInfo();
        return response;
      });
  }

  login(userObject: User): Observable<Token> {
    return this.http
      .post('/auth/local', userObject)
      .do((response: any) => {
        this.authService.setToken(response.token);
        this.currentUser = this.authService.getUserInfo();
        return response;
      });
  }

  getUserDetails(): Observable<User> {
    return this.http
      .get(this.identityUrl)
      .do((currentUser: any) => {
        if (!!currentUser.name) {
          this.currentUser = currentUser;
        }
      });
  }

  logout() {
    this.authService.removeStoredToken();
    this.currentUser = undefined;
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http
      .put(`/api/users/${this.currentUser._id}/password`, {
        oldPassword,
        newPassword
      });
  }

}
