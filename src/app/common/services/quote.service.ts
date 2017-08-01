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

  create(quote: IQuote): Observable<Quote> {
    return this.http
      .post(`/api/quotes/${quote.topic}`, quote)
      .map((response: Response) => response.json())
      .map((quoteApi: QuoteApi) => {
        return Parser.quoteFromApi(quoteApi);
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || "Server error");
  }
}
