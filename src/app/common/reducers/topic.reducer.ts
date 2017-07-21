import { Action } from '@ngrx/store';
import { Topic } from '../models/topic.model';
import * as actions from '../actions/topic.actions';

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
  searchTerm: undefined
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case actions.ActionTypes.SEARCH_INPUT:
      return Object.assign({}, state, { searchTerm: action.payload });
    case actions.ActionTypes.LOAD:
      return Object.assign({}, state, { isLoading: true });
    case actions.ActionTypes.LOAD_SUCCESS:
      return Object.assign({}, state, {
        entities: action.payload,
        isLoading: false
      });
    case actions.ActionTypes.GET_CURRENT_TOPIC_SUCCESS:
      return Object.assign({}, state, {
        currentTopic: action.payload
      });

    case actions.ActionTypes.CREATE_SUCCESS:
      return Object.assign({}, state, {
        currentTopic: action.payload
      });
    case actions.ActionTypes.UPDATE_SUCCESS:
      return Object.assign({}, state, {
        currentTopic: Object.assign({}, state.currentTopic, action.payload)
      });
    default: {
      return state;
    }
  }
}
