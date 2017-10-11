import { State } from './topic.reducer';
import { Topic } from '../../models/topic.model';

export const getTopics = (state: State): Topic[] => state.entities;
export const getSortedTopics = (state: State): Topic[] =>
    state.entities.sort((topic1, topic2) => {
        return topic1.name.toLowerCase().localeCompare(topic2.name.toLowerCase());
    });
export const getSearchTerm = (state: State): string =>
    state.searchTerm;

export const getCurrentTopic = (state: State): Topic =>
    state.currentTopic;

export const isLoading = (state: State): boolean =>
    state.isLoading;