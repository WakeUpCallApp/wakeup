import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import Parser from './parser';
import { Answer, IAnswer, IAnswerApi } from '../../models/answer.model';

@Injectable()
export class AnswerApi {
  answers = new Map();
  constructor(private http: HttpClient) {}
  all(questionId): Observable<Answer[]> {
    const cached = this.answers ? this.getByQuestion(questionId) : undefined;
    if (cached) {
      return Observable.of(cached);
    }
    return this.http
      .get(`/api/answers/${questionId}`)
      .map((answerApiList: IAnswerApi[]) => {
        return answerApiList.map(answerApi => Parser.answerFromApi(answerApi));
      })
      .do(answers => (this.answers[questionId] = answers));
  }

  create(answer: IAnswer): Observable<Answer> {
    return this.http
      .post('/api/answers/', answer)
      .map((answerApi: IAnswerApi) => {
        return Parser.answerFromApi(answerApi);
      });
  }

  update(answer: Answer): Observable<Answer> {
    return this.http
      .put(`/api/answers/${answer.id}`, Parser.answerToApi(answer))
      .map((answerApi: IAnswerApi) => {
        return Parser.answerFromApi(answerApi);
      });
  }

  delete(answerId: number): Observable<number> {
    return this.http
      .delete(`/api/answers/${answerId}`)
      .map(() => answerId);
  }

  deleteAll(questionId) {
    return this.http
      .delete(`/api/answers/deleteAllAnswers/${questionId}`)
      .map(() => questionId);
  }

  getByQuestion(questionId) {
    return this.answers[questionId];
  }

  clearCache() {
    this.answers = new Map();
  }

}
