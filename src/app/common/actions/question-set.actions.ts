import { Action } from '@ngrx/store';
import { IQuestionSet, QuestionSet } from '../models/question-set.model';
import { type } from '../util';

export const ActionTypes = {
  LOAD: type('[QuestionSet] Load'),
  LOAD_SUCCESS: type('[QuestionSet] Load Success'),
  LOAD_ERROR: type('[QuestionSet] Load Error'),
  GET_CURRENT_QUESTION_SET: type('[QuestionSet] Get Current Question Set'),
  GET_CURRENT_QUESTION_SET_SUCCESS: type('[QuestionSet] Get Current Question Set Success'),
  GET_CURRENT_QUESTION_SET_ERROR: type('[QuestionSet] Get Current Question Set Error'),
  CREATE: type('[QuestionSet] Create'),
  CREATE_SUCCESS: type('[QuestionSet] Create Success'),
  UPDATE: type('[QuestionSet] Update'),
  DELETE: type('[QuestionSet] Delete'),
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor() { }
}

export class LoadActionSuccess implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: QuestionSet[]) { }
}

export class LoadActionError implements Action {
  type = ActionTypes.LOAD_ERROR;

  constructor(public payload) { }
}


export class GetCurrentQSAction implements Action {
  type = ActionTypes.GET_CURRENT_QUESTION_SET;

  constructor(public payload: string) { }
}

export class GetCurrentQSActionSuccess implements Action {
  type = ActionTypes.GET_CURRENT_QUESTION_SET_SUCCESS;

  constructor(public payload: QuestionSet) { }
}

export class GetCurrentQSActionError implements Action {
  type = ActionTypes.GET_CURRENT_QUESTION_SET_ERROR;

  constructor(public payload) { }
}

export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload: IQuestionSet) { }
}

export class CreateActionSucces implements Action {
  type = ActionTypes.CREATE_SUCCESS;

  constructor(public payload: IQuestionSet) { }
}

export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: QuestionSet) { }
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
  | GetCurrentQSAction
  | GetCurrentQSActionSuccess
  | GetCurrentQSActionError
  | CreateAction
  | CreateActionSucces
  | UpdateAction
  | DeleteAction;
