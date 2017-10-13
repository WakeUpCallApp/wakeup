import { QuestionSet } from './question-set.model';
import { Quote, IQuoteApi } from './quote.model';

export interface ITopic {
    title: string;
    description: string;
    isDefault: boolean;
}

export interface ITopicApi {
    _id: number;
    title: string;
    description: string;
    user: string;
    createDate: string;
    questionSetList;
    quoteList: number[] | IQuoteApi[];
    isDefault: boolean;
}

export class Topic {
    quoteIds;
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public user: string,
        public createDate: Date,
        public questionSetIds: number[],
        public isDefault: boolean,
        public quotes?: Quote[] | number[],
        public questionSets?: QuestionSet[]
    ) { }

    static fromApi(topicApi: ITopicApi): Topic {
        return new Topic(
            topicApi._id,
            topicApi.title,
            topicApi.description,
            topicApi.user,
            new Date(topicApi.createDate),
            topicApi.questionSetList,
            topicApi.isDefault,
            topicApi.quoteList as number[]
        );
    }

    static toApi(topic: Topic): ITopicApi {
        const quotes = topic.quoteIds
            ? topic.quoteIds
            : (topic.quotes as Quote[]).map(quote => quote.id);
        return {
            _id: topic.id,
            title: topic.name,
            description: topic.description,
            user: topic.user,
            createDate: topic.createDate.toString(),
            questionSetList: topic.questionSetIds,
            quoteList: quotes,
            isDefault: topic.isDefault
        };
    }
}
