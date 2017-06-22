export interface ITopic {
    id?: number;
    title: string;
    description: string;
    isDefault: boolean; 
    questionSetList?: number[];
}

export interface TopicApi {
    _id: number;
    title: string;
    description: string;
    user: string;
    createDate: string;
    questionSetList: number[];
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
        public isDefault: boolean
    ) { }

}