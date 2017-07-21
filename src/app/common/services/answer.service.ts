import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import Parser from './parser';
import { Answer, IAnswer, AnswerApi } from '../models/answer.model';

@Injectable()
export class AnswerService {
  constructor(private http: Http) {}

  all(questionSetId): Observable<Answer[]> {
    return this.http
      .get(`/api/answers/${questionSetId}`)
      .map((response: Response) => response.json())
      .map((answerApiList: AnswerApi[]) => {
        return answerApiList.map(answerApi =>
          Parser.answerFromApi(answerApi)
        );
      });
  }

  create(answer: IAnswer): Observable<Answer> {
    return this.http
      .post('/api/answers/', answer)
      .map((response: Response) => response.json())
      .map((answerApi: AnswerApi) => {
        return Parser.answerFromApi(answerApi);
      })
      .catch(this.handleError);
  }

  update(answer: Answer): Observable<Answer> {
    return this.http
      .put(`/api/answers/${answer.id}`, Parser.answerToApi(answer))
      .map((response: Response) => response.json())
      .map((answerApi: AnswerApi) => {
        return Parser.answerFromApi(answerApi);
      })
      .catch(this.handleError);
  }

  delete(answerId: number): Observable<number> {
    return this.http
      .delete(`/api/answers/${answerId}`)
      .map(() => answerId)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
