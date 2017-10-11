import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../app.store';
import * as questionActions from './question.actions';

import {
    getQuestions,
    getCurrentQuestion,
    isQuestionLoading
} from '../app.selectors';

@Injectable()
export class QuestionStoreService {
    questions$ = this.store.select(getQuestions);
    currentQuestion$ = this.store.select(getCurrentQuestion);
    isLoading$ = this.store.select(isQuestionLoading);

    constructor(private store: Store<reducers.AppState>) { }

    getQuestion(questionId) {
        this.store.dispatch(new questionActions.GetCurrentQuestion(questionId));
    }

    deleteQuestion(question) {
        this.store.dispatch(new questionActions.DeleteAction(question));
    }

    getAll() {
        this.store.dispatch(new questionActions.LoadAction());
    }
}
