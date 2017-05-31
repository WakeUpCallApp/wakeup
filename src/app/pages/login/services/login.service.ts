import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthTokenService } from '../../../common/services/authToken.service';

interface UserApi {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class LoginService {
  currentUser;

  constructor(private http: Http, private authService: AuthTokenService) {
  }

  signUp(userObject: UserApi) {
    return this.http.post('/api/users', userObject)
      .switchMap((response: Response) => {
        this.currentUser = response.json();
        this.authService.setToken(this.currentUser.token);
        return response.json();
      })
      .catch(error => Observable.of(false));
  }
}
