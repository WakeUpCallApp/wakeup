import { createSelector } from 'reselect';
import { State } from './question-set.reducer';
import { QuestionSet } from '../../models/question-set.model';

export const getQuestionSets = (state: State): QuestionSet[] => state.entities;

export const getSortedQuestionSets = createSelector(getQuestionSets, () => { },
  (entities) => entities.sort((qs1, qs2) => {
    return qs1.name.toLowerCase().localeCompare(qs2.name.toLowerCase());
  }));

export const getMostPlayedQuestionSets = (state: State): QuestionSet[] => {
  return state.entities.filter(qs => {
    return qs.practiceTimes > 0;
  }).slice(0, 5).sort((a, b) => b.practiceTimes - a.practiceTimes);
};

export const getSearchTerm = (state: State): string =>
  state.searchTerm;

export const getFilter = (state: State): number =>
  state.filter;

export const getQuestionSetById = (state: State, id): QuestionSet[] =>
  state.entities.filter(questionSet => questionSet.id === id);

export const isLoading = (state: State): boolean =>
  state.isLoading;

export const getCurrentQuestionSet = (state: State): QuestionSet =>
  state.currentQuestionSet;

export const getSessionDetails = (state: State) =>
  state.sessionDetailsData;

export const isImporting = (state: State) =>
  state.showImportSpinner;
