import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';

import {
  Topic,
  ITopicApi,
  Quote,
  IQuoteApi,
  IQuote,
  ISuggestions,
  IComment,
  IQuoteImport
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
      return of(this.quotesPopulatedTopics);
    }
    return this.http
      .get('/api/quotes/userQuotes/')
      .pipe(map((userTopics: ITopicApi[]) => {
        return userTopics.map(topicApi => {
          const topic = Topic.fromApi(topicApi);
          topic.quotes = (topicApi.quoteList as IQuoteApi[]).map(quoteApi =>
            Quote.fromApi(quoteApi)
          );
          return topic;
        });
      }),
      tap(quotes => (this.quotesPopulatedTopics = quotes)));
  }

  get(topicId: number): Observable<Quote[]> {
    const cachedQuotes = this.quotes ? this.findByTopic(topicId) : undefined;
    if (cachedQuotes) {
      return of(cachedQuotes);
    }
    return this.http
      .get(`/api/quotes/${topicId}`)
      .pipe(map((quotes: IQuoteApi[]) => quotes.map(quoteApi => Quote.fromApi(quoteApi))),
      tap(quotes => {
        this.quotes = [...quotes].concat(this.quotes || []);
      }));
  }

  create(quote: IQuote): Observable<Quote> {
    return this.http
      .post(`/api/quotes/${quote.topic}`, quote)
      .map((quoteApi: IQuoteApi) => Quote.fromApi(quoteApi));
  }

  update(quote: Quote): Observable<Quote> {
    return this.http
      .put(`/api/quotes/${quote.id}`, Quote.toApi(quote))
      .pipe(map((quoteApi: IQuoteApi) => {
        const quoteResult = Quote.fromApi(quoteApi);
        quoteResult.topic = Topic.fromApi((quoteApi.topic as ITopicApi));
        return quoteResult;
      }));
  }

  delete(quote: Quote): Observable<Quote> {
    return this.http
      .delete(`/api/quotes/${quote.id}`)
      .pipe(map(() => quote));
  }

  getById(quoteId: number): Observable<Quote> {
    const cachedQuote = this.quotes ? this.findQuote(quoteId) : undefined;
    if (cachedQuote) {
      return of(cachedQuote);
    }
    return this.http
      .get(`/api/quotes/quote/${quoteId}`)
      .pipe(map((quoteApi: IQuoteApi) => {
        const quote = Quote.fromApi(quoteApi);
        quote.topic = Topic.fromApi((quoteApi.topic as ITopicApi));
        return quote;
      }));
  }

  getSuggestions(): Observable<ISuggestions> {
    if (this.suggestions) {
      return of(this.suggestions);
    }
    return this.http
      .get<ISuggestions>('/api/quotes/suggestions')
      .pipe(tap(suggestions => (this.suggestions = suggestions)));
  }

  getComments(quoteId: number): Observable<IComment[]> {
    if (this.comments.get(quoteId)) {
      return of(this.comments.get(quoteId));
    }
    return this.http
      .get<IComment[]>(`/api/quotes/comments/${quoteId}`)
      .pipe(tap(comments => (this.comments.set(quoteId, comments))));
  }

  addComment({ comment, quoteId, isDefaultTopic }): Observable<IComment> {
    return this.http
      .put<IComment>(`/api/quotes/addComment/${quoteId}/${isDefaultTopic}`, comment);
  }

  deleteComment({ quoteId, commentId }): Observable<string> {
    return this.http
      .delete(`/api/quotes/deleteComment/${quoteId}/${commentId}`)
      .pipe(map(() => commentId));
  }

  importQuotes(topicId: number, quotes: IQuoteImport[]): Observable<Quote[]> {
    return this.http
      .post(`/api/quotes/importQuotes/${topicId}`, { quotes })
      .pipe(map((apiQuotesList: IQuoteApi[]) => apiQuotesList.map(quoteApi => Quote.fromApi(quoteApi))));
  }

  clearCache() {
    this.suggestions = undefined;
    this.quotesPopulatedTopics = undefined;
    this.comments = new Map();
    this.quotes = undefined;
  }

  private findByTopic(topicId: number): Quote[] {
    const quotes = this.quotes.filter(quote => quote.topic === topicId);
    return quotes.length ? quotes : undefined;
  }

  private findQuote(quoteId: number): Quote {
    return this.quotes.find(quote => quote.id === quoteId);
  }

}
