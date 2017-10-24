import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { QuestionSetApi } from './question-set.api';
import { IAnswerApi, Answer, ISessionDetailsQuestion } from 'app/common/models';

@Injectable()
export class AnswersIndexedDbApi {
    db = null;
    lastIndex = 0;

    constructor(
        private questionSetApi: QuestionSetApi) {
        if (!('indexedDB' in window)) {
            alert('This browser doesn\'t support IndexedDB');
            return;
        }
    }

    openIndexedDb() {
        const version = 3;
        if (this.db) {
            return Observable.of('db already open');
        }
        const dbObservable = Observable.create((observer) => {
            const request = indexedDB.open('answersData', version);
            request.onsuccess = ((e: any) => {
                this.db = e.target.result;
                observer.next('indexedDb is open');
                observer.complete();
            });
            request.onerror = (error) => {
                console.log(error);
                throw new Error(`${error}`)
            }
            request.onupgradeneeded = this.upgradeCallback;
        });
        return dbObservable.shareReplay();
    }

    upgradeCallback(e) {
        this.db = e.target.result;
        e.target.transaction.onerror = (indexedDB as any).onerror;
        if (this.db.objectStoreNames.contains('answers')) {
            this.db.deleteObjectStore('answers');
        }
        const store = this.db.createObjectStore('answers', {
            keyPath: '_id'
        });
        store.createIndex('question', 'questionId', {
            unique: false
        });
    }

    saveAnswer(answer: IAnswerApi): Promise<Answer> {
        if (this.db === null) {
            Promise.reject('IndexDB is not opened yet!');
        }
        return this.getLastIndex().then((lastIndex: any) => {
            const trans = this.db.transaction(['answers'], 'readwrite');
            const store = trans.objectStore('answers');
            if (!lastIndex || lastIndex === 0) {
                lastIndex = 800; // add 800 so that there is no _id conflict with the old mongodb stored answers
            }
            answer._id = ++lastIndex;
            answer.local = true;
            const request = store.put(answer);

            return new Promise<Answer>((resolve, reject) => {
                request.onsuccess = (e) => resolve(Answer.fromApi(answer));
                request.onerror = (e) => reject(e);
            });
        });
    }

    updateAnswer(answer: Answer): Promise<Answer> {
        if (this.db === null) {
            Promise.reject('IndexedDB is not opened yet!');
        }
        const trans = this.db.transaction(['answers'], 'readwrite');
        const store = trans.objectStore('answers');
        const request = store.put(Answer.toApi(answer));
        return new Promise((resolve, reject) => {
            request.onsuccess = (e) => resolve(answer);
            request.onerror = (e) => reject(e);
        });
    }

    getAnswers(questionId: number): Promise<Answer[]> {
        if (this.db === null) {
            Promise.reject('IndexDB is not opened yet');
        }
        const trans = this.db.transaction(['answers'], 'readonly');
        const store = trans.objectStore('answers');
        const index = store.index('question');
        const answers = [];
        // Select only those records where question=questionId
        const request = index.openCursor(IDBKeyRange.only(questionId));
        return new Promise((resolve, reject) => {
            request.onsuccess = function (e) {
                const result = e.target.result;
                if (result === null || result === undefined) {
                    resolve(answers.map(answerApi => Answer.fromApi(answerApi)));
                } else {
                    answers.push(result.value);
                    result.continue();
                }
            };
            request.onerror = function (e) {
                reject(e);
            }
        });
    }

    deleteAnswer(answerId: number): Promise<number> {
        if (this.db === null) {
            Promise.reject('IndexDB is not opened yet!');
        }
        const trans = this.db.transaction(['answers'], 'readwrite');
        const store = trans.objectStore('answers');
        const request = store.delete(answerId);
        return new Promise((resolve, reject) => {
            request.onsuccess = (e) => resolve(answerId);
            request.onerror = (e) => reject(e.value);
        });
    }

    deleteAllAnswers(questionId: number, userId: number): Promise<number> {
        if (this.db === null) {
            Promise.reject('IndexDB is not opened yet');
        }
        const trans = this.db.transaction(['answers'], 'readwrite');
        const store = trans.objectStore('answers');
        const index = store.index('question');

        // Select only those records where question=questionId
        const request = index.openCursor(IDBKeyRange.only(questionId));
        return new Promise((resolve, reject) => {
            request.onsuccess = (e) => {
                const result = e.target.result;
                if (result === null || result === undefined) {
                    resolve(questionId);
                } else {
                    if (result.value.userId === userId) {
                        store.delete(result.value._id);
                    }
                    result.continue();
                }
            };
            request.onerror = (e) => {
                reject(e);
                console.log(e);
            }
        });
    }

    getSessionDetailsData(questionSetId: number): Promise<any> {
        return this.questionSetApi.getSessionDetailsData(questionSetId).toPromise()
            .then((questions) => {
                return questions.map(question => this.getAnswers(question._id)
                    .then((answers => {
                        question.answers = question.answers.concat(answers);
                        return question;
                    })));
            });
    }

    getLastIndex(): Promise<number> {
        if (this.db === null) {
            Promise.reject('IndexDB is not opened yet');
        }
        const trans = this.db.transaction(['answers'], 'readonly');
        const store = trans.objectStore('answers');
        const openCursorRequest = store.openCursor(null, 'prev');
        return new Promise((resolve, reject) => {
            openCursorRequest.onsuccess = (event) => {
                if (event.target.result) {
                    resolve(event.target.result.value._id);
                } else {
                    resolve(0);
                }
            };
            openCursorRequest.onerror = (e) => reject(e);
        });
    }
}
