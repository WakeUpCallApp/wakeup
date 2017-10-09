import { IAnswerApi } from './answer.model';
import { QuestionSet, IQuestionSetApi } from './question-set.model';

export interface IQuestion {
  id: number;
  text: string;
  questionSet: number;
  quote?;
}

export interface IQuestionApi {
  _id: number;
  text: string;
  date: string;
  questionSet: number | IQuestionSetApi;
  answers: number[] | Object[] | IAnswerApi[];
  quote: any;
}

export class Question {
  checked = false;
  questionSet : number | QuestionSet;
  constructor(
    public id: number,
    public text: string,
    public date: Date,
    public answers: number[] | Object[],
    public quote?: any
  ) {}
}
