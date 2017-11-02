import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';

import {
  Question,
  QuestionSet,
  Quote,
  IQuestion,
  IQuestionApi,
  IQuestionSummary,
  Answer,
  IQuoteApi,
  IQuestionSetApi
} from '../../models';


@Injectable()
export class QuestionApi {
  allQuestions;
  populatedQuestions;
  constructor(private http: HttpClient) { }

  all(): Observable<IQuestionSummary[]> {
    if (this.allQuestions) {
      return of(this.allQuestions);
    }
    return this.http
      .get('/api/questions/allQuestions')
      .pipe(
      map((questionApiList: IQuestionSummary[]) => questionApiList.map(question => Question.questionSummary(question))),
      tap(questions => (this.allQuestions = questions)));
  }

  get(questionId): Observable<Question> {
    const cached = this.populatedQuestions ? this.findQuestion(questionId) : undefined;
    if (cached) {
      return of(cached);
    }
    return this.http
      .get(`/api/questions/question/${questionId}`)
      .pipe(
      map((questionApi: IQuestionApi) => {
        const question: Question = Question.fromApi(questionApi);
        question.questionSet = QuestionSet.fromApi(
          questionApi.questionSet as IQuestionSetApi
        );
        if (questionApi.quote) {
          question.quote = Quote.fromApi(questionApi.quote as IQuoteApi);
        }
        return question;
      }),
      tap(question => (this.populatedQuestions = [question].concat(this.populatedQuestions || []))));
  }

  create(question: IQuestion): Observable<Question> {
    return this.http
      .post('/api/questions/', question)
      .pipe(
      map((questionApi: IQuestionApi) => {
        const questionResult = Question.fromApi(questionApi);
        questionResult.questionSet = questionApi.questionSet as number;
        return questionResult;
      }));
  }

  update(question: Question): Observable<Question> {
    return this.http
      .put(`/api/questions/${question.id}`, Question.toApi(question))
      .pipe(map((questionApi: IQuestionApi) => {
        return Question.fromApi(questionApi);
      }));
  }

  delete(question: Question): Observable<Question> {
    return this.http
      .delete(`/api/questions/${question.id}`)
      .pipe(map(() => question));
  }

  findQuestion(id: number): Question {
    return this.populatedQuestions.find(q => q.id === +id);
  }

  clearCache() {
    this.allQuestions = undefined;
    this.populatedQuestions = undefined;
  }

}
