import { Action } from '@ngrx/store';
import { Question } from '../models/question.model';
import * as actions from '../actions/question.actions';

export interface State {
  entities: Question[];
}

export const initialState: State = {
  entities: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD_SUCCESS:
      const questionSets = action.payload;
      return Object.assign({}, state, {
        entities: questionSets,
        isLoading: false
      });
    default: {
      return state;
    }
  }
}
