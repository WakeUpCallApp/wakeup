import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import Parser from './parser';
import {
  Topic,
  ITopic,
  ITopicApi,
  IQuoteApi
} from '../../models';

@Injectable()
export class TopicApi {
  topics;
  populatedTopics;
  constructor(private http: HttpClient) { }

  all(): Observable<Topic[]> {
    if (this.topics) {
      return Observable.of(this.topics);
    }
    return this.http
      .get('/api/topics')
      .map((topicApiList: any) => {
        return topicApiList.map(topicApi => {
          return Parser.topicFromApi(topicApi);
        });
      })
      .do(topics => (this.topics = topics));
  }

  create(topic): Observable<Topic> {
    return this.http
      .post('/api/topics', topic)
      .map((topicApi: ITopicApi) => {
        return Parser.topicFromApi(topicApi);
      });
  }

  get(id: number): Observable<Topic> {
    const cachedTopic = this.populatedTopics ? this.findTopic(id) : undefined;
    if (cachedTopic) {
      return Observable.of(cachedTopic);
    }
    return this.http
      .get(`/api/topics/${id}`)
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
      .do(topic => (this.populatedTopics = [topic].concat(this.populatedTopics || [])));
  }

  update(topic: Topic): Observable<Topic> {
    return this.http
      .put(`/api/topics/${topic.id}`, Parser.topicToApi(topic))
      .map((topicApi: ITopicApi) => {
        const topicObj = Parser.topicFromApi(topicApi);
        topicObj.questionSets = topicApi.questionSetList.map(questionSetApi =>
          Parser.questionSetFromApi(questionSetApi)
        );
        topicObj.quoteIds = topicApi.quoteList;
        return topicObj;
      });
  }

  delete(topicId: number): Observable<number> {
    return this.http
      .delete(`/api/topics/${topicId}`)
      .map(() => topicId);
  }

  findTopic(topicId) {
    return this.populatedTopics.find(topic => topic.id === +topicId);
  }

  clearCache() {
    this.topics = undefined;
    this.populatedTopics = undefined;
  }

}
