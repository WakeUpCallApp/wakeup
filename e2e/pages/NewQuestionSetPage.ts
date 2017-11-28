import { Page } from './Page';
import { $, ElementFinder } from 'protractor';

export class NewQuestionSetPage extends Page {
  name = $("[name='qsName']");
  description = $('[name="description"]');
  createBtn = $('button.createButton');
  constructor() {
    super('/newQuestionSet');
  }

  async createQuestionSet(name, description) {
    this.name.sendKeys(name);
    this.description.sendKeys(description);
    return await this.createBtn.click();
  }
}
