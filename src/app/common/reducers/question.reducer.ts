import { Action } from "@ngrx/store";
import { Question } from "../models/question.model";
import * as actions from "../actions/question.actions";
import Helper from "./helper";

const helper = new Helper();

export interface State {
  entities: Question[];
  currentQuestion: Question;
}

export const initialState: State = {
  entities: [],
  currentQuestion: <Question>{}
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
        currentQuestion: processQuestion(action.payload)
      });
    default: {
      return state;
    }
  }
}

function processQuestion(question) {
  const newQuestion = Object.assign({}, question);
  newQuestion.answers = helper.groupAnswersByDate(question.answers);
  newQuestion.answers = newQuestion.answers.map(answersGroup => {
    answersGroup.answers = helper.sortAnswersByDate(answersGroup.answers);
    return answersGroup;
  });
  return newQuestion;
}
