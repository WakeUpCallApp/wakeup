import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import Parser from "./parser";
import { Quote, QuoteApi } from "../models/quote.model";

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
          allQuotes = allQuotes.concat(topic.quoteList.map(quoteApi => Parser.quoteFromApi(quoteApi)));
        });
        return allQuotes;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || "Server error");
  }
}
