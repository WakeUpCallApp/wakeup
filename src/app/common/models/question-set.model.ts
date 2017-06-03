export class QuestionSet {
    constructor(public name: string,
    public description: string,
    public user: string,
    public createDate: Date,
    public practiceTimes: number,
    public questionIds: number[],
    public isDefault: boolean,
    public userPractice: number
    ){}

}