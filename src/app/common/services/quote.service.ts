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
        let allQuotes = [];
        userTopics.forEach(topic => {
          allQuotes = allQuotes.concat(
            topic.quoteList.map(quoteApi => Parser.quoteFromApi(quoteApi))
          );
        });
        return allQuotes;
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
