import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import Parser from "./parser";
import { Question, IQuestion, QuestionApi } from "../models/question.model";
import { Answer, AnswerApi } from "../models/answer.model";
import { QuoteApi } from "../models/quote.model";
import { QuestionSetApi } from "../models/question-set.model";

@Injectable()
export class QuestionService {
  allQuestions;
  populatedQuestions;
  constructor(private http: Http) {}

  all(): Observable<Question[]> {
    if (this.allQuestions) {
      return Observable.of(this.allQuestions);
    }
    return this.http
      .get("/api/questions/allQuestions")
      .map((response: Response) => response.json())
      .map(questionApiList => {
        return questionApiList.map(question =>
          Parser.questionSummary(question)
        );
      })
      .do(questions => (this.allQuestions = questions))
      .catch(this.handleError);
  }

  get(questionId): Observable<Question> {
    const cached = this.populatedQuestions
      ? this.findQuestion(questionId)
      : undefined;
    if (cached) {
      return Observable.of(cached);
    }
    return this.http
      .get(`/api/questions/question/${questionId}`)
      .map((response: Response) => response.json())
      .map((questionApi: QuestionApi) => {
        const question: Question = Parser.questionFromApi(questionApi);
        question.questionSet = Parser.questionSetFromApi(
          questionApi.questionSet as QuestionSetApi
        );
        if (questionApi.quote) {
          question.quote = Parser.quoteFromApi(questionApi.quote as QuoteApi);
        }
        return question;
      })
      .do(
        question =>
          (this.populatedQuestions = [question].concat(
            this.populatedQuestions || []
          ))
      )
      .catch(this.handleError);
  }

  create(question: IQuestion): Observable<Question> {
    return this.http
      .post("/api/questions/", question)
      .map((response: Response) => response.json())
      .map((questionApi: QuestionApi) => {
        const question = Parser.questionFromApi(questionApi);
        question.questionSet = questionApi.questionSet as number;
        return question;
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

  delete(question): Observable<number> {
    return this.http
      .delete(`/api/questions/${question.id}`)
      .map(() => question)
      .catch(this.handleError);
  }

  findQuestion(id) {
    return this.populatedQuestions.find(q => q.id === +id);
  }

  clearCache() {
    this.allQuestions = undefined;
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || "Server error");
  }
}
