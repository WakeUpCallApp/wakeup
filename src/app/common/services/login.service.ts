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
  currentUser;

  constructor(private http: Http, private authService: AuthTokenService) {
  }

  signUp(userObject: User): Observable<User> {
    return this.http.post('/api/users', userObject)
      .map((response: Response) => {
        this.currentUser = response.json();
        this.authService.setToken(this.currentUser.token);
        return this.currentUser;
      })
      .catch(error => Observable.throw(error));
  }

  login(userObject: User): Observable<Token> {
    return this.http.post('/auth/local',userObject)
    .map((response:Response) => {
      return response.json();
    })
    .catch(error => Observable.throw(error));
  }
}
