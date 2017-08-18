import { Action } from "@ngrx/store";
import { Question } from "../models/question.model";
import * as actions from "../actions/question.actions";
import * as answerActions from "../actions/answer.actions";
import Helper from "./helper";

const helper = new Helper();

export interface State {
  entities: Question[];
  currentQuestion: Question;
  isLoading;
}

export const initialState: State = {
  entities: [],
  currentQuestion: <Question>{},
  isLoading: false
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD_SUCCESS:
      return Object.assign({}, state, {
        entities: helper.groupQuestionsByQuestionSet(action.payload),
        isLoading: false
      });
    case actions.ActionTypes.GET_CURRENT_QUESTION:
      return Object.assign({}, state, {
        isLoading: true
      });
    case actions.ActionTypes.GET_CURRENT_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        currentQuestion: processQuestion(action.payload),
        isLoading: false
      });
    case answerActions.ActionTypes.UPDATE_SUCCESS:
      return Object.assign({}, state, {
        currentQuestion: onUpdateAnswer(state.currentQuestion, action.payload)
      });
    case answerActions.ActionTypes.DELETE_SUCCESS:
      return Object.assign({}, state, {
        currentQuestion: onDeleteAnswer(state.currentQuestion, action.payload)
      });
    case answerActions.ActionTypes.CREATE_SUCCESS:
      return Object.assign({}, state, {
        currentQuestion: onCreateAnswer(state.currentQuestion, action.payload)
      });
    case answerActions.ActionTypes.DELETE_ALL:
      return Object.assign({}, state, {
        currentQuestion: onDeleteAllAnswers(state.currentQuestion)
      });
    default: {
      return state;
    }
  }
}

function processQuestion(question) {
  const newQuestion = Object.assign({}, question);
  newQuestion.groupedAnswers = helper.groupAnswersByDate(question.answers);

  return newQuestion;
}

function onUpdateAnswer(currentQuestion, answerToUpdate) {
  const updatedQuestion = Object.assign({}, currentQuestion);
  updatedQuestion.answers = updatedQuestion.answers.map(answer => {
    if (answer.id === answerToUpdate.id) {
      answer = Object.assign({}, answerToUpdate);
    }
    return answer;
  });
  return processQuestion(updatedQuestion);
}

function onDeleteAnswer(currentQuestion, answerToDelete) {
  const updatedQuestion = Object.assign({}, currentQuestion);
  updatedQuestion.answers = updatedQuestion.answers.filter(answer => {
    return answer.id !== answerToDelete;
  });
  return processQuestion(updatedQuestion);
}

function onCreateAnswer(currentQuestion, answerToAdd) {
  const updatedQuestion = Object.assign({}, currentQuestion);
  updatedQuestion.answers = [...(updatedQuestion.answers || []), answerToAdd];
  return processQuestion(updatedQuestion);
}

function onDeleteAllAnswers(currentQuestion) {
  const updatedQuestion = Object.assign({}, currentQuestion);
  updatedQuestion.answers = [];
  return processQuestion(updatedQuestion);
}
