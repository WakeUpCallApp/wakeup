export class Question {
    constructor(public text: string,
    public date: Date,
    public questionSetId: number,
    public answerIds: number[],
    public quoteIds: number[]) {

    }
} 