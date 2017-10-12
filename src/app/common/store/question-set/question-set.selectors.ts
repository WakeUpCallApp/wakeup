import { State } from './question-set.reducer';
import { QuestionSet } from '../../models/question-set.model';

export const getQuestionSets = (state: State): QuestionSet[] => state.entities;

export const getSortedQuestionSets = (state: State): QuestionSet[] => state.entities.sort((qs1, qs2) => {
    return qs1.name.toLowerCase().localeCompare(qs2.name.toLowerCase());
});

export const getMostPlayedQuestionSets = (state: State): QuestionSet[] =>
state.entities.filter(qs => {
  return qs.practiceTimes > 0;
});

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
