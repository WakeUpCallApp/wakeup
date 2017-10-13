/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import AppConstants from '../../app-constants';

import * as questionSetActions from './question-set.actions';
import * as loginActions from '../login/login.actions';
import * as reducers from '../app.store';
import { QuestionSetApi } from '../../services/api/question-set.api';
import { QuestionApi } from '../../services/api/question.api';
import { FileParsingService } from '../../services/file-parsing';
import { NotificationService } from '../../services/notification.service';
import { AnswersIndexedDbApi } from 'app/common/services';

@Injectable()
export class QuestionSetEffects {
  constructor(
    private questionSetApi: QuestionSetApi,
    private questionApi: QuestionApi,
    private fileParsing: FileParsingService,
    private notificationService: NotificationService,
    private actions$: Actions,
    private router: Router,
    private store: Store<reducers.AppState>,
    private answerIndexedDbService: AnswersIndexedDbApi
  ) { }
  @Effect()
  load$ = this.actions$
    .ofType(questionSetActions.ActionTypes.LOAD)
    .map((action: any) => action.payload)
    .switchMap(() => this.questionSetApi.all()
      .map(result => new questionSetActions.LoadActionSuccess(result)));

  @Effect()
  create$ = this.actions$
    .ofType(questionSetActions.ActionTypes.CREATE)
    .map((action: any) => action.payload)
    .switchMap(questionSet => this.questionSetApi.create(questionSet).map(result => {
      this.notificationService.notifySuccess(
        'Question Set successfully created'
      );
      return new questionSetActions.CreateActionSuccess(result);
    })
      .catch(error => {
        this.notificationService.notifyError('Question Set could not be created');
        return Observable.of(new questionSetActions.CreateActionError(error));
      }));

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$
    .ofType(questionSetActions.ActionTypes.CREATE_SUCCESS)
    .map((action: any) => action.payload)
    .map(questionSet => {
      this.router.navigate([
        AppConstants.routes.QUESTION_SET_DETAILS,
        questionSet.id
      ]);
      return Observable.of(questionSet);
    });

  @Effect({ dispatch: false })
  importQuestions$ = this.actions$
    .ofType(questionSetActions.ActionTypes.IMPORT_QUESTIONS)
    .map((action: any) => action.payload)
    .map(data => {
      this.fileParsing.parseCVS(data.questions[0], results => {
        this.questionSetApi
          .importQuestions(data.questionSetId, results.data)
          .subscribe(
          result =>
            this.store.dispatch(
              new questionSetActions.ImportQuestionsActionSuccess(result)
            ),
          error =>
            this.store.dispatch(
              new questionSetActions.ImportQuestionsActionError(error)
            )
          );
      });
    });

  @Effect({ dispatch: false })
  exportQuestions$ = this.actions$
    .ofType(questionSetActions.ActionTypes.EXPORT_QUESTIONS)
    .map((action: any) => action.payload)
    .map(data => {
      this.fileParsing.downloadCSV(
        this.fileParsing.unparseCVS(data.questions, false),
        data.questionSetName
      );
    });

  @Effect()
  update$ = this.actions$
    .ofType(questionSetActions.ActionTypes.UPDATE)
    .map((action: any) => action.payload)
    .switchMap(questionSet => this.questionSetApi.update(questionSet)
      .map(result => {
        this.notificationService.notifySuccess(
          'Question Set successfully updated'
        );
        return new questionSetActions.UpdateActionSuccess(result);
      })
      .catch(error => {
        this.notificationService.notifyError('Question Set could not be updated');
        return Observable.of(new questionSetActions.UpdateActionError(error));
      }));

  @Effect()
  delete$ = this.actions$
    .ofType(questionSetActions.ActionTypes.DELETE)
    .map((action: any) => action.payload)
    .switchMap(questionSet => this.questionSetApi.delete(questionSet)
      .map(() => {
        this.notificationService.notifySuccess(
          'Question Set successfully deleted'
        );
        return new questionSetActions.DeleteActionSuccess();
      }));

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(questionSetActions.ActionTypes.DELETE_SUCCESS)
    .map((action: any) => action.payload)
    .map(() => {
      this.router.navigate([AppConstants.routes.QUESTION_SETS]);
    });

  @Effect()
  getCurrentQS$ = this.actions$
    .ofType(questionSetActions.ActionTypes.GET_CURRENT_QUESTION_SET)
    .map((action: any) => action.payload)
    .switchMap(id => this.questionSetApi.get(id)
      .map(result => new questionSetActions.GetCurrentQSActionSuccess(result))
      .catch(error =>
        Observable.of(new questionSetActions.GetCurrentQSActionError(error))
      )
    );

  @Effect()
  addQuestion$ = this.actions$
    .ofType(questionSetActions.ActionTypes.ADD_QUESTION)
    .map((action: any) => action.payload)
    .switchMap(question => this.questionApi.create(question)
      .map(result => {
        this.notificationService.notifySuccess('Question successfully added');
        return new questionSetActions.AddQuestionActionSuccess(result);
      }));

  @Effect()
  updateQuestion$ = this.actions$
    .ofType(questionSetActions.ActionTypes.EDIT_QUESTION)
    .map((action: any) => action.payload)
    .switchMap(question => this.questionApi.update(question)
      .map(result => {
        this.notificationService.notifySuccess('Question successfully updated');
        return new questionSetActions.EditQuestionActionSuccess(result);
      }));

  @Effect()
  deleteQuestion$ = this.actions$
    .ofType(questionSetActions.ActionTypes.DELETE_QUESTION)
    .map((action: any) => action.payload)
    .flatMap(question => this.questionApi.delete(question)
      .map(result => {
        this.notificationService.notifySuccess('Question successfully deleted');
        return new questionSetActions.DeleteQuestionActionSuccess(result);
      }));

  @Effect({ dispatch: false })
  invalidateCache = this.actions$
    .ofType(
    questionSetActions.ActionTypes.CREATE_SUCCESS,
    questionSetActions.ActionTypes.UPDATE_SUCCESS,
    questionSetActions.ActionTypes.DELETE_SUCCESS,
    questionSetActions.ActionTypes.ADD_QUESTION_SUCCESS,
    questionSetActions.ActionTypes.EDIT_QUESTION_SUCCESS,
    questionSetActions.ActionTypes.DELETE_QUESTION_SUCCESS,
    questionSetActions.ActionTypes.REGISTER_SESSION_SUCCESS,
    loginActions.ActionTypes.LOGOUT
    )
    .map(() => {
      console.log('clear cache');
      this.questionSetApi.clearCache();
    });

  @Effect({ dispatch: false })
  httpErrors$ = this.actions$
    .ofType(questionSetActions.ActionTypes.GET_CURRENT_QUESTION_SET_ERROR)
    .map((action: any) => action.payload)
    .map(error => {
      this.notificationService.notifyError('Question Set not found');
      this.router.navigate([AppConstants.routes.QUESTION_SETS]);
      return Observable.of(error);
    });

  @Effect()
  registerSession$ = this.actions$
    .ofType(questionSetActions.ActionTypes.REGISTER_SESSION)
    .map((action: any) => action.payload)
    .switchMap(questionSetId => this.questionSetApi.registerSession(questionSetId)
      .map((questionSet) => {
        this.notificationService.notifySuccess('Practice session ended successfully');
        return new questionSetActions.RegisterSessionSuccessAction(questionSet);
      }));

  @Effect()
  getSessionDetails$ = this.actions$
    .ofType(questionSetActions.ActionTypes.GET_SESSION_DETAILS)
    .map((action: any) => action.payload)
    .switchMap(questionSetId =>
      this.answerIndexedDbService.getSessionDetailsData(questionSetId)
    )
    .flatMap(promises => Observable.forkJoin(...promises))
    .map(data => new questionSetActions.GetSessionDetailsActionSuccess(data));
}
