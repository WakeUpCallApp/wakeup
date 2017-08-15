import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import Parser from "./parser";
import { Quote, QuoteApi, IQuote } from "../models/quote.model";

@Injectable()
export class QuoteService {
  constructor(private http: Http) {}

  all(): Observable<Quote[]> {
    return this.http
      .get("/api/quotes/userQuotes/")
      .map((response: Response) => response.json())
      .map(userTopics => {
        return userTopics.map(topicApi => {
          const topic = Parser.topicFromApi(topicApi);
          topic.quotes = topicApi.quoteList.map(quoteApi =>
            Parser.quoteFromApi(quoteApi)
          );
          return topic;
        });
      })
      .catch(this.handleError);
  }

  get(topicId: number): Observable<Quote[]> {
    return this.http
      .get(`/api/quotes/${topicId}`)
      .map((response: Response) => response.json())
      .map(quotes => {
        return quotes.map(quoteApi => Parser.quoteFromApi(quoteApi));
      })
      .catch(this.handleError);
  }

  create(quote: IQuote): Observable<Quote> {
    return this.http
      .post(`/api/quotes/${quote.topic}`, quote)
      .map((response: Response) => response.json())
      .map((quoteApi: QuoteApi) => {
        return Parser.quoteFromApi(quoteApi);
      })
      .catch(this.handleError);
  }

  update(quote: Quote): Observable<Quote> {
    return this.http
      .put(`/api/quotes/${quote.id}`, Parser.quoteToApi(quote))
      .map((response: Response) => response.json())
      .map(quoteApi => {
        const quote = Parser.quoteFromApi(quoteApi);
        quote.topic = Parser.topicFromApi(quoteApi.topic);
        return quote;
      })
      .catch(this.handleError);
  }

  delete(quote: Quote): Observable<number> {
    return this.http
      .delete(`/api/quotes/${quote.id}`)
      .map((response: Response) => response.json())
      .map(() => {
        return quote;
      })
      .catch(this.handleError);
  }

  getById(quoteId): Observable<Quote> {
    return this.http
      .get(`/api/quotes/quote/${quoteId}`)
      .map((response: Response) => response.json())
      .map(quoteApi => {
        const quote = Parser.quoteFromApi(quoteApi);
        quote.topic = Parser.topicFromApi(quoteApi.topic);
        return quote;
      })
      .catch(this.handleError);
  }

  getSuggestions() {
    return this.http
      .get("/api/quotes/suggestions")
      .map((response: Response) => response.json())
      .map(suggestions => suggestions)
      .catch(this.handleError);
  }

  getComments(quoteId) {
    return this.http
      .get(`/api/quotes/comments/${quoteId}`)
      .map((response: Response) => response.json())
      .map(commentsList => {
        return commentsList;
      })
      .catch(this.handleError);
  }

  addComment({ comment, quoteId, isDefaultTopic }) {
    return this.http
      .put(`/api/quotes/addComment/${quoteId}/${isDefaultTopic}`, comment)
      .map((response: Response) => response.json())
      .map(comment => comment)
      .catch(this.handleError);
  }

  deleteComment({ quoteId, commentId }) {
    return this.http
      .delete(`/api/quotes/deleteComment/${quoteId}/${commentId}`)
      .map((response: Response) => response.json())
      .map(() => quoteId)
      .catch(this.handleError);
  }

  importQuotes(topicId, quotes) {
    return this.http
      .post(`/api/quotes/importQuotes/${topicId}`, {
        quotes: quotes
      })
      .map((response: Response) => response.json())
      .map(apiQuotesList => {
        return apiQuotesList.map(quoteApi => Parser.quoteFromApi(quoteApi));
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || "Server error");
  }
}
