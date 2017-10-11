import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../app.store';
import * as quoteActions from './quote.actions';

import {
    getCurrentQuote,
    getQuotesByTopic,
    isQuotesImporting,
    getAuthorSuggestions,
    getSourceSuggestions,
    getComments,
    getTopicsWithQuotes,
    isQuoteLoading
} from '../app.selectors';

@Injectable()
export class QuoteStoreService {
    currentQuote$ = this.store.select(getCurrentQuote);
    quotesByTopic$ = this.store.select(getQuotesByTopic);
    isLoading$ = this.store.select(isQuoteLoading);
    isImporting$ = this.store.select(isQuotesImporting);
    authorSuggestions$ = this.store.select(getAuthorSuggestions);
    sourceSuggestions$ = this.store.select(getSourceSuggestions);
    comments$ = this.store.select(getComments);
    topicsWithQuotes$ = this.store.select(getTopicsWithQuotes);

    constructor(private store: Store<reducers.AppState>) { }

    getSuggestions() {
        this.store.dispatch(new quoteActions.GetSuggestionsAction());
    }

    getComments(quoteId) {
        this.store.dispatch(new quoteActions.GetCommentsAction(quoteId))
    }

    create(quote) {
        const newQuote = Object.assign({}, quote, { date: new Date() });
        this.store.dispatch(new quoteActions.CreateAction(quote));
    }

    getById(quote) {
        this.store.dispatch(new quoteActions.GetByIdAction(quote));
    }

    getByTopicId(topicId) {
        this.store.dispatch(new quoteActions.GetByTopicIdAction(topicId))
    }

    getAll() {
        this.store.dispatch(new quoteActions.LoadAction());
    }

    update(quote) {
        this.store.dispatch(new quoteActions.UpdateAction(quote));
    }

    delete(quote) {
        this.store.dispatch(new quoteActions.DeleteAction(quote));
    }

    createComment(comment) {
        const commentObj = Object.assign(
            {},
            comment,
            { createDate: new Date() });
        this.store.dispatch(new quoteActions.CreateCommentAction(commentObj));
    }

    deleteComment(quoteId, commentId) {
        this.store.dispatch(
            new quoteActions.DeleteCommentAction({
                quoteId,
                commentId
            })
        );
    }

    importQuotes(topicId, quotes) {
        this.store.dispatch(
            new quoteActions.ImportQuotesAction({
                topicId,
                quotes
            })
        );
    }

    exportQuotes(topicName, quotes) {
        this.store.dispatch(
            new quoteActions.ExportQuotesAction({
                quotes,
                topicName
            })
        );
    }
}
