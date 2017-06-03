import { Action } from '@ngrx/store';
import { QuestionSet } from '../models/question-set.model';
import * as actions from '../actions/question-set.actions';

export interface State {
  entities: QuestionSet[];
}

export const initialState: State = {
  entities: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD_SUCCESS:
      const questionSets = action.payload;
      return {
        entities: questionSets
      };
    default: {
      return state;
    }
  }
}

