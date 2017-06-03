import { Action } from '@ngrx/store';
import { QuestionSet } from '../models/question-set.model';
import { type } from '../util';

export const ActionTypes = {
  LOAD: type('[QuestionSet] Load'),
  LOAD_SUCCESS: type('[QuestionSet] Load Success'),
  CREATE: type('[QuestionSet] Create'),
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

export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload: QuestionSet) { }
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
  | CreateAction
  | UpdateAction
  | DeleteAction;
