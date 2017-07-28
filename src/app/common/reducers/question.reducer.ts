import { Action } from '@ngrx/store';
import { Question } from '../models/question.model';
import * as actions from '../actions/question.actions';

export interface State {
  entities: Question[];
  currentQuestion: Question;
}

export const initialState: State = {
  entities: [],
  currentQuestion: <Question> {}
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD_SUCCESS:
      return Object.assign({}, state, {
        entities: action.payload,
        isLoading: false
      });
    case actions.ActionTypes.GET_CURRENT_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        currentQuestion: action.payload,
      });  
    default: {
      return state;
    }
  }
}
