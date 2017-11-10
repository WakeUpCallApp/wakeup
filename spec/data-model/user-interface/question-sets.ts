import { by } from 'protractor';
import { Target } from 'serenity-js/lib/screenplay-protractor';

export class QuestionSets {
    static Items = Target.the('items on the list')
    .located(by.repeater('qs in questionSets'));
}