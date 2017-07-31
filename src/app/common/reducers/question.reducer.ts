import { Action } from "@ngrx/store";
import { Question } from "../models/question.model";
import * as actions from "../actions/question.actions";
import * as answerActions from "../actions/answer.actions";
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
    case answerActions.ActionTypes.UPDATE_SUCCESS:
      return Object.assign({}, state, {
        currentQuestion: updateAnswer(state.currentQuestion, action.payload)
      });
    case answerActions.ActionTypes.DELETE_SUCCESS:
      return Object.assign({}, state, {
        currentQuestion: deleteAnswer(state.currentQuestion, action.payload)
      });
    default: {
      return state;
    }
  }
}

function processQuestion(question) {
  const newQuestion = Object.assign({}, question);
  newQuestion.groupedAnswers = helper.groupAnswersByDate(question.answers);
  newQuestion.groupedAnswers = newQuestion.groupedAnswers.map(answersGroup => {
    answersGroup.answers = helper.sortAnswersByDate(answersGroup.answers);
    return answersGroup;
  });
  return newQuestion;
}

function updateAnswer(currentQuestion, answerToUpdate) {
  const updatedQuestion = Object.assign({}, currentQuestion);
  updatedQuestion.answers = updatedQuestion.answers.map(answer => {
    if (answer.id === answerToUpdate.id) {
      answer = Object.assign({}, answerToUpdate);
    }
    return answer;
  });
  return processQuestion(updatedQuestion);
}

function deleteAnswer(currentQuestion, answerToDelete) {
  const updatedQuestion = Object.assign({}, currentQuestion);
  updatedQuestion.answers = updatedQuestion.answers.filter(answer => {
    return answer.id !== answerToDelete;
  });
  return processQuestion(updatedQuestion);
}
