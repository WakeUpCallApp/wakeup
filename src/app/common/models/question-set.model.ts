export interface IQuestionSet {
    name: string;
    description: string;
}

export interface QuesstionSetApi {
    _id: number;
    name: string;
    description: string;
    user: string;
    practiceTimes: number;
    questions: number[];
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
        public isDefault: boolean
    ) { }

}