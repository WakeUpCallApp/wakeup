import { Action } from '@ngrx/store';
import { Topic, Quote } from '../../models';

import { type } from '../util';

export const ActionTypes = {
  GET_BY_TOPIC_ID: type('[Quote] Get By Topic Id'),
  GET_BY_TOPIC_ID_SUCCESS: type('[Quote] Get By Topic Id Success'),
  GET_BY_ID: type('[Quote] Get By Id'),
  GET_BY_ID_SUCCESS: type('[Quote] Get By Id Success'),
  GET_BY_ID_ERROR: type('[Quote] Get By Id Error'),
  GET_COMMENTS: type('[Quote] Get Comments'),
  GET_COMMENTS_SUCCESS: type('[Quote] Get Comments Success'),
  LOAD: type('[Quote] Load'),
  LOAD_SUCCESS: type('[Quote] Load success'),
  LOAD_ERROR: type('[Quote] Load error'),
  CREATE: type('[Quote] Create'),
  CREATE_SUCCESS: type('[Quote] Create success'),
  CREATE_ERROR: type('[Quote] Create error'),
  CREATE_COMMENT: type('[Quote] Create Comment'),
  CREATE_COMMENT_SUCCESS: type('[Quote] Create Comment success'),
  CREATE_COMMENT_ERROR: type('[Quote] Create Comment error'),
  UPDATE: type('[Quote] Update'),
  UPDATE_SUCCESS: type('[Quote] Update Success'),
  UPDATE_ERROR: type('[Quote] Update Error'),
  DELETE: type('[Quote] Delete'),
  DELETE_SUCCESS: type('[Quote] Delete Success'),
  DELETE_ERROR: type('[Quote] Delete Error'),
  DELETE_COMMENT: type('[Quote] Delete Comment'),
  DELETE_COMMENT_ERROR: type('[Quote] Delete Comment Error'),
  DELETE_COMMENT_SUCCESS: type('[Quote] Delete Comment Success'),
  GET_SUGGESTIONS: type('[Quote] Get Suggestions'),
  GET_SUGGESTIONS_SUCCESS: type('[Quote] Get Suggestions Success'),
  IMPORT_QUOTES: type('[Quote] Import Quotes'),
  IMPORT_QUOTES_SUCCESS: type('[Quote] Import Quotes Success'),
  IMPORT_QUOTES_ERROR: type('[Quote] Import Quotes Error'),
  EXPORT_QUOTES: type('[Quote] Export Quotes')
};

export class GetByTopicIdAction implements Action {
  type = ActionTypes.GET_BY_TOPIC_ID;
  constructor(public payload: number) { }
}

export class GetByTopicIdActionSuccess implements Action {
  type = ActionTypes.GET_BY_TOPIC_ID_SUCCESS;
  constructor(public payload: Quote[]) { }
}

export class GetByIdAction implements Action {
  type = ActionTypes.GET_BY_ID;
  constructor(public payload: number) { }
}

export class GetByIdActionSuccess implements Action {
  type = ActionTypes.GET_BY_ID_SUCCESS;
  constructor(public payload: Quote) { }
}

export class GetByIdActionError implements Action {
  type = ActionTypes.GET_BY_ID_ERROR;
  constructor(public payload) { }
}

export class GetCommentsAction implements Action {
  type = ActionTypes.GET_COMMENTS;
  constructor(public payload: number) { }
}

export class GetCommentsActionSuccess implements Action {
  type = ActionTypes.GET_COMMENTS_SUCCESS;
  constructor(public payload: Quote) { }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload?: any) { }
}

export class LoadActionSuccess implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Topic[]) { }
}

export class LoadActionError implements Action {
  type = ActionTypes.LOAD_ERROR;

  constructor(public payload) { }
}

export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload) { }
}
export class CreateActionSuccess implements Action {
  type = ActionTypes.CREATE_SUCCESS;

  constructor(public payload) { }
}

export class CreateActionError implements Action {
  type = ActionTypes.CREATE_ERROR;

  constructor(public payload) { }
}

export class CreateCommentAction implements Action {
  type = ActionTypes.CREATE_COMMENT;

  constructor(public payload) { }
}
export class CreateCommentActionSuccess implements Action {
  type = ActionTypes.CREATE_COMMENT_SUCCESS;

  constructor(public payload) { }
}

export class CreateCommentActionError implements Action {
  type = ActionTypes.CREATE_COMMENT_ERROR;

  constructor(public payload) { }
}

export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: Quote) { }
}

export class UpdateActionSuccess implements Action {
  type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: Quote) { }
}

export class UpdateActionError implements Action {
  type = ActionTypes.UPDATE_ERROR;

  constructor(public payload) { }
}

export class DeleteAction implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: string) { }
}

export class DeleteActionSuccess implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload) { }
}

export class DeleteActionError implements Action {
  type = ActionTypes.DELETE_ERROR;

  constructor(public payload) { }
}

export class DeleteCommentAction implements Action {
  type = ActionTypes.DELETE_COMMENT;

  constructor(public payload) { }
}
export class DeleteCommentActionSuccess implements Action {
  type = ActionTypes.DELETE_COMMENT_SUCCESS;

  constructor(public payload) { }
}

export class DeleteCommentActionError implements Action {
  type = ActionTypes.DELETE_COMMENT_ERROR;

  constructor(public payload: string) { }
}

export class GetSuggestionsAction implements Action {
  type = ActionTypes.GET_SUGGESTIONS;
  constructor(public payload?: any) { }
}

export class GetSuggestionsActionSuccess implements Action {
  type = ActionTypes.GET_SUGGESTIONS_SUCCESS;
  constructor(public payload) { }
}

export class ImportQuotesAction implements Action {
  type = ActionTypes.IMPORT_QUOTES;
  constructor(public payload) { }
}

export class ImportQuotesActionSuccess implements Action {
  type = ActionTypes.IMPORT_QUOTES_SUCCESS;
  constructor(public payload) { }
}

export class ImportQuotesActionError implements Action {
  type = ActionTypes.IMPORT_QUOTES_ERROR;
  constructor(public payload) { }
}

export class ExportQuotesAction implements Action {
  type = ActionTypes.EXPORT_QUOTES;
  constructor(public payload) { }
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
  | GetByIdActionError
  | GetCommentsAction
  | GetCommentsActionSuccess
  | LoadAction
  | LoadActionSuccess
  | LoadActionError
  | CreateAction
  | CreateActionSuccess
  | CreateActionError
  | CreateCommentAction
  | CreateCommentActionError
  | CreateCommentActionSuccess
  | UpdateAction
  | UpdateActionSuccess
  | UpdateActionError
  | DeleteAction
  | DeleteActionSuccess
  | DeleteActionError
  | DeleteCommentAction
  | DeleteCommentActionError
  | DeleteCommentActionSuccess
  | GetSuggestionsAction
  | GetSuggestionsActionSuccess
  | ImportQuotesAction
  | ImportQuotesActionError
  | ImportQuotesActionSuccess
  | ExportQuotesAction;
