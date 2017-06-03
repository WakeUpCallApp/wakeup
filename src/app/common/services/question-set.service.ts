import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { QuestionSet } from '../models/question-set.model';

@Injectable()
export class QuestionSetService {
    constructor(private http: Http) { }

    all(): Observable<QuestionSet[]> {
        return this.http.get('/api/questionSet')
            .map((response: Response) => response.json());
    }
}