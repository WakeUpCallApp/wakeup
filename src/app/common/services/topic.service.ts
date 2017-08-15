import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import Parser from './parser';
import { Topic, ITopic, TopicApi } from '../models/topic.model';
import { QuoteApi } from '../models/quote.model';

@Injectable()
export class TopicService {
  constructor(private http: Http) { }

  all(): Observable<Topic[]> {
    return this.http
      .get('/api/topics')
      .map((response: Response) => response.json())
      .map(topicApiList => {
        return topicApiList.map(topicApi => {
          return Parser.topicFromApi(topicApi);
        });
      })
      .catch(this.handleError);
  }

  create(topic): Observable<Topic> {
    return this.http
      .post('/api/topics', topic)
      .map((response: Response) => response.json())
      .map((topicApi: TopicApi) => {
        return Parser.topicFromApi(topicApi);
      })
      .catch(this.handleError);
  }

  get(id: number): Observable<Topic> {
    return this.http
      .get(`/api/topics/${id}`)
      .map((response: Response) => response.json())
      .map((topicApi: TopicApi) => {
        const topic = Parser.topicFromApi(topicApi);
        topic.questionSets = topicApi.questionSetList.map(questionSetApi =>
          Parser.questionSetFromApi(questionSetApi)
        );
        topic.quotes = (topicApi.quoteList as QuoteApi[]).map(quoteApi => Parser.quoteFromApi(quoteApi));
        return topic;
      })
      .catch(this.handleError);
  }

  update(topic: Topic): Observable<Topic> {
    return this.http
      .put(`/api/topics/${topic.id}`, Parser.topicToApi(topic))
      .map((response: Response) => response.json())
      .map((topicApi: TopicApi) => {
        const topicObj = Parser.topicFromApi(topicApi);
        topicObj.questionSets = topicApi.questionSetList.map(questionSetApi =>
          Parser.questionSetFromApi(questionSetApi)
        );
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

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
