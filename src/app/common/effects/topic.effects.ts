import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import AppConstants from '../app-constants';

import * as topic from '../actions/topic.actions';
import { TopicService } from '../services';

@Injectable()
export class TopicEffects {
  @Effect() load$ = this.actions$
    .ofType(topic.ActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap(() => this.topicService.all())
    .map(result => new topic.LoadActionSuccess(result));

  @Effect() create$ = this.actions$
    .ofType(topic.ActionTypes.CREATE)
    .map(action => action.payload)
    .switchMap(topic => this.topicService.create(topic))
    .map(result => new topic.CreateActionSuccess(result))
    .catch(error => Observable.of(new topic.CreateActionError(error)));

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$
    .ofType(topic.ActionTypes.CREATE_SUCCESS)
    .map(action => action.payload)
    .map(topic => {
      this.router.navigate([
        AppConstants.routes.TOPIC_DETAILS,
        topic.id
      ]);
      return Observable.of(topic);
    });

  @Effect() update$ = this.actions$
    .ofType(topic.ActionTypes.UPDATE)
    .map(action => action.payload)
    .switchMap(topic => this.topicService.update(topic))
    .map(result => new topic.UpdateActionSuccess(result))
    .catch(error => Observable.of(new topic.UpdateActionError(error)));

  @Effect() delete$ = this.actions$
    .ofType(topic.ActionTypes.DELETE)
    .map(action => action.payload)
    .switchMap(topic => this.topicService.delete(topic))
    .map(() => new topic.DeleteActionSuccess());

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(topic.ActionTypes.DELETE_SUCCESS)
    .map(action => action.payload)
    .map(() => {
      this.router.navigate([AppConstants.routes.TOPICS]);
    });

  @Effect() getCurrentTopic$ = this.actions$
    .ofType(topic.ActionTypes.GET_CURRENT_TOPIC)
    .map(action => action.payload)
    .switchMap(id =>
      this.topicService
        .get(id)
        .map(result => new topic.GetCurrentTopicActionSuccess(result))
        .catch(error =>
          Observable.of(new topic.GetCurrentTopicActionError(error))
        )
    );

  @Effect({ dispatch: false })
  httpErrors$ = this.actions$
    .ofType(topic.ActionTypes.GET_CURRENT_TOPIC_ERROR)
    .map(action => action.payload)
    .map(error => {
      this.router.navigate([AppConstants.routes.TOPICS]);
      return Observable.of(error);
    });

  constructor(
    private topicService: TopicService,
    private actions$: Actions,
    private router: Router
  ) {}
}
