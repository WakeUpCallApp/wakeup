import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Question, IQuestion, QuestionApi } from '../models/question.model';

@Injectable()
export class QuestionService {
    constructor(private http: Http) { }



    create(questionSet: IQuestion): Observable<Question> {
        return this.http.post('/api/questions/', questionSet)
            .map((response: Response) => response.json())
            .map((questionApi: QuestionApi) => {
                return this.fromApi(questionApi)
            })
            .catch(this.handleError);;
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }

    fromApi(questionApi: QuestionApi): Question {
        return new Question(
            questionApi._id,
            questionApi.text,
            new Date(questionApi.date),
            questionApi.questionSet,
            questionApi.answers
        );
    }

}