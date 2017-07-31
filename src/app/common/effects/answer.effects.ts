import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import AppConstants from '../app-constants';

import * as answer from '../actions/answer.actions';
import { AnswerService} from '../services';

@Injectable()
export class AnswerEffects {
  @Effect() load$ = this.actions$
    .ofType(answer.ActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap((questionId) => this.answerService.all(questionId))
    .map(result => new answer.LoadActionSuccess(result));

  @Effect() create$ = this.actions$
    .ofType(answer.ActionTypes.CREATE)
    .map(action => action.payload)
    .switchMap(answer => this.answerService.create(answer))
    .map(result => new answer.CreateActionSuccess(result))
    .catch(error => Observable.of(new answer.CreateActionError(error)));


  @Effect() update$ = this.actions$
    .ofType(answer.ActionTypes.UPDATE)
    .map(action => action.payload)
    .switchMap(answer => this.answerService.update(answer))
    .map(result => new answer.UpdateActionSuccess(result))
    .catch(error => Observable.of(new answer.UpdateActionError(error)));

  @Effect() delete$ = this.actions$
    .ofType(answer.ActionTypes.DELETE)
    .map(action => action.payload)
    .switchMap(answer => this.answerService.delete(answer))
    .map((answerId) => new answer.DeleteActionSuccess(answerId));

    @Effect() deleteAll$ = this.actions$
    .ofType(answer.ActionTypes.DELETE_ALL)
    .map(action => action.payload)
    .switchMap(questionId => this.answerService.deleteAll(questionId))
    .map((questionId) => new answer.DeleteAllActionSuccess(questionId));

    
  constructor(
    private answerService: AnswerService,
    private actions$: Actions,
    private router: Router
  ) {}
}
