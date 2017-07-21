import { Action } from '@ngrx/store';
import { Quote } from '../models/quote.model';
import { Topic } from '../models/topic.model';
import * as actions from '../actions/quote.actions';

export interface State {
  topicsWithQuotes: Topic[];
  isLoading: boolean;
  currentQuote: Quote;
  quotesByTopic: Quote[];
  suggestions;
}

export const initialState: State = {
  topicsWithQuotes: [],
  quotesByTopic: [],
  isLoading: false,
  currentQuote: <Quote>{},
  suggestions: {}
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD:
      return Object.assign({}, state, { isLoading: true });

    case actions.ActionTypes.LOAD_SUCCESS:
      return Object.assign({}, state, {
        topicsWithQuotes: action.payload,
        isLoading: false
      });
    case actions.ActionTypes.GET_BY_TOPIC_ID_SUCCESS:
      return Object.assign({}, state, {
        quotesByTopic: action.payload
      });
    case actions.ActionTypes.GET_SUGGESTIONS_SUCCESS:
      return Object.assign({}, state, {
        suggestions: action.payload
      });
    case actions.ActionTypes.GET_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        currentQuote: action.payload
      });
    default: {
      return state;
    }
  }
}
