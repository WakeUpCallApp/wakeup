import { Action } from '@ngrx/store';
import { IQuestion, Question } from '../models/question.model';
import { type } from '../util';

export const ActionTypes = {
  LOAD: type('[Question] Load'),
  LOAD_SUCCESS: type('[Question] Load success'),
  LOAD_ERROR: type('[Question] Load error'),
  CREATE: type('[Question] Create'),
  CREATE_SUCCESS: type('[Question] Create success'),
  CREATE_ERROR: type('[Question] Create error'),
  UPDATE: type('[Question] Update'),
  DELETE: type('[Question] Delete'),
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor() { }
}

export class LoadActionSuccess implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Question[]) { }
}

export class LoadActionError implements Action {
  type = ActionTypes.LOAD_ERROR;

  constructor(public payload) { }
}

export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload: IQuestion) { }
}
export class CreateActionSuccess implements Action {
  type = ActionTypes.CREATE_SUCCESS;

  constructor(public payload: Question) { }
}

export class CreateActionError implements Action {
  type = ActionTypes.CREATE_ERROR;

  constructor(public payload) { }
}

export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: Question) { }
}

export class DeleteAction implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: string) { }
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
  | DeleteAction;
