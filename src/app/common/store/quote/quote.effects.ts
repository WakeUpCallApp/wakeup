/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import * as reducers from '../app.store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
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
    .pipe(
    map((action: any) => action.payload),
    switchMap(() => this.quoteApi.all()
      .pipe(map(result => new quoteActions.LoadActionSuccess(result))))
    );

  @Effect()
  getByTopic$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_BY_TOPIC_ID)
    .pipe(
    map((action: any) => action.payload),
    switchMap(topicId => this.quoteApi.get(topicId)
      .pipe(map(result => new quoteActions.GetByTopicIdActionSuccess(result))))
    );

  @Effect()
  getById$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_BY_ID)
    .pipe(
    map((action: any) => action.payload),
    switchMap(quoteId => this.quoteApi.getById(quoteId)
      .pipe(
      map(result => new quoteActions.GetByIdActionSuccess(result)),
      catchError(error => of(new quoteActions.GetByIdActionError(error)))))
    );

  @Effect({ dispatch: false })
  httpErrors$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_BY_ID_ERROR)
    .pipe(
    map((action: any) => action.payload),
    map(error => {
      if (error.status === AppConstants.errorCode.NotFound) {
        this.notificationService.notifyError('Quote not found');
      }
      this.router.navigate([AppConstants.routes.TOPICS]);
      return of(error);
    }));

  @Effect()
  getSuggestions$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_SUGGESTIONS)
    .pipe(switchMap(() => this.quoteApi.getSuggestions()
      .pipe(map(result => new quoteActions.GetSuggestionsActionSuccess(result)))));

  @Effect()
  create$ = this.actions$
    .ofType(quoteActions.ActionTypes.CREATE)
    .pipe(
    map((action: any) => action.payload),
    switchMap(quote => this.quoteApi.create(quote)
      .pipe(
      map(result => {
        this.notificationService.notifySuccess('Quote successfully created');
        return new quoteActions.CreateActionSuccess(result);
      }),
      catchError(error => {
        this.notificationService.notifyError('Quote could not be created');
        return of(new quoteActions.CreateActionError(error));
      })))
    );

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$
    .ofType(quoteActions.ActionTypes.CREATE_SUCCESS)
    .pipe(
    map((action: any) => action.payload),
    map(quote => {
      this.router.navigate([AppConstants.routes.QUOTE_DETAILS, quote.id, quote.topic]);
    }));

  @Effect()
  delete$ = this.actions$
    .ofType(quoteActions.ActionTypes.DELETE)
    .pipe(
    map((action: any) => action.payload),
    switchMap(quote => this.quoteApi.delete(quote)
      .pipe(
      map(result => {
        this.notificationService.notifySuccess('Quote successfully deleted');
        return new quoteActions.DeleteActionSuccess(result);
      }),
      catchError(error => {
        this.notificationService.notifyError('Quote could not be deleted');
        return of(new quoteActions.DeleteActionError(error));
      })))
    );

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(quoteActions.ActionTypes.DELETE_SUCCESS)
    .pipe(
    map((action: any) => action.payload),
    map(({ topic }) => {
      this.router.navigate([AppConstants.routes.QUOTES, topic.id ? topic.id : topic]);
    }));

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
    .pipe(map(() => {
      console.log('clear cache');
      this.quoteApi.clearCache();
    }));

  @Effect()
  getComments$ = this.actions$
    .ofType(quoteActions.ActionTypes.GET_COMMENTS)
    .pipe(
    map((action: any) => action.payload),
    switchMap(quoteId => this.quoteApi.getComments(quoteId)
      .pipe(map(result => new quoteActions.GetCommentsActionSuccess(result))))
    );

  @Effect()
  create_comment$ = this.actions$
    .ofType(quoteActions.ActionTypes.CREATE_COMMENT)
    .pipe(
    map((action: any) => action.payload),
    switchMap(comment => this.quoteApi.addComment(comment)
      .pipe(
      map(result => {
        this.notificationService.notifySuccess('Comment successfully created');
        return new quoteActions.CreateCommentActionSuccess(result);
      }),
      catchError(error => {
        this.notificationService.notifyError('Comment could not be created');
        return of(new quoteActions.CreateCommentActionError(error));
      })))
    );

  @Effect()
  delete_comment$ = this.actions$
    .ofType(quoteActions.ActionTypes.DELETE_COMMENT)
    .pipe(
    map((action: any) => action.payload),
    switchMap(comment => this.quoteApi.deleteComment(comment)
      .pipe(
      map(result => {
        this.notificationService.notifySuccess('Comment successfully deleted');
        return new quoteActions.DeleteCommentActionSuccess(result);
      }),
      catchError(error => {
        this.notificationService.notifyError('Comment could not be deleted');
        return of(new quoteActions.DeleteCommentActionError(error));
      })))
    );

  @Effect()
  updateS$ = this.actions$
    .ofType(quoteActions.ActionTypes.UPDATE)
    .pipe(
    map((action: any) => action.payload),
    switchMap(quote =>
      this.quoteApi.update(quote)
        .pipe(
        map(result => {
          this.notificationService.notifySuccess('Quote successfully updated');
          return new quoteActions.UpdateActionSuccess(result);
        }),
        catchError(error => {
          this.notificationService.notifyError('Quote could not be updated');
          return of(new quoteActions.UpdateActionError(error));
        }))
    ));

  @Effect({ dispatch: false })
  importQuotes$ = this.actions$
    .ofType(quoteActions.ActionTypes.IMPORT_QUOTES)
    .pipe(
    map((action: any) => action.payload),
    map(data => {
      this.fileParsing.parseCVS(
        data.quotes[0],
        results => {
          this.quoteApi.importQuotes(data.topicId, results.data).subscribe(
            result => {
              this.notificationService.notifySuccess(
                'Quotes successfully imported'
              );
              return this.store.dispatch(new quoteActions.ImportQuotesActionSuccess(result));
            },
            error => {
              this.notificationService.notifyError('Could not import quotes');
              return this.store.dispatch(new quoteActions.ImportQuotesActionError(error));
            });
        },
        true);
    }));

  @Effect({ dispatch: false })
  exportQuotes$ = this.actions$
    .ofType(quoteActions.ActionTypes.EXPORT_QUOTES)
    .pipe(
    map((action: any) => action.payload),
    map(data => {
      this.fileParsing.downloadCSV(
        this.fileParsing.unparseCVS(data.quotes, true),
        data.topicName
      );
    }));
}
