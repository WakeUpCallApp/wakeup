import { QuestionSet } from '../../models/question-set.model';
import * as actions from './question-set.actions';
import Helper from '../helper';

const helper = new Helper();

export interface State {
  entities: QuestionSet[];
  isLoading: boolean;
  currentQuestionSet: QuestionSet;
  searchTerm: string;
  filter: actions.Filter;
  sessionDetailsData;
  showImportSpinner;
}

export const initialState: State = {
  entities: [],
  isLoading: false,
  currentQuestionSet: <QuestionSet>{},
  searchTerm: '',
  filter: actions.Filter.ALL,
  sessionDetailsData: [],
  showImportSpinner: undefined,
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case actions.ActionTypes.SEARCH_INPUT:
      return { ...state, searchTerm: action.payload };

    case actions.ActionTypes.FILTER:
      return { ...state, filter: action.payload };

    case actions.ActionTypes.LOAD:
    case actions.ActionTypes.UPDATE:
    case actions.ActionTypes.GET_CURRENT_QUESTION_SET:
    case actions.ActionTypes.CREATE:
    case actions.ActionTypes.ADD_QUESTION:
    case actions.ActionTypes.EDIT_QUESTION:
    case actions.ActionTypes.DELETE_QUESTION:
      return { ...state, isLoading: true };

    case actions.ActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        entities: action.payload,
        isLoading: false,
      };

    case actions.ActionTypes.REGISTER_SESSION_SUCCESS:
      return {
        ...state,
        entities: onRegisterSessionUpdate(state.entities, action.payload),
      };

    case actions.ActionTypes.GET_SESSION_DETAILS_SUCCESS:
      return {
        ...state,
        sessionDetailsData: getSessionDetails(action.payload),
        isLoading: false,
      };

    case actions.ActionTypes.GET_CURRENT_QUESTION_SET_SUCCESS:
      return {
        ...state,
        currentQuestionSet: getsortedQuestionsQS(action.payload),
        isLoading: false,
      };

    case actions.ActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        currentQuestionSet: action.payload,
        isLoading: false,
      };

    case actions.ActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        currentQuestionSet: {
          ...state.currentQuestionSet,
          ...action.payload,
        },
        isLoading: false,
      };

    case actions.ActionTypes.ADD_QUESTION_SUCCESS:
      return {
        ...state,
        currentQuestionSet: updateOnAddQuestion(
          state.currentQuestionSet,
          action.payload
        ),
        isLoading: false,
      };

    case actions.ActionTypes.EDIT_QUESTION_SUCCESS:
      return {
        ...state,
        currentQuestionSet: updateOnEditQuestion(
          state.currentQuestionSet,
          action.payload
        ),
        isLoading: false,
      };
    case actions.ActionTypes.DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        currentQuestionSet: updateOnDeleteQuestion(
          state.currentQuestionSet,
          action.payload
        ),
        isLoading: false,
      };
    case actions.ActionTypes.IMPORT_QUESTIONS:
      return { ...state, showImportSpinner: true };

    case actions.ActionTypes.IMPORT_QUESTIONS_SUCCESS:
      return {
        ...state,
        currentQuestionSet: updateOnImportQuestions(
          state.currentQuestionSet,
          action.payload
        ),
        showImportSpinner: false,
      };
    default: {
      return state;
    }
  }
}

function updateOnAddQuestion(questionSet, questionToAdd) {
  const updatedQuestionSet = {
    ...questionSet,
    questions: [...questionSet.questions, questionToAdd],
  };
  return updatedQuestionSet;
}

function updateOnEditQuestion(questionSet, questionToUpdate) {
  const updatedQuestionSet = <QuestionSet>{
    ...questionSet,
    questions: questionSet.questions.map(question => {
      if (question.id === questionToUpdate.id) {
        return { ...question, ...questionToUpdate };
      }
      return question;
    }),
  };
  return updatedQuestionSet;
}

function updateOnDeleteQuestion(questionSet, questionToDelete) {
  const updatedQuestionSet = {
    ...questionSet,
    questions: questionSet.questions.filter(
      question => question.id !== questionToDelete.id
    ),
  };
  return updatedQuestionSet;
}

function getSessionDetails(data) {
  const sessionDetails = data.slice(0);
  sessionDetails.forEach(question => {
    question.answers = question.answers.length
      ? helper.groupAnswersByDate(question.answers)
      : [];
  });
  return helper.sortQuestionsById(sessionDetails);
}

function updateOnImportQuestions(questionSet, questionsToAdd) {
  const updatedQuestionSet = {
    ...questionSet,
    questions: questionSet.questions.concat(questionsToAdd),
  };
  return updatedQuestionSet;
}

function getsortedQuestionsQS(questionSet) {
  const updatedQuestionSet = {
    ...questionSet,
    questions: helper.sortQuestionsById(questionSet.questions),
  };
  return updatedQuestionSet;
}

function onRegisterSessionUpdate(entities, questionSet) {
  return entities.map(entity => {
    if (entity.id === questionSet.id) {
      entity = { ...entity, ...questionSet };
    }
    return entity;
  });
}
