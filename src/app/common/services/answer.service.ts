import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import Parser from "./parser";
import { Answer, IAnswer, AnswerApi } from "../models/answer.model";

@Injectable()
export class AnswerService {
  answers = new Map();
  constructor(private http: Http) {}
  all(questionId): Observable<Answer[]> {
    const cached = this.answers ? this.getByQuestion(questionId) : undefined;
    if (cached) {
      return Observable.of(cached);
    }
    return this.http
      .get(`/api/answers/${questionId}`)
      .map((response: Response) => response.json())
      .map((answerApiList: AnswerApi[]) => {
        return answerApiList.map(answerApi => Parser.answerFromApi(answerApi));
      })
      .do(answers => (this.answers[questionId] = answers))
      .catch(this.handleError);
  }

  create(answer: IAnswer): Observable<Answer> {
    return this.http
      .post("/api/answers/", answer)
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

  deleteAll(questionId) {
    return this.http
      .delete(`/api/answers/deleteAllAnswers/${questionId}`)
      .map(() => questionId)
      .catch(this.handleError);
  }

  getByQuestion(questionId) {
    return this.answers[questionId];
  }

  clearCache() {
    this.answers = new Map();
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || "Server error");
  }
}
