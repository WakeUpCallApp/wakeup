import { Action } from '@ngrx/store';

import { type } from '../util';

export const ActionTypes = {
  LOGOUT: type('[Login] Logout'),
};

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;

  constructor(public payload? : any) { }
}

export type Actions
= LogoutAction;