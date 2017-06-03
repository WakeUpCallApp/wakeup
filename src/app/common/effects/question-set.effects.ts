import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import * as questionSet from '../actions/question-set.actions';
import { QuestionSetService } from '../services/question-set.service';

@Injectable()
export class QuestionSetEffects {
  @Effect() load$ = this.actions$
    .ofType(questionSet.ActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap(user => this.questionSetService.all())
    .map(result => new questionSet.LoadActionSuccess(result))
  ;
  constructor(
    private questionSetService: QuestionSetService,
    private actions$: Actions
  ) { }
}
