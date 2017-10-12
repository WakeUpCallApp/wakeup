import { State } from './answer.reducer';
import { Answer } from '../../models/answer.model';
// Answers
export const isIndexedDBOpen = (state: State): boolean =>
    state.isIndexedDBOpen;

export const getAnswers = (state: State): Answer[] =>
    state.entities;

export const getGroupedAnswers = (state: State) =>
    state.groupedAnswers;

export const isLoading = (state: State): boolean =>
    state.isLoading;
