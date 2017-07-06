import { Action } from "@ngrx/store";
import { Quote, QuoteApi } from "../models/quote.model";
import { type } from "../util";

export const ActionTypes = {
  GET_BY_TOPIC_ID: type("[Quote] Get By Topic Id"),
  GET_BY_TOPIC_ID_SUCCESS: type("[Quote] Get By Topic Id Success"),
  GET_BY_ID: type("[Quote] Get By Id"),
  GET_BY_ID_SUCCESS: type("[Quote] Get By Id Success"),
  LOAD: type("[Quote] Load"),
  LOAD_SUCCESS: type("[Quote] Load success"),
  LOAD_ERROR: type("[Quote] Load error"),
  CREATE: type("[Quote] Create"),
  CREATE_SUCCESS: type("[Quote] Create success"),
  CREATE_ERROR: type("[Quote] Create error"),
  UPDATE: type("[Quote] Update"),
  DELETE: type("[Quote] Delete"),
  GET_SUGGESTIONS: type("[Quote] Get Suggestions"),
  GET_SUGGESTIONS_SUCCESS: type("[Quote] Get Suggestions Success")
};

export class GetByTopicIdAction implements Action {
  type = ActionTypes.GET_BY_TOPIC_ID;
  constructor(public payload: number) {}
}

export class GetByTopicIdActionSuccess implements Action {
  type = ActionTypes.GET_BY_TOPIC_ID_SUCCESS;
  constructor(public payload: Quote[]) {}
}

export class GetByIdAction implements Action {
  type = ActionTypes.GET_BY_ID;
  constructor(public payload: number) {}
}

export class GetByIdActionSuccess implements Action {
  type = ActionTypes.GET_BY_ID_SUCCESS;
  constructor(public payload: Quote) {}
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor() {}
}

export class LoadActionSuccess implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Quote[]) {}
}

export class LoadActionError implements Action {
  type = ActionTypes.LOAD_ERROR;

  constructor(public payload) {}
}

export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload) {}
}
export class CreateActionSuccess implements Action {
  type = ActionTypes.CREATE_SUCCESS;

  constructor(public payload) {}
}

export class CreateActionError implements Action {
  type = ActionTypes.CREATE_ERROR;

  constructor(public payload) {}
}

export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: Quote) {}
}

export class DeleteAction implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: string) {}
}

export class GetSuggestionsAction implements Action {
  type = ActionTypes.GET_SUGGESTIONS;
  constructor() {}
}

export class GetSuggestionsActionSuccess implements Action {
  type = ActionTypes.GET_SUGGESTIONS_SUCCESS;
  constructor(public payload) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | GetByTopicIdAction
  | GetByTopicIdActionSuccess
  | GetByIdAction
  | GetByIdActionSuccess
  | LoadAction
  | LoadActionSuccess
  | LoadActionError
  | CreateAction
  | CreateActionSuccess
  | CreateActionError
  | UpdateAction
  | DeleteAction
  | GetSuggestionsAction
  | GetSuggestionsActionSuccess;
