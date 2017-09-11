import { ActionReducer, combineReducers } from "@ngrx/store";
import { compose } from "@ngrx/core/compose";
import { environment } from "../../../environments/environment";

import * as questionSet from "./question-set.reducer";
import * as quote from "./quote.reducer";
import * as topic from "./topic.reducer";
import * as question from "./question.reducer";
import * as answer from "./answer.reducer";
import { QuestionSet } from "../models/question-set.model";
import { Topic } from "../models/topic.model";
import { Quote } from "../models/quote.model";
import { Question } from "../models/question.model";
import { Answer } from "../models/answer.model";

export interface State {
  questionSet: questionSet.State;
  quote: quote.State;
  topic: topic.State;
  question: question.State;
  answer: answer.State;
}

const reducers = {
  questionSet: questionSet.reducer,
  quote: quote.reducer,
  topic: topic.reducer,
  question: question.reducer,
  answer: answer.reducer
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

// QuestionSets

export const getQuestionSetsState = (state: State): QuestionSet[] =>
  state.questionSet.entities;
export const getQuestionSetsSortedState = (state: State): QuestionSet[] =>
  state.questionSet.entities.sort((qs1, qs2) => {
    return qs1.name.toLowerCase().localeCompare(qs2.name.toLowerCase());
  });
export const getQuestionSetsMostPlayedState = (state: State): QuestionSet[] =>
  state.questionSet.entities.filter(qs => {
    return qs.practiceTimes > 0;
  });
export const getQuestionSetSearchTerm = (state: State): string =>
  state.questionSet.searchTerm;
export const getQuestionSetFilter = (state: State): number =>
  state.questionSet.filter;

export const getQuestionSetSate = (state: State, id): QuestionSet[] =>
  state.questionSet.entities.filter(questionSet => questionSet.id === id);

export const getLoadingQuestionSetState = (state: State): boolean =>
  state.questionSet.isLoading;

export const getCurrentQuestionSetState = (state: State): QuestionSet =>
  state.questionSet.currentQuestionSet;

export const getSessionDetailsState = (state: State) =>
  state.questionSet.sessionDetailsData;

export const getImportSpinner = (state: State) =>
  state.questionSet.showImportSpinner;

// Topics
export const getTopicsState = (state: State): Topic[] => state.topic.entities;
export const getTopicsSortedState = (state: State): Topic[] =>
  state.topic.entities.sort((topic1, topic2) => {
    return topic1.name.toLowerCase().localeCompare(topic2.name.toLowerCase());
  });
export const getTopicSearchTerm = (state: State): string =>
  state.topic.searchTerm;

export const getCurrentTopicState = (state: State): Topic =>
  state.topic.currentTopic;

export const getLoadingTopicState = (state: State): boolean =>
  state.topic.isLoading;

// Quotes
export const getCurrentQuote = (state: State): Quote =>
  state.quote.currentQuote;

export const getQuotesByTopic = (state: State): Quote[] =>
  state.quote.quotesByTopic;

export const getQuotesImportSpinner = (state: State) =>
  state.quote.importSpinner;

export const getAuthorSuggestions = (state: State): string[] =>
  state.quote.suggestions.authors;
export const getSourceSuggestions = (state: State): string[] =>
  state.quote.suggestions.sources;
export const getComments = (state: State) => state.quote.comments;

export const getTopicsWithQuotesState = (state: State): Topic[] =>
  state.quote.topicsWithQuotes;

export const getLoadingQuoteState = (state: State): boolean =>
  state.quote.isLoading;

// Questions
export const getQuestionsState = (state: State): Question[] =>
  state.question.entities;
export const getCurrentQuestionState = (state: State): Question =>
  state.question.currentQuestion;

export const getLoadingQuestionState = (state: State): Question =>
  state.question.isLoading;

// Answers
export const getIndexedDBState = (state: State): boolean =>
  state.answer.isIndexedDBOpen;

export const getAnswersState = (state: State): Answer[] =>
  state.answer.entities;

export const getGroupedAnswersState = (state: State) =>
  state.answer.groupedAnswers;

export const getLoadingAnswersState = (state: State): boolean =>
  state.answer.isLoading;
