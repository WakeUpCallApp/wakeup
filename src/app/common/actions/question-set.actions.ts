import { Action } from "@ngrx/store";
import { IQuestionSet, QuestionSet } from "../models/question-set.model";
import { type } from "../util";

export enum Filter {
  MOST_PLAYED,
  ALL
}

export const ActionTypes = {
  SEARCH_INPUT: type("[QuestionSet] Search Input"),
  FILTER: type("[QuestionSet] FILTER"),
  LOAD: type("[QuestionSet] Load"),
  LOAD_SUCCESS: type("[QuestionSet] Load Success"),
  LOAD_ERROR: type("[QuestionSet] Load Error"),
  GET_CURRENT_QUESTION_SET: type("[QuestionSet] Get Current Question Set"),
  GET_CURRENT_QUESTION_SET_SUCCESS: type(
    "[QuestionSet] Get Current Question Set Success"
  ),
  GET_CURRENT_QUESTION_SET_ERROR: type(
    "[QuestionSet] Get Current Question Set Error"
  ),
  CREATE: type("[QuestionSet] Create"),
  CREATE_SUCCESS: type("[QuestionSet] Create Success"),
  CREATE_ERROR: type("[QuestionSet] Create Error"),
  ADD_QUESTION: type("[QuestionSet] Add Question"),
  ADD_QUESTION_SUCCESS: type("[QuestionSet] Add Question Success"),
  EDIT_QUESTION: type("[QuestionSet] Edit Question"),
  EDIT_QUESTION_SUCCESS: type("[QuestionSet] Edit Question Success"),
  DELETE_QUESTION: type("[QuestionSet] Delete Question"),
  DELETE_QUESTION_SUCCESS: type("[QuestionSet] Delete Question Success"),
  UPDATE: type("[QuestionSet] Update"),
  UPDATE_SUCCESS: type("[QuestionSet] Update Success"),
  UPDATE_ERROR: type("[QuestionSet] Update Error"),
  DELETE: type("[QuestionSet] Delete"),
  DELETE_SUCCESS: type("[QuestionSet] Delete Success"),
  REGISTER_SESSION: type("[QuestionSet] Register Session"),
  GET_SESSION_DETAILS: type("[QuestionSet] Get Session Details"),
  GET_SESSION_DETAILS_SUCCESS: type("[QuestionSet] Get Session Details Success"),
  IMPORT_QUESTIONS: type('[QuestionSet] Import Questions'),
  IMPORT_QUESTIONS_SUCCESS: type('[QuestionSet] Import Questions Success'),
  IMPORT_QUESTIONS_ERROR: type('[QuestionSet] Import Questions Error'),
  EXPORT_QUESTIONS: type('[QuestionSet] Export Questions')
};

export class SearchAction implements Action {
  type = ActionTypes.SEARCH_INPUT;

  constructor(public payload: string) {}
}

export class FilterAction implements Action {
  type = ActionTypes.FILTER;
  constructor(public payload) {}
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor() {}
}

export class LoadActionSuccess implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: QuestionSet[]) {}
}

export class LoadActionError implements Action {
  type = ActionTypes.LOAD_ERROR;

  constructor(public payload) {}
}

export class GetCurrentQSAction implements Action {
  type = ActionTypes.GET_CURRENT_QUESTION_SET;

  constructor(public payload: string) {}
}

export class GetCurrentQSActionSuccess implements Action {
  type = ActionTypes.GET_CURRENT_QUESTION_SET_SUCCESS;

  constructor(public payload: QuestionSet) {}
}

export class GetCurrentQSActionError implements Action {
  type = ActionTypes.GET_CURRENT_QUESTION_SET_ERROR;

  constructor(public payload) {}
}

export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload: IQuestionSet) {}
}

export class CreateActionSuccess implements Action {
  type = ActionTypes.CREATE_SUCCESS;

  constructor(public payload) {}
}

export class AddQuestionAction implements Action {
  type = ActionTypes.ADD_QUESTION;

  constructor(public payload) {}
}

export class AddQuestionActionSuccess implements Action {
  type = ActionTypes.ADD_QUESTION_SUCCESS;

  constructor(public payload) {}
}

export class EditQuestionAction implements Action {
  type = ActionTypes.EDIT_QUESTION;

  constructor(public payload) {}
}

export class EditQuestionActionSuccess implements Action {
  type = ActionTypes.EDIT_QUESTION_SUCCESS;

  constructor(public payload) {}
}

export class DeleteQuestionAction implements Action {
  type = ActionTypes.DELETE_QUESTION;

  constructor(public payload) {}
}

export class DeleteQuestionActionSuccess implements Action {
  type = ActionTypes.DELETE_QUESTION_SUCCESS;

  constructor(public payload) {}
}

export class CreateActionError implements Action {
  type = ActionTypes.CREATE_ERROR;

  constructor(public payload) {}
}

export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: QuestionSet) {}
}

export class UpdateActionSuccess implements Action {
  type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: QuestionSet) {}
}

export class UpdateActionError implements Action {
  type = ActionTypes.UPDATE_ERROR;

  constructor(public payload: QuestionSet) {}
}

export class DeleteAction implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: number) {}
}

export class DeleteActionSuccess implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload?: any) {}
}

export class RegisterSessionAction implements Action {
  type = ActionTypes.REGISTER_SESSION;
  constructor(public payload: number) {}
}

export class GetSessionDetailsAction implements Action {
  type = ActionTypes.GET_SESSION_DETAILS;
  constructor(public payload: number) {}
}

export class GetSessionDetailsActionSuccess implements Action {
  type = ActionTypes.GET_SESSION_DETAILS_SUCCESS;
  constructor(public payload) {}
}

export class ImportQuestionsAction implements Action {
  type = ActionTypes.IMPORT_QUESTIONS;
  constructor(public payload) {}
}

export class ImportQuestionsActionSuccess implements Action {
  type = ActionTypes.IMPORT_QUESTIONS_SUCCESS;
  constructor(public payload) {}
}

export class ImportQuestionsActionError implements Action {
  type = ActionTypes.IMPORT_QUESTIONS_ERROR;
  constructor(public payload) {}
}

export class ExportQuestionsAction implements Action {
  type = ActionTypes.EXPORT_QUESTIONS;
  constructor(public payload) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | SearchAction
  | FilterAction
  | LoadAction
  | LoadActionSuccess
  | LoadActionError
  | GetCurrentQSAction
  | GetCurrentQSActionSuccess
  | GetCurrentQSActionError
  | CreateAction
  | CreateActionSuccess
  | CreateActionError
  | AddQuestionAction
  | AddQuestionActionSuccess
  | EditQuestionAction
  | EditQuestionActionSuccess
  | DeleteQuestionAction
  | DeleteQuestionActionSuccess
  | UpdateAction
  | DeleteAction
  | DeleteActionSuccess
  | RegisterSessionAction
  | GetSessionDetailsAction
  | GetSessionDetailsActionSuccess
  | ImportQuestionsAction
  | ImportQuestionsActionSuccess
  | ImportQuestionsActionError
  | ExportQuestionsAction;
