import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { QuestionSet, IQuestionSet, QuesstionSetApi } from '../models/question-set.model';

@Injectable()
export class QuestionSetService {
    constructor(private http: Http) { }

    all(): Observable<QuestionSet[]> {
        return this.http.get('/api/questionSet')
            .map((response: Response) => response.json())
            .map((questionSetApiList) => {
                return questionSetApiList.map(questionSetApi => {
                    return new QuestionSet(
                        questionSetApi._id,
                        questionSetApi.name,
                        questionSetApi.description,
                        questionSetApi.user,
                        questionSetApi.practiceTimes,
                        questionSetApi.questions,
                        questionSetApi.isDefault

                    );
                })
            })
            .catch(this.handleError);
    }

    create(questionSet: IQuestionSet): Observable<QuestionSet> {
        return this.http.post('/api/questionSet', questionSet)
            .map((response: Response) => response.json())
            .map((questionSetApi: QuesstionSetApi) => {
                return new QuestionSet(
                    questionSetApi._id,
                    questionSetApi.name,
                    questionSetApi.description,
                    questionSetApi.user,
                    questionSetApi.practiceTimes,
                    questionSetApi.questions,
                    questionSetApi.isDefault

                )
            })
            .catch(this.handleError);;
    }

    get(id: number): Observable<QuestionSet> {
        return this.http.get(`/api/questionSet/${id}`)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}