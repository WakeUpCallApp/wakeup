import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import AppConstants from "../app-constants";

import * as answer from "../actions/answer.actions";
import { AnswerService, NotificationService } from "../services";

@Injectable()
export class AnswerEffects {
  @Effect()
  load$ = this.actions$
    .ofType(answer.ActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap(questionId => this.answerService.all(questionId))
    .map(result => new answer.LoadActionSuccess(result));

  @Effect()
  create$ = this.actions$
    .ofType(answer.ActionTypes.CREATE)
    .map(action => action.payload)
    .switchMap(answer => this.answerService.create(answer))
    .map(result => {
      this.notificationService.notifySuccess("Answer successfully created");
      return new answer.CreateActionSuccess(result);
    })
    .catch(error => {
      this.notificationService.notifyError("Answer could not be created");
      return Observable.of(new answer.CreateActionError(error));
    });

  @Effect()
  update$ = this.actions$
    .ofType(answer.ActionTypes.UPDATE)
    .map(action => action.payload)
    .switchMap(answer => this.answerService.update(answer))
    .map(result => {
      this.notificationService.notifySuccess("Answer successfully updated");
      return new answer.UpdateActionSuccess(result);
    })
    .catch(error => {
      this.notificationService.notifyError(
        "Answer could not be successfully updated"
      );
      return Observable.of(new answer.UpdateActionError(error));
    });

  @Effect()
  delete$ = this.actions$
    .ofType(answer.ActionTypes.DELETE)
    .map(action => action.payload)
    .switchMap(answer => this.answerService.delete(answer))
    .map(answerId => {
      this.notificationService.notifySuccess("Answer successfully deleted");
      return new answer.DeleteActionSuccess(answerId);
    });

  @Effect()
  deleteAll$ = this.actions$
    .ofType(answer.ActionTypes.DELETE_ALL)
    .map(action => action.payload)
    .switchMap(questionId => this.answerService.deleteAll(questionId))
    .map(questionId => {
      this.notificationService.notifySuccess("Answers successfully deleted");
      return new answer.DeleteAllActionSuccess(questionId);
    });

  @Effect({ dispatch: false })
  invalidateCache = this.actions$
    .ofType(
      answer.ActionTypes.CREATE_SUCCESS,
      answer.ActionTypes.UPDATE_SUCCESS,
      answer.ActionTypes.DELETE_SUCCESS,
      answer.ActionTypes.DELETE_ALL_SUCCESS
    )
    .map(() => {
      console.log("clear cache");
      this.answerService.clearCache();
    });

  constructor(
    private answerService: AnswerService,
    private notificationService: NotificationService,
    private actions$: Actions,
    private router: Router
  ) {}
}
