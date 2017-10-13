/* tslint:disable: member-ordering */
import * as moment from 'moment';
import { ITopicApi, Topic } from './topic.model';
import { Question } from './question.model';

export interface IComment {
  _id?: number;
  createDate: Date;
  text: string;
  user: string;
}

export interface ICreateComment {
  comment: IComment;
  quoteId: number;
  isDefaultTopic: boolean;
}

export interface IQuoteImport {
  author: string;
  source: string;
  text: string;
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
  questions: any[];
  commentList: any[];
}

export interface ISuggestions {
  authors: string[];
  sources: string[];
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
  ) { }

  static fromApi(quoteApi: IQuoteApi): Quote {
    const questions = quoteApi.questions
      ? quoteApi.questions.map(questionApi =>
        Question.fromApi(questionApi)
      )
      : [];
    return new Quote(
      quoteApi._id,
      quoteApi.text,
      quoteApi.source,
      new Date(quoteApi.date),
      quoteApi.author,
      quoteApi.topic as number,
      questions,
      quoteApi.commentList
    );
  }

  static toApi(quote: Quote): IQuoteApi {
    return {
      _id: quote.id,
      text: quote.text,
      source: quote.source,
      date: moment(quote.date).isValid() ? quote.date.toISOString() : undefined,
      author: quote.author,
      topic: (quote.topic as Topic).id,
      questions: (quote.questions as Question[]).map(question => question.id),
      commentList: quote.commentList
    };
  }
}

