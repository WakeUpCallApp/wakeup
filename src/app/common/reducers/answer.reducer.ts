import { Action } from '@ngrx/store';
import { Answer } from '../models/answer.model';
import * as actions from '../actions/answer.actions';

export interface State {
  entities: Answer[];
}

export const initialState: State = {
  entities: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
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
