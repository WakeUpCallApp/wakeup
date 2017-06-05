import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { environment } from '../../../environments/environment';

import * as questionSet from './question-set.reducer';
import { QuestionSet } from '../models/question-set.model';

export interface State {
  questionSet: questionSet.State;
}

const reducers = {
  questionSet: questionSet.reducer
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

export const getQuestionSetSate = (state: State, id): QuestionSet[] => state.questionSet.entities.filter(questionSet => questionSet.id === id);