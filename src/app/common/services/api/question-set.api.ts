import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import Parser from './parser';
import {
  QuestionSet,
  IQuestionSet,
  IQuestionSetApi
} from '../../models/question-set.model';

import { Question } from '../../models/question.model';

@Injectable()
export class QuestionSetApi {
  questionSets;
  populatedQuestionSets;
  constructor(private http: Http) {}

  all(): Observable<QuestionSet[]> {
    if (this.questionSets) {
      return Observable.of(this.questionSets);
    }
    return this.http
      .get('/api/questionSet')
      .map((response: Response) => response.json())
      .map(questionSetApiList => {
        return questionSetApiList.map(questionSetApi => {
          return Parser.questionSetFromApi(questionSetApi);
        });
      })
      .do(questionSets => (this.questionSets = questionSets))
      .catch(this.handleError);
  }

  create(questionSet: IQuestionSet): Observable<QuestionSet> {
    return this.http
      .post('/api/questionSet', questionSet)
      .map((response: Response) => response.json())
      .map((questionSetApi: IQuestionSetApi) => {
        return Parser.questionSetFromApi(questionSetApi);
      })
      .catch(this.handleError);
  }

  get(id: number): Observable<QuestionSet> {
    const cached = this.populatedQuestionSets
      ? this.findQuestionSet(id)
      : undefined;
    if (cached) {
      return Observable.of(cached);
    }
    return this.http
      .get(`/api/questionSet/${id}`)
      .map((response: Response) => response.json())
      .map((questionSetApi: IQuestionSetApi) => {
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
      .do(
        qs =>
          (this.populatedQuestionSets = [qs].concat(
            this.populatedQuestionSets || []
          ))
      )
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
      .map((questionSetApi: IQuestionSetApi) => {
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
      .put(`/api/questionSet/session/${questionSetId}`, '')
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

  importQuestions(questionSetId, questions) {
    return this.http
      .post(`/api/questions/importQuestions/${questionSetId}`, {
        questions: questions
      })
      .map((response: Response) => response.json())
      .map(apiQuestionsList => {
        return apiQuestionsList.map(questionApi =>
          Parser.questionFromApi(questionApi)
        );
      });
  }

  clearCache() {
    this.questionSets = undefined;
    this.populatedQuestionSets = undefined;
  }

  findQuestionSet(questionSetId) {
    return this.populatedQuestionSets.find(qs => qs.id === +questionSetId);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
