import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import AppConstants from "../app-constants";

import * as quote from "../actions/quote.actions";
import { QuoteService } from "../services/quote.service";

@Injectable()
export class QuoteEffects {
  @Effect()
  load$ = this.actions$
    .ofType(quote.ActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap(() => this.quoteService.all())
    .map(result => new quote.LoadActionSuccess(result));

  @Effect()
  getByTopic$ = this.actions$
    .ofType(quote.ActionTypes.GET_BY_TOPIC_ID)
    .map(action => action.payload)
    .switchMap(topicId => this.quoteService.get(topicId))
    .map(result => new quote.GetByTopicIdActionSuccess(result));

  constructor(private quoteService: QuoteService, private actions$: Actions) {}
}
