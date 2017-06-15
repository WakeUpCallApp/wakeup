export interface QuoteApi {
  _id: number;
  text: string;
  source: string;
  date: string;
  author: string;
  topic: number;
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
    public topicId: number,
    public questionIds: number[],
    public commentList
  ) {}
}
