import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import Parser from './parser';
import { Topic, ITopic, TopicApi } from '../models/topic.model';

@Injectable()
export class TopicService {
    constructor(private http: Http) { }

    all(): Observable<Topic[]> {
        return this.http.get('/api/topics')
            .map((response: Response) => response.json())
            .map((topicApiList) => {
                return topicApiList.map(topicApi => {
                    return Parser.topicFromApi(topicApi);
                })
            })
            .catch(this.handleError);
    }

    create(topic: ITopic): Observable<Topic> {
        return this.http.post('/api/topics', topic)
            .map((response: Response) => response.json())
            .map((topicApi: TopicApi) => {
                return Parser.topicFromApi(topicApi)
            })
            .catch(this.handleError);
    }

    get(id: number): Observable<Topic> {
        return this.http.get(`/api/topics/${id}`)
            .map((response: Response) => response.json())
            .map((topicApi: TopicApi) => {
                const topic = Parser.topicFromApi(topicApi);
                return topic;
            })
            .catch(this.handleError);
    }


    update(topic: ITopic): Observable<Topic> {
        return this.http.put(`/api/topics/${topic.id}`, topic)
            .map((response: Response) => response.json())
            .map((topicApi: TopicApi) => {
                const topic = Parser.topicFromApi(topicApi);
                return topic;
            })
            .catch(this.handleError);
    }

    delete(topicId: number): Observable<number> {
        return this.http.delete(`/api/topics/${topicId}`)
            .map(() => topicId)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }

    

}