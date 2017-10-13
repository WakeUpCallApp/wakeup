/* tslint:disable: member-ordering */
import { IAnswerApi } from './answer.model';
import { QuestionSet, IQuestionSetApi } from './question-set.model';

export interface IQuestion {
  id: number;
  text: string;
  questionSet: number;
  quote?: any;
}

export interface IQuestionApi {
  _id: number;
  text: string;
  date: string;
  questionSet: number | IQuestionSetApi;
  answers: number[] | Object[] | IAnswerApi[];
  quote: any;
}

export interface IQuestionSummary {
  id: number;
  questionSet: string;
  text: string;
}

export class Question {
  checked = false;
  questionSet: number | QuestionSet;
  constructor(
    public id: number,
    public text: string,
    public date: Date,
    public answers: number[] | Object[],
    public quote?: any
  ) { }

  static fromApi(questionApi: IQuestionApi): Question {
    return new Question(
      questionApi._id,
      questionApi.text,
      new Date(questionApi.date),
      questionApi.answers,
      questionApi.quote
    );
  }

  static questionSummary(question): IQuestionSummary {
    return {
      id: question.id,
      questionSet: question.questionSet,
      text: question.text
    };
  }

  static toApi(question: Question): IQuestionApi {
    const questionSet =
      question.questionSet instanceof Object
        ? (question.questionSet as QuestionSet).id
        : question.questionSet;
    return {
      _id: question.id,
      text: question.text,
      date: question.date.toString(),
      answers: question.answers,
      quote: question.quote,
      questionSet: questionSet as number
    };
  }
}
