import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import Parser from "./parser";
import {
  QuestionSet,
  IQuestionSet,
  QuestionSetApi
} from "../models/question-set.model";

import { Question } from "../models/question.model";

@Injectable()
export class QuestionSetService {
  constructor(private http: Http) {}

  all(): Observable<QuestionSet[]> {
    return this.http
      .get("/api/questionSet")
      .map((response: Response) => response.json())
      .map(questionSetApiList => {
        return questionSetApiList.map(questionSetApi => {
          return Parser.questionSetFromApi(questionSetApi);
        });
      })
      .catch(this.handleError);
  }

  create(questionSet: IQuestionSet): Observable<QuestionSet> {
    return this.http
      .post("/api/questionSet", questionSet)
      .map((response: Response) => response.json())
      .map((questionSetApi: QuestionSetApi) => {
        return Parser.questionSetFromApi(questionSetApi);
      })
      .catch(this.handleError);
  }

  get(id: number): Observable<QuestionSet> {
    return this.http
      .get(`/api/questionSet/${id}`)
      .map((response: Response) => response.json())
      .map((questionSetApi: QuestionSetApi) => {
        const questionSet = Parser.questionSetFromApi(questionSetApi);
        questionSet.questions = questionSetApi.questions.map(question => {
          const parsedQuestion = Parser.questionFromApi(question);
          parsedQuestion.questionSet = questionSet;
          return parsedQuestion;
        });
        questionSet.questionIds = questionSetApi.questions.map(
          question => question._id
        );
        return questionSet;
      })
      .catch(this.handleError);
  }

  update(questionSet: QuestionSet): Observable<QuestionSet> {
    const parsedQuestionSet = Parser.questionSetToApi(questionSet);
    parsedQuestionSet.questions = (questionSet.questions as Question[]).map(
      question => Parser.questionToApi(question)
    );
    return this.http
      .put(`/api/questionSet/${questionSet.id}`, parsedQuestionSet)
      .map((response: Response) => response.json())
      .map((questionSetApi: QuestionSetApi) => {
        const questionSetObj = Parser.questionSetFromApi(questionSetApi);
        questionSetObj.questions = questionSetApi.questions.map(question => {
          const parsedQuestion = Parser.questionFromApi(question);
          parsedQuestion.questionSet = questionSet;
          return parsedQuestion;
        });
        return questionSetObj;
      })
      .catch(this.handleError);
  }

  delete(questionSetId: number): Observable<number> {
    return this.http
      .delete(`/api/questionSet/${questionSetId}`)
      .map(() => questionSetId)
      .catch(this.handleError);
  }

  registerSession(questionSetId: number) {
    return this.http
      .put(`/api/questionSet/session/${questionSetId}`, "")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getSessionDetailsData(questionSetId: number) {
    return this.http
      .get(`/api/questionSet/sessionAnswers/${questionSetId}`)
      .map((response: Response) => response.json())
      .map(sessionDetails => {
        sessionDetails.forEach(question => {
          question.answers = question.answers.map(answerApi =>
            Parser.answerFromApi(answerApi)
          );
        });
        return sessionDetails;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || "Server error");
  }
}
