/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import * as reducers from '../app.store';

import { Observable } from 'rxjs/Observable';
import AppConstants from '../../app-constants';

import * as quoteActions from './quote.actions';
import { QuoteApi } from '../../services/api/quote.api';
import { NotificationService } from '../../services/notification.service';
import { FileParsingService } from '../../services/file-parsing';

@Injectable()
export class QuoteEffects {

  constructor(
    private quoteApi: QuoteApi,
    private fileParsing: FileParsingService,
    private notificationService: NotificationService,
    private actions$: Actions,
    private router: Router,
    private store: Store<reducers.AppState>
  ) { }

  @Effect()
  load$ = this.actions$
    .ofType(quoteActions.ActionTypes.LOAD)
    .map((action: any) => action.payload)
    .switchMap(() => this.quoteApi.all()
      .map(result => new quoteActions.LoadActionSuccess(result)));

  @Effect()
  getByTopic$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_BY_TOPIC_ID)
    .map((action: any) => action.payload)
    .switchMap(topicId => this.quoteApi.get(topicId)
      .map(result => new quoteActions.GetByTopicIdActionSuccess(result)));

  @Effect()
  getById$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_BY_ID)
    .map((action: any) => action.payload)
    .switchMap(quoteId => this.quoteApi.getById(quoteId)
      .map(result => new quoteActions.GetByIdActionSuccess(result))
      .catch(error => Observable.of(new quoteActions.GetByIdActionError(error))));

  @Effect({ dispatch: false })
  httpErrors$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_BY_ID_ERROR)
    .map((action: any) => action.payload)
    .map(error => {
      if (error.status === AppConstants.errorCode.NotFound) {
        this.notificationService.notifyError('Quote not found');
      }
      this.router.navigate([AppConstants.routes.TOPICS]);
      return Observable.of(error);
    });

  @Effect()
  getSuggestions$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_SUGGESTIONS)
    .switchMap(() => this.quoteApi.getSuggestions()
      .map(result => new quoteActions.GetSuggestionsActionSuccess(result)));

  @Effect()
  create$ = this.actions$
    .ofType(quoteActions.ActionTypes.CREATE)
    .map((action: any) => action.payload)
    .switchMap(quote => this.quoteApi.create(quote)
      .map(result => {
        this.notificationService.notifySuccess('Quote successfully created');
        return new quoteActions.CreateActionSuccess(result);
      })
      .catch(error => {
        this.notificationService.notifyError('Quote could not be created');
        return Observable.of(new quoteActions.CreateActionError(error));
      }));

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$
    .ofType(quoteActions.ActionTypes.CREATE_SUCCESS)
    .map((action: any) => action.payload)
    .map(quote => {
      this.router.navigate([AppConstants.routes.QUOTE_DETAILS, quote.id, quote.topic]);
    });

  @Effect()
  delete$ = this.actions$
    .ofType(quoteActions.ActionTypes.DELETE)
    .map((action: any) => action.payload)
    .switchMap(quote => this.quoteApi.delete(quote)
      .map(result => {
        this.notificationService.notifySuccess('Quote successfully deleted');
        return new quoteActions.DeleteActionSuccess(result);
      })
      .catch(error => {
        this.notificationService.notifyError('Quote could not be deleted');
        return Observable.of(new quoteActions.DeleteActionError(error));
      }));

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(quoteActions.ActionTypes.DELETE_SUCCESS)
    .map((action: any) => action.payload)
    .map(({ topic }) => {
      this.router.navigate([AppConstants.routes.QUOTES, topic.id ? topic.id : topic]);
    });

  @Effect({ dispatch: false })
  invalidateCache = this.actions$
    .ofType(
    quoteActions.ActionTypes.CREATE_SUCCESS,
    quoteActions.ActionTypes.UPDATE_SUCCESS,
    quoteActions.ActionTypes.DELETE_SUCCESS,
    quoteActions.ActionTypes.CREATE_COMMENT_SUCCESS,
    quoteActions.ActionTypes.DELETE_COMMENT_SUCCESS,
    'USER_LOGOUT'
    )
    .map(() => {
      console.log('clear cache');
      this.quoteApi.clearCache();
    });

  @Effect()
  getComments$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_COMMENTS)
    .map((action: any) => action.payload)
    .switchMap(quoteId => this.quoteApi.getComments(quoteId)
      .map(result => new quoteActions.GetCommentsActionSuccess(result)));

  @Effect()
  create_comment$ = this.actions$
    .ofType(quoteActions.ActionTypes.CREATE_COMMENT)
    .map((action: any) => action.payload)
    .switchMap(comment => this.quoteApi.addComment(comment)
      .map(result => {
        this.notificationService.notifySuccess('Comment successfully created');
        return new quoteActions.CreateCommentActionSuccess(result);
      })
      .catch(error => {
        this.notificationService.notifyError('Comment could not be created');
        return Observable.of(new quoteActions.CreateCommentActionError(error));
      }));

  @Effect()
  delete_comment$ = this.actions$
    .ofType(quoteActions.ActionTypes.DELETE_COMMENT)
    .map((action: any) => action.payload)
    .switchMap(comment => this.quoteApi.deleteComment(comment)
      .map(result => {
        this.notificationService.notifySuccess('Comment successfully deleted');
        return new quoteActions.DeleteCommentActionSuccess(result);
      })
      .catch(error => {
        this.notificationService.notifyError('Comment could not be deleted');
        return Observable.of(new quoteActions.DeleteCommentActionError(error));
      }));

  @Effect()
  updateS$ = this.actions$
    .ofType(quoteActions.ActionTypes.UPDATE)
    .map((action: any) => action.payload)
    .switchMap(quote =>
      this.quoteApi.update(quote)
        .map(result => {
          this.notificationService.notifySuccess('Quote successfully updated');
          return new quoteActions.UpdateActionSuccess(result);
        })
        .catch(error => {
          this.notificationService.notifyError('Quote could not be updated');
          return Observable.of(new quoteActions.UpdateActionError(error));
        })
    );

  @Effect({ dispatch: false })
  importQuotes$ = this.actions$
    .ofType(quoteActions.ActionTypes.IMPORT_QUOTES)
    .map((action: any) => action.payload)
    .map(data => {
      this.fileParsing.parseCVS(
        data.quotes[0],
        results => {
          this.quoteApi.importQuotes(data.topicId, results.data).subscribe(
            result => {
              this.notificationService.notifySuccess(
                'Quotes successfully imported'
              );
              return this.store.dispatch(
                new quoteActions.ImportQuotesActionSuccess(result)
              );
            },
            error => {
              this.notificationService.notifyError('Could not import quotes');
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
    .map((action: any) => action.payload)
    .map(data => {
      this.fileParsing.downloadCSV(
        this.fileParsing.unparseCVS(data.quotes, true),
        data.topicName
      );
    });
}
