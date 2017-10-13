/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
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
    .map((action: any) => action.payload)
    .switchMap(() => this.answerService.openIndexedDb()
      .map(result => new answerActions.OpenIndexedDbActionSuccess())
      .catch(error => {
        return Observable.of(new answerActions.OpenIndexedDbActionError(error));
      })); ;

  @Effect()
  load$ = this.actions$
    .ofType(answerActions.ActionTypes.LOAD)
    .map((action: any) => action.payload)
    .switchMap(questionId => this.answerService.getAnswers(questionId)
      .then(result => new answerActions.LoadActionSuccess(result)));

  @Effect()
  create$ = this.actions$
    .ofType(answerActions.ActionTypes.CREATE)
    .map((action: any) => action.payload)
    .switchMap(answer => this.answerService.saveAnswer(answer)
      .then(result => {
        this.notificationService.notifySuccess('Answer successfully created');
        return new answerActions.CreateActionSuccess(result);
      })
      .catch(error => {
        this.notificationService.notifyError('Answer could not be created');
        return Observable.of(new answerActions.CreateActionError(error));
      }));

  @Effect()
  update$ = this.actions$
    .ofType(answerActions.ActionTypes.UPDATE)
    .map((action: any) => action.payload)
    .switchMap(answer => this.answerService.updateAnswer(answer)
      .then(result => {
        this.notificationService.notifySuccess('Answer successfully updated');
        return new answerActions.UpdateActionSuccess(result);
      })
      .catch(error => {
        this.notificationService.notifyError(
          'Answer could not be successfully updated'
        );
        return Observable.of(new answerActions.UpdateActionError(error));
      }));

  @Effect()
  delete$ = this.actions$
    .ofType(answerActions.ActionTypes.DELETE)
    .map((action: any) => action.payload)
    .switchMap(answer => this.answerService.deleteAnswer(answer).then(answerId => {
      this.notificationService.notifySuccess('Answer successfully deleted');
      return new answerActions.DeleteActionSuccess(answerId);
    }));

  @Effect()
  deleteAll$ = this.actions$
    .ofType(answerActions.ActionTypes.DELETE_ALL)
    .map((action: any) => action.payload)
    .switchMap(({ questionId, userId }) => this.answerService.deleteAllAnswers(questionId, userId)
      .then(() => {
        this.notificationService.notifySuccess('Answers successfully deleted');
        return new answerActions.DeleteAllActionSuccess(questionId);
      }));
}
