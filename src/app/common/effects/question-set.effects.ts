import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import AppConstants from "../app-constants";

import * as questionSet from "../actions/question-set.actions";
import { QuestionSetService, QuestionService } from "../services";

@Injectable()
export class QuestionSetEffects {
  @Effect()
  load$ = this.actions$
    .ofType(questionSet.ActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap(() => this.questionSetService.all())
    .map(result => new questionSet.LoadActionSuccess(result));

  @Effect()
  create$ = this.actions$
    .ofType(questionSet.ActionTypes.CREATE)
    .map(action => action.payload)
    .switchMap(questionSet => this.questionSetService.create(questionSet))
    .map(result => new questionSet.CreateActionSuccess(result))
    .catch(error => Observable.of(new questionSet.CreateActionError(error)));

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$
    .ofType(questionSet.ActionTypes.CREATE_SUCCESS)
    .map(action => action.payload)
    .map(questionSet => {
      this.router.navigate([
        AppConstants.routes.QUESTION_SET_DETAILS,
        questionSet.id
      ]);
      return Observable.of(questionSet);
    });

  @Effect()
  update$ = this.actions$
    .ofType(questionSet.ActionTypes.UPDATE)
    .map(action => action.payload)
    .switchMap(questionSet => this.questionSetService.update(questionSet))
    .map(result => new questionSet.UpdateActionSuccess(result))
    .catch(error => Observable.of(new questionSet.UpdateActionError(error)));

  @Effect()
  delete$ = this.actions$
    .ofType(questionSet.ActionTypes.DELETE)
    .map(action => action.payload)
    .switchMap(questionSet => this.questionSetService.delete(questionSet))
    .map(() => new questionSet.DeleteActionSuccess());

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(questionSet.ActionTypes.DELETE_SUCCESS)
    .map(action => action.payload)
    .map(() => {
      this.router.navigate([AppConstants.routes.QUESTION_SETS]);
    });

  @Effect()
  getCurrentQS$ = this.actions$
    .ofType(questionSet.ActionTypes.GET_CURRENT_QUESTION_SET)
    .map(action => action.payload)
    .switchMap(id =>
      this.questionSetService
        .get(id)
        .map(result => new questionSet.GetCurrentQSActionSuccess(result))
        .catch(error =>
          Observable.of(new questionSet.GetCurrentQSActionError(error))
        )
    );

  @Effect()
  addQuestion$ = this.actions$
    .ofType(questionSet.ActionTypes.ADD_QUESTION)
    .map(action => action.payload)
    .switchMap(question => this.questionService.create(question))
    .map(result => new questionSet.AddQuestionActionSuccess(result));

  @Effect()
  questionHandling$ = this.actions$
    .ofType(questionSet.ActionTypes.EDIT_QUESTION)
    .map(action => action.payload)
    .switchMap(question => this.questionService.update(question))
    .map(result => new questionSet.EditQuestionActionSuccess(result));

  @Effect()
  deleteQuestion$ = this.actions$
    .ofType(questionSet.ActionTypes.DELETE_QUESTION)
    .map(action => action.payload)
    .flatMap(question => this.questionService.delete(question))
    .map(result => new questionSet.DeleteQuestionActionSuccess(result));

  @Effect({ dispatch: false })
  httpErrors$ = this.actions$
    .ofType(questionSet.ActionTypes.GET_CURRENT_QUESTION_SET_ERROR)
    .map(action => action.payload)
    .map(error => {
      this.router.navigate([AppConstants.routes.QUESTION_SETS]);
      return Observable.of(error);
    });

  @Effect({ dispatch: false })
  registerSession$ = this.actions$
    .ofType(questionSet.ActionTypes.REGISTER_SESSION)
    .map(action => action.payload)
    .switchMap(questionSetId =>
      this.questionSetService.registerSession(questionSetId)
    );

  constructor(
    private questionSetService: QuestionSetService,
    private questionService: QuestionService,
    private actions$: Actions,
    private router: Router
  ) {}
}
