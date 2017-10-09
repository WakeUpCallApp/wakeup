import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import AppConstants from "../app-constants";

import * as questionSet from "../actions/question-set.actions";
import * as reducers from "../reducers";
import { QuestionSetApi } from "../services/api/question-set.api";
import { QuestionApi } from "../services/api/question.api";
import { FileParsingService } from "../services/file-parsing";
import { NotificationService } from "../services/notification.service";
import { AnswersIndexedDbApi } from "app/common/services";

@Injectable()
export class QuestionSetEffects {
  constructor(
    private questionSetApi: QuestionSetApi,
    private questionApi: QuestionApi,
    private fileParsing: FileParsingService,
    private notificationService: NotificationService,
    private actions$: Actions,
    private router: Router,
    private store: Store<reducers.State>,
    private answerIndexedDbService: AnswersIndexedDbApi
  ) { }
  @Effect()
  load$ = this.actions$
    .ofType(questionSet.ActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap(() => this.questionSetApi.all())
    .map(result => new questionSet.LoadActionSuccess(result));

  @Effect()
  create$ = this.actions$
    .ofType(questionSet.ActionTypes.CREATE)
    .map(action => action.payload)
    .switchMap(questionSet => this.questionSetApi.create(questionSet))
    .map(result => {
      this.notificationService.notifySuccess(
        "Question Set successfully created"
      );
      return new questionSet.CreateActionSuccess(result);
    })
    .catch(error => {
      this.notificationService.notifyError("Question Set could not be created");
      return Observable.of(new questionSet.CreateActionError(error));
    });

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$
    .ofType(questionSet.ActionTypes.CREATE_SUCCESS)
    .map(action => action.payload)
    .map(questionSet => {
      this.router.navigate([
        AppConstants.routes.QUESTION_SET_DETAILS,
        questionSet.id
      ]);
      return Observable.of(questionSet);
    });

  @Effect({ dispatch: false })
  importQuestions$ = this.actions$
    .ofType(questionSet.ActionTypes.IMPORT_QUESTIONS)
    .map(action => action.payload)
    .map(data => {
      this.fileParsing.parseCVS(data.questions[0], results => {
        this.questionSetApi
          .importQuestions(data.questionSetId, results.data)
          .subscribe(
          result =>
            this.store.dispatch(
              new questionSet.ImportQuestionsActionSuccess(result)
            ),
          error =>
            this.store.dispatch(
              new questionSet.ImportQuestionsActionError(error)
            )
          );
      });
    });

  @Effect({ dispatch: false })
  exportQuestions$ = this.actions$
    .ofType(questionSet.ActionTypes.EXPORT_QUESTIONS)
    .map(action => action.payload)
    .map(data => {
      this.fileParsing.downloadCSV(
        this.fileParsing.unparseCVS(data.questions, false),
        data.questionSetName
      );
    });

  @Effect()
  update$ = this.actions$
    .ofType(questionSet.ActionTypes.UPDATE)
    .map(action => action.payload)
    .switchMap(questionSet => this.questionSetApi.update(questionSet))
    .map(result => {
      this.notificationService.notifySuccess(
        "Question Set successfully updated"
      );
      return new questionSet.UpdateActionSuccess(result);
    })
    .catch(error => {
      this.notificationService.notifyError("Question Set could not be updated");
      return Observable.of(new questionSet.UpdateActionError(error));
    });

  @Effect()
  delete$ = this.actions$
    .ofType(questionSet.ActionTypes.DELETE)
    .map(action => action.payload)
    .switchMap(questionSet => this.questionSetApi.delete(questionSet))
    .map(() => {
      this.notificationService.notifySuccess(
        "Question Set successfully deleted"
      );
      return new questionSet.DeleteActionSuccess();
    });

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(questionSet.ActionTypes.DELETE_SUCCESS)
    .map(action => action.payload)
    .map(() => {
      this.router.navigate([AppConstants.routes.QUESTION_SETS]);
    });

  @Effect()
  getCurrentQS$ = this.actions$
    .ofType(questionSet.ActionTypes.GET_CURRENT_QUESTION_SET)
    .map(action => action.payload)
    .switchMap(id =>
      this.questionSetApi
        .get(id)
        .map(result => new questionSet.GetCurrentQSActionSuccess(result))
        .catch(error =>
          Observable.of(new questionSet.GetCurrentQSActionError(error))
        )
    );

  @Effect()
  addQuestion$ = this.actions$
    .ofType(questionSet.ActionTypes.ADD_QUESTION)
    .map(action => action.payload)
    .switchMap(question => this.questionApi.create(question))
    .map(result => {
      this.notificationService.notifySuccess("Question successfully added");
      return new questionSet.AddQuestionActionSuccess(result);
    });

  @Effect()
  updateQuestion$ = this.actions$
    .ofType(questionSet.ActionTypes.EDIT_QUESTION)
    .map(action => action.payload)
    .switchMap(question => this.questionApi.update(question))
    .map(result => {
      this.notificationService.notifySuccess("Question successfully updated");
      return new questionSet.EditQuestionActionSuccess(result);
    });

  @Effect()
  deleteQuestion$ = this.actions$
    .ofType(questionSet.ActionTypes.DELETE_QUESTION)
    .map(action => action.payload)
    .flatMap(question => this.questionApi.delete(question))
    .map(result => {
      this.notificationService.notifySuccess("Question successfully deleted");
      return new questionSet.DeleteQuestionActionSuccess(result);
    });

  @Effect({ dispatch: false })
  invalidateCache = this.actions$
    .ofType(
    questionSet.ActionTypes.CREATE_SUCCESS,
    questionSet.ActionTypes.UPDATE_SUCCESS,
    questionSet.ActionTypes.DELETE_SUCCESS,
    questionSet.ActionTypes.ADD_QUESTION_SUCCESS,
    questionSet.ActionTypes.EDIT_QUESTION_SUCCESS,
    questionSet.ActionTypes.DELETE_QUESTION_SUCCESS,
    "USER_LOGOUT"
    )
    .map(() => {
      console.log("clear cache");
      this.questionSetApi.clearCache();
    });

  @Effect({ dispatch: false })
  httpErrors$ = this.actions$
    .ofType(questionSet.ActionTypes.GET_CURRENT_QUESTION_SET_ERROR)
    .map(action => action.payload)
    .map(error => {
      this.notificationService.notifyError("Question Set not found");
      this.router.navigate([AppConstants.routes.QUESTION_SETS]);
      return Observable.of(error);
    });

  @Effect({ dispatch: false })
  registerSession$ = this.actions$
    .ofType(questionSet.ActionTypes.REGISTER_SESSION)
    .map(action => action.payload)
    .switchMap(questionSetId => {
      this.notificationService.notifySuccess(
        "Practice session ended successfully"
      );
      return this.questionSetApi.registerSession(questionSetId);
    });

  @Effect()
  getSessionDetails$ = this.actions$
    .ofType(questionSet.ActionTypes.GET_SESSION_DETAILS)
    .map(action => action.payload)
    .switchMap(questionSetId =>
      this.answerIndexedDbService.getSessionDetailsData(questionSetId)
    )
    .flatMap(promises => Observable.forkJoin(...promises))
    .map(data => new questionSet.GetSessionDetailsActionSuccess(data));
}
