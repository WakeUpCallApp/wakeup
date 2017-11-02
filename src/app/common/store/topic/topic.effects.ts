/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import AppConstants from '../../app-constants';

import * as loginActions from '../login/login.actions';
import * as topicActions from './topic.actions';
import { TopicApi } from '../../services/api/topic.api';
import { NotificationService } from '../../services/notification.service';

@Injectable()
export class TopicEffects {
  constructor(
    private topicApi: TopicApi,
    private notificationService: NotificationService,
    private actions$: Actions,
    private router: Router
  ) { }

  @Effect()
  load$ = this.actions$
    .ofType(topicActions.ActionTypes.LOAD)
    .pipe(
    map((action: any) => action.payload),
    switchMap(() => this.topicApi.all()
      .pipe(
      map(result => new topicActions.LoadActionSuccess(result))
      )
    )
    );

  @Effect()
  create$ = this.actions$
    .ofType(topicActions.ActionTypes.CREATE)
    .pipe(
    map((action: any) => action.payload),
    switchMap(topic => this.topicApi.create(topic)
      .pipe(
      map(result => {
        this.notificationService.notifySuccess('Topic succcessfully created');
        return new topicActions.CreateActionSuccess(result);
      }),
      catchError(error => {
        this.notificationService.notifyError('Topic could not be created');
        return of(new topicActions.CreateActionError(error));
      }))));

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$
    .ofType(topicActions.ActionTypes.CREATE_SUCCESS)
    .pipe(
    map((action: any) => action.payload),
    map(topic => {
      this.router.navigate([AppConstants.routes.TOPIC_DETAILS, topic.id]);
      return of(topic);
    }));

  @Effect()
  update$ = this.actions$
    .ofType(topicActions.ActionTypes.UPDATE)
    .pipe(
    map((action: any) => action.payload),
    switchMap(topic => this.topicApi.update(topic)
      .pipe(map(result => {
        this.notificationService.notifySuccess('Topic successfully updated');
        return new topicActions.UpdateActionSuccess(result);
      }),
      catchError(error => {
        this.notificationService.notifyError('Topic could not be updated');
        return of(new topicActions.UpdateActionError(error));
      }))
    )
    );

  @Effect()
  delete$ = this.actions$
    .ofType(topicActions.ActionTypes.DELETE)
    .pipe(
    map((action: any) => action.payload),
    switchMap(topic => this.topicApi.delete(topic)
      .pipe(map(() => {
        this.notificationService.notifySuccess('Topic successfully deleted');
        return new topicActions.DeleteActionSuccess();
      })))
    );

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(topicActions.ActionTypes.DELETE_SUCCESS)
    .pipe(
    map((action: any) => action.payload),
    map(() => {
      this.router.navigate([AppConstants.routes.TOPICS]);
    }));

  @Effect()
  getCurrentTopic$ = this.actions$
    .ofType(topicActions.ActionTypes.GET_CURRENT_TOPIC)
    .pipe(
    map((action: any) => action.payload),
    switchMap(id =>
      this.topicApi.get(id)
        .pipe(
        map(result => new topicActions.GetCurrentTopicActionSuccess(result)),
        catchError(error =>
          of(new topicActions.GetCurrentTopicActionError(error))
        )
        )
    )
    );

  @Effect({ dispatch: false })
  httpErrors$ = this.actions$
    .ofType(topicActions.ActionTypes.GET_CURRENT_TOPIC_ERROR)
    .pipe(
    map((action: any) => action.payload),
    map(error => {
      if (error.status === AppConstants.errorCode.NotFound) {
        this.notificationService.notifyError('Topic not found');
      }
      this.router.navigate([AppConstants.routes.TOPICS]);
      return of(error);
    }));

  @Effect({ dispatch: false })
  invalidateCache = this.actions$
    .ofType(
    topicActions.ActionTypes.CREATE_SUCCESS,
    topicActions.ActionTypes.UPDATE_SUCCESS,
    topicActions.ActionTypes.DELETE_SUCCESS,
    loginActions.ActionTypes.LOGOUT
    )
    .pipe(map(() => {
      console.log('clear cache');
      this.topicApi.clearCache();
    }));
}
