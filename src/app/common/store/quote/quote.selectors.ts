import { State } from './quote.reducer';
import { Quote, Topic } from '../../models';

export const getCurrentQuote = (state: State): Quote =>
    state.currentQuote;

export const getQuotesByTopic = (state: State): Quote[] =>
    state.quotesByTopic;

export const isImporting = (state: State) =>
    state.importSpinner;

export const getAuthorSuggestions = (state: State): string[] =>
    state.suggestions.authors;
export const getSourceSuggestions = (state: State): string[] =>
    state.suggestions.sources;
export const getComments = (state: State) => state.comments;

export const getTopicsWithQuotes = (state: State): Topic[] =>
    state.topicsWithQuotes;

export const isLoading = (state: State): boolean =>
    state.isLoading;