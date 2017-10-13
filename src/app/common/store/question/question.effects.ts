/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
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
    .map((action: any) => action.payload)
    .switchMap(() => this.questionApi.all()
      .map(result => new questionActions.LoadActionSuccess(result)));

  @Effect()
  get$ = this.actions$
    .ofType(questionActions.ActionTypes.GET_CURRENT_QUESTION)
    .map((action: any) => action.payload)
    .switchMap(id => this.questionApi.get(id)
      .map(result => new questionActions.GetCurrentQuestionSuccess(result))
      .catch(error => Observable.of(new questionActions.GetCurrentQuestionError(error))));

  @Effect({ dispatch: false })
  httpErrors$ = this.actions$
    .ofType(questionActions.ActionTypes.GET_CURRENT_QUESTION_ERROR)
    .map((action: any) => action.payload)
    .map(error => {
      this.notificationService.notifyError('Question not found');
      this.router.navigate([AppConstants.routes.QUESTION_SETS]);
      return Observable.of(error);
    });

  @Effect()
  delete$ = this.actions$
    .ofType(questionActions.ActionTypes.DELETE)
    .map((action: any) => action.payload)
    .switchMap(question => this.questionApi.delete(question)
      .map(result => {
        this.notificationService.notifySuccess('Question successfully deleted');
        return new questionActions.DeleteActionSuccess(result);
      }));

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(questionActions.ActionTypes.DELETE_SUCCESS)
    .map((action: any) => action.payload)
    .map(({ questionSet }) => {
      this.router.navigate([
        AppConstants.routes.QUESTION_SET_DETAILS,
        questionSet.id
      ]);
    });

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
