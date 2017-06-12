import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import AppConstants from '../app-constants';



import * as question from '../actions/question.actions';
import { QuestionService } from '../services/question.service';

@Injectable()
export class QuestionEffects {


    constructor(
        private questionService: QuestionService,
        private actions$: Actions
    ) { }
}
