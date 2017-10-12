import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import Parser from './parser';
import { Quote, IQuoteApi, IQuote } from '../../models/quote.model';

@Injectable()
export class QuoteApi {
  private suggestions;
  private userQuotes;
  private quotes;
  private comments;
  constructor(private http: HttpClient) { }

  all(): Observable<Quote[]> {
    if (this.userQuotes) {
      return Observable.of(this.userQuotes);
    }
    return this.http
      .get('/api/quotes/userQuotes/')
      .map((userTopics: any) => {
        return userTopics.map(topicApi => {
          const topic = Parser.topicFromApi(topicApi);
          topic.quotes = topicApi.quoteList.map(quoteApi =>
            Parser.quoteFromApi(quoteApi)
          );
          return topic;
        });
      })
      .do(quotes => (this.userQuotes = quotes));
  }

  get(topicId: number): Observable<Quote[]> {
    const cachedQuotes = this.quotes ? this.findByTopic(topicId) : undefined;
    if (cachedQuotes) {
      return Observable.of(cachedQuotes);
    }
    return this.http
      .get(`/api/quotes/${topicId}`)
      .map((quotes: any) => {
        return quotes.map(quoteApi => Parser.quoteFromApi(quoteApi));
      })
      .do(quotes => {
        this.quotes = [...quotes].concat(this.quotes || []);
      });
  }

  create(quote: IQuote): Observable<Quote> {
    return this.http
      .post(`/api/quotes/${quote.topic}`, quote)
      .map((quoteApi: IQuoteApi) => {
        return Parser.quoteFromApi(quoteApi);
      });
  }

  update(quote: Quote): Observable<Quote> {
    return this.http
      .put(`/api/quotes/${quote.id}`, Parser.quoteToApi(quote))
      .map((quoteApi: any) => {
        const quoteResult = Parser.quoteFromApi(quoteApi);
        quoteResult.topic = Parser.topicFromApi(quoteApi.topic);
        return quoteResult;
      });
  }

  delete(quote: Quote): Observable<Quote> {
    return this.http
      .delete(`/api/quotes/${quote.id}`)
      .map(() => quote);
  }

  getById(quoteId): Observable<Quote> {
    const cachedQuote = this.quotes ? this.findQuote(quoteId) : undefined;
    if (cachedQuote) {
      return Observable.of(cachedQuote);
    }
    return this.http
      .get(`/api/quotes/quote/${quoteId}`)
      .map((quoteApi: any) => {
        const quote = Parser.quoteFromApi(quoteApi);
        quote.topic = Parser.topicFromApi(quoteApi.topic);
        return quote;
      });
  }

  getSuggestions() {
    if (this.suggestions) {
      return Observable.of(this.suggestions);
    }
    return this.http
      .get('/api/quotes/suggestions')
      .do(suggestions => (this.suggestions = suggestions));
  }

  getComments(quoteId) {
    if (this.comments) {
      return Observable.of(this.comments);
    }
    return this.http
      .get(`/api/quotes/comments/${quoteId}`)
      .do(comments => (this.comments = comments));
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
        return apiQuotesList.map(quoteApi => Parser.quoteFromApi(quoteApi));
      });
  }

  clearCache() {
    this.suggestions = undefined;
    this.userQuotes = undefined;
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
