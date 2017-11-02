/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import AppConstants from '../../app-constants';
import { AnswersIndexedDbApi } from '../../services/api/answer-indexeddb.api';
import { NotificationService } from '../../services/notification.service';
import * as answerActions from './answer.actions';

@Injectable()
export class AnswerEffectsIndexedDB {
  constructor(
    private answerService: AnswersIndexedDbApi,
    private notificationService: NotificationService,
    private actions$: Actions,
    private router: Router
  ) { }

  @Effect()
  openIndexedDb$ = this.actions$
    .ofType(answerActions.ActionTypes.OPEN_INDEXED_DB)
    .pipe(
    map((action: any) => action.payload),
    switchMap(() => this.answerService.openIndexedDb()
      .pipe(
      map(result => new answerActions.OpenIndexedDbActionSuccess()),
      catchError(error => {
        return of(new answerActions.OpenIndexedDbActionError(error));
      }))));

  @Effect()
  load$ = this.actions$
    .ofType(answerActions.ActionTypes.LOAD)
    .pipe(map((action: any) => action.payload),
    switchMap(questionId => this.answerService.getAnswers(questionId)
      .then(result => new answerActions.LoadActionSuccess(result))));

  @Effect()
  create$ = this.actions$
    .ofType(answerActions.ActionTypes.CREATE)
    .pipe(map((action: any) => action.payload),
    switchMap(answer => this.answerService.saveAnswer(answer)
      .then(result => {
        this.notificationService.notifySuccess('Answer successfully created');
        return new answerActions.CreateActionSuccess(result);
      })
      .catch(error => {
        this.notificationService.notifyError('Answer could not be created');
        return of(new answerActions.CreateActionError(error));
      })));

  @Effect()
  update$ = this.actions$
    .ofType(answerActions.ActionTypes.UPDATE)
    .pipe(
    map((action: any) => action.payload),
    switchMap(answer => this.answerService.updateAnswer(answer)
      .then(result => {
        this.notificationService.notifySuccess('Answer successfully updated');
        return new answerActions.UpdateActionSuccess(result);
      })
      .catch(error => {
        this.notificationService.notifyError(
          'Answer could not be successfully updated'
        );
        return of(new answerActions.UpdateActionError(error));
      })));

  @Effect()
  delete$ = this.actions$
    .ofType(answerActions.ActionTypes.DELETE)
    .pipe(map((action: any) => action.payload),
    switchMap(answer => this.answerService.deleteAnswer(answer).then(answerId => {
      this.notificationService.notifySuccess('Answer successfully deleted');
      return new answerActions.DeleteActionSuccess(answerId);
    })));

  @Effect()
  deleteAll$ = this.actions$
    .ofType(answerActions.ActionTypes.DELETE_ALL)
    .pipe(map((action: any) => action.payload),
    switchMap(({ questionId, userId }) => this.answerService.deleteAllAnswers(questionId, userId)
      .then(() => {
        this.notificationService.notifySuccess('Answers successfully deleted');
        return new answerActions.DeleteAllActionSuccess(questionId);
      })));
}
