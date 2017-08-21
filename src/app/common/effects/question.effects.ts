import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import AppConstants from "../app-constants";
import { Router } from "@angular/router";

import * as question from "../actions/question.actions";
import { QuestionService, NotificationService } from "../services";

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

  constructor(
    private questionService: QuestionService,
    private notificationService: NotificationService,
    private actions$: Actions,
    private router: Router
  ) {}
}
