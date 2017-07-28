import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import Parser from "./parser";
import { Question, IQuestion, QuestionApi } from "../models/question.model";

@Injectable()
export class QuestionService {
  constructor(private http: Http) {}

  all(): Observable<Question[]> {
    return this.http
      .get("/api/questions/allQuestions")
      .map((response: Response) => response.json())
      .map((questionApiList: QuestionApi[]) => {
        return questionApiList.map(questionApi =>
          Parser.questionFromApi(questionApi)
        );
      });
  }

  get(questionId): Observable<Question> {
    return this.http
      .get(`/api/questions/question/${questionId}`)
      .map((response: Response) => response.json())
      .map((questionApi: QuestionApi) => {
        const question = Parser.questionFromApi(questionApi);
        question.quote = questionApi.quote;
        return question;
      })
      .catch(this.handleError);
  }

  create(question: IQuestion): Observable<Question> {
    return this.http
      .post("/api/questions/", question)
      .map((response: Response) => response.json())
      .map((questionApi: QuestionApi) => {
        return Parser.questionFromApi(questionApi);
      })
      .catch(this.handleError);
  }

  update(question: Question): Observable<Question> {
    return this.http
      .put(`/api/questions/${question.id}`, Parser.questionToApi(question))
      .map((response: Response) => response.json())
      .map((questionApi: QuestionApi) => {
        return Parser.questionFromApi(questionApi);
      })
      .catch(this.handleError);
  }

  delete(questionId: number): Observable<number> {
    return this.http
      .delete(`/api/questions/${questionId}`)
      .map(() => questionId)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || "Server error");
  }
}
