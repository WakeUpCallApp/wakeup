import { Action } from '@ngrx/store';
import { QuestionSet } from '../models/question-set.model';
import * as actions from '../actions/question-set.actions';

export interface State {
  entities: QuestionSet[];
  isLoading: boolean;
  currentQuestionSet: QuestionSet;
}

export const initialState: State = {
  entities: [],
  isLoading: false,
  currentQuestionSet: <QuestionSet>{}
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD:
      return Object.assign({}, state, { isLoading: true });

    case actions.ActionTypes.LOAD_SUCCESS:
      const questionSets = action.payload;
      return Object.assign({}, state, {
        entities: questionSets,
        isLoading: false
      });

    case actions.ActionTypes.GET_CURRENT_QUESTION_SET_SUCCESS:
      const currentQuestionSet = action.payload;
      return Object.assign({}, state, {
        currentQuestionSet: currentQuestionSet
      });

    case actions.ActionTypes.CREATE_SUCCESS:
      return Object.assign({}, state,
        {
          currentQuestionSet: action.payload
        });
    case actions.ActionTypes.UPDATE_SUCCESS:
      return Object.assign({}, state,
        {
          currentQuestionSet: Object.assign({}, state.currentQuestionSet, action.payload)
        });
    case actions.ActionTypes.ADD_QUESTION_SUCCESS:
      const question = action.payload;
      const updatedQuestionSet = Object.assign({},
        state.currentQuestionSet,
        {
          questions: [...state.currentQuestionSet.questions, question]
        });
      return Object.assign({}, state,
        {
          currentQuestionSet: updatedQuestionSet
        });
    default: {
      return state;
    }
  }
}

