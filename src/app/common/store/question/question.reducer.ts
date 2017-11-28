import { Question } from '../../models/question.model';
import * as actions from './question.actions';
import * as answerActions from '../answer/answer.actions';
import Helper from '../helper';

const helper = new Helper();

export interface State {
  entities: Question[];
  currentQuestion: Question;
  isLoading;
}

export const initialState: State = {
  entities: [],
  currentQuestion: <Question>{},
  isLoading: false,
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        entities: helper.groupQuestionsByQuestionSet(action.payload),
        isLoading: false,
      };
    case actions.ActionTypes.GET_CURRENT_QUESTION:
    case actions.ActionTypes.DELETE:
      return { ...state, isLoading: true };

    case actions.ActionTypes.GET_CURRENT_QUESTION_SUCCESS:
      return {
        ...state,
        currentQuestion: action.payload,
        isLoading: false,
      };
    case actions.ActionTypes.DELETE_SUCCESS:
      return { ...state, isLoading: false };

    default: {
      return state;
    }
  }
}
