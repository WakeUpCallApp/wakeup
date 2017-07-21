import { Question } from './question.model';

export interface IQuestionSet {
    id?: number;
    name: string;
    description: string;
    isDefault: boolean;
}

export interface QuestionSetApi {
    _id: number;
    name: string;
    description: string;
    user: string;
    practiceTimes: number;
    questions;
    isDefault: boolean;
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
        public questions?: Question[]
    ) { }
}
