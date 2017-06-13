export interface IQuestion{
text: string,
questionSet: number,
quote?: number
}

export interface QuestionApi {
    _id: number;
    text: string;
    date: string;
    questionSet: number;
    answers: number[]
}

export class Question {
    checked: boolean = false;
    constructor(
    public id: number,    
    public text: string,
    public date: Date,
    public questionSetId: number,
    public answerIds: number[],
    public quoteIds?: number[]) {
    }
} 