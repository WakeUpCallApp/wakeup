import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import {
  Router
} from '@angular/router';
import AppConstants from '../app-constants';



import * as questionSet from '../actions/question-set.actions';
import { QuestionSetService } from '../services/question-set.service';

@Injectable()
export class QuestionSetEffects {
  @Effect() load$ = this.actions$
    .ofType(questionSet.ActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap(() => this.questionSetService.all())
    .map(result => new questionSet.LoadActionSuccess(result));

  @Effect() getCurrentQS$ = this.actions$
    .ofType(questionSet.ActionTypes.GET_CURRENT_QUESTION_SET)
    .map(action => action.payload)
    .switchMap((id) => this.questionSetService.get(id)
      .map(result => new questionSet.GetCurrentQSActionSuccess(result))
      .catch(error => Observable.of(new questionSet.GetCurrentQSActionError(error)))
    );

  @Effect({ dispatch: false })
  httpErrors$: Observable<any> = this.actions$
    .ofType(
    questionSet.ActionTypes.GET_CURRENT_QUESTION_SET_ERROR
    ).map(action => action.payload)
    .map(error => {
      this.router.navigate([AppConstants.routes.QUESTION_SETS]);
      return Observable.of(error);
    });

  constructor(
    private questionSetService: QuestionSetService,
    private actions$: Actions,
    private router: Router
  ) { }
}
