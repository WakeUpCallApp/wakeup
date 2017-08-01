import { TopicApi, Topic } from "./topic.model";

export interface Comment {
  _id?: number;
  createDate: Date;
  text: string;
}

export interface CreateComment {
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

export interface QuoteApi {
  _id: number;
  text: string;
  source: string;
  date: string;
  author: string;
  topic: number | TopicApi;
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
    public questionIds: number[],
    public commentList
  ) {}
}
