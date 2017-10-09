import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import Parser from "./parser";
import {
  Topic,
  ITopic,
  ITopicApi,
  IQuoteApi
} from "../../models";

@Injectable()
export class TopicApi {
  topics;
  populatedTopics;
  constructor(private http: Http) { }

  all(): Observable<Topic[]> {
    if (this.topics) {
      return Observable.of(this.topics);
    }
    return this.http
      .get("/api/topics")
      .map((response: Response) => response.json())
      .map(topicApiList => {
        return topicApiList.map(topicApi => {
          return Parser.topicFromApi(topicApi);
        });
      })
      .do(topics => (this.topics = topics))
      .catch(this.handleError);
  }

  create(topic): Observable<Topic> {
    return this.http
      .post("/api/topics", topic)
      .map((response: Response) => response.json())
      .map((topicApi: ITopicApi) => {
        return Parser.topicFromApi(topicApi);
      })
      .catch(this.handleError);
  }

  get(id: number): Observable<Topic> {
    const cachedTopic = this.populatedTopics ? this.findTopic(id) : undefined;
    if (cachedTopic) {
      return Observable.of(cachedTopic);
    }
    return this.http
      .get(`/api/topics/${id}`)
      .map((response: Response) => response.json())
      .map((topicApi: ITopicApi) => {
        const topic = Parser.topicFromApi(topicApi);
        topic.questionSets = topicApi.questionSetList.map(questionSetApi =>
          Parser.questionSetFromApi(questionSetApi)
        );
        topic.quotes = (topicApi.quoteList as IQuoteApi[]).map(quoteApi =>
          Parser.quoteFromApi(quoteApi)
        );
        return topic;
      })
      .do(topic => (this.populatedTopics = [topic].concat(this.populatedTopics || [])))
      .catch(this.handleError);
  }

  update(topic: Topic): Observable<Topic> {
    return this.http
      .put(`/api/topics/${topic.id}`, Parser.topicToApi(topic))
      .map((response: Response) => response.json())
      .map((topicApi: ITopicApi) => {
        const topicObj = Parser.topicFromApi(topicApi);
        topicObj.questionSets = topicApi.questionSetList.map(questionSetApi =>
          Parser.questionSetFromApi(questionSetApi)
        );
        topicObj.quoteIds = topicApi.quoteList;
        return topicObj;
      })
      .catch(this.handleError);
  }

  delete(topicId: number): Observable<number> {
    return this.http
      .delete(`/api/topics/${topicId}`)
      .map(() => topicId)
      .catch(this.handleError);
  }

  findTopic(topicId) {
    return this.populatedTopics.find(topic => topic.id === +topicId);
  }

  clearCache() {
    this.topics = undefined;
    this.populatedTopics = undefined;
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || "Server error");
  }
}
