import { Action } from "@ngrx/store";
import { Quote } from "../models/quote.model";
import * as actions from "../actions/quote.actions";

export interface State {
  entities: Quote[];
  isLoading: boolean;
  currentQuote: Quote;
}

export const initialState: State = {
  entities: [],
  isLoading: false,
  currentQuote: <Quote>{}
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
    default: {
      return state;
    }
  }
}
