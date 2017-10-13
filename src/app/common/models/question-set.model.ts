/* tslint:disable: member-ordering */
import { Question, IQuestionApi } from './question.model';
import { Answer } from './answer.model';
import { IQuoteApi } from './quote.model';

export interface IQuestionSet {
    id?: number;
    name: string;
    description: string;
    isDefault: boolean;
}

export interface IQuestionSetApi {
    _id: number;
    name: string;
    description: string;
    user: string;
    practiceTimes: number;
    questions;
    isDefault: boolean;
}

export interface ISessionDetailsQuestionApi {
    _id: number;
    text: string;
    date: string;
    questionSet: number;
    answers: any[];
    quote?: number | IQuoteApi
}

export interface ISessionDetailsQuestion extends ISessionDetailsQuestionApi {
    answers: Answer[]
}

export class QuestionSet {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public user: string,
        public practiceTimes: number,
        public questionIds: number[],
        public isDefault: boolean,
        public questions?: Question[] | number[]
    ) { }

    static fromApi(questionSetApi: IQuestionSetApi): QuestionSet {
        return new QuestionSet(
            questionSetApi._id,
            questionSetApi.name,
            questionSetApi.description,
            questionSetApi.user,
            questionSetApi.practiceTimes,
            questionSetApi.questions,
            questionSetApi.isDefault
        );
    }

    static toApi(questionSet: QuestionSet): IQuestionSetApi {
        return {
            _id: questionSet.id,
            name: questionSet.name,
            description: questionSet.description,
            user: questionSet.user,
            practiceTimes: questionSet.practiceTimes,
            questions: questionSet.questions,
            isDefault: questionSet.isDefault
        };
    }
}
