import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../app.store';
import * as questionSetActions from './question-set.actions';

import {
    getQuestionSets,
    getSortedQuestionSets,
    getMostPlayedQuestionSets,
    getQuestionSetSearchTerm,
    getQuestionSetFilter,
    isQuestionSetLoading,
    getCurrentQuestionSet,
    getSessionDetails,
    isQuestionSetImporting
} from '../app.selectors';

@Injectable()
export class QuestionSetStoreService {
    questionsSets$ = this.store.select(getQuestionSets);
    currentQuestionSet$ = this.store.select(getCurrentQuestionSet);
    isLoading$ = this.store.select(isQuestionSetLoading);
    sortedQuestionSets$ = this.store.select(getSortedQuestionSets);
    mostPlayedQuestionSets$ = this.store.select(getMostPlayedQuestionSets);
    searchTerm$ = this.store.select(getQuestionSetSearchTerm);
    filter$ = this.store.select(getQuestionSetFilter);
    sessionDetails$ = this.store.select(getSessionDetails);
    isImporting$ = this.store.select(isQuestionSetImporting);

    constructor(private store: Store<reducers.AppState>) { }

    create(questionSet) {
        this.store.dispatch(new questionSetActions.CreateAction(questionSet));
    }

    getAll() {
        this.store.dispatch(new questionSetActions.LoadAction());
    }

    get(questionSetId) {
        this.store.dispatch(new questionSetActions.GetCurrentQSAction(questionSetId));
    }

    registerSession(questionSet) {
        this.store.dispatch(
            new questionSetActions.RegisterSessionAction(questionSet.id)
        );
    }

    getSessionDetails(questionSetId) {
        this.store.dispatch(new questionSetActions.GetSessionDetailsAction(questionSetId))
    }

    update(questionSet) {
        this.store.dispatch(new questionSetActions.UpdateAction(questionSet));
    }

    delete(questionSet) {
        this.store.dispatch(new questionSetActions.DeleteAction(questionSet.id));
    }

    addQuestion(qs) {
        this.store.dispatch(
            new questionSetActions.AddQuestionAction({
                text: qs.text,
                questionSet: qs.questionSet,
                date: new Date().getTime(),
                quote: qs.quote
            })
        );
    }

    deleteQuestion(question) {
        this.store.dispatch(new questionSetActions.DeleteQuestionAction(question))
    }

    editQuestion(question) {
        this.store.dispatch(new questionSetActions.EditQuestionAction(question));
    }

    importQuestions(questionSetId, questions) {
        this.store.dispatch(
            new questionSetActions.ImportQuestionsAction({
                questionSetId,
                questions
            })
        );
    }

    exportQuestions(questions, questionSetName) {
        this.store.dispatch(
            new questionSetActions.ExportQuestionsAction({
                questions,
                questionSetName
            })
        );
    }

    getAllFilter() {
        return questionSetActions.Filter.ALL;
    }

    getMostPlayedFilter() {
        return questionSetActions.Filter.MOST_PLAYED;
    }

    doSearch(val) {
        this.store.dispatch(new questionSetActions.SearchAction(val));
    }

    doFilter(filter) {
        this.store.dispatch(new questionSetActions.FilterAction(filter));
    }

    resetSearchAndFilter() {
        this.doSearch(undefined);
        this.doFilter(this.getAllFilter());
    }

}
