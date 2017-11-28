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

  async endPracticeSession() {
    return await this.endSessionBtn.click();
  }
  async saveAnswer(text) {
    this.textAreaBox.sendKeys(text);
    return await this.saveBtn.click();
  }
  async getQuestionNo() {
    const name = await this.questionName.getText();
    return name.split('.')[0];
  }
}
