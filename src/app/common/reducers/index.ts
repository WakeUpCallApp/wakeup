import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { environment } from '../../../environments/environment';

import * as questionSet from './question-set.reducer';
import * as quote from './quote.reducer';
import { QuestionSet } from '../models/question-set.model';
import { Quote } from '../models/quote.model';

export interface State {
  questionSet: questionSet.State;
  quote: quote.State;
}

const reducers = {
  questionSet: questionSet.reducer,
  quote: quote.reducer,
};

const developmentReducer: ActionReducer<any> = combineReducers(reducers);
const productionReducer: ActionReducer<any> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}


// -------------------------------------------------------------------
// Selectors
// -------------------------------------------------------------------
export const getQuestionSetsState = (state: State): QuestionSet[] => state.questionSet.entities;
export const getQuestionSetsSortedState = (state: State): QuestionSet[] => state.questionSet.entities.sort((qs1, qs2) => {
  return qs1.name.toLowerCase().localeCompare(qs2.name.toLowerCase());
});
export const getQuestionSetsMostPlayedState = (state: State): QuestionSet[] => state.questionSet.entities.filter((qs) => {
  return qs.practiceTimes > 0;
});
export const getQuestionSetSearchTerm = (state: State): string => state.questionSet.searchTerm;
export const getQuestionSetFilter = (state: State): number => state.questionSet.filter;

export const getQuestionSetSate = (state: State, id): QuestionSet[] => state.questionSet.entities.filter(questionSet => questionSet.id === id);

export const getLoadingQuestionSetState = (state: State) : boolean => state.questionSet.isLoading;

export const getCurrentQuestionSetState = (state: State) : QuestionSet => state.questionSet.currentQuestionSet;

export const getQuotesState = (state: State): Quote[] => state.quote.entities;