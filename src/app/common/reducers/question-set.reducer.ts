import { Action } from '@ngrx/store';
import { QuestionSet } from '../models/question-set.model';
import * as actions from '../actions/question-set.actions';

export interface State {
  entities: QuestionSet[];
  isLoading: boolean;
  currentQuestionSet: QuestionSet;
  searchTerm: string;
  filter: actions.Filter;
}

export const initialState: State = {
  entities: [],
  isLoading: false,
  currentQuestionSet: <QuestionSet>{},
  searchTerm: '',
  filter: actions.Filter.ALL
};

export function reducer(state = initialState, action: Action): State {
  let updatedQuestionSet;

  switch (action.type) {
    case actions.ActionTypes.SEARCH_INPUT:
      return Object.assign({}, state, { searchTerm: action.payload });
    case actions.ActionTypes.FILTER:
      return Object.assign({}, state, {
        filter: action.payload
      });
    case actions.ActionTypes.LOAD:
      return Object.assign({}, state, { isLoading: true });
    case actions.ActionTypes.LOAD_SUCCESS:
      return Object.assign({}, state, {
        entities: action.payload,
        isLoading: false
      });
    case actions.ActionTypes.GET_CURRENT_QUESTION_SET_SUCCESS:
      const currentQuestionSet = action.payload;
      return Object.assign({}, state, {
        currentQuestionSet: currentQuestionSet
      });

    case actions.ActionTypes.CREATE_SUCCESS:
      return Object.assign({}, state, {
        currentQuestionSet: action.payload
      });
    case actions.ActionTypes.UPDATE_SUCCESS:
      return Object.assign({}, state, {
        currentQuestionSet: Object.assign(
          {},
          state.currentQuestionSet,
          action.payload
        )
      });
    case actions.ActionTypes.ADD_QUESTION_SUCCESS:
      updatedQuestionSet = Object.assign({}, state.currentQuestionSet, {
        questions: [...state.currentQuestionSet.questions, action.payload]
      });
      return Object.assign({}, state, {
        currentQuestionSet: updatedQuestionSet
      });
    case actions.ActionTypes.EDIT_QUESTION_SUCCESS:
      updatedQuestionSet = Object.assign({}, state.currentQuestionSet, {
        questions: state.currentQuestionSet.questions.map(question => {
          if (question.id === action.payload.id) {
            return Object.assign({}, question, action.payload);
          }
          return question;
        })
      });
      return Object.assign({}, state, {
        currentQuestionSet: updatedQuestionSet
      });
    case actions.ActionTypes.DELETE_QUESTION_SUCCESS:
      updatedQuestionSet = Object.assign({}, state.currentQuestionSet, {
        questions: state.currentQuestionSet.questions.filter(
          question => question.id !== action.payload
        )
      });
      return Object.assign({}, state, {
        currentQuestionSet: updatedQuestionSet
      });
    default: {
      return state;
    }
  }
}
