import { Quote, QuoteApi } from './quote.model';
import { AnswerApi } from './answer.model';

export interface IQuestion {
  id: number;
  text: string;
  questionSet: number;
  quote?;
}

export interface QuestionApi {
  _id: number;
  text: string;
  date: string;
  questionSet: number;
  answers: number[] | Object[] | AnswerApi[];
  quote: any;
}

export class Question {
  checked = false;
  constructor(
    public id: number,
    public text: string,
    public date: Date,
    public questionSetId: number,
    public answers: number[] | Object[],
    public quote?: any
  ) {}
}
