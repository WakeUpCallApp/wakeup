import * as moment from 'moment';

export interface IAnswer {
    text: string;
    questionId: number;
    date;
    userId;
}

export interface IAnswerApi {
    _id: number;
    question: number;
    text: string;
    date: number;
}

export class Answer {
    groupDay;
    constructor(
        public id: number,
        public questionid: number,
        public text: string,
        public createDate: Date,
        public userId) {
        this.groupDay = moment(createDate).format('dddd, DD MMM YYYY');
    }

    static fromApi(answer): Answer {
        return new Answer(
            answer._id,
            answer.question || (answer as any).questionId,
            answer.text,
            new Date(answer.date),
            answer.userId
        );
    }

    static toApi(answer: Answer) {
        return {
            _id: answer.id,
            local: true,
            questionId: answer.questionid,
            text: answer.text,
            date: answer.createDate.getTime(),
            userId: answer.userId
        };
    }
}
