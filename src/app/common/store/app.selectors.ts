import { createSelector } from 'reselect';
import { AppState } from './app.store';

import * as questionSetSelectors from './question-set/question-set.selectors';
import * as topicSelectors from './topic/topic.selectors';
import * as quoteSelectors from './quote/quote.selectors';
import * as questionSelectors from './question/question.selectors';
import * as answerSelectors from './answer/answer.selectors';

export const getQuestionSetState = (state: AppState) => state.questionSet;
export const getTopicState = (state: AppState) => state.topic;
export const getQuoteState = (state: AppState) => state.quote;
export const getQuestionState = (state: AppState) => state.question;
export const getAnswerState = (state: AppState) => state.answer;

// QuestionSet selectors 

export const getQuestionSets = createSelector(getQuestionSetState, questionSetSelectors.getQuestionSets);
export const getSortedQuestionSets = createSelector(getQuestionSetState, questionSetSelectors.getSortedQuestionSets);
export const getMostPlayedQuestionSets = createSelector(getQuestionSetState, questionSetSelectors.getMostPlayedQuestionSets);
export const getQuestionSetSearchTerm = createSelector(getQuestionSetState, questionSetSelectors.getSearchTerm);
export const getQuestionSetFilter = createSelector(getQuestionSetState, questionSetSelectors.getFilter);
export const isQuestionSetLoading = createSelector(getQuestionSetState, questionSetSelectors.isLoading);
export const getCurrentQuestionSet = createSelector(getQuestionSetState, questionSetSelectors.getCurrentQuestionSet);
export const getSessionDetails = createSelector(getQuestionSetState, questionSetSelectors.getSessionDetails);
export const isQuestionSetImporting = createSelector(getQuestionSetState, questionSetSelectors.isImporting);

// Topic selectors
export const getTopics = createSelector(getTopicState, topicSelectors.getTopics);
export const getSortedTopics = createSelector(getTopicState, topicSelectors.getSortedTopics);
export const getTopicSearchTerm = createSelector(getTopicState, topicSelectors.getSearchTerm);
export const getCurrentTopic = createSelector(getTopicState, topicSelectors.getCurrentTopic);
export const isTopicLoading = createSelector(getTopicState, topicSelectors.isLoading);

// Quote selectors
export const getCurrentQuote = createSelector(getQuoteState, quoteSelectors.getCurrentQuote);
export const getQuotesByTopic = createSelector(getQuoteState, quoteSelectors.getQuotesByTopic);
export const isQuotesImporting = createSelector(getQuoteState, quoteSelectors.isImporting);
export const getAuthorSuggestions = createSelector(getQuoteState, quoteSelectors.getAuthorSuggestions);
export const getSourceSuggestions = createSelector(getQuoteState, quoteSelectors.getSourceSuggestions);
export const getComments = createSelector(getQuoteState, quoteSelectors.getComments);
export const getTopicsWithQuotes = createSelector(getQuoteState, quoteSelectors.getTopicsWithQuotes);
export const isQuoteLoading = createSelector(getQuoteState, quoteSelectors.isLoading);

// Question selectors
export const getQuestions = createSelector(getQuestionState, questionSelectors.getQuestions);
export const getCurrentQuestion = createSelector(getQuestionState, questionSelectors.getCurrentQuestion);
export const isQuestionLoading = createSelector(getQuestionState, questionSelectors.isLoading);

// Answer selectors
export const isAnswerIndexedDbOpen = createSelector(getAnswerState, answerSelectors.isIndexedDBOpen);
export const getAnswers = createSelector(getAnswerState, answerSelectors.getAnswers);
export const getGroupedAnswers = createSelector(getAnswerState, answerSelectors.getGroupedAnswers);
export const isAnswerLoading = createSelector(getAnswerState, answerSelectors.isLoading);