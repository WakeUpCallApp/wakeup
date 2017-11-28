import { Topic } from '../../models/topic.model';
import * as actions from './topic.actions';
import { ActionTypes as quote } from '../quote/quote.actions';
export interface State {
  entities: Topic[];
  isLoading: boolean;
  currentTopic: Topic;
  searchTerm: string;
}

export const initialState: State = {
  entities: [],
  isLoading: false,
  currentTopic: undefined,
  searchTerm: undefined,
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case actions.ActionTypes.SEARCH_INPUT:
      return { ...state, searchTerm: action.payload };

    case actions.ActionTypes.LOAD:
    case actions.ActionTypes.CREATE:
    case actions.ActionTypes.UPDATE:
    case actions.ActionTypes.GET_CURRENT_TOPIC:
      return { ...state, isLoading: true };

    case actions.ActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        entities: action.payload,
        isLoading: false,
      };

    case actions.ActionTypes.GET_CURRENT_TOPIC_SUCCESS:
      return {
        ...state,
        currentTopic: action.payload,
        isLoading: false,
      };

    case actions.ActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        currentTopic: action.payload,
        isLoading: false,
      };

    case actions.ActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        currentTopic: { ...state.currentTopic, ...action.payload },
        isLoading: false,
      };
    case quote.IMPORT_QUOTES_SUCCESS:
      return {
        ...state,
        currentTopic: updateOnImport(state.currentTopic, action.payload),
      };
    default: {
      return state;
    }
  }
}
function updateOnImport(currentTopic, imported) {
  const topic = { ...currentTopic };
  topic.quotes = currentTopic.quotes.concat(imported);
  return topic;
}
