import { Action } from '@ngrx/store';
import { IAnswer, Answer } from '../models/answer.model';
import { type } from '../util';

export const ActionTypes = {
  LOAD: type('[Answer] Load'),
  LOAD_SUCCESS: type('[Answer] Load success'),
  LOAD_ERROR: type('[Answer] Load error'),
  CREATE: type('[Answer] Create'),
  CREATE_SUCCESS: type('[Answer] Create success'),
  CREATE_ERROR: type('[Answer] Create error'),
  UPDATE: type('[Answer] Update'),
  UPDATE_SUCCESS: type('[Answer] Update Success'),
  UPDATE_ERROR: type('[Answer] Update Error'),
  DELETE: type('[Answer] Delete'),
  DELETE_SUCCESS: type('[Answer] Delete Success'),
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: number) { }
}

export class LoadActionSuccess implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Answer[]) { }
}

export class LoadActionError implements Action {
  type = ActionTypes.LOAD_ERROR;

  constructor(public payload) { }
}

export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload: IAnswer) { }
}
export class CreateActionSuccess implements Action {
  type = ActionTypes.CREATE_SUCCESS;

  constructor(public payload: Answer) { }
}

export class CreateActionError implements Action {
  type = ActionTypes.CREATE_ERROR;

  constructor(public payload) { }
}

export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: Answer) { }
}

export class UpdateActionSuccess implements Action {
  type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: Answer) {}
}

export class UpdateActionError implements Action {
  type = ActionTypes.UPDATE_ERROR;

  constructor(public payload: Answer) {}
}

export class DeleteAction implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: number) {}
}

export class DeleteActionSuccess implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor() {}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoadAction
  | LoadActionSuccess
  | LoadActionError
  | CreateAction
  | CreateActionSuccess
  | CreateActionError
  | UpdateAction
  | UpdateActionSuccess
  | UpdateActionError
  | DeleteAction;
