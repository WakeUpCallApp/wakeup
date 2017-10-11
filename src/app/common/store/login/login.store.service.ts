import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../app.store';
import * as loginActions from './login.actions';

@Injectable()
export class LoginStoreService {

    constructor(private store: Store<reducers.AppState>) { }

    logout() {
        this.store.dispatch(new loginActions.LogoutAction());
    }
}
