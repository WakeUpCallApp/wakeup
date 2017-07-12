export interface IAnswer {
    text: string;
    question: number;
}

export interface AnswerApi {
    _id: number;
    question: number;
    text: string;
    date: number;
}

export class Answer {
    constructor(
        public id: number,
        public questionid: number,
        public text: string,
        public createDate: Date) {}
} 