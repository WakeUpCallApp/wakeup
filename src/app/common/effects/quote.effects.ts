import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as reducers from "../reducers";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import AppConstants from "../app-constants";

import * as quoteActions from "../actions/quote.actions";
import {
  QuoteService,
  FileParsingService,
  NotificationService
} from "../services";

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
    .map(result => new quoteActions.GetByIdActionSuccess(result))
    .catch(error => Observable.of(new quoteActions.GetByIdActionError(error)));

  @Effect({ dispatch: false })
  httpErrors$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_BY_ID_ERROR)
    .map(action => action.payload)
    .map(error => {
      if (error.status === AppConstants.errorCode.NotFound) {
        this.notificationService.notifyError("Quote not found");
      }
      this.router.navigate([AppConstants.routes.TOPICS]);
      return Observable.of(error);
    });

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
    .map(result => {
      this.notificationService.notifySuccess("Quote successfully created");
      return new quoteActions.CreateActionSuccess(result);
    })
    .catch(error => {
      this.notificationService.notifyError("Quote could not be created");
      return Observable.of(new quoteActions.CreateActionError(error));
    });

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$
    .ofType(quoteActions.ActionTypes.CREATE_SUCCESS)
    .map(action => action.payload)
    .map(quote => {
      this.router.navigate([AppConstants.routes.QUOTE_DETAILS, quote.id]);
    });

  @Effect()
  delete$ = this.actions$
    .ofType(quoteActions.ActionTypes.DELETE)
    .map(action => action.payload)
    .switchMap(quoteId => this.quoteService.delete(quoteId))
    .map(result => {
      this.notificationService.notifySuccess("Quote successfully deleted");
      return new quoteActions.DeleteActionSuccess(result);
    })
    .catch(error => {
      this.notificationService.notifyError("Quote could not be deleted");
      return Observable.of(new quoteActions.DeleteActionError(error));
    });

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(quoteActions.ActionTypes.DELETE_SUCCESS)
    .map(action => action.payload)
    .map(({ topic }) => {
      this.router.navigate([AppConstants.routes.QUOTES, topic.id]);
    });

  @Effect()
  getComments$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_COMMENTS)
    .map(action => action.payload)
    .switchMap(quoteId => this.quoteService.getComments(quoteId))
    .map(result => new quoteActions.GetCommentsActionSuccess(result));

  @Effect()
  create_comment$ = this.actions$
    .ofType(quoteActions.ActionTypes.CREATE_COMMENT)
    .map(action => action.payload)
    .switchMap(comment => this.quoteService.addComment(comment))
    .map(result => {
      this.notificationService.notifySuccess("Comment successfully created");
      return new quoteActions.CreateCommentActionSuccess(result);
    })
    .catch(error => {
      this.notificationService.notifyError("Comment could not be created");
      return Observable.of(new quoteActions.CreateCommentActionError(error));
    });

  @Effect()
  delete_comment$ = this.actions$
    .ofType(quoteActions.ActionTypes.DELETE_COMMENT)
    .map(action => action.payload)
    .switchMap(comment => this.quoteService.deleteComment(comment))
    .map(result => {
      this.notificationService.notifySuccess("Comment successfully deleted");
      return new quoteActions.DeleteCommentActionSuccess(result);
    })
    .catch(error => {
      this.notificationService.notifyError("Comment could not be deleted");
      return Observable.of(new quoteActions.DeleteCommentActionError(error));
    });

  @Effect()
  updateS$ = this.actions$
    .ofType(quoteActions.ActionTypes.UPDATE)
    .map(action => action.payload)
    .switchMap(quote =>
      this.quoteService
        .update(quote)
        .map(result => {
          this.notificationService.notifySuccess("Quote successfully updated");
          return new quoteActions.UpdateActionSuccess(result);
        })
        .catch(error => {
          this.notificationService.notifyError("Quote could not be updated");
          return Observable.of(new quoteActions.UpdateActionError(error));
        })
    );

  @Effect({ dispatch: false })
  importQuotes$ = this.actions$
    .ofType(quoteActions.ActionTypes.IMPORT_QUOTES)
    .map(action => action.payload)
    .map(data => {
      this.fileParsing.parseCVS(
        data.quotes[0],
        results => {
          this.quoteService.importQuotes(data.topicId, results.data).subscribe(
            result => {
              this.notificationService.notifySuccess(
                "Quotes successfully imported"
              );
              return this.store.dispatch(
                new quoteActions.ImportQuotesActionSuccess(result)
              );
            },
            error => {
              this.notificationService.notifyError("Could not import quotes");
              return this.store.dispatch(
                new quoteActions.ImportQuotesActionError(error)
              );
            }
          );
        },
        true
      );
    });

  @Effect({ dispatch: false })
  exportQuotes$ = this.actions$
    .ofType(quoteActions.ActionTypes.EXPORT_QUOTES)
    .map(action => action.payload)
    .map(data => {
      this.fileParsing.downloadCSV(
        this.fileParsing.unparseCVS(data.quotes, true),
        data.topicName
      );
    });

  constructor(
    private quoteService: QuoteService,
    private fileParsing: FileParsingService,
    private notificationService: NotificationService,
    private actions$: Actions,
    private router: Router,
    private store: Store<reducers.State>
  ) {}
}
