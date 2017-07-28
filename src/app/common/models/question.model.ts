import { Quote } from "./quote.model";

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
  answers: number[] | Object[];
  quote: number | Object;
}

export class Question {
  checked = false;
  constructor(
    public id: number,
    public text: string,
    public date: Date,
    public questionSetId: number,
    public answers: number[] | Object[],
    public quote?: number | Object
  ) {}
}
