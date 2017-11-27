import { Page } from './Page';
import { ElementFinder, $ } from 'protractor';

export class PracticeSessionPage extends Page {
  endSessionBtn: ElementFinder = $('.endSessionButton');
  textAreaBox: ElementFinder = $('.inputArea textarea');
  saveBtn: ElementFinder = $('.saveButton');
  questionName: ElementFinder = $('.questionText');
  constructor() {
    super(`/practiceSession`);
  }

  endPracticeSession() {
    return this.endSessionBtn.click();
  }
  saveAnswer(text) {
    this.textAreaBox.sendKeys(text);
    return this.saveBtn.click();
  }
  getQuestionNo() {
    return this.questionName.getText().then(name => {
      return name.split('.')[0];
    });
  }
}
