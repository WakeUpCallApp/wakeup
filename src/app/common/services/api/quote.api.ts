import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {
  Topic,
  ITopicApi,
  Quote,
  IQuoteApi,
  IQuote,
  ISuggestions
} from '../../models';

@Injectable()
export class QuoteApi {
  private suggestions;
  private quotesPopulatedTopics;
  private quotes;
  private comments = new Map();
  constructor(private http: HttpClient) { }

  all(): Observable<Topic[]> {
    if (this.quotesPopulatedTopics) {
      return Observable.of(this.quotesPopulatedTopics);
    }
    return this.http
      .get('/api/quotes/userQuotes/')
      .map((userTopics: ITopicApi[]) => {
        return userTopics.map(topicApi => {
          const topic = Topic.fromApi(topicApi);
          topic.quotes = (topicApi.quoteList as IQuoteApi[]).map(quoteApi =>
            Quote.fromApi(quoteApi)
          );
          return topic;
        });
      })
      .do(quotes => (this.quotesPopulatedTopics = quotes));
  }

  get(topicId: number): Observable<Quote[]> {
    const cachedQuotes = this.quotes ? this.findByTopic(topicId) : undefined;
    if (cachedQuotes) {
      return Observable.of(cachedQuotes);
    }
    return this.http
      .get(`/api/quotes/${topicId}`)
      .map((quotes: IQuoteApi[]) => quotes.map(quoteApi => Quote.fromApi(quoteApi)))
      .do(quotes => {
        this.quotes = [...quotes].concat(this.quotes || []);
      });
  }

  create(quote: IQuote): Observable<Quote> {
    return this.http
      .post(`/api/quotes/${quote.topic}`, quote)
      .map((quoteApi: IQuoteApi) => Quote.fromApi(quoteApi));
  }

  update(quote: Quote): Observable<Quote> {
    return this.http
      .put(`/api/quotes/${quote.id}`, Quote.toApi(quote))
      .map((quoteApi: IQuoteApi) => {
        const quoteResult = Quote.fromApi(quoteApi);
        quoteResult.topic = Topic.fromApi((quoteApi.topic as ITopicApi));
        return quoteResult;
      });
  }

  delete(quote: Quote): Observable<Quote> {
    return this.http
      .delete(`/api/quotes/${quote.id}`)
      .map(() => quote);
  }

  getById(quoteId: number): Observable<Quote> {
    const cachedQuote = this.quotes ? this.findQuote(quoteId) : undefined;
    if (cachedQuote) {
      return Observable.of(cachedQuote);
    }
    return this.http
      .get(`/api/quotes/quote/${quoteId}`)
      .map((quoteApi: IQuoteApi) => {
        const quote = Quote.fromApi(quoteApi);
        quote.topic = Topic.fromApi((quoteApi.topic as ITopicApi));
        return quote;
      });
  }

  getSuggestions(): Observable<ISuggestions> {
    if (this.suggestions) {
      return Observable.of(this.suggestions);
    }
    return this.http
      .get<ISuggestions>('/api/quotes/suggestions')
      .do(suggestions => (this.suggestions = suggestions));
  }

  getComments(quoteId: number) {
    if (this.comments.get(quoteId)) {
      return Observable.of(this.comments.get(quoteId));
    }
    return this.http
      .get(`/api/quotes/comments/${quoteId}`)
      .do(comments => (this.comments.set(quoteId, comments)));
  }

  addComment({ comment, quoteId, isDefaultTopic }) {
    return this.http
      .put(`/api/quotes/addComment/${quoteId}/${isDefaultTopic}`, comment);
  }

  deleteComment({ quoteId, commentId }) {
    return this.http
      .delete(`/api/quotes/deleteComment/${quoteId}/${commentId}`)
      .map(() => quoteId);
  }

  importQuotes(topicId, quotes) {
    return this.http
      .post(`/api/quotes/importQuotes/${topicId}`, {
        quotes: quotes
      })
      .map((apiQuotesList: any) => {
        return apiQuotesList.map(quoteApi => Quote.fromApi(quoteApi));
      });
  }

  clearCache() {
    this.suggestions = undefined;
    this.quotesPopulatedTopics = undefined;
    this.comments = undefined;
    this.quotes = undefined;
  }

  private findByTopic(topicId) {
    const quotes = this.quotes.filter(quote => quote.topic === topicId);
    return quotes.length ? quotes : undefined;
  }

  private findQuote(quoteId) {
    return this.quotes.find(quote => quote.id === quoteId);
  }

}
