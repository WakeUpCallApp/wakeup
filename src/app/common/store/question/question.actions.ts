import { Action } from '@ngrx/store';
import { IQuestion, Question } from '../../models/question.model';
import { type } from '../util';

export const ActionTypes = {
  LOAD: type('[Question] Load'),
  LOAD_SUCCESS: type('[Question] Load success'),
  LOAD_ERROR: type('[Question] Load error'),
  GET_CURRENT_QUESTION: type('[Question] Get current question'),
  GET_CURRENT_QUESTION_SUCCESS: type('[Question] Get current question success'),
  GET_CURRENT_QUESTION_ERROR: type('[Question] Get current question error'),
  CREATE: type('[Question] Create'),
  CREATE_SUCCESS: type('[Question] Create success'),
  CREATE_ERROR: type('[Question] Create error'),
  UPDATE: type('[Question] Update'),
  DELETE: type('[Question] Delete'),
  DELETE_SUCCESS: type('[Question] Delete Success')
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload? : any) { }
}

export class LoadActionSuccess implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Question[]) { }
}

export class LoadActionError implements Action {
  type = ActionTypes.LOAD_ERROR;

  constructor(public payload) { }
}

export class GetCurrentQuestion implements Action {
  type = ActionTypes.GET_CURRENT_QUESTION;
  constructor(public payload: number) {}
}

export class GetCurrentQuestionSuccess implements Action {
  type = ActionTypes.GET_CURRENT_QUESTION_SUCCESS;
  constructor(public payload: Question) {}
}

export class GetCurrentQuestionError implements Action {
  type = ActionTypes.GET_CURRENT_QUESTION_ERROR;
  constructor(public payload) {}
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

  constructor(public payload) { }
}

export class DeleteActionSuccess implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload) { }
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
  | DeleteAction
  | DeleteActionSuccess
  | GetCurrentQuestion
  | GetCurrentQuestionSuccess
  | GetCurrentQuestionError;
