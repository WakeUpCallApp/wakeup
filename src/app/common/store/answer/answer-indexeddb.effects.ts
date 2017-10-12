import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import AppConstants from '../../app-constants';
import { AnswersIndexedDbApi } from '../../services/api/answer-indexeddb.api';
import { NotificationService } from '../../services/notification.service';
import * as answer from './answer.actions';

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
    .ofType(answer.ActionTypes.OPEN_INDEXED_DB)
    .map((action: any) => action.payload)
    .switchMap(questionId => this.answerService.openIndexedDb())
    .map(result => new answer.OpenIndexedDbActionSuccess())
    .catch(error => {
      return Observable.of(new answer.OpenIndexedDbActionError(error));
    }); ;

  @Effect()
  load$ = this.actions$
    .ofType(answer.ActionTypes.LOAD)
    .map((action: any) => action.payload)
    .switchMap(questionId => this.answerService.getAnswers(questionId))
    .map(result => new answer.LoadActionSuccess(result));

  @Effect()
  create$ = this.actions$
    .ofType(answer.ActionTypes.CREATE)
    .map((action: any) => action.payload)
    .switchMap(answer => this.answerService.saveAnswer(answer))
    .map(result => {
      this.notificationService.notifySuccess('Answer successfully created');
      return new answer.CreateActionSuccess(result);
    })
    .catch(error => {
      this.notificationService.notifyError('Answer could not be created');
      return Observable.of(new answer.CreateActionError(error));
    });

  @Effect()
  update$ = this.actions$
    .ofType(answer.ActionTypes.UPDATE)
    .map((action: any) => action.payload)
    .switchMap(answer => this.answerService.updateAnswer(answer))
    .map(result => {
      this.notificationService.notifySuccess('Answer successfully updated');
      return new answer.UpdateActionSuccess(result);
    })
    .catch(error => {
      this.notificationService.notifyError(
        'Answer could not be successfully updated'
      );
      return Observable.of(new answer.UpdateActionError(error));
    });

  @Effect()
  delete$ = this.actions$
    .ofType(answer.ActionTypes.DELETE)
    .map((action: any) => action.payload)
    .switchMap(answer => this.answerService.deleteAnswer(answer))
    .map(answerId => {
      this.notificationService.notifySuccess('Answer successfully deleted');
      return new answer.DeleteActionSuccess(answerId);
    });

  @Effect()
  deleteAll$ = this.actions$
    .ofType(answer.ActionTypes.DELETE_ALL)
    .map((action: any) => action.payload)
    .switchMap(({ questionId, userId }) => this.answerService.deleteAllAnswers(questionId, userId))
    .map(questionId => {
      this.notificationService.notifySuccess('Answers successfully deleted');
      return new answer.DeleteAllActionSuccess(questionId);
    });
}
