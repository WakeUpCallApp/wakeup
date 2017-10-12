import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import AppConstants from '../../app-constants';

import * as topic from './topic.actions';
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
    .ofType(topic.ActionTypes.LOAD)
    .map((action: any) => action.payload)
    .switchMap(() => this.topicApi.all())
    .map(result => new topic.LoadActionSuccess(result));

  @Effect()
  create$ = this.actions$
    .ofType(topic.ActionTypes.CREATE)
    .map((action: any) => action.payload)
    .switchMap(topic => this.topicApi.create(topic))
    .map(result => {
      this.notificationService.notifySuccess('Topic succcessfully created');
      return new topic.CreateActionSuccess(result);
    })
    .catch(error => {
      this.notificationService.notifyError('Topic could not be created');
      return Observable.of(new topic.CreateActionError(error));
    });

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$
    .ofType(topic.ActionTypes.CREATE_SUCCESS)
    .map((action: any) => action.payload)
    .map(topic => {
      this.router.navigate([AppConstants.routes.TOPIC_DETAILS, topic.id]);
      return Observable.of(topic);
    });

  @Effect()
  update$ = this.actions$
    .ofType(topic.ActionTypes.UPDATE)
    .map((action: any) => action.payload)
    .switchMap(topic => this.topicApi.update(topic))
    .map(result => {
      this.notificationService.notifySuccess('Topic successfully updated');
      return new topic.UpdateActionSuccess(result);
    })
    .catch(error => {
      this.notificationService.notifyError('Topic could not be updated');
      return Observable.of(new topic.UpdateActionError(error));
    });

  @Effect()
  delete$ = this.actions$
    .ofType(topic.ActionTypes.DELETE)
    .map((action: any) => action.payload)
    .switchMap(topic => this.topicApi.delete(topic))
    .map(() => {
      this.notificationService.notifySuccess('Topic successfully deleted');
      return new topic.DeleteActionSuccess();
    });

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(topic.ActionTypes.DELETE_SUCCESS)
    .map((action: any) => action.payload)
    .map(() => {
      this.router.navigate([AppConstants.routes.TOPICS]);
    });

  @Effect()
  getCurrentTopic$ = this.actions$
    .ofType(topic.ActionTypes.GET_CURRENT_TOPIC)
    .map((action: any) => action.payload)
    .switchMap(id =>
      this.topicApi.get(id)
        .map(result => new topic.GetCurrentTopicActionSuccess(result))
        .catch(error =>
          Observable.of(new topic.GetCurrentTopicActionError(error))
        )
    );

  @Effect({ dispatch: false })
  httpErrors$ = this.actions$
    .ofType(topic.ActionTypes.GET_CURRENT_TOPIC_ERROR)
    .map((action: any) => action.payload)
    .map(error => {
      if (error.status === AppConstants.errorCode.NotFound) {
        this.notificationService.notifyError('Topic not found');
      }
      this.router.navigate([AppConstants.routes.TOPICS]);
      return Observable.of(error);
    });

  @Effect({ dispatch: false })
  invalidateCache = this.actions$
    .ofType(
    topic.ActionTypes.CREATE_SUCCESS,
    topic.ActionTypes.UPDATE_SUCCESS,
    topic.ActionTypes.DELETE_SUCCESS,
    'USER_LOGOUT'
    )
    .map(() => {
      console.log('clear cache');
      this.topicApi.clearCache();
    });
}
