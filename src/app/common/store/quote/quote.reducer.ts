import { Quote, Topic } from '../../models';
import * as actions from './quote.actions';

export interface State {
  topicsWithQuotes: Topic[];
  isLoading: boolean;
  currentQuote: Quote;
  quotesByTopic: Quote[];
  suggestions;
  comments;
  importSpinner;
}

export const initialState: State = {
  topicsWithQuotes: [],
  quotesByTopic: [],
  isLoading: false,
  currentQuote: <Quote>{},
  suggestions: {},
  comments: [],
  importSpinner: undefined,
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD:
      return { ...state, isLoading: true };

    case actions.ActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        topicsWithQuotes: action.payload,
        isLoading: false,
      };

    case actions.ActionTypes.GET_COMMENTS:
    case actions.ActionTypes.CREATE_COMMENT:
    case actions.ActionTypes.DELETE_COMMENT:
    case actions.ActionTypes.GET_BY_TOPIC_ID:
    case actions.ActionTypes.CREATE:
    case actions.ActionTypes.UPDATE:
      return { ...state, isLoading: true };

    case actions.ActionTypes.CREATE_COMMENT_ERROR:
    case actions.ActionTypes.DELETE_COMMENT_ERROR:
    case actions.ActionTypes.GET_BY_TOPIC_ID:
    case actions.ActionTypes.CREATE_ERROR:
    case actions.ActionTypes.UPDATE_ERROR:
      return { ...state, isLoading: false };

    case actions.ActionTypes.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        isLoading: false,
      };

    case actions.ActionTypes.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        isLoading: false,
      };

    case actions.ActionTypes.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: onDeleteComment(state.comments, action.payload),
        isLoading: false,
      };

    case actions.ActionTypes.GET_BY_TOPIC_ID_SUCCESS:
      return {
        ...state,
        quotesByTopic: action.payload,
        isLoading: false,
      };

    case actions.ActionTypes.GET_SUGGESTIONS_SUCCESS:
      return { ...state, suggestions: action.payload };

    case actions.ActionTypes.CREATE_SUCCESS:
    case actions.ActionTypes.GET_BY_ID_SUCCESS:
    case actions.ActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        currentQuote: action.payload,
        isLoading: false,
      };

    case actions.ActionTypes.IMPORT_QUOTES:
      return { ...state, importSpinner: true };

    case actions.ActionTypes.IMPORT_QUOTES_SUCCESS:
      return {
        ...state,
        quotesByTopic: state.quotesByTopic.concat(action.payload),
        importSpinner: false,
      };

    default: {
      return state;
    }
  }
}

function onDeleteComment(commentList, commentToDelete) {
  return commentList.filter(comment => comment._id !== commentToDelete);
}
