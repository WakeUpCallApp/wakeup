import { QuestionSet } from './question-set.model';
import { Quote } from './quote.model';

export interface ITopic {
    title: string;
    description: string;
    isDefault: boolean;
}

export interface TopicApi {
    _id: number;
    title: string;
    description: string;
    user: string;
    createDate: string;
    questionSetList;
    quoteList: number[];
    isDefault: boolean;
}

export class Topic {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public user: string,
        public createDate: Date,
        public questionSetIds: number[],
        public quoteIds: number[],
        public isDefault: boolean,
        public questionSets?: QuestionSet[],
        public quotes?: Quote[]
    ) { }
}
