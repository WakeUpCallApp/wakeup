import { Action } from '@ngrx/store';
import { ITopic, Topic } from '../models/topic.model';
import { type } from '../util';

export const ActionTypes = {
  SEARCH_INPUT: type('[Topic] Search'),
  LOAD: type('[Topic] Load'),
  LOAD_SUCCESS: type('[Topic] Load success'),
  LOAD_ERROR: type('[Topic] Load error'),
  CREATE: type('[Topic] Create'),
  CREATE_SUCCESS: type('[Topic] Create success'),
  CREATE_ERROR: type('[Topic] Create error'),
  UPDATE: type('[Topic] Update'),
  UPDATE_SUCCESS: type('[Topic] Update Success'),
  UPDATE_ERROR: type('[Topic] Update Error'),
  DELETE: type('[Topic] Delete'),
  DELETE_SUCCESS: type('[Topic] Delete Success'),
  GET_CURRENT_TOPIC: type('[Topic] Get current topic'),
  GET_CURRENT_TOPIC_SUCCESS: type('[Topic] Get current topic success'),
  GET_CURRENT_TOPIC_ERROR: type('[Topic] Get current topic error')
};

export class SearchAction implements Action {
  type = ActionTypes.SEARCH_INPUT;

  constructor(public payload: string) {}
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor() {}
}

export class LoadActionSuccess implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Topic[]) {}
}

export class LoadActionError implements Action {
  type = ActionTypes.LOAD_ERROR;

  constructor(public payload) {}
}

export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload: ITopic) {}
}
export class CreateActionSuccess implements Action {
  type = ActionTypes.CREATE_SUCCESS;

  constructor(public payload: Topic) {}
}

export class CreateActionError implements Action {
  type = ActionTypes.CREATE_ERROR;

  constructor(public payload) {}
}

export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: Topic) {}
}

export class UpdateActionSuccess implements Action {
  type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: Topic) {}
}

export class UpdateActionError implements Action {
  type = ActionTypes.UPDATE_ERROR;

  constructor(public payload) {
  }
}

export class DeleteAction implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: number) {}
}

export class DeleteActionSuccess implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor() {}
}

export class GetCurrentTopicAction implements Action {
  type = ActionTypes.GET_CURRENT_TOPIC;

  constructor(public payload: number) {}
}

export class GetCurrentTopicActionSuccess implements Action {
  type = ActionTypes.GET_CURRENT_TOPIC_SUCCESS;

  constructor(public payload: Topic) {}
}

export class GetCurrentTopicActionError implements Action {
  type = ActionTypes.UPDATE_ERROR;

  constructor(public payload) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | SearchAction
  | LoadAction
  | LoadActionSuccess
  | LoadActionError
  | CreateAction
  | CreateActionSuccess
  | CreateActionError
  | UpdateAction
  | UpdateActionSuccess
  | UpdateActionError
  | GetCurrentTopicAction
  | GetCurrentTopicActionSuccess
  | GetCurrentTopicActionError
  | DeleteAction
  | DeleteActionSuccess;
