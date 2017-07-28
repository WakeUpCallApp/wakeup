import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import AppConstants from "../app-constants";

import * as question from "../actions/question.actions";
import { QuestionService } from "../services/question.service";

@Injectable()
export class QuestionEffects {
  @Effect()
  load$ = this.actions$
    .ofType(question.ActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap(() => this.questionService.all())
    .map(result => new question.LoadActionSuccess(result));

  @Effect()
  get$ = this.actions$
    .ofType(question.ActionTypes.GET_CURRENT_QUESTION)
    .map(action => action.payload)
    .switchMap((id) => this.questionService.get(id))
    .map(result => new question.GetCurrentQuestionSuccess(result));

  constructor(
    private questionService: QuestionService,
    private actions$: Actions
  ) {}
}
