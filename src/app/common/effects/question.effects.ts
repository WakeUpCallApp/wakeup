import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import AppConstants from "../app-constants";
import { Router } from "@angular/router";

import * as question from "../actions/question.actions";
import * as questionSet from "../actions/question-set.actions";
import { QuestionService } from "../services/question.service";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class QuestionEffects {
  @Effect()
  load$ = this.actions$
    .ofType(question.ActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap(() => this.questionService.all())
    .map(result => new question.LoadActionSuccess(result));

  @Effect()
  get$ = this.actions$
    .ofType(question.ActionTypes.GET_CURRENT_QUESTION)
    .map(action => action.payload)
    .switchMap(id => this.questionService.get(id))
    .map(result => new question.GetCurrentQuestionSuccess(result))
    .catch(error => Observable.of(new question.GetCurrentQuestionError(error)));

  @Effect({ dispatch: false })
  httpErrors$ = this.actions$
    .ofType(question.ActionTypes.GET_CURRENT_QUESTION_ERROR)
    .map(action => action.payload)
    .map(error => {
      this.notificationService.notifyError("Question not found");
      this.router.navigate([AppConstants.routes.QUESTION_SETS]);
      return Observable.of(error);
    });

  @Effect()
  delete$ = this.actions$
    .ofType(question.ActionTypes.DELETE)
    .map(action => action.payload)
    .switchMap(question => this.questionService.delete(question))
    .map(result => {
      this.notificationService.notifySuccess("Question successfully deleted");
      return new question.DeleteActionSuccess(result);
    });

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(question.ActionTypes.DELETE_SUCCESS)
    .map(action => action.payload)
    .map(({ questionSet }) => {
      this.router.navigate([
        AppConstants.routes.QUESTION_SET_DETAILS,
        questionSet.id
      ]);
    });

  @Effect({ dispatch: false })
  invalidateCache = this.actions$
    .ofType(
      question.ActionTypes.CREATE_SUCCESS,
      question.ActionTypes.DELETE_SUCCESS,
      questionSet.ActionTypes.ADD_QUESTION_SUCCESS,
      questionSet.ActionTypes.DELETE_QUESTION_SUCCESS,
      questionSet.ActionTypes.EDIT_QUESTION_SUCCESS,
      "USER_LOGOUT"
    )
    .map(() => {
      console.log("clear cache");
      this.questionService.clearCache();
    });

  constructor(
    private questionService: QuestionService,
    private notificationService: NotificationService,
    private actions$: Actions,
    private router: Router
  ) {}
}
