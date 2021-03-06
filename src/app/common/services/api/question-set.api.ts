import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'
import { map, tap } from 'rxjs/operators';

import {
  QuestionSet,
  IQuestionSet,
  IQuestionSetApi,
  ISessionDetailsQuestion,
  ISessionDetailsQuestionApi,
  IQuestionApi,
  Answer,
  Question
} from '../../models';



@Injectable()
export class QuestionSetApi {
  questionSets;
  populatedQuestionSets;
  constructor(private http: HttpClient) { }

  all(): Observable<QuestionSet[]> {
    if (this.questionSets) {
      return of(this.questionSets);
    }
    return this.http
      .get('/api/questionSet')
      .pipe(
      map((questionSetApiList: IQuestionSetApi[]) => {
        return questionSetApiList.map(questionSetApi => QuestionSet.fromApi(questionSetApi));
      }),
      tap(questionSets => (this.questionSets = questionSets)));
  }

  create(questionSet: IQuestionSet): Observable<QuestionSet> {
    return this.http
      .post('/api/questionSet', questionSet)
      .pipe(map((questionSetApi: IQuestionSetApi) => QuestionSet.fromApi(questionSetApi)));
  }

  get(id: number): Observable<QuestionSet> {
    const cached = this.populatedQuestionSets ? this.findQuestionSet(id) : undefined;
    if (cached) {
      return of(cached);
    }
    return this.http
      .get(`/api/questionSet/${id}`)
      .pipe(map((questionSetApi: IQuestionSetApi) => {
        const questionSet = QuestionSet.fromApi(questionSetApi);
        questionSet.questions = questionSetApi.questions.map(question => {
          const parsedQuestion = Question.fromApi(question);
          parsedQuestion.questionSet = questionSet;
          return parsedQuestion;
        });
        return questionSet;
      }),
      tap(qs => (this.populatedQuestionSets = [qs].concat(this.populatedQuestionSets || []))
      ));
  }

  update(questionSet: QuestionSet): Observable<QuestionSet> {
    const parsedQuestionSet = QuestionSet.toApi(questionSet);
    parsedQuestionSet.questions = (questionSet.questions as Question[]).map(question => Question.toApi(question));
    return this.http
      .put(`/api/questionSet/${questionSet.id}`, parsedQuestionSet)
      .pipe(map((questionSetApi: IQuestionSetApi) => {
        const questionSetObj = QuestionSet.fromApi(questionSetApi);
        questionSetObj.questions = questionSetApi.questions.map(question => {
          const parsedQuestion = Question.fromApi(question);
          parsedQuestion.questionSet = questionSet;
          return parsedQuestion;
        });
        return questionSetObj;
      }));
  }

  delete(questionSetId: number): Observable<number> {
    return this.http
      .delete(`/api/questionSet/${questionSetId}`)
      .pipe(map(() => questionSetId));
  }

  registerSession(questionSetId: number): Observable<QuestionSet> {
    return this.http
      .put(`/api/questionSet/session/${questionSetId}`, '')
      .pipe(map((questionSetApi: IQuestionSetApi) => QuestionSet.fromApi(questionSetApi)));
  }

  getSessionDetailsData(questionSetId: number): Observable<ISessionDetailsQuestion[]> {
    return this.http
      .get(`/api/questionSet/sessionAnswers/${questionSetId}`)
      .pipe(map((sessionDetails: ISessionDetailsQuestionApi[]) => {
        const result: ISessionDetailsQuestion[] = sessionDetails;
        result.forEach(question => {
          question.answers = question.answers.map(answerApi =>
            Answer.fromApi(answerApi)
          );
        });
        return result;
      }));
  }

  importQuestions(questionSetId: number, questions: [string[]]) {
    return this.http
      .post(`/api/questions/importQuestions/${questionSetId}`, {
        questions: questions
      })
      .pipe(map((apiQuestionsList: any) => apiQuestionsList.map(questionApi => Question.fromApi(questionApi))));
  }

  clearCache() {
    this.questionSets = undefined;
    this.populatedQuestionSets = undefined;
  }

  findQuestionSet(questionSetId: number): QuestionSet {
    return this.populatedQuestionSets.find(qs => qs.id === +questionSetId);
  }

}
