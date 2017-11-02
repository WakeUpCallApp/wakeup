import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';

import {
  QuestionSet,
  Topic,
  Quote,
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
      return of(this.topics);
    }
    return this.http
      .get('/api/topics')
      .pipe(map((topicApiList: ITopicApi[]) => {
        return topicApiList.map(topicApi => Topic.fromApi(topicApi));
      }),
      tap(topics => (this.topics = topics)));
  }

  create(topic): Observable<Topic> {
    return this.http
      .post('/api/topics', topic)
      .pipe(map((topicApi: ITopicApi) => Topic.fromApi(topicApi)));
  }

  get(id: number): Observable<Topic> {
    const cachedTopic = this.populatedTopics ? this.findTopic(id) : undefined;
    if (cachedTopic) {
      return of(cachedTopic);
    }
    return this.http
      .get(`/api/topics/${id}`)
      .pipe(map((topicApi: ITopicApi) => {
        const topic = Topic.fromApi(topicApi);
        topic.questionSets = topicApi.questionSetList.map(questionSetApi =>
          QuestionSet.fromApi(questionSetApi)
        );
        topic.quotes = (topicApi.quoteList as IQuoteApi[]).map(quoteApi =>
          Quote.fromApi(quoteApi)
        );
        return topic;
      }),
      tap(topic => (this.populatedTopics = [topic].concat(this.populatedTopics || []))));
  }

  update(topic: Topic): Observable<Topic> {
    return this.http
      .put(`/api/topics/${topic.id}`, Topic.toApi(topic))
      .pipe(map((topicApi: ITopicApi) => {
        const topicObj = Topic.fromApi(topicApi);
        topicObj.questionSets = topicApi.questionSetList.map(questionSetApi =>
          QuestionSet.fromApi(questionSetApi)
        );
        topicObj.quoteIds = topicApi.quoteList;
        return topicObj;
      }));
  }

  delete(topicId: number): Observable<number> {
    return this.http
      .delete(`/api/topics/${topicId}`)
      .pipe(map(() => topicId));
  }

  findTopic(topicId: number): Topic {
    return this.populatedTopics.find(topic => topic.id === +topicId);
  }

  clearCache() {
    this.topics = undefined;
    this.populatedTopics = undefined;
  }

}
