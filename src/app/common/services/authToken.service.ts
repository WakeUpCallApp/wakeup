import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthTokenService{
  token;
  jwtHelper: JwtHelper = new JwtHelper();


  constructor(){}

  setToken(expToken) {
    localStorage.setItem('token', expToken);
    this.token = expToken;
  }

  getToken() {
    return this.token ? this.token : this.getStoredToken();
  }

  getStoredToken() {
    return localStorage.getItem('token');
  }

  removeStoredToken() {
    localStorage.removeItem('token');
    this.token = undefined;
  }

  getUserInfo() {
      const token = this.jwtHelper.decodeToken(this.getStoredToken());
      return {
        name: token.name,
        id: token._id,
        role: token.role
      }
  }

  isLoggedIn() {
    const token = this.getToken();
    return token ?
      !this.jwtHelper.isTokenExpired(token) :
      false;
  }
}
