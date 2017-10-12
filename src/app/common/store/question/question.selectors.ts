import { State } from './question.reducer';
import { Question } from '../../models/question.model';

export const getQuestions = (state: State): Question[] =>
    state.entities;
export const getCurrentQuestion = (state: State): Question =>
    state.currentQuestion;

export const isLoading = (state: State): Question =>
    state.isLoading;
