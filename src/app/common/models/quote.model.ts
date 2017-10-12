import { ITopicApi, Topic } from './topic.model';
import { Question } from './question.model';

export interface Comment {
  _id?: number;
  createDate: Date;
  text: string;
}

export interface ICreateComment {
  comment: Comment;
  quoteId: number;
  isDefaultTopic: boolean;
}

export interface IQuote {
  text: string;
  source: string;
  author: string;
  topic: number;
  questions: number[];
}

export interface IQuoteApi {
  _id: number;
  text: string;
  source: string;
  date: string;
  author: string;
  topic: number | ITopicApi;
  questions;
  commentList;
}

export class Quote {
  constructor(
    public id: number,
    public text: string,
    public source: string,
    public date: Date,
    public author: string,
    public topic: number | Topic,
    public questions: number[] | Question[],
    public commentList
  ) {}
}
