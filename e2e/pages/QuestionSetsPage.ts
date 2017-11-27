import { Page } from './Page';
import { browser, element, by, ElementFinder } from 'protractor';

export class QuestionSetsPage extends Page {
    constructor() {
        super('/questionSets');
    }
}