import { Injectable } from "@angular/core";
import { Answer } from "../../models/answer.model";
import { QuestionSetApi } from "./question-set.api";
import Parser from "./parser";

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
        const request = indexedDB.open("answersData", version);
        let promise = new Promise((resolve, reject) => {
            request.onsuccess = ((e: any) => {
                this.db = e.target.result;
                resolve();
            });
            request.onerror = (error) => {
                reject(error);
                console.log(error);
            }
            request.onupgradeneeded = this.upgradeCallback;
        });
        return promise;
    }

    upgradeCallback(e) {
        this.db = e.target.result;
        e.target.transaction.onerror = (indexedDB as any).onerror;
        if (this.db.objectStoreNames.contains("answers")) {
            this.db.deleteObjectStore("answers");
        }
        const store = this.db.createObjectStore("answers", {
            keyPath: "_id"
        });
        store.createIndex('question', 'questionId', {
            unique: false
        });
    }

    saveAnswer(answer): Promise<any> {
        if (this.db === null) {
            Promise.reject("IndexDB is not opened yet!");
        }

        return this.getLastIndex().then((lastIndex: any) => {
            const trans = this.db.transaction(['answers'], 'readwrite');
            const store = trans.objectStore('answers');
            if (!lastIndex || lastIndex === 0) {
                lastIndex = 800; //add 500 so that there is no _id conflict with the old mongodb stored answers
            }
            answer._id = ++lastIndex;
            answer.local = true;
            const request = store.put(answer);

            return new Promise((resolve, reject) => {
                request.onsuccess = (e) => {
                    resolve(Parser.answerFromApi(answer));
                }
                request.onerror = (e) => reject(e);
            });
        });
    }


    updateAnswer(answer): Promise<Answer> {
        if (this.db === null) {
            Promise.reject("IndexedDB is not opened yet!");
        }
        const trans = this.db.transaction(['answers'], 'readwrite');
        const store = trans.objectStore('answers');
        const request = store.put(Parser.answerIndexedDBToApi(answer));
        return new Promise((resolve, reject) => {
            request.onsuccess = (e) => resolve(answer);
            request.onerror = (e) => reject(e);
        });
    }

    getAnswers(questionId): Promise<any[]> {
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
                    resolve(answers.map(answerApi => Parser.answerFromApi(answerApi)));
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

    deleteAnswer(answerId): Promise<number> {
        if (this.db === null) {
            Promise.reject("IndexDB is not opened yet!");
        }
        const trans = this.db.transaction(['answers'], 'readwrite');
        const store = trans.objectStore('answers');
        const request = store.delete(answerId);
        return new Promise((resolve, reject) => {
            request.onsuccess = (e) => resolve(answerId);
            request.onerror = (e) => reject(e.value);
        });
    }

    deleteAllAnswers(questionId, userId): Promise<number> {
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

    getSessionDetailsData(questionSetId) {
        const promises = [];
        return this.questionSetApi.getSessionDetailsData(questionSetId).toPromise()
            .then(questions => {
                questions = questions.map(question => {
                    return this.getAnswers(question._id).then((answers => {
                        question.answers = question.answers
                            .concat(answers);
                        return question;
                    }));
                });
                return questions;
            });
    }

    getLastIndex() {
        if (this.db === null) {
            Promise.reject('IndexDB is not opened yet');
        }
        const trans = this.db.transaction(['answers'], 'readonly');
        const store = trans.objectStore('answers');
        const openCursorRequest = store.openCursor(null, 'prev');
        return new Promise((resolve, reject) => {
            openCursorRequest.onsuccess = (event) => {
                if (event.target.result) {
                    resolve(event.target.result.value._id); //the object with max revision
                } else {
                    resolve(0);
                }
            };
            openCursorRequest.onerror = (e) => reject(e);
        });

    }
}