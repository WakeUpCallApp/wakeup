import { Action } from "@ngrx/store";
import { Quote } from "../models/quote.model";
import * as actions from "../actions/quote.actions";

export interface State {
  entities: Quote[];
  isLoading: boolean;
  currentQuote: Quote;
  quotesByTopic: Quote[];
  suggestions;
}

export const initialState: State = {
  entities: [],
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
        entities: action.payload,
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
    default: {
      return state;
    }
  }
}
