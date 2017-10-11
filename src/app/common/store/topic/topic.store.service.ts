import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../app.store';
import * as topicActions from './topic.actions';

import {
    getTopics,
    getSortedTopics,
    getTopicSearchTerm,
    getCurrentTopic,
    isTopicLoading
} from '../app.selectors';

@Injectable()
export class TopicStoreService {
    topics$ = this.store.select(getTopics);
    sortedTopics$ = this.store.select(getSortedTopics);
    isLoading$ = this.store.select(isTopicLoading);
    currentTopic$ = this.store.select(getCurrentTopic);
    searchTerm$ = this.store.select(getTopicSearchTerm);

    constructor(private store: Store<reducers.AppState>) { }

    getAll() {
        this.store.dispatch(new topicActions.LoadAction());
    }

    get(topicId) {
        this.store.dispatch(new topicActions.GetCurrentTopicAction(topicId))
    }

    create(topic) {
        this.store.dispatch(new topicActions.CreateAction(topic));
    }

    update(topic) {
        this.store.dispatch(new topicActions.UpdateAction(topic));
    }

    delete(topic) {
        this.store.dispatch(new topicActions.DeleteAction(topic.id));
    }

    doSearch(val) {
        this.store.dispatch(new topicActions.SearchAction(val));
    }
}
