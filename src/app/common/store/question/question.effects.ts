/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import AppConstants from '../../app-constants';
import { Router } from '@angular/router';

import * as questionActions from './question.actions';
import * as questionSetActions from '../question-set/question-set.actions';
import { QuestionApi } from '../../services/api/question.api';
import { NotificationService } from '../../services/notification.service';

@Injectable()
export class QuestionEffects {
  constructor(
    private questionApi: QuestionApi,
    private notificationService: NotificationService,
    private actions$: Actions,
    private router: Router
  ) { }

  @Effect()
  load$ = this.actions$
    .ofType(questionActions.ActionTypes.LOAD)
    .pipe(
    map((action: any) => action.payload),
    switchMap(() => this.questionApi.all()
      .pipe(map(result => new questionActions.LoadActionSuccess(result)))
    )
    );

  @Effect()
  get$ = this.actions$
    .ofType(questionActions.ActionTypes.GET_CURRENT_QUESTION)
    .pipe(map((action: any) => action.payload),
    switchMap(id => this.questionApi.get(id)
      .pipe(
      map(result => new questionActions.GetCurrentQuestionSuccess(result)),
      catchError(error => of(new questionActions.GetCurrentQuestionError(error)))))
    );

  @Effect({ dispatch: false })
  httpErrors$ = this.actions$
    .ofType(questionActions.ActionTypes.GET_CURRENT_QUESTION_ERROR)
    .pipe(
    map((action: any) => action.payload),
    map(error => {
      this.notificationService.notifyError('Question not found');
      this.router.navigate([AppConstants.routes.QUESTION_SETS]);
      return of(error);
    }));

  @Effect()
  delete$ = this.actions$
    .ofType(questionActions.ActionTypes.DELETE)
    .pipe(
    map((action: any) => action.payload),
    switchMap(question => this.questionApi.delete(question)
      .pipe(map(result => {
        this.notificationService.notifySuccess('Question successfully deleted');
        return new questionActions.DeleteActionSuccess(result);
      }))));

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(questionActions.ActionTypes.DELETE_SUCCESS)
    .pipe(
    map((action: any) => action.payload),
    map(({ questionSet }) => {
      this.router.navigate([
        AppConstants.routes.QUESTION_SET_DETAILS,
        questionSet.id
      ]);
    }));

  @Effect({ dispatch: false })
  invalidateCache = this.actions$
    .ofType(
    questionActions.ActionTypes.CREATE_SUCCESS,
    questionActions.ActionTypes.DELETE_SUCCESS,
    questionSetActions.ActionTypes.ADD_QUESTION_SUCCESS,
    questionSetActions.ActionTypes.DELETE_QUESTION_SUCCESS,
    questionSetActions.ActionTypes.EDIT_QUESTION_SUCCESS,
    'USER_LOGOUT'
    )
    .map(() => {
      console.log('clear cache');
      this.questionApi.clearCache();
    });
}
