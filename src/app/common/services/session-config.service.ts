import { Injectable } from '@angular/core';

export interface SessionOptions {
    questionInterval: number;
    repeatQS: boolean;
    shuffleQuestions: boolean;
}

@Injectable()
export class SessionConfigService {
    private options: SessionOptions;
    constructor() { }

    setOptions(options: SessionOptions) {
        this.options = options;
    }
    getOptions() {
        return this.options;
    }
}
