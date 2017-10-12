import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../app.store';
import * as answerActions from './answer.actions';

import {
    isAnswerIndexedDbOpen,
    getAnswers,
    getGroupedAnswers,
    isAnswerLoading
} from '../app.selectors';

@Injectable()
export class AnswerStoreService {
    isIndexedDbOpen$ = this.store.select(isAnswerIndexedDbOpen);
    answers$ = this.store.select(getAnswers);
    groupedAnswers$ = this.store.select(getGroupedAnswers);
    isLoading$ = this.store.select(isAnswerLoading);

    constructor(private store: Store<reducers.AppState>) { }

    openIndexedDb() {
        this.store.dispatch(new answerActions.OpenIndexedDbAction());
    }

    getAnswers(questionId) {
        this.store.dispatch(new answerActions.LoadAction(questionId));
    }

    update(answer) {
        this.store.dispatch(new answerActions.UpdateAction(answer));
    }

    delete(answer) {
        this.store.dispatch(new answerActions.DeleteAction(answer.id));
    }

    create({ questionId, text }, userId) {
        const newAnswer = {
            questionId,
            text,
            date: new Date().getTime(),
            userId
        };
        this.store.dispatch(new answerActions.CreateAction(newAnswer));
    }

    deleteAll(questionId, userId) {
        this.store.dispatch(new answerActions.DeleteAllAction({ questionId, userId }));
    }

}
