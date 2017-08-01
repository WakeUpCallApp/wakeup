import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import AppConstants from "../app-constants";

import * as quoteActions from "../actions/quote.actions";
import { QuoteService } from "../services/quote.service";

@Injectable()
export class QuoteEffects {
  @Effect()
  load$ = this.actions$
    .ofType(quoteActions.ActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap(() => this.quoteService.all())
    .map(result => new quoteActions.LoadActionSuccess(result));

  @Effect()
  getByTopic$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_BY_TOPIC_ID)
    .map(action => action.payload)
    .switchMap(topicId => this.quoteService.get(topicId))
    .map(result => new quoteActions.GetByTopicIdActionSuccess(result));

  @Effect()
  getById$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_BY_ID)
    .map(action => action.payload)
    .switchMap(quoteId => this.quoteService.getById(quoteId))
    .map(result => new quoteActions.GetByIdActionSuccess(result));

  @Effect()
  getSuggestions$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_SUGGESTIONS)
    .switchMap(() => this.quoteService.getSuggestions())
    .map(result => new quoteActions.GetSuggestionsActionSuccess(result));

  @Effect()
  create$ = this.actions$
    .ofType(quoteActions.ActionTypes.CREATE)
    .map(action => action.payload)
    .switchMap(quote => this.quoteService.create(quote))
    .map(result => new quoteActions.CreateActionSuccess(result))
    .catch(error => Observable.of(new quoteActions.CreateActionError(error)));

  @Effect()
  updateS$ = this.actions$
    .ofType(quoteActions.ActionTypes.UPDATE)
    .map(action => action.payload)
    .switchMap(quote =>
      this.quoteService
        .update(quote)
        .map(result => new quoteActions.UpdateActionSuccess(result))
        .catch(error => Observable.of(new quoteActions.UpdateActionError(error)))
    );

  constructor(private quoteService: QuoteService, private actions$: Actions) {}
}
