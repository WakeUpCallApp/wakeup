import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import AppConstants from '../app-constants';

import * as quote from '../actions/quote.actions';
import { QuoteService } from '../services/quote.service';

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

  @Effect()
  getById$ = this.actions$
    .ofType(quote.ActionTypes.GET_BY_ID)
    .map(action => action.payload)
    .switchMap(quoteId => this.quoteService.getById(quoteId))
    .map(result => new quote.GetByIdActionSuccess(result));

  @Effect()
  getSuggestions$ = this.actions$
    .ofType(quote.ActionTypes.GET_SUGGESTIONS)
    .switchMap(() => this.quoteService.getSuggestions())
    .map(result => new quote.GetSuggestionsActionSuccess(result));

  @Effect()
  create$ = this.actions$
    .ofType(quote.ActionTypes.CREATE)
    .map(action => action.payload)
    .switchMap(quote => this.quoteService.create(quote))
    .map(result => new quote.CreateActionSuccess(result))
    .catch(error => Observable.of(new quote.CreateActionError(error)));

  constructor(private quoteService: QuoteService, private actions$: Actions) {}
}
