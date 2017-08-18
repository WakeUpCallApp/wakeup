import { Action } from "@ngrx/store";
import { Answer } from "../models/answer.model";
import * as actions from "../actions/answer.actions";

export interface State {
  entities: Answer[];
  isLoading;
}

export const initialState: State = {
  entities: [],
  isLoading: false
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        isLoading: true
      });
    }
    case actions.ActionTypes.LOAD_SUCCESS:
      return Object.assign({}, state, {
        entities: action.payload,
        isLoading: true
      });
    default: {
      return state;
    }
  }
}
